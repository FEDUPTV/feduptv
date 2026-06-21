import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";
import { sendApplicantEmail } from "../../../lib/sendApplicantEmail";
import { sendCastingNotification } from "../../../lib/sendCastingNotification";
import { v4 as uuidv4 } from "uuid";
import {
  UploadFailureError,
  UploadValidationError,
  uploadApplicantFiles,
} from "../../../lib/uploadApplicantFiles";
import {
  calculateApplicantAge,
  formatApplicantBirthdate,
} from "../../../lib/applicantAge";

const GENERIC_SUBMISSION_ERROR =
  "We were unable to submit your application. Please review your information and try again.";
const activeSubmissionKeys = new Set<string>();

function applicationError(message: string, status = 400) {
  console.log("APPLICATION VALIDATION FAILURE", { status, message });

  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status }
  );
}

function sanitizeFolderSegment(value: unknown, fallback: string) {
  const cleaned = String(value || fallback)
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  return cleaned || fallback;
}

function toInt(value: unknown) {
  if (value === "" || value === undefined || value === null) return null;

  const parsed = Number(value);

  return Number.isNaN(parsed)
    ? null
    : parsed;
}

function isBadEmail(email: string) {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    !email ||
    email.length > 120 ||
    !emailRegex.test(email)
  );
}

function normalizeText(value: unknown) {
  return String(value ?? "").trim();
}

function normalizeOptionalText(value: unknown) {
  return normalizeText(value);
}

function getBoundedInt(value: unknown, min: number, max: number) {
  if (value === "" || value === undefined || value === null) return null;

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < min || parsed > max) {
    return null;
  }

  return parsed;
}

function isValidSocialHandle(value: unknown) {
  const text = normalizeText(value);

  if (!text) return true;
  if (text.length > 200) return false;

  return !/[\u0000-\u001f\u007f]/.test(text);
}

function formatTimeServed(years: unknown, months: unknown) {
  const yearCount = toInt(years) || 0;
  const monthCount = toInt(months) || 0;

  const parts = [];

  if (yearCount > 0) {
    parts.push(`${yearCount} year${yearCount === 1 ? "" : "s"}`);
  }

  if (monthCount > 0) {
    parts.push(`${monthCount} month${monthCount === 1 ? "" : "s"}`);
  }

  return parts.length ? parts.join(", ") : "0 months";
}

async function findBannedApplicant(email: string, phone: string) {
  const emailQuery = supabaseAdmin
    .from("banned_applicants")
    .select("id,email,phone")
    .eq("email", email)
    .maybeSingle();

  const phoneQuery = phone
    ? supabaseAdmin
        .from("banned_applicants")
        .select("id,email,phone")
        .eq("phone", phone)
        .maybeSingle()
    : Promise.resolve({ data: null, error: null });

  const [emailResult, phoneResult] = await Promise.all([
    emailQuery,
    phoneQuery,
  ]);

  if (emailResult.error) throw emailResult.error;
  if (phoneResult.error) throw phoneResult.error;

  return emailResult.data || phoneResult.data;
}

