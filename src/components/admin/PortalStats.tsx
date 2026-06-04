"use client";

import { useEffect, useState } from "react";

type Stats = {
  total: number;
  new: number;
  review: number;
  auditions: number;
  selected: number;
  rejected: number;
  averageScore: string;
};

export default function PortalStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/portal/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!stats) return null;

  const cards = [
    ["Total", stats.total],
    ["New", stats.new],
    ["Review", stats.review],
    ["Auditions", stats.auditions],
    ["Selected", stats.selected],
    ["Rejected", stats.rejected],
    ["Avg Score", stats.averageScore],
  ];

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-3 xl:grid-cols-7">
      {cards.map(([label, value]) => (
        <div key={label} className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-5 shadow-xl">
          <p className="text-sm uppercase tracking-wide text-gray-400">{label}</p>
          <p className="mt-2 text-3xl font-black text-yellow-500">{value}</p>
        </div>
      ))}
    </div>
  );
}
