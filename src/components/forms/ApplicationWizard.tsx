"use client";

import { useEffect, useRef, useState } from "react";
import { calculateApplicantAge } from "../../lib/applicantAge";

const STORAGE_KEY = "fedup_application";
const TOTAL_STEPS = 6;
const ALLOWED_FILE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "mp4", "mov"]);
const REJECTED_IPHONE_EXTENSIONS = new Set(["heic", "heif"]);
const MAX_PHOTO_SIZE = 10 * 1024 * 1024;
const MAX_VIDEO_SIZE = 50 * 1024 * 1024;
const SUBMISSION_RETRY_MESSAGE =
  "We were unable to submit your application. Please review your information and try again.";

type FormData = {
  first_name: string;
  last_name: string;
  prison_name: string;
  birthdate: string;
  phone: string;
  email: string;
  address: string;
  address_verified: string;
  charges: string;
  time_served_years: string;
  time_served_months: string;
  jurisdiction: string;
  children: string;
  children_count: string;
  occupation: string;
  unemployed: string;
  instagram: string;
  tiktok: string;
  facebook: string;
  fed_up_story: string;
  underestimated_story: string;
  shocking_truth: string;
  confrontation_story: string;
  selection_reason: string;
  scroll_stopper_story: string;
  prison_story_rating: string;
  producer_notes: string;
  can_travel_orlando: string;
  over_18: string;
  agree_privacy: string;
  agree_release: string;
  agree_terms: string;
  agree_truthful: string;
};

const initialFormData: FormData = {
  first_name: "",
  last_name: "",
  prison_name: "",
  birthdate: "",
  phone: "",
  email: "",
  address: "",
  address_verified: "",
  charges: "",
  time_served_years: "",
  time_served_months: "",
  jurisdiction: "",
  children: "",
  children_count: "",
  occupation: "",
  unemployed: "",
  instagram: "",
  tiktok: "",
  facebook: "",
  fed_up_story: "",
  underestimated_story: "",
  shocking_truth: "",
  confrontation_story: "",
  selection_reason: "",
  scroll_stopper_story: "",
  prison_story_rating: "3",
  producer_notes: "",
  can_travel_orlando: "",
  over_18: "",
  agree_privacy: "",
  agree_release: "",
  agree_terms: "",
  agree_truthful: "",
};

