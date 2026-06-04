"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "fedup_application";
const TOTAL_STEPS = 6;

type FormData = {
  first_name: string;
  last_name: string;
  prison_name: string;
  age: string;
  birthdate: string;
  phone: string;
  email: string;
  address: string;
  charges: string;
  time_served: string;
  jurisdiction: string;
  children: string;
  children_count: string;
  occupation: string;
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
};

const initialFormData: FormData = {
  first_name: "",
  last_name: "",
  prison_name: "",
  age: "",
  birthdate: "",
  phone: "",
  email: "",
  address: "",
  charges: "",
  time_served: "",
  jurisdiction: "",
  children: "",
  children_count: "",
  occupation: "",
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
};

export default function ApplicationWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [files, setFiles] = useState<FileList | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const goNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = new FormData();

      payload.append("data", JSON.stringify(formData));

      if (files) {
        Array.from(files).forEach((file) => {
          payload.append("files", file);
        });
      }

      const response = await fetch("/api/apply", {
        method: "POST",
        body: payload,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Submission failed");
      }

      localStorage.removeItem(STORAGE_KEY);

      alert("Application submitted successfully.");

      window.location.href = "/apply/success";

    } catch (error) {
      console.error(error);
      alert("Failed to submit application.");
    }
  };

  const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  const inputClass =
    "w-full rounded-lg border border-zinc-700 bg-black p-4 text-white placeholder:text-zinc-500 focus:border-yellow-500 focus:outline-none";

  const textareaClass =
    "w-full min-h-[140px] rounded-lg border border-zinc-700 bg-black p-4 text-white placeholder:text-zinc-500 focus:border-yellow-500 focus:outline-none";

  const labelClass = "mb-2 block text-sm font-bold text-white";

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-10">
        <p className="mb-3 text-sm font-black uppercase tracking-[0.35em] text-yellow-500">
          Cast Member Inquiry
        </p>

        <h1 className="mb-6 text-4xl font-black text-yellow-500 md:text-6xl">
          FED UP Casting Application
        </h1>

        <div className="mb-8 rounded-2xl border border-yellow-500/20 bg-zinc-900 p-6">
          <p className="mb-4 text-lg leading-relaxed text-gray-300">
            Thank you for your interest in the FED UP Reality TV Series. We are
            happy to have the opportunity to hear your story.
          </p>

          <p className="mb-4 text-lg leading-relaxed text-gray-300">
            FED UP stands for Females Ending Defeat. Unleashing Purpose. This
            reality television series showcases the story, redemption,
            resilience, and transformation of women who have served time in
            prison and are rebuilding their lives.
          </p>

          <p className="text-lg leading-relaxed text-gray-300">
            Please complete the application below if you would like to audition
            for a chance to be selected as a cast member for the FED UP Reality
            TV Series.
          </p>
        </div>

        <div className="rounded-xl border border-yellow-500/20 bg-zinc-900 p-4">
          <div className="mb-2 flex justify-between text-sm text-gray-400">
            <span>Application Progress</span>
            <span>
              Step {step} of {TOTAL_STEPS}
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full bg-yellow-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-8">
        {step === 1 && (
          <div>
            <h2 className="mb-3 text-3xl font-black text-white">
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
                  value={formData.first_name}
                  onChange={(e) => updateField("first_name", e.target.value)}
                  className={inputClass}
                  placeholder="First Name"
                />
              </div>

              <div>
                <label className={labelClass}>Last Name *</label>
                <input
                  value={formData.last_name}
                  onChange={(e) => updateField("last_name", e.target.value)}
                  className={inputClass}
                  placeholder="Last Name"
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>
                  Name You Were Called In Prison
                </label>
                <input
                  value={formData.prison_name}
                  onChange={(e) => updateField("prison_name", e.target.value)}
                  className={inputClass}
                  placeholder="Prison Name / Nickname"
                />
              </div>

              <div>
                <label className={labelClass}>Age *</label>
                <input
                  value={formData.age}
                  onChange={(e) => updateField("age", e.target.value)}
                  className={inputClass}
                  placeholder="Age"
                  inputMode="numeric"
                />
              </div>

              <div>
                <label className={labelClass}>Birthdate *</label>
                <input
                  type="date"
                  value={formData.birthdate}
                  onChange={(e) => updateField("birthdate", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Phone Number *</label>
                <input
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className={inputClass}
                  placeholder="Phone Number"
                />
              </div>

              <div>
                <label className={labelClass}>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={inputClass}
                  placeholder="Email Address"
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Address *</label>
                <input
                  value={formData.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  className={inputClass}
                  placeholder="Address"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="mb-3 text-3xl font-black text-white">
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
                  value={formData.charges}
                  onChange={(e) => updateField("charges", e.target.value)}
                  className={textareaClass}
                  placeholder="What were you charged with?"
                />
              </div>

              <div>
                <label className={labelClass}>
                  How much time did you serve in prison? *
                </label>
                <input
                  value={formData.time_served}
                  onChange={(e) => updateField("time_served", e.target.value)}
                  className={inputClass}
                  placeholder="Example: 3 years, 8 months"
                />
              </div>

              <div>
                <label className={labelClass}>
                  What state or jurisdiction were you sentenced in? *
                </label>
                <input
                  value={formData.jurisdiction}
                  onChange={(e) => updateField("jurisdiction", e.target.value)}
                  className={inputClass}
                  placeholder="State or jurisdiction"
                />
              </div>

              <div>
                <label className={labelClass}>Do you have children? *</label>
                <select
                  value={formData.children}
                  onChange={(e) => updateField("children", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select One</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  How many children do you have?
                </label>
                <input
                  value={formData.children_count}
                  onChange={(e) =>
                    updateField("children_count", e.target.value)
                  }
                  className={inputClass}
                  placeholder="Number of children"
                  inputMode="numeric"
                />
              </div>

              <div>
                <label className={labelClass}>What is your current job? </label>
                <input
                  value={formData.occupation}
                  onChange={(e) => updateField("occupation", e.target.value)}
                  className={inputClass}
                  placeholder="Current job or occupation"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="mb-3 text-3xl font-black text-white">
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
                  value={formData.instagram}
                  onChange={(e) => updateField("instagram", e.target.value)}
                  className={inputClass}
                  placeholder="@yourname"
                />
              </div>

              <div>
                <label className={labelClass}>TikTok Handle</label>
                <input
                  value={formData.tiktok}
                  onChange={(e) => updateField("tiktok", e.target.value)}
                  className={inputClass}
                  placeholder="@yourname"
                />
              </div>

              <div>
                <label className={labelClass}>Facebook Profile</label>
                <input
                  value={formData.facebook}
                  onChange={(e) => updateField("facebook", e.target.value)}
                  className={inputClass}
                  placeholder="Facebook profile name or link"
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="mb-3 text-3xl font-black text-white">
              Your Story
            </h2>

            <p className="mb-8 text-gray-400">
              Be honest, raw, and real. This is where producers learn what makes
              your story powerful.
            </p>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>
                  Tell us one thing you are completely FED UP with. What has it
                  cost you emotionally, mentally, and financially? *
                </label>
                <textarea
                  value={formData.fed_up_story}
                  onChange={(e) => updateField("fed_up_story", e.target.value)}
                  className={textareaClass}
                  placeholder="Tell us what you are FED UP with..."
                />
              </div>

              <div>
                <label className={labelClass}>
                  Tell us about a time when you felt disrespected, overlooked,
                  or underestimated. *
                </label>
                <textarea
                  value={formData.underestimated_story}
                  onChange={(e) =>
                    updateField("underestimated_story", e.target.value)
                  }
                  className={textareaClass}
                  placeholder="What happened and how did you respond?"
                />
              </div>

              <div>
                <label className={labelClass}>
                  If cameras followed you for 24 hours, what truth would shock
                  people most about you? *
                </label>
                <textarea
                  value={formData.shocking_truth}
                  onChange={(e) =>
                    updateField("shocking_truth", e.target.value)
                  }
                  className={textareaClass}
                  placeholder="What would surprise people?"
                />
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="mb-3 text-3xl font-black text-white">
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
                  value={formData.confrontation_story}
                  onChange={(e) =>
                    updateField("confrontation_story", e.target.value)
                  }
                  className={textareaClass}
                  placeholder="Who or what are you ready to confront?"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Why should we choose you over other women? *
                </label>
                <textarea
                  value={formData.selection_reason}
                  onChange={(e) =>
                    updateField("selection_reason", e.target.value)
                  }
                  className={textareaClass}
                  placeholder="Why should producers select you?"
                />
              </div>

              <div>
                <label className={labelClass}>
                  What makes your story powerful enough for people to stop
                  scrolling and watch? *
                </label>
                <textarea
                  value={formData.scroll_stopper_story}
                  onChange={(e) =>
                    updateField("scroll_stopper_story", e.target.value)
                  }
                  className={textareaClass}
                  placeholder="What makes your story unforgettable?"
                />
              </div>

              <div>
                <label className={labelClass}>
                  How interesting is your prison story?
                </label>

                <div className="mb-3 text-lg font-black text-yellow-500">
                  Rating: {formData.prison_story_rating} / 5
                </div>

                <input
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
            <h2 className="mb-3 text-3xl font-black text-white">
              Uploads and Final Questions
            </h2>

            <p className="mb-8 text-gray-400">
              Upload photos and answer the final questions before submitting.
            </p>

            <div className="mb-6 rounded-xl border border-yellow-500/20 bg-black p-5">
              <label className="mb-3 block font-bold text-white">
                Upload photos or videos of yourself, your family, significant others,
                prison friends, or your story.
              </label>

              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(e) => setFiles(e.target.files)}
                className="w-full rounded bg-zinc-900 p-4 text-white"
              />

              <p className="mt-3 text-sm text-gray-500">
                You may upload multiple image or video files. Files will be organized
                into your applicant folder after submission.
              </p>

              {files && (
                <p className="mt-3 text-sm text-yellow-500">
                  Selected files: {files.length}
                </p>
              )}
            </div>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>Are you over the age of 18? *</label>
                <select
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
                  What else would you like for the producers of FED UP to know
                  about you?
                </label>
                <textarea
                  value={formData.producer_notes}
                  onChange={(e) =>
                    updateField("producer_notes", e.target.value)
                  }
                  className={textareaClass}
                  placeholder="Share anything else producers should know..."
                />
              </div>

              <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-6">
                <h3 className="mb-2 font-black text-yellow-500">
                  Orlando Audition Information
                </h3>

                <p className="text-gray-300">
                  Selected applicants will be invited to attend an in-person
                  audition on July 11, 2026 in Orlando, Florida. The audition
                  location is private and will only be shared with approved
                  candidates.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full rounded-xl bg-yellow-500 py-5 text-lg font-black text-black"
>
  SUBMIT APPLICATION
</button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          disabled={step === 1}
          onClick={goBack}
          className="rounded bg-zinc-800 px-6 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>

        {step < TOTAL_STEPS && (
          <button
            onClick={goNext}
            className="rounded bg-yellow-500 px-6 py-3 font-black text-black"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}