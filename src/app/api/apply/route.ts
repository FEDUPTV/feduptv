import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";
import { sendApplicantEmail } from "../../../lib/sendApplicantEmail";
import { sendCastingNotification } from "../../../lib/sendCastingNotification";
import { v4 as uuidv4 } from "uuid";
import { uploadApplicantFiles } from "../../../lib/uploadApplicantFiles";

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

export async function POST(request: Request) {
  try {
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const userAgent =
      request.headers.get("user-agent") ||
      "unknown";


    const formData = await request.formData();

    const rawData = formData.get("data");

    if (!rawData || typeof rawData !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid application data.",
        },
        { status: 400 }
      );
    }

    const body = JSON.parse(rawData);

    if (body.website) {
      return NextResponse.json(
        {
          success: false,
          error: "Spam detected.",
        },
        { status: 400 }
      );
    }

    if (
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.phone
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields.",
        },
        { status: 400 }
      );
    }

    const cleanEmail =
      String(body.email)
        .trim()
        .toLowerCase();

    if (isBadEmail(cleanEmail)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email address.",
        },
        { status: 400 }
      );
    }

    if (
      (body.fed_up_story || "").length < 25 ||
      (body.selection_reason || "").length < 25
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please provide more detailed responses.",
        },
        { status: 400 }
      );
    }

    const cleanPhone =
      String(body.phone || "").replace(/\D/g, "");

    const { data: bannedApplicant } =
      await supabaseAdmin
        .from("banned_applicants")
        .select("id,email,phone")
        .or(`email.eq.${cleanEmail},phone.eq.${cleanPhone}`)
        .maybeSingle();

    if (bannedApplicant) {
      return NextResponse.json(
        {
          success: false,
          error:
            "This applicant is not eligible to submit another audition.",
        },
        { status: 403 }
      );
    }

    const { data: sameIpApplicant } =
      await supabaseAdmin
        .from("applicants")
        .select("id, ip_address, created_at")
        .eq("ip_address", ipAddress)
        .limit(1);

    const duplicateFlag =
      !!sameIpApplicant &&
      sameIpApplicant.length > 0;

    if (
      sameIpApplicant &&
      sameIpApplicant.length >= 2
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Maximum submissions have been reached from this device or network."
        },
        { status: 429 }
      );
    }



    const { data: existingApplicant } =
      await supabaseAdmin
        .from("applicants")
        .select("id,email")
        .ilike("email", cleanEmail)
        .maybeSingle();

    if (existingApplicant) {
      return NextResponse.json(
        {
          success: false,
          error:
            "An audition has already been submitted with this email.",
        },
        { status: 409 }
      );
    }



    const folderName = `${body.first_name || "candidate"}-${
      body.last_name || "unknown"
    }-${uuidv4()}`
      .toLowerCase()
      .replace(/\s+/g, "-");

    const uploaded = await uploadApplicantFiles(
      formData.getAll("files") as File[],
      folderName
    );


    const castingScore =
      20 +
      (body.instagram || body.tiktok || body.facebook ? 15 : 0) +
      (body.fed_up_story?.length > 250 ? 15 : 0) +
      (body.selection_reason?.length > 250 ? 15 : 0) +
      (body.can_travel_orlando === "yes" ? 15 : 0) +
      (duplicateFlag ? -20 : 0);

    const { data, error } =
      await supabaseAdmin
        .from("applicants")
        .insert([
          {
            first_name: body.first_name,
            last_name: body.last_name,
            prison_name: body.prison_name,

            age: toInt(body.age),
            birthdate: body.birthdate || null,

            phone: body.phone,
            email: cleanEmail,
            address: body.address,

            charges: body.charges,
            time_served: body.time_served,
            jurisdiction: body.jurisdiction,

            children: body.children,
            children_count: toInt(
              body.children_count
            ),

            occupation: body.occupation,

            instagram: body.instagram,
            tiktok: body.tiktok,
            facebook: body.facebook,

            fed_up_story:
              body.fed_up_story,

            underestimated_story:
              body.underestimated_story,

            shocking_truth:
              body.shocking_truth,

            confrontation_story:
              body.confrontation_story,

            selection_reason:
              body.selection_reason,

            scroll_stopper_story:
              body.scroll_stopper_story,

            prison_story_rating:
              toInt(
                body.prison_story_rating
              ),

            over_18: body.over_18,

            can_travel_orlando:
              body.can_travel_orlando,

            producer_notes:
              body.producer_notes,

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
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    await sendApplicantEmail(
      cleanEmail,
      body.first_name
    );

    await sendCastingNotification({
      ...body,
      email: cleanEmail,
    });

    return NextResponse.json({
      success: true,
      applicant: data,
      folder: folderName,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Server Error",
      },
      { status: 500 }
    );
  }
}