export async function POST(request: Request) {
  let activeSubmissionKey: string | null = null;

  try {
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const userAgent =
      request.headers.get("user-agent") ||
      "unknown";

    console.log("APPLICATION REQUEST RECEIVED", {
      ipAddress,
      userAgent,
    });

    const formData = await request.formData();

    const rawData = formData.get("data");

    if (!rawData || typeof rawData !== "string") {
      return applicationError(
        "Please check your application details and try again."
      );
    }

    let body;

    try {
      body = JSON.parse(rawData);
    } catch (error) {
      console.error("APPLICATION JSON PARSE ERROR", error);

      return applicationError(
        "Please check your application details and try again."
      );
    }

    if (body.website) {
      return applicationError(GENERIC_SUBMISSION_ERROR);
    }

    const requestId = normalizeText(body.request_id) || uuidv4();
    const cleanFirstName = normalizeText(body.first_name);
    const cleanLastName = normalizeText(body.last_name);
    const cleanPhone = normalizeText(body.phone).replace(/\D/g, "");
    const cleanBirthdate = normalizeText(body.birthdate);
    const formattedBirthdate = formatApplicantBirthdate(cleanBirthdate);
    const calculatedAge = calculateApplicantAge(cleanBirthdate);
    const timeServedYears = getBoundedInt(body.time_served_years, 0, 50);
    const timeServedMonths = getBoundedInt(body.time_served_months, 0, 11);
    const childrenValue = normalizeText(body.children).toLowerCase();
    const childrenCount =
      childrenValue === "yes"
        ? getBoundedInt(body.children_count, 1, 30)
        : 0;
    const socialProfiles = [
      body.instagram,
      body.tiktok,
      body.facebook,
    ];

    console.log("APPLICATION REQUEST ID", { requestId });

    if (
      !cleanFirstName ||
      !cleanLastName ||
      !body.email ||
      !cleanPhone
    ) {
      return applicationError(
        "Please complete all required fields before submitting."
      );
    }

    const cleanEmail =
      String(body.email)
        .trim()
        .toLowerCase();

    if (
      !calculatedAge ||
      calculatedAge < 18 ||
      calculatedAge > 100
    ) {
      return applicationError(
        "Applicants must be 18 years or older."
      );
    }

    if (isBadEmail(cleanEmail)) {
      return applicationError("Please enter a valid email address.");
    }

    if (cleanPhone.length !== 10) {
      return applicationError(
        "Please enter a valid 10-digit phone number."
      );
    }

    if (timeServedYears === null || timeServedMonths === null) {
      return applicationError(
        "Please enter valid time served values."
      );
    }

    if (childrenValue !== "yes" && childrenValue !== "no") {
      return applicationError(
        "Please tell us whether you have children."
      );
    }

    if (childrenValue === "yes" && childrenCount === null) {
      return applicationError(
        "Please enter a valid number of children."
      );
    }

    if (!socialProfiles.some((value) => normalizeText(value))) {
      return applicationError(
        "Please provide at least one social media profile."
      );
    }

    if (!socialProfiles.every(isValidSocialHandle)) {
      return applicationError(
        "Please check your social media profiles and remove any unsupported characters."
      );
    }

    if (
      (body.fed_up_story || "").length < 25 ||
      (body.selection_reason || "").length < 25
    ) {
      return applicationError(
        "Please provide more detail in your story responses before submitting."
      );
    }

    if (
      body.agree_privacy !== "yes" ||
      body.agree_release !== "yes" ||
      body.agree_terms !== "yes" ||
      body.agree_truthful !== "yes"
    ) {
      return applicationError(
        "Please review and accept all applicant agreements before submitting."
      );
    }

    const bannedApplicant = await findBannedApplicant(cleanEmail, cleanPhone);

    if (bannedApplicant) {
      return applicationError(
        "This applicant is not eligible to submit another audition.",
        403
      );
    }

    const { data: sameIpApplicant, error: sameIpError } =
      await supabaseAdmin
        .from("applicants")
        .select("id, ip_address, created_at")
        .eq("ip_address", ipAddress)
        .limit(2);

    if (sameIpError) {
      console.error("APPLICATION SUPABASE DUPLICATE IP ERROR", {
        message: sameIpError.message,
      });

      return applicationError(GENERIC_SUBMISSION_ERROR, 500);
    }

    const duplicateFlag =
      !!sameIpApplicant &&
      sameIpApplicant.length > 0;

    if (
      sameIpApplicant &&
      sameIpApplicant.length >= 2
    ) {
      return applicationError(
        "Maximum submissions have been reached from this device or network.",
        429
      );
    }



    const { data: existingApplicant, error: existingApplicantError } =
      await supabaseAdmin
        .from("applicants")
        .select("id,email")
        .ilike("email", cleanEmail)
        .maybeSingle();

    if (existingApplicantError) {
      console.error("APPLICATION SUPABASE DUPLICATE EMAIL ERROR", {
        message: existingApplicantError.message,
      });

      return applicationError(GENERIC_SUBMISSION_ERROR, 500);
    }

    if (existingApplicant) {
      return applicationError(
        "An audition has already been submitted with this email.",
        409
      );
    }

    activeSubmissionKey = `${cleanEmail}:${cleanPhone}`;

    if (activeSubmissionKeys.has(activeSubmissionKey)) {
      return applicationError(
        "Your application is already being submitted. Please wait a moment before trying again.",
        409
      );
    }

    activeSubmissionKeys.add(activeSubmissionKey);


    const folderName = `${sanitizeFolderSegment(
      cleanFirstName,
      "candidate"
    )}-${sanitizeFolderSegment(cleanLastName, "unknown")}-${uuidv4()}`;

    const uploadedFiles = formData.getAll("files").filter(
      (value): value is File => value instanceof File && value.size > 0
    );

    console.log("APPLICATION UPLOADS RECEIVED", {
      count: uploadedFiles.length,
      folderName,
      requestId,
    });

    const uploaded = await uploadApplicantFiles(
      uploadedFiles,
      folderName
    );

    console.log("APPLICATION UPLOADS COMPLETE", {
      photoCount: uploaded.photo_urls.length,
      videoCount: uploaded.video_urls.length,
    });


    const castingScore =
      20 +
      (socialProfiles.some((value) => normalizeText(value)) ? 15 : 0) +
      (body.fed_up_story?.length > 250 ? 15 : 0) +
      (body.selection_reason?.length > 250 ? 15 : 0) +
      (body.can_travel_orlando === "yes" ? 15 : 0) +
      (duplicateFlag ? -20 : 0);

    const timeServed = formatTimeServed(
      timeServedYears,
      timeServedMonths
    );

    const { data, error } =
      await supabaseAdmin
        .from("applicants")
        .insert([
          {
            first_name: cleanFirstName,
            last_name: cleanLastName,
            prison_name: normalizeText(body.prison_name),

            age: calculatedAge,
            birthdate: formattedBirthdate,

            phone: body.phone,
            email: cleanEmail,
            address: normalizeText(body.address),

            charges: normalizeText(body.charges),
            time_served: timeServed,
            jurisdiction: normalizeText(body.jurisdiction),

            children: childrenValue,
            children_count: childrenCount,

            occupation: normalizeOptionalText(body.occupation),

            instagram: normalizeOptionalText(body.instagram),
            tiktok: normalizeOptionalText(body.tiktok),
            facebook: normalizeOptionalText(body.facebook),

            fed_up_story:
              normalizeText(body.fed_up_story),

            underestimated_story:
              normalizeText(body.underestimated_story),

            shocking_truth:
              normalizeText(body.shocking_truth),

            confrontation_story:
              normalizeText(body.confrontation_story),

            selection_reason:
              normalizeText(body.selection_reason),

            scroll_stopper_story:
              normalizeText(body.scroll_stopper_story),

            prison_story_rating:
              toInt(
                body.prison_story_rating
              ),

            over_18: body.over_18,

            can_travel_orlando:
              body.can_travel_orlando,

            producer_notes:
              normalizeOptionalText(body.producer_notes),

            application_folder:
              folderName,

            status: "New",

            ip_address: ipAddress,
            user_agent: userAgent,
            duplicate_flag: duplicateFlag,
            casting_score: castingScore,

          photo_urls: uploaded.photo_urls,
          video_urls: uploaded.video_urls,
          },
        ])
        .select()
        .single();

    if (error) {
      console.error("APPLICATION SUPABASE INSERT ERROR", {
        message: error.message,
      });

      return applicationError(GENERIC_SUBMISSION_ERROR, 500);
    }

    console.log("APPLICATION DATABASE INSERT COMPLETE", {
      applicantId: data.id,
      folderName,
      requestId,
    });

    const emailResults = await Promise.allSettled([
      sendApplicantEmail(
        cleanEmail,
        cleanFirstName
      ),
      sendCastingNotification({
        ...body,
        first_name: cleanFirstName,
        last_name: cleanLastName,
        email: cleanEmail,
        phone: body.phone,
      }),
    ]);

    emailResults.forEach((result, index) => {
      const label = index === 0 ? "applicant" : "casting";

      if (result.status === "rejected") {
        console.error("APPLICATION EMAIL ERROR", {
          label,
          error: result.reason,
        });
      } else {
        console.log("APPLICATION EMAIL COMPLETE", { label });
      }
    });

    console.log("APPLICATION SUBMISSION SUCCESS", {
      applicantId: data.id,
      uploadedPhotoCount: uploaded.photo_urls.length,
      uploadedVideoCount: uploaded.video_urls.length,
      successPage: "/apply/success",
      requestId,
    });

    return NextResponse.json({
      success: true,
      folder: folderName,
    });
  } catch (error) {
    if (error instanceof UploadValidationError) {
      console.error("APPLICATION UPLOAD VALIDATION FAILURE", {
        message: error.message,
      });

      return applicationError(error.message, error.status);
    }

    if (error instanceof UploadFailureError) {
      console.error("APPLICATION UPLOAD FAILURE", {
        message: error.message,
      });

      return applicationError(error.message, error.status);
    }

    console.error("APPLICATION UNEXPECTED ERROR", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Please check your birthdate, email address, or uploaded files and try again.",
      },
      { status: 500 }
    );
  } finally {
    if (activeSubmissionKey) {
      activeSubmissionKeys.delete(activeSubmissionKey);
    }
  }
}
