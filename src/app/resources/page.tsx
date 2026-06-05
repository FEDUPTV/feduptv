"use client";

import { useEffect, useMemo, useState } from "react";

type Resource = {
  id: string;
  state: string;
  county: string;
  category: string;
  organization_name: string;
  description?: string;
  phone?: string;
  website?: string;
  address?: string;
  eligibility?: string;
  last_verified?: string;
};

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [state, setState] = useState("");
  const [county, setCounty] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
const [locationEnabled, setLocationEnabled] = useState(false);

  useEffect(() => {
    async function loadResources() {
      setLoading(true);

      const params = new URLSearchParams();

      if (state) params.set("state", state);
      if (county) params.set("county", county);
      if (category) params.set("category", category);

      const response = await fetch(`/api/resources?${params.toString()}`);
      const data = await response.json();

      setResources(data.resources || []);
      setLoading(false);
    }

    loadResources();
  }, [state, county, category]);

  const states = useMemo(
    () => [...new Set(resources.map((item) => item.state))].sort(),
    [resources]
  );

  const counties = useMemo(
    () =>
      [
        ...new Set(
          resources
            .filter((item) => !state || item.state === state)
            .map((item) => item.county)
        ),
      ].sort(),
    [resources, state]
  );

  const categories = useMemo(
    () =>
      [
        ...new Set(
          resources
            .filter((item) => !state || item.state === state)
            .filter((item) => !county || item.county === county)
            .map((item) => item.category)
        ),
      ].sort(),
    [resources, state, county]
  );

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-sm font-black uppercase tracking-[0.35em] text-yellow-500">
          FEDUP Resource Center
        </p>

        <h1 className="mb-6 text-4xl font-black text-yellow-500 md:text-6xl">
          Reentry Resources
        </h1>

        <p className="mb-10 max-w-3xl text-lg leading-relaxed text-gray-300">
          Find support by state, county, and need. This resource center is built
          for women coming home from jail, prison, halfway houses, treatment
          programs, or reentry situations.
        </p>

        <div className="mb-10 grid gap-4 rounded-2xl border border-yellow-500/20 bg-zinc-900 p-6 md:grid-cols-3">
          <select
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              setCounty("");
              setCategory("");
            }}
            className="rounded-lg border border-zinc-700 bg-black p-4 text-white"
          >
            <option value="">All States</option>
            {states.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={county}
            onChange={(e) => {
              setCounty(e.target.value);
              setCategory("");
            }}
            className="rounded-lg border border-zinc-700 bg-black p-4 text-white"
          >
            <option value="">All Counties</option>
            {counties.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-black p-4 text-white"
          >
            <option value="">All Help Categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading resources...</p>
        ) : resources.length === 0 ? (
          <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-8 text-gray-300">
            No resources found yet for this search.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {resources.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-6"
              >
                <div className="mb-3 inline-block rounded-full bg-yellow-500 px-3 py-1 text-xs font-black uppercase text-black">
                  {item.category}
                </div>

                <h2 className="mb-2 text-2xl font-black text-white">
                  {item.organization_name}
                </h2>

                <p className="mb-4 text-sm text-yellow-500">
                  {item.county}, {item.state}
                </p>

                {item.description && (
                  <p className="mb-4 leading-relaxed text-gray-300">
                    {item.description}
                  </p>
                )}

                <div className="space-y-2 text-sm text-gray-300">
                  {item.phone && <p><strong>Phone:</strong> {item.phone}</p>}
                  {item.address && <p><strong>Address:</strong> {item.address}</p>}
                  {item.eligibility && <p><strong>Eligibility:</strong> {item.eligibility}</p>}
                  {item.website && (
                    <p>
                      <strong>Website:</strong>{" "}
                      <a
                        href={item.website}
                        target="_blank"
                        className="text-yellow-500 underline"
                      >
                        Visit Resource
                      </a>
                    </p>
                  )}
                </div>

                {item.last_verified && (
                  <p className="mt-4 text-xs text-gray-500">
                    Last verified: {item.last_verified}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
