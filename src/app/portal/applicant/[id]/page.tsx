"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const statuses = [
  "New",
  "Under Review",
  "Phone Screen",
  "Audition Scheduled",
  "Audition Completed",
  "Selected",
  "Waitlist",
  "Rejected",
];

export default function CandidateDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [applicant, setCandidate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [status, setStatus] = useState("New");
  const [producerNotes, setProducerNotes] = useState("");
  const [castingScore, setCastingScore] = useState("");

  const [auditionDate, setAuditionDate] = useState("");
  const [auditionTime, setAuditionTime] = useState("");
  const [auditionLocation, setAuditionLocation] = useState("");
  const [auditionNotes, setAuditionNotes] = useState("");
  const [auditionOutcome, setAuditionOutcome] = useState("Pending");

  const [brandiVote, setBrandiVote] = useState("Maybe");
  const [rashiaVote, setRashiaVote] = useState("Maybe");
  const [vladVote, setVladVote] = useState("Maybe");

  const [producerOneRating, setProducerOneRating] = useState("0");
  const [producerTwoRating, setProducerTwoRating] = useState("0");
  const [producerThreeRating, setProducerThreeRating] = useState("0");

  const producerOne =
    applicant?.producer_one_rating || 0;

  const producerTwo =
    applicant?.producer_two_rating || 0;

  const producerThree =
    applicant?.producer_three_rating || 0;

  const averageScore =
    ((producerOne + producerTwo + producerThree) / 3).toFixed(1);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  useEffect(() => {
    async function loadCandidate() {
      try {
        const response = await fetch(`/api/applicants/${id}`);
        const data = await response.json();

        if (data.applicant) {
          setCandidate(data.applicant);
          setStatus(data.applicant.status || "New");
          setProducerNotes(data.applicant.producer_notes || "");

          setAuditionDate(data.applicant.audition_date || "");
          setAuditionTime(data.applicant.audition_time || "");
          setAuditionLocation(data.applicant.audition_location || "");
          setAuditionNotes(data.applicant.audition_notes || "");
          setAuditionOutcome(data.applicant.audition_outcome || "Pending");

          setBrandiVote(data.applicant.brandi_vote || "Maybe");
          setRashiaVote(data.applicant.rashia_vote || "Maybe");
          setVladVote(data.applicant.vlad_vote || "Maybe");
          setCastingScore(data.applicant.casting_score ? String(data.applicant.casting_score) : "");

          setProducerOneRating(
            String(data.applicant.producer_one_rating || 0)
          );

          setProducerTwoRating(
            String(data.applicant.producer_two_rating || 0)
          );

          setProducerThreeRating(
            String(data.applicant.producer_three_rating || 0)
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) loadCandidate();
  }, [id]);

  async function saveChanges() {
    setSaving(true);

    try {
      const response = await fetch(`/api/applicants/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          producer_notes: producerNotes,
          casting_score: castingScore,

          audition_date: auditionDate,
          audition_time: auditionTime,
          audition_location: auditionLocation,
          audition_notes: auditionNotes,
          audition_outcome: auditionOutcome,

          brandi_vote: brandiVote,
          rashia_vote: rashiaVote,
          vlad_vote: vladVote,

          producer_one_rating: Number(producerOneRating),
          producer_two_rating: Number(producerTwoRating),
          producer_three_rating: Number(producerThreeRating),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save");
      }

      setCandidate(data.applicant);
      alert("Saved successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <main className="min-h-screen pb-24 md:pb-0 bg-black p-10 text-white">Loading applicant...</main>;
  }


  const averageProducerScore =
    (
      (
        Number(producerOneRating || 0) +
        Number(producerTwoRating || 0) +
        Number(producerThreeRating || 0)
      ) / 3
    ).toFixed(1);

  if (!applicant) {
    return <main className="min-h-screen pb-24 md:pb-0 bg-black p-10 text-white">Candidate not found.</main>;
  }

  const yesVotes =
    [brandiVote, rashiaVote, vladVote].filter((vote) => vote === "Yes").length;

  const noVotes =
    [brandiVote, rashiaVote, vladVote].filter((vote) => vote === "No").length;

  const voteSummary =
    yesVotes === 3
      ? "Unanimous Yes"
      : noVotes >= 2
      ? "Reject"
      : yesVotes >= 2
      ? "Strong Consideration"
      : "Needs Review";

  return (
    <main className="min-h-screen pb-24 md:pb-0 bg-black p-6 text-white md:p-10">
      <div className="mx-auto max-w-6xl">
        <Link href="/portal" className="mb-8 inline-block text-yellow-500 hover:underline">
          Back to Casting Portal
        </Link>

        <div className="mb-8 rounded-2xl border border-yellow-500/20 bg-zinc-900 p-8">
          <p className="mb-2 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Candidate Profile
          </p>
          <h1 className="text-4xl font-black md:text-4xl md:text-5xl md:text-6xl">
            {applicant.first_name} {applicant.last_name}
          </h1>
          <p className="mt-3 text-gray-400">
            {applicant.email || "-"} | {applicant.phone || "-"}
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <section className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-6 lg:col-span-1">
            <h2 className="mb-5 text-2xl font-black text-yellow-500">
              Casting Controls
            </h2>

            <label className="mb-2 block text-sm font-bold">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mb-5 w-full rounded-lg border border-zinc-700 bg-black p-3 text-white"
            >
              {statuses.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <label className="mb-2 block text-sm font-bold">Casting Score</label>
            <input
              value={castingScore}
              onChange={(e) => setCastingScore(e.target.value)}
              className="mb-5 w-full rounded-lg border border-zinc-700 bg-black p-3 text-white"
              placeholder="0-10"
              inputMode="numeric"
            />

            <label className="mb-2 block text-sm font-bold">Producer Notes</label>
            <textarea
              value={producerNotes}
              onChange={(e) => setProducerNotes(e.target.value)}
              className="mb-5 min-h-[200px] w-full rounded-lg border border-zinc-700 bg-black p-3 text-white"
              placeholder="Internal producer notes..."
            />

            <div className="hidden mb-5 space-y-4">

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Producer 1 Rating
                </label>

                <input
                  type="number"
                  min="0"
                  max="10"
                  value={producerOneRating}
                  onChange={(e) =>
                    setProducerOneRating(e.target.value)
                  }
                  className="w-full rounded-lg border border-zinc-700 bg-black p-3 text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Producer 2 Rating
                </label>

                <input
                  type="number"
                  min="0"
                  max="10"
                  value={producerTwoRating}
                  onChange={(e) =>
                    setProducerTwoRating(e.target.value)
                  }
                  className="w-full rounded-lg border border-zinc-700 bg-black p-3 text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Producer 3 Rating
                </label>

                <input
                  type="number"
                  min="0"
                  max="10"
                  value={producerThreeRating}
                  onChange={(e) =>
                    setProducerThreeRating(e.target.value)
                  }
                  className="w-full rounded-lg border border-zinc-700 bg-black p-3 text-white"
                />
              </div>

            </div>


            <div className="hidden mb-5 rounded-xl border border-yellow-500/20 bg-black p-5">
              <h3 className="mb-4 text-lg font-black text-yellow-500">
                Audition Scheduler
              </h3>

              <div className="space-y-4">
                <input
                  type="date"
                  value={auditionDate}
                  onChange={(e) => setAuditionDate(e.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white"
                />

                <input
                  value={auditionTime}
                  onChange={(e) => setAuditionTime(e.target.value)}
                  placeholder="Audition Time"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white"
                />

                <input
                  value={auditionLocation}
                  onChange={(e) => setAuditionLocation(e.target.value)}
                  placeholder="Location or Zoom Link"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white"
                />

                <textarea
                  value={auditionNotes}
                  onChange={(e) => setAuditionNotes(e.target.value)}
                  placeholder="Audition notes..."
                  className="min-h-[100px] w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white"
                />

                <select
                  value={auditionOutcome}
                  onChange={(e) => setAuditionOutcome(e.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white"
                >
                  <option value="Pending">Pending</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="No Show">No Show</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="hidden mb-5 rounded-xl border border-yellow-500/20 bg-black p-5">
              <h3 className="mb-4 text-lg font-black text-yellow-500">
                Producer Voting
              </h3>

              <div className="space-y-4">
                <VoteSelect label="Brandi Vote" value={brandiVote} onChange={setBrandiVote} />
                <VoteSelect label="Rashia Vote" value={rashiaVote} onChange={setRashiaVote} />
                <VoteSelect label="Vlad Vote" value={vladVote} onChange={setVladVote} />

                <div className="rounded-lg bg-yellow-500/10 p-4 text-center">
                  <div className="text-xs uppercase tracking-wider text-yellow-500">
                    Vote Result
                  </div>
                  <div className="mt-2 text-xl font-black text-white">
                    {voteSummary}
                  </div>
                  <div className="mt-1 text-sm text-gray-400">
                    {yesVotes}/3 Yes
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={saveChanges}
              disabled={saving}
              className="w-full rounded-xl bg-yellow-500 px-6 py-4 font-black text-black disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            
            <div className="mt-6 rounded-xl border border-yellow-500/20 bg-black p-5">
              <h3 className="mb-4 text-lg font-black text-yellow-500">
                Producer Quick View
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Candidate ID</span>
                  <span>{applicant.id?.slice(0,8)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Submitted</span>
                  <span>
                    {new Date(applicant.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Photos</span>
                  <span>{applicant.photo_urls?.length || 0}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Instagram</span>
                  <span>{applicant.instagram ? "✓" : "-"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">TikTok</span>
                  <span>{applicant.tiktok ? "✓" : "-"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Facebook</span>
                  <span>{applicant.facebook ? "✓" : "-"}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-yellow-500/20 bg-black p-5">
              <h3 className="mb-4 text-lg font-black text-yellow-500">
                Casting Recommendation
              </h3>

              <div className="space-y-3 text-sm">

                <div className="flex justify-between">
                  <span className="text-gray-400">Story Strength</span>
                  <span>
                    {applicant.fed_up_story ? "High" : "Low"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Photos Submitted</span>
                  <span>
                    {applicant.photo_urls?.length || 0}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Social Presence</span>
                  <span>
                    {(applicant.instagram ||
                      applicant.tiktok ||
                      applicant.facebook)
                      ? "Yes"
                      : "No"}
                  </span>
                </div>

                <div className="mt-4 rounded-lg bg-yellow-500/10 p-3 text-center">
                  <div className="text-xs uppercase tracking-wider text-yellow-500">
                    Recommendation
                  </div>

                  <div className="mt-2 text-lg font-black text-white">
                    Advance To Phone Screen
                  </div>

                  <div className="mt-5 border-t border-yellow-500/20 pt-4">
                    <div className="mb-2 text-sm text-gray-400">
                      Producer Ratings
                    </div>

                    <div className="space-y-2 text-sm">

                      <div className="flex justify-between">
                        <span>Producer 1</span>
                        <span>{producerOne}/10</span>
                      </div>
            <div className="mt-6 rounded-xl border border-yellow-500/20 bg-black p-5">
              <h3 className="mb-4 text-lg font-black text-yellow-500">
                Overall Producer Score
              </h3>

              <div className="text-center">

                <div className="text-4xl md:text-5xl font-black text-yellow-500">
                  {averageProducerScore}
                </div>

                <div className="mt-2 text-sm text-gray-400">
                  Average Rating
                </div>

              </div>
            </div>


                      <div className="flex justify-between">
                        <span>Producer 2</span>
                        <span>{producerTwo}/10</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Producer 3</span>
                        <span>{producerThree}/10</span>
                      </div>

                      <div className="mt-3 flex justify-between border-t border-zinc-800 pt-3 text-base font-black text-yellow-500">
                        <span>Overall Score</span>
                        <span>{averageScore}/10</span>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
</section>

          <section className="space-y-6 lg:col-span-2">
            <Card title="Personal Information">
              <Row label="Prison Name" value={applicant.prison_name} />
              <Row label="Age" value={applicant.age} />
              <Row label="Birthdate" value={applicant.birthdate} />
              <Row label="Address" value={applicant.address} />
              <Row label="Occupation" value={applicant.occupation} />
              <Row label="Children" value={applicant.children} />
              <Row label="Children Count" value={applicant.children_count} />
              <Row
  label="Over 18"
  value={applicant.over_18 ? "Yes" : "No"}
/>
              <Row
  label="Can Travel Orlando"
  value={applicant.can_travel_orlando ? "Yes" : "No"}
/>
            </Card>

            <Card title="Prison Background">
              <Long label="Charges" value={applicant.charges} />
              <Row label="Time Served" value={applicant.time_served} />
              <Row label="Jurisdiction" value={applicant.jurisdiction} />
              <Row label="Prison Story Rating" value={applicant.prison_story_rating} />
            </Card>

            <Card title="Social Media">
              <Row label="Instagram" value={applicant.instagram} />
              <Row label="TikTok" value={applicant.tiktok} />
              <Row label="Facebook" value={applicant.facebook} />
            </Card>

            <Card title="Story Responses">
              <Long label="FEDUP Story" value={applicant.fed_up_story} />
              <Long label="Underestimated Story" value={applicant.underestimated_story} />
              <Long label="Shocking Truth" value={applicant.shocking_truth} />
              <Long label="Confrontation Story" value={applicant.confrontation_story} />
              <Long label="Selection Reason" value={applicant.selection_reason} />
              <Long label="Scroll Stopper Story" value={applicant.scroll_stopper_story} />
            </Card>

            <Card title="Uploaded Media">
              <MediaGallery
                photos={Array.isArray(applicant.photo_urls) ? applicant.photo_urls : []}
                videos={Array.isArray(applicant.video_urls) ? applicant.video_urls : []}
              />
            </Card>

          </section>
        </div>
      </div>
      {selectedMedia && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <img
            src={selectedMedia}
            alt="Selected applicant media"
            className="max-h-[90vh] max-w-[95vw] rounded-2xl object-contain"
          />
        </div>
      )}
    </main>
  );
}

function VoteSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white"
      >
        <option value="Yes">Yes</option>
        <option value="Maybe">Maybe</option>
        <option value="No">No</option>
      </select>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-6">
      <h2 className="mb-5 text-2xl font-black text-yellow-500">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: any }) {
  return (
    <div className="grid gap-2 border-b border-zinc-800 pb-3 md:grid-cols-3">
      <p className="font-bold text-gray-400">{label}</p>
      <p className="md:col-span-2">{value || "-"}</p>
    </div>
  );
}

function Long({ label, value }: { label: string; value: any }) {
  return (
    <div className="border-b border-zinc-800 pb-4">
      <p className="mb-2 font-bold text-gray-400">{label}</p>
      <p className="whitespace-pre-wrap leading-relaxed text-gray-200">{value || "-"}</p>
    </div>
  );
}


function MediaGallery({
  photos,
  videos,
}: {
  photos: string[];
  videos: string[];
}) {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-black text-white">
          Photos ({photos.length})
        </h3>

        {photos.length ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {photos.map((url, index) => (
              <button
                key={url}
                type="button"
                onClick={() => setActivePhoto(url)}
                className="group overflow-hidden rounded-xl border border-yellow-500/20 bg-black"
              >
                <img
                  src={url}
                  alt={`Candidate photo ${index + 1}`}
                  className="h-36 w-full object-cover transition duration-300 group-hover:scale-105 md:h-44"
                />
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No photos uploaded.</p>
        )}
      </div>

      <div>
        <h3 className="mb-4 text-lg font-black text-white">
          Videos ({videos.length})
        </h3>

        {videos.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {videos.map((url) => (
              <video
                key={url}
                src={url}
                controls
                className="w-full rounded-xl border border-yellow-500/20 bg-black"
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No videos uploaded.</p>
        )}
      </div>

      {activePhoto && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setActivePhoto(null)}
        >
          <img
            src={activePhoto}
            alt="Candidate photo preview"
            className="max-h-[90vh] max-w-[95vw] rounded-2xl object-contain"
          />
        </div>
      )}
    </div>
  );
}