export default function ApplicationWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(() => {
    if (typeof window === "undefined") return initialFormData;

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialFormData;

    try {
      return { ...initialFormData, ...JSON.parse(saved) };
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      return initialFormData;
    }
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const submitLockedRef = useRef(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const updateField = (field: keyof FormData, value: string) => {
    if (formError) setFormError("");

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const showError = (message: string) => {
    setFormError(message);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getAgeFromBirthdate = (birthdate: string) => {
    return calculateApplicantAge(birthdate);
  };

  const getFileExtension = (fileName: string) =>
    fileName.split(".").pop()?.toLowerCase() || "";

  const isVideoFile = (file: File) => {
    const extension = getFileExtension(file.name);
    return extension === "mp4" || extension === "mov";
  };

  const validateSelectedFiles = (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) {
      return "Please upload at least one photo or video before submitting.";
    }

    if (selectedFiles.length > 10) {
      return "Please upload no more than 10 files.";
    }

    const rejectedIphoneFile = selectedFiles.find((file) =>
      REJECTED_IPHONE_EXTENSIONS.has(getFileExtension(file.name))
    );

    if (rejectedIphoneFile) {
      return "iPhone HEIC photos are not currently supported. Please convert to JPG and try again.";
    }

    const unsupportedFile = selectedFiles.find(
      (file) => !ALLOWED_FILE_EXTENSIONS.has(getFileExtension(file.name))
    );

    if (unsupportedFile) {
      return "One of your uploaded files is not supported. Please upload JPG, JPEG, PNG, MP4, or MOV files.";
    }

    const oversizedFile = selectedFiles.find((file) =>
      isVideoFile(file)
        ? file.size > MAX_VIDEO_SIZE
        : file.size > MAX_PHOTO_SIZE
    );

    if (oversizedFile) {
      return isVideoFile(oversizedFile)
        ? "Videos must be under 50MB."
        : "Photos must be under 10MB.";
    }

    return "";
  };

  const getSubmissionErrorMessage = (error: unknown) => {
    if (error instanceof Error && error.message.trim()) {
      if (error.message === "Failed to fetch") {
        return "We could not reach the server. Please check your connection and try again.";
      }

      if (error.message.includes("expected pattern")) {
        return "Please check your birthdate, email address, or uploaded files and try again.";
      }

      return error.message;
    }

    return SUBMISSION_RETRY_MESSAGE;
  };

  const goNext = () => {
    setFormError("");

    const requiredFields: Record<number, (keyof FormData)[]> = {
      1: [
        "first_name",
        "last_name",
        "prison_name",
        "birthdate",
        "phone",
        "email",
        "address",
        "address_verified"
      ],

      2: [
        "charges",
         "time_served_years",
        "time_served_months",
        "jurisdiction",
        "children"
      ],

      3: [],

      4: [
        "fed_up_story",
        "underestimated_story",
        "shocking_truth"
      ],

      5: [
        "confrontation_story",
        "selection_reason",
        "scroll_stopper_story"
      ],

      6: [
        "over_18",
        "can_travel_orlando"
      ]
    };


    if (
      step == 2 &&
      formData.children === "yes" &&
      !formData.children_count
    ) {
      showError("Please tell us how many children you have.");
      return;
    }

    const missing = requiredFields[step]?.filter(
      (field) =>
        !formData[field] ||
        String(formData[field]).trim() === ""
    );

    if (
      step === 2 &&
      formData.children === "yes" &&
      !formData.children_count
    ) {
      showError("Please select how many children you have.");
      return;
    }

    if (missing?.length) {
      showError("Please complete all required fields before continuing.");
      return;
    }

    if (step === 3) {

      if (
        !formData.instagram.trim() &&
        !formData.tiktok.trim() &&
        !formData.facebook.trim()
      ) {
        showError("Please provide at least one social media profile.");
        return;
      }
    }

    if (step === 4 || step === 5) {

      const storyFields = [
        formData.fed_up_story,
        formData.underestimated_story,
        formData.shocking_truth,
        formData.confrontation_story,
        formData.selection_reason,
        formData.scroll_stopper_story
      ];

      const tooShort = storyFields.some(
        (v) =>
          v &&
          v.trim().length > 0 &&
          v.trim().length < 100
      );

      if (tooShort) {
        showError("Story responses must be at least 100 characters.");
        return;
      }

    }


    if (
      step === 2 &&
      !formData.occupation &&
      formData.unemployed !== "yes"
    ) {
      showError("Please enter your current job/business or check unemployed.");
      return;
    }


    if (
      step === 2 &&
      !formData.occupation &&
      formData.unemployed !== "yes"
    ) {
      showError("Please enter your current job/business or check unemployed.");
      return;
    }

    if (
      step === 2 &&
      formData.children === "yes" &&
      !formData.children_count
    ) {
      showError("Please tell us how many children you have.");
      return;
    }

    if (step === 1) {
      const phoneDigits = formData.phone.replace(/\D/g, "");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const applicantAge = getAgeFromBirthdate(formData.birthdate);

      if (
        !formData.birthdate ||
        applicantAge === null ||
        applicantAge < 18 ||
        applicantAge > 100
      ) {
        showError("Applicants must be 18 years or older.");
        return;
      }

      if (phoneDigits.length !== 10) {
        showError("Please enter a valid phone number in this format: (813) 555-1234");
        return;
      }

      if (!emailRegex.test(formData.email.trim().toLowerCase())) {
        showError("Please enter a valid email address.");
        return;
      }

      if (formData.address_verified !== "yes") {
        showError("Please enter your complete mailing address.");
        return;
      }
    }

    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {

    if (submitting || submitLockedRef.current) return;

    submitLockedRef.current = true;
    setFormError("");
    setSubmitting(true);

    try {
      if (
        formData.agree_privacy !== "yes" ||
        formData.agree_release !== "yes" ||
        formData.agree_terms !== "yes" ||
        formData.agree_truthful !== "yes"
      ) {
        showError("Please review and accept all applicant agreements before submitting.");
        setSubmitting(false);
        return;
      }

      if (!files || files.length === 0) {
        showError("Please upload at least one photo or video before submitting.");
        setSubmitting(false);
        return;
      }

      const selectedFiles = Array.from(files);
      const fileError = validateSelectedFiles(selectedFiles);

      if (fileError) {
        showError(fileError);
        setSubmitting(false);
        return;
      }

      const payload = new FormData();
      const requestId =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

      payload.append("data", JSON.stringify({
        ...formData,
        request_id: requestId,
      }));

      if (files) {
        Array.from(files).forEach((file) => {
          payload.append("files", file);
        });
      }
      const response = await fetch("/api/apply", {
        method: "POST",
        body: payload,
      });

      const result = await response
        .json()
        .catch(() => ({
          error: SUBMISSION_RETRY_MESSAGE,
        }));

      if (!response.ok) {
        throw new Error(result.error || SUBMISSION_RETRY_MESSAGE);
      }

      localStorage.removeItem(STORAGE_KEY);

      console.log("APPLICATION SUBMISSION SUCCESS", {
        successPage: "/apply/success",
      });

      window.location.assign("/apply/success");

    } catch (error) {
      console.error("APPLICATION ERROR", error);
      showError(getSubmissionErrorMessage(error));
      setSubmitting(false);
      submitLockedRef.current = false;
    }
  };

  const inputClass =
    "w-full border border-[#B9932F]/20 bg-white p-4 text-[#17130e] placeholder:text-[#8f806f] transition-all duration-200 focus:border-[#B9932F] focus:ring-2 focus:ring-[#B9932F]/15 focus:outline-none";

  const textareaClass =
    "w-full min-h-[140px] border border-[#B9932F]/20 bg-white p-4 text-[#17130e] placeholder:text-[#8f806f] transition-all duration-200 focus:border-[#B9932F] focus:ring-2 focus:ring-[#B9932F]/15 focus:outline-none";

  const labelClass = "mb-2 block text-sm font-bold text-[#17130e]";

  return (
    <div className="mx-auto max-w-5xl px-5 pt-10 pb-8 md:px-6 md:pt-14">
      {formError && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-500/40 bg-red-950/60 p-4 font-bold text-red-100"
        >
          {formError}
        </div>
      )}

      <div className="mb-6">

        
        </div>
        <p className="fedup-eyebrow mb-4">
          Cast Member Inquiry
        </p>

        <h1 className="fedup-title mb-7 text-4xl md:text-6xl">
          FEDUP Casting Application
        </h1>

        <div className="premium-card mb-6 p-6">
          <p className="mb-4 text-lg leading-relaxed text-[#5c5144]">
            Thank you for your interest in the FEDUP Reality TV Series. We are
            happy to have the opportunity to hear your story.
          </p>

          <p className="mb-4 text-lg leading-relaxed text-[#5c5144]">
            FEDUP stands for Females Ending Defeat. Unleashing Purpose. This
            reality television series showcases the story, redemption,
            resilience, and transformation of women who have served time in
            prison and are rebuilding their lives.
          </p>

          <p className="text-lg leading-relaxed text-[#5c5144]">
            Please complete the application below if you would like to audition
            for a chance to be selected as a cast member for the FEDUP Reality
            TV Series.
          </p>
        </div>

<div className="premium-card mb-8 p-5">
          <div className="grid gap-3 md:grid-cols-6 text-center text-sm font-bold">

            <div className={step >= 1 ? "text-green-400" : "text-gray-500"}>
              {step > 1 ? "✓" : "•"} Personal
            </div>

            <div className={step >= 2 ? "text-green-400" : "text-gray-500"}>
              {step > 2 ? "✓" : "•"} Prison
            </div>

            <div className={step >= 3 ? "text-green-400" : "text-gray-500"}>
              {step > 3 ? "✓" : "•"} Social
            </div>

            <div className={step >= 4 ? "text-green-400" : "text-gray-500"}>
              {step > 4 ? "✓" : "•"} Story
            </div>

            <div className={step >= 5 ? "text-green-400" : "text-gray-500"}>
              {step > 5 ? "✓" : "•"} Casting
            </div>

            <div className={step >= 6 ? "text-[#E5C76B]" : "text-gray-500"}>
              ★ Final Review
            </div>

          </div>

      </div>

      <div className="premium-card mt-4 p-6 md:p-8">
        {step === 1 && (
          <div>
            <h2 className="mb-3 text-3xl font-black text-[#17130e]">
              Personal Information
            </h2>

            <p className="mb-8 text-gray-400">
              Please provide your basic contact information so our casting team
              can reach you.
            </p>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>First Name *</label>
                <input
                  name="given-name"
                  value={formData.first_name}
                  onChange={(e) => updateField("first_name", e.target.value)}
                  className={inputClass}
                  placeholder="First Name" autoComplete="given-name"
                  enterKeyHint="next"
                />
              </div>

              <div>
                <label className={labelClass}>Last Name *</label>
                <input
                  name="family-name"
                  value={formData.last_name}
                  onChange={(e) => updateField("last_name", e.target.value)}
                  className={inputClass}
                  placeholder="Last Name" autoComplete="family-name"
                  enterKeyHint="next"
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>
                  Name You Were Called In Prison *
                </label>
                <input
                  name="nickname"
                  value={formData.prison_name}
                  onChange={(e) => updateField("prison_name", e.target.value)}
                  className={inputClass}
                  placeholder="Prison Name / Nickname" autoComplete="nickname"
                  enterKeyHint="next"
                />
              </div>

              <div>
                <label className={labelClass}>Birthdate *</label>

                <input
                  name="bday"
                  type="text" placeholder="MM/DD/YYYY"
                  value={formData.birthdate}
                  onChange={(e) => updateField("birthdate", e.target.value)}
                  className={inputClass}
                  autoComplete="bday"
                  inputMode="numeric"
                  enterKeyHint="next"
                />
              </div>

              <div>
                <label className={labelClass}>Phone Number *</label>
                <input
                  name="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");

                    if (value.length > 10) {
                      value = value.slice(0, 10);
                    }

                    if (value.length >= 7) {
                      value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6)}`;
                    } else if (value.length >= 4) {
                      value = `(${value.slice(0,3)}) ${value.slice(3)}`;
                    } else if (value.length > 0) {
                      value = `(${value}`;
                    }

                    updateField("phone", value);
                  }}
                  className={inputClass}
                  placeholder="(813) 555-1234" autoComplete="tel"
                  inputMode="tel"
                  enterKeyHint="next"
                />
              </div>

              <div>
                <label className={labelClass}>Email *</label>
                <input
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={(e) =>
                    updateField("email", e.target.value.trim().toLowerCase())
                  }
                  className={inputClass}
                  placeholder="name@email.com" autoComplete="email"
                  inputMode="email"
                  enterKeyHint="next"
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Address *</label>
                
<input
  name="street-address"
  value={formData.address}
  onChange={(e) => {
    updateField("address", e.target.value);
    updateField("address_verified", "yes");
  }}
  className={inputClass}
  placeholder="Street Address, City, State" autoComplete="street-address"
  enterKeyHint="next"
/>

<p className="mt-2 text-sm text-gray-500">
  Enter your complete mailing address.
</p>

              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="mb-3 text-3xl font-black text-[#17130e]">
              Prison Background
            </h2>

            <p className="mb-8 text-gray-400">
              This information helps producers understand your journey and
              background.
            </p>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>What were you charged with? *</label>
                <textarea
                  name="charges"
                  value={formData.charges}
                  onChange={(e) => updateField("charges", e.target.value)}
                  className={textareaClass}
                  placeholder="What were you charged with?"
                />
              </div>

              <div>
                <label className={labelClass}>
                  How much time did you serve? *
                </label>

                <div className="grid gap-4 md:grid-cols-2">

                  <select
                    name="time-served-years"
                    value={formData.time_served_years}
                    onChange={(e) =>
                      updateField("time_served_years", e.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="">Years Served</option>
                    {[...Array(51)].map((_, i) => (
                      <option key={i} value={String(i)}>
                        {i} Year{i !== 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>

                  <select
                    name="time-served-months"
                    value={formData.time_served_months}
                    onChange={(e) =>
                      updateField("time_served_months", e.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="">Additional Months</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i} value={String(i)}>
                        {i} Month{i !== 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>

                </div>
              </div>

              <div>
                <label className={labelClass}>
                  State / Jurisdiction of Conviction *
                </label>

                <select
                  name="jurisdiction"
                  value={formData.jurisdiction}
                  onChange={(e) =>
                    updateField("jurisdiction", e.target.value)
                  }
                  className={inputClass}
                >
                  <option value="">Select State</option>

                  {[
                    "Alabama","Alaska","Arizona","Arkansas","California",
                    "Colorado","Connecticut","Delaware","Florida","Georgia",
                    "Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas",
                    "Kentucky","Louisiana","Maine","Maryland","Massachusetts",
                    "Michigan","Minnesota","Mississippi","Missouri","Montana",
                    "Nebraska","Nevada","New Hampshire","New Jersey",
                    "New Mexico","New York","North Carolina","North Dakota",
                    "Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
                    "South Carolina","South Dakota","Tennessee","Texas","Utah",
                    "Vermont","Virginia","Washington","West Virginia",
                    "Wisconsin","Wyoming","Federal"
                  ].map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Do you have children? *</label>
                <select
                  name="children"
                  value={formData.children}
                  onChange={(e) => updateField("children", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select One</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {formData.children === "yes" && (
                <div>
                  <label className={labelClass}>
                    How many children do you have? *
                  </label>

                  <select
                    name="children-count"
                    value={formData.children_count}
                    onChange={(e) =>
                      updateField("children_count", e.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="">Select Number</option>

                    {[...Array(21)].map((_, i) => (
                      <option key={i + 1} value={String(i + 1)}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className={labelClass}>What is your current job? </label>
                <input
                  name="organization-title"
                  value={formData.occupation}
                  onChange={(e) => updateField("occupation", e.target.value)}
                  className={inputClass}
                  placeholder="Current job or occupation"
                  autoComplete="organization-title"
                  enterKeyHint="next"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="mb-3 text-3xl font-black text-[#17130e]">
              Social Media
            </h2>

            <p className="mb-8 text-gray-400">
              Share your public social profiles so producers can better
              understand your presence and personality.
            </p>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>Instagram Handle</label>
                <input
                  name="instagram"
                  value={formData.instagram}
                  onChange={(e) => updateField("instagram", e.target.value)}
                  className={inputClass}
                  placeholder="@yourname"
                  autoComplete="url"
                  enterKeyHint="next"
                />
              </div>

              <div>
                <label className={labelClass}>TikTok Handle</label>
                <input
                  name="tiktok"
                  value={formData.tiktok}
                  onChange={(e) => updateField("tiktok", e.target.value)}
                  className={inputClass}
                  placeholder="@yourname"
                  autoComplete="url"
                  enterKeyHint="next"
                />
              </div>

              <div>
                <label className={labelClass}>Facebook Profile</label>
                <input
                  name="facebook"
                  value={formData.facebook}
                  onChange={(e) => updateField("facebook", e.target.value)}
                  className={inputClass}
                  placeholder="Facebook profile name or link"
                  autoComplete="url"
                  enterKeyHint="next"
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="mb-3 text-3xl font-black text-[#17130e]">
              Your Story
            </h2>

            <p className="mb-8 text-gray-400">
              Be honest, raw, and real. This is where producers learn what makes
              your story powerful.
            </p>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>
                  Tell us one thing you are completely FEDUP with. What has it
                  cost you emotionally, mentally, and financially? *
                </label>
                <textarea
                  name="fed-up-story"
                  value={formData.fed_up_story}
                  onChange={(e) => updateField("fed_up_story", e.target.value)}
                  className={textareaClass}
                  placeholder="Tell us what you are FEDUP with..."
                  enterKeyHint="next"
                />

                <p
                  className={`mt-2 text-sm ${
                    formData.fed_up_story.length >= 250
                      ? "text-green-400"
                      : formData.fed_up_story.length >= 100
                      ? "text-[#E5C76B]"
                      : "text-red-400"
                  }`}
                >
                  {formData.fed_up_story.length} characters
                  {formData.fed_up_story.length >= 250
                    ? " • Great detail provided"
                    : formData.fed_up_story.length >= 100
                    ? " • Minimum met, more detail helps"
                    : " • Minimum 100 required"}
                </p>
              </div>

              <div>
                <label className={labelClass}>
                  Tell us about a time when you felt disrespected, overlooked,
                  or underestimated. *
                </label>
                <textarea
                  name="underestimated-story"
                  value={formData.underestimated_story}
                  onChange={(e) =>
                    updateField("underestimated_story", e.target.value)
                  }
                  className={textareaClass}
                  placeholder="What happened and how did you respond?"
                  enterKeyHint="next"
                />

                <p
                  className={`mt-2 text-sm ${
                    formData.underestimated_story.length >= 250
                      ? "text-green-400"
                      : formData.underestimated_story.length >= 100
                      ? "text-[#E5C76B]"
                      : "text-red-400"
                  }`}
                >
                  {formData.underestimated_story.length} characters
                  {formData.underestimated_story.length >= 250
                    ? " • Great detail provided"
                    : formData.underestimated_story.length >= 100
                    ? " • Minimum met, more detail helps"
                    : " • Minimum 100 required"}
                </p>
              </div>

              <div>
                <label className={labelClass}>
                  If cameras followed you for 24 hours, what truth would shock
                  people most about you? *
                </label>
                <textarea
                  name="shocking-truth"
                  value={formData.shocking_truth}
                  onChange={(e) =>
                    updateField("shocking_truth", e.target.value)
                  }
                  className={textareaClass}
                  placeholder="What would surprise people?"
                  enterKeyHint="next"
                />

                <p
                  className={`mt-2 text-sm ${
                    formData.shocking_truth.length >= 250
                      ? "text-green-400"
                      : formData.shocking_truth.length >= 100
                      ? "text-[#E5C76B]"
                      : "text-red-400"
                  }`}
                >
                  {formData.shocking_truth.length} characters
                  {formData.shocking_truth.length >= 250
                    ? " • Great detail provided"
                    : formData.shocking_truth.length >= 100
                    ? " • Minimum met, more detail helps"
                    : " • Minimum 100 required"}
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="mb-3 text-3xl font-black text-[#17130e]">
              Casting Questions
            </h2>

            <p className="mb-8 text-gray-400">
              These answers help producers understand your conflict, purpose,
              and camera presence.
            </p>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>
                  Who or what are you ready to confront on this show? Why have
                  you avoided dealing with it until now? *
                </label>
                <textarea
                  name="confrontation-story"
                  value={formData.confrontation_story}
                  onChange={(e) =>
                    updateField("confrontation_story", e.target.value)
                  }
                  className={textareaClass}
                  placeholder="Who or what are you ready to confront?"
                  enterKeyHint="next"
                />

                <p
                  className={`mt-2 text-sm ${
                    formData.confrontation_story.length >= 250
                      ? "text-green-400"
                      : formData.confrontation_story.length >= 100
                      ? "text-[#E5C76B]"
                      : "text-red-400"
                  }`}
                >
                  {formData.confrontation_story.length} characters
                  {formData.confrontation_story.length >= 250
                    ? " • Great detail provided"
                    : formData.confrontation_story.length >= 100
                    ? " • Minimum met, more detail helps"
                    : " • Minimum 100 required"}
                </p>
              </div>

              <div>
                <label className={labelClass}>
                  Why should we choose you over other women? *
                </label>
                <textarea
                  name="selection-reason"
                  value={formData.selection_reason}
                  onChange={(e) =>
                    updateField("selection_reason", e.target.value)
                  }
                  className={textareaClass}
                  placeholder="Why should producers select you?"
                  enterKeyHint="next"
                />

                <p
                  className={`mt-2 text-sm ${
                    formData.selection_reason.length >= 250
                      ? "text-green-400"
                      : formData.selection_reason.length >= 100
                      ? "text-[#E5C76B]"
                      : "text-red-400"
                  }`}
                >
                  {formData.selection_reason.length} characters
                  {formData.selection_reason.length >= 250
                    ? " • Great detail provided"
                    : formData.selection_reason.length >= 100
                    ? " • Minimum met, more detail helps"
                    : " • Minimum 100 required"}
                </p>
              </div>

              <div>
                <label className={labelClass}>
                  What makes your story powerful enough for people to stop
                  scrolling and watch? *
                </label>
                <textarea
                  name="scroll-stopper-story"
                  value={formData.scroll_stopper_story}
                  onChange={(e) =>
                    updateField("scroll_stopper_story", e.target.value)
                  }
                  className={textareaClass}
                  placeholder="What makes your story unforgettable?"
                  enterKeyHint="next"
                />

                <p
                  className={`mt-2 text-sm ${
                    formData.scroll_stopper_story.length >= 250
                      ? "text-green-400"
                      : formData.scroll_stopper_story.length >= 100
                      ? "text-[#E5C76B]"
                      : "text-red-400"
                  }`}
                >
                  {formData.scroll_stopper_story.length} characters
                  {formData.scroll_stopper_story.length >= 250
                    ? " • Great detail provided"
                    : formData.scroll_stopper_story.length >= 100
                    ? " • Minimum met, more detail helps"
                    : " • Minimum 100 required"}
                </p>
              </div>

              <div>
                <label className={labelClass}>
                  How interesting is your prison story?
                </label>

                <div className="mb-3 text-lg font-black text-[#E5C76B]">
                  Rating: {formData.prison_story_rating} / 5
                </div>

                <input
                  name="prison-story-rating"
                  type="range"
                  min="1"
                  max="5"
                  value={formData.prison_story_rating}
                  onChange={(e) =>
                    updateField("prison_story_rating", e.target.value)
                  }
                  className="w-full"
                />

                <div className="mt-2 flex justify-between text-sm text-gray-500">
                  <span>Kinda interesting</span>
                  <span>Jaw dropping</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <h2 className="mb-3 text-3xl font-black text-[#17130e]">
              Uploads and Final Questions
            </h2>

            <p className="mb-8 text-gray-400">
              Upload photos and answer the final questions before submitting.
            </p>

            <div className="mb-6 border border-[#B9932F]/20 bg-[#fff9ed] p-5">
              <label className="mb-3 block font-bold text-[#17130e]">
                Upload photos or videos of yourself, your family, significant others,
                prison friends, or your story.
              </label>

              <input
                name="applicant-media"
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.mp4,.mov"
                onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files || []);
                  const fileError = validateSelectedFiles(selectedFiles);

                  if (fileError) {
                    e.target.value = "";
                    setFiles(null);
                    showError(fileError);
                    return;
                  }

                  if (formError) setFormError("");
                  setFiles(e.target.files);
                }}
                className="w-full rounded bg-white p-4 text-[#17130e]"
              />

              <p className="mt-3 text-sm text-gray-500">
                Upload JPG, JPEG, PNG, MP4, or MOV files only. HEIC and HEIF
                photos are not currently supported.
              </p>

              {files && (
                <p className="mt-3 text-sm text-[#E5C76B]">
                  Selected files: {files.length}
                </p>
              )}
            </div>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>I confirm I am legally eligible to participate in this casting process and understand applicants must be at least 18 years old. *</label>
                <select
                  name="over-18"
                  value={formData.over_18}
                  onChange={(e) => updateField("over_18", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select One</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Will you be able to get to Orlando, FL on July 11, 2026 for
                  an in-person audition? *
                </label>
                <select
                  name="can-travel-orlando"
                  value={formData.can_travel_orlando}
                  onChange={(e) =>
                    updateField("can_travel_orlando", e.target.value)
                  }
                  className={inputClass}
                >
                  <option value="">Select One</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  What else would you like for the producers of FEDUP to know
                  about you?
                </label>
                <textarea
                  name="producer-notes"
                  value={formData.producer_notes}
                  onChange={(e) =>
                    updateField("producer_notes", e.target.value)
                  }
                  className={textareaClass}
                  placeholder="Share anything else producers should know..."
                  enterKeyHint="done"
                />
              </div>

              <div className="border border-[#C9A227]/20 bg-[#C9A227]/10 p-6">
                <h3 className="mb-2 font-black text-[#E5C76B]">
                  Next Phase of Casting
                </h3>

                <p className="text-[#5c5144]">
                  Advancing in the FEDUP casting process may include an invitation
                  to a private in-person audition with our production team in
                  Orlando, Florida.

                  For security and confidentiality reasons, audition details,
                  scheduling information, and locations will only be shared with
                  applicants selected to move forward.
                </p>
              </div>

              <div className="border border-[#B9932F]/20 bg-[#fff9ed] p-6 space-y-5">

                <h3 className="text-xl font-black text-[#E5C76B]">
                  Applicant Agreements & Consent
                </h3>

                <label className="flex gap-3 text-[#5c5144]">
                  <input
                    name="agree-privacy"
                    type="checkbox"
                    checked={formData.agree_privacy === "yes"}
                    onChange={(e) =>
                      updateField(
                        "agree_privacy",
                        e.target.checked ? "yes" : ""
                      )
                    }
                  />
                  <span>
                    I acknowledge that FEDUP may collect, store, review, and
                    evaluate the information I provide for casting purposes.
                  </span>
                </label>

                <label className="flex gap-3 text-[#5c5144]">
                  <input
                    name="agree-release"
                    type="checkbox"
                    checked={formData.agree_release === "yes"}
                    onChange={(e) =>
                      updateField(
                        "agree_release",
                        e.target.checked ? "yes" : ""
                      )
                    }
                  />
                  <span>
                    I authorize FEDUP producers to review submitted photos,
                    videos, social media profiles, and supporting materials.
                  </span>
                </label>

                <label className="flex gap-3 text-[#5c5144]">
                  <input
                    name="agree-terms"
                    type="checkbox"
                    checked={formData.agree_terms === "yes"}
                    onChange={(e) =>
                      updateField(
                        "agree_terms",
                        e.target.checked ? "yes" : ""
                      )
                    }
                  />
                  <span>
                    I understand that submitting an application does not
                    guarantee selection, participation, compensation, or
                    appearance on the program.
                  </span>
                </label>

                <label className="flex gap-3 text-[#5c5144]">
                  <input
                    name="agree-truthful"
                    type="checkbox"
                    checked={formData.agree_truthful === "yes"}
                    onChange={(e) =>
                      updateField(
                        "agree_truthful",
                        e.target.checked ? "yes" : ""
                      )
                    }
                  />
                  <span>
                    I certify that all information submitted is truthful and
                    accurate to the best of my knowledge.
                  </span>
                </label>

              </div>

              <div className="border border-[#B9932F]/20 bg-[#fff9ed] p-6">
                <h3 className="mb-2 font-black text-[#E5C76B]">
                  Before You Submit
                </h3>

                <p className="text-[#5c5144]">
                  Please review your answers carefully.
                  Once submitted, your application may
                  immediately enter the producer review
                  process and cannot be edited without
                  contacting the FEDUP casting team.
                </p>
              </div>


              <button
                type="button"
                onClick={handleSubmit}
                className="premium-button w-full rounded-sm py-5 text-lg disabled:cursor-not-allowed disabled:opacity-50" disabled={submitting}
>
  {submitting
    ? "SUBMITTING..."
    : "BEGIN CASTING REVIEW"}
</button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-end">
        {step > 1 && (
          <button
            onClick={goBack}
            className="rounded-sm bg-[#efe3cf] px-6 py-3 font-bold text-[#17130e]"
          >
            Back
          </button>
        )}

        {step < TOTAL_STEPS && (
          <button
            onClick={goNext}
            className="premium-button rounded-sm px-6 py-3 text-sm transition active:scale-95"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}




