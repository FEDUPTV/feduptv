"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Candidate = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  instagram: string | null;
  status: string | null;
  created_at: string | null;
  producer_one_rating?: number | null;
  producer_two_rating?: number | null;
  producer_three_rating?: number | null;
};

const statuses = [
  "All",
  "New",
  "Under Review",
  "Phone Screen",
  "Audition Scheduled",
  "Audition Completed",
  "Selected",
  "Waitlist",
  "Rejected",
];

function avg(applicant: Candidate) {
  return (
    Number(applicant.producer_one_rating || 0) +
    Number(applicant.producer_two_rating || 0) +
    Number(applicant.producer_three_rating || 0)
  ) / 3;
}

export default function CandidatesTable() {
  const [applicants, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    async function loadCandidates() {
      try {
        const response = await fetch("/api/applicants");
        const data = await response.json();
        setCandidates(data.applicants || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCandidates();
  }, []);

  const filteredCandidates = useMemo(() => {
    const results = applicants.filter((applicant) => {
      const fullText = [
        applicant.first_name,
        applicant.last_name,
        applicant.email,
        applicant.phone,
        applicant.instagram,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = fullText.includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || applicant.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    results.sort((a, b) => {
      if (sortBy === "score") return avg(b) - avg(a);

      return (
        new Date(b.created_at || "").getTime() -
        new Date(a.created_at || "").getTime()
      );
    });

    return results;
  }, [applicants, search, statusFilter, sortBy]);

  if (loading) {
    return <div className="rounded-2xl bg-zinc-900 p-8">Loading applicants...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email, phone, Instagram..."
          className="rounded-xl border border-yellow-500/20 bg-zinc-900 p-4 text-white md:col-span-2"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-xl border border-yellow-500/20 bg-zinc-900 p-4 text-white"
        >
          <option value="newest">Newest First</option>
          <option value="score">Highest Score</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-yellow-500/20 bg-zinc-900 p-4 text-white"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-yellow-500/20 bg-zinc-900">
        <div className="border-b border-zinc-800 p-6">
          <h2 className="text-2xl font-black text-yellow-500">
            Candidates ({filteredCandidates.length})
          </h2>
        </div>

        {filteredCandidates.length === 0 ? (
          <div className="p-10 text-gray-400">No applicants found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-zinc-800">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Score</th>
                  <th className="p-4">Submitted</th>
                </tr>
              </thead>

              <tbody>
                {filteredCandidates.map((applicant) => (
                  <tr key={applicant.id} className="border-t border-zinc-800 hover:bg-zinc-800/60">
                    <td className="p-4">
                      <Link href={`/portal/applicant/${applicant.id}`} className="font-bold text-yellow-500 hover:underline">
                        {applicant.first_name || "Unknown"} {applicant.last_name || ""}
                      </Link>
                    </td>
                    <td className="p-4 text-gray-300">{applicant.email || "-"}</td>
                    <td className="p-4 text-gray-300">{applicant.phone || "-"}</td>
                    <td className="p-4">
                      <span className="rounded-full border border-yellow-500/20 bg-black px-3 py-1 text-sm text-yellow-500">
                        {applicant.status || "New"}
                      </span>
                    </td>
                    <td className="p-4 font-black text-yellow-500">{avg(applicant).toFixed(1)}</td>
                    <td className="p-4 text-gray-400">
                      {applicant.created_at ? new Date(applicant.created_at).toLocaleDateString() : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
