"use client";

import { useEffect, useState } from "react";

type Stats = {
  total: number;
  new: number;
  review: number;
  auditions: number;
  selected: number;
  rejected: number;
};

export default function PortalStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/portal/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!stats) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-24 animate-pulse rounded-xl border border-yellow-500/10 bg-zinc-900"
          />
        ))}
      </div>
    );
  }

  const cards = [
    ["Total", stats.total],
    ["New", stats.new],
    ["Review", stats.review],
    ["Auditions", stats.auditions],
    ["Selected", stats.selected],
    ["Rejected", stats.rejected],
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map(([label, value]) => (
        <div
          key={label}
          className="rounded-xl border border-yellow-500/15 bg-zinc-950 p-4"
        >
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
            {label}
          </p>
          <p className="mt-2 text-3xl font-black text-yellow-500">{value}</p>
        </div>
      ))}
    </div>
  );
}
