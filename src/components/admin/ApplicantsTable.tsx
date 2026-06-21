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
  age?: number | string | null;
  birthdate?: string | null;
  status: string | null;
  created_at: string | null;
  producer_notes?: string | null;
};

const statuses = [
  "All",
  "Needs Action",
  "New",
  "Under Review",
  "Phone Screen",
  "Audition Scheduled",
  "Audition Completed",
  "Selected",
  "Waitlist",
  "Rejected",
];

const quickStatuses = ["Under Review", "Phone Screen", "Rejected"];
const needsActionStatuses = ["New", "Under Review"];

function csvEscape(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function displayValue(value: unknown) {
  if (value === null || value === undefined || value === "") return "-";
  return String(value);
}

export default function CandidatesTable() {
  const [applicants, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadCandidates() {
      try {
        const response = await fetch("/api/applicants");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to load applicants.");
        }

        setCandidates(data.applicants || []);
      } catch (error) {
        console.error(error);
        setError(error instanceof Error ? error.message : "Unable to load applicants.");
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
      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Needs Action" &&
          needsActionStatuses.includes(applicant.status || "New")) ||
        applicant.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    results.sort((a, b) => {
      if (sortBy === "oldest") {
        return (
          new Date(a.created_at || "").getTime() -
          new Date(b.created_at || "").getTime()
        );
      }

      return (
        new Date(b.created_at || "").getTime() -
        new Date(a.created_at || "").getTime()
      );
    });

    return results;
  }, [applicants, search, statusFilter, sortBy]);

  async function updateStatus(applicant: Candidate, status: string) {
    setUpdatingId(applicant.id);
    setError("");

    try {
      const response = await fetch(`/api/applicants/${applicant.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to update status.");
      }

      setCandidates((current) =>
        current.map((item) =>
          item.id === applicant.id ? { ...item, status } : item
        )
      );
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "Unable to update status.");
    } finally {
      setUpdatingId(null);
    }
  }

  function exportCsv() {
    const rows = [
      ["Name", "Age", "Email", "Phone", "Instagram", "Status", "Submitted", "Producer Notes"],
      ...filteredCandidates.map((applicant) => [
        `${applicant.first_name || ""} ${applicant.last_name || ""}`.trim(),
        displayValue(applicant.age),
        applicant.email || "",
        applicant.phone || "",
        applicant.instagram || "",
        applicant.status || "New",
        applicant.created_at
          ? new Date(applicant.created_at).toLocaleDateString()
          : "",
        applicant.producer_notes || "",
      ]),
    ];

    const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "fedup-applicants.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-yellow-500/10 bg-zinc-950 p-6">
        <div className="mb-5 h-12 animate-pulse rounded-lg bg-zinc-900" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-16 animate-pulse rounded-lg bg-zinc-900" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-yellow-500/15 bg-zinc-950">
      <div className="border-b border-zinc-800 p-5">
        <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-500">
              Candidate Pipeline
            </p>
            <h2 className="mt-1 text-2xl font-black text-white">
            Candidates ({filteredCandidates.length})
            </h2>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => setStatusFilter("Needs Action")}
              className="rounded-lg border border-yellow-500/20 px-3 py-2 text-sm font-bold text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
            >
              Needs Action
            </button>
            <button
              type="button"
              onClick={exportCsv}
              className="rounded-lg bg-yellow-500 px-3 py-2 text-sm font-black text-black transition hover:bg-yellow-400"
            >
              Export CSV
            </button>
            <p className="text-sm text-gray-500">
              {applicants.length} total submissions
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, phone, Instagram..."
            className="rounded-lg border border-zinc-700 bg-black p-3 text-white outline-none transition focus:border-yellow-500 md:col-span-2"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-black p-3 text-white outline-none transition focus:border-yellow-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-black p-3 text-white outline-none transition focus:border-yellow-500"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error ? (
        <div className="p-8 text-red-300">{error}</div>
      ) : filteredCandidates.length === 0 ? (
        <div className="p-8 text-gray-400">No applicants found.</div>
      ) : (
        <>
          <div className="grid gap-3 p-4 md:hidden">
            {filteredCandidates.map((applicant) => (
              <Link
                key={applicant.id}
                href={`/portal/applicant/${applicant.id}`}
                className="rounded-xl border border-zinc-800 bg-black p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-black text-yellow-500">
                      {applicant.first_name || "Unknown"} {applicant.last_name || ""}
                    </p>
                    <p className="mt-1 text-sm text-gray-400">{applicant.email || "-"}</p>
                  </div>
                  <span className="rounded-full border border-yellow-500/20 px-3 py-1 text-xs font-bold text-yellow-500">
                    {applicant.status || "New"}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-400">
                  <div>
                    <p className="text-xs uppercase text-gray-600">Phone</p>
                    <p>{displayValue(applicant.phone)}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-gray-600">Age</p>
                    <p>{displayValue(applicant.age)}</p>
                  </div>
                </div>
                {applicant.producer_notes && (
                  <p className="mt-3 line-clamp-2 text-sm text-gray-500">
                    {applicant.producer_notes}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  {quickStatuses.map((status) => (
                    <button
                      key={status}
                      type="button"
                      disabled={updatingId === applicant.id}
                      onClick={(event) => {
                        event.preventDefault();
                        updateStatus(applicant, status);
                      }}
                      className="rounded-lg border border-zinc-700 px-3 py-2 text-xs font-bold text-gray-300 disabled:opacity-50"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-black text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Age</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Notes</th>
                  <th className="p-4">Submitted</th>
                  <th className="p-4">Quick Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCandidates.map((applicant) => (
                  <tr key={applicant.id} className="border-t border-zinc-800 transition hover:bg-zinc-900">
                    <td className="p-4">
                      <Link href={`/portal/applicant/${applicant.id}`} className="font-bold text-yellow-500 hover:underline">
                        {applicant.first_name || "Unknown"} {applicant.last_name || ""}
                      </Link>
                    </td>
                    <td className="p-4 text-gray-300">{displayValue(applicant.age)}</td>
                    <td className="p-4 text-gray-300">{applicant.email || "-"}</td>
                    <td className="p-4 text-gray-300">{applicant.phone || "-"}</td>
                    <td className="p-4">
                      <span className="rounded-full border border-yellow-500/20 bg-black px-3 py-1 text-xs font-bold text-yellow-500">
                        {applicant.status || "New"}
                      </span>
                    </td>
                    <td className="max-w-[220px] p-4 text-gray-400">
                      <span className="line-clamp-2">
                        {applicant.producer_notes || "-"}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400">
                      {applicant.created_at ? new Date(applicant.created_at).toLocaleDateString() : "-"}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {quickStatuses.map((status) => (
                          <button
                            key={status}
                            type="button"
                            disabled={updatingId === applicant.id}
                            onClick={() => updateStatus(applicant, status)}
                            className="rounded-md border border-zinc-700 px-2 py-1 text-xs font-bold text-gray-300 transition hover:border-yellow-500 hover:text-yellow-500 disabled:opacity-50"
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
