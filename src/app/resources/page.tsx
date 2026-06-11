"use client";

import { useCallback, useEffect, useState } from "react";

type Resource = {
  id: string;
  state: string;
  city: string;
  category: string;
  organization_name: string;
  description?: string;
  phone?: string;
  website?: string;
  address?: string;
  eligibility?: string;
  last_verified?: string;
};

type City = {
  city: string;
};

const HELP_CATEGORIES = [
  "Housing",
  "Employment",
  "Food Assistance",
  "Healthcare",
  "Legal Aid",
  "Recovery Programs",
  "Mental Health",
];

const CATEGORY_ICONS: Record<string, string> = {
  Housing: "🏠",
  Employment: "💼",
  "Food Assistance": "🍽",
  Healthcare: "🏥",
  "Legal Aid": "⚖️",
  "Recovery Programs": "💊",
  "Mental Health": "🧠",
};

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);  const [states, setStates] = useState<string[]>([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  
async function loadCities(selectedState: string) {
  const res = await fetch(
    `/api/cities?state=${encodeURIComponent(selectedState)}`
  );

  const data = await res.json();
  setCities(data.cities || []);
}

const loadResources = useCallback(async (nextCategory = category) => {

    if (!state) return;

    setLoading(true);
    setSearched(true);

    const params = new URLSearchParams();
    params.set("state", state);
    if (city) params.set("city", city);
    if (nextCategory) params.set("category", nextCategory);

    const response = await fetch(`/api/resources?${params.toString()}`);
    const data = await response.json();

    setResources(data.resources || []);
    setLoading(false);
  }, [category, city, state]);

  async function useMyLocation() {
    if (!navigator.geolocation) {
      alert("Location is not supported on this device. Please select your state manually.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        alert("Location access received. City auto-detection will be connected in the next update. Please select your state below for now.");
      },
      () => {
        alert("Location access was denied. Please select your state manually.");
      }
    );
  }

  
  useEffect(() => {
    fetch("/api/states").then(r=>r.json()).then(d=>setStates(d.states||[]));


    if (state) {
      window.setTimeout(() => {
        void loadResources("");
      }, 0);
    }
  }, [loadResources, state]);

  return (
    <main className="bg-black px-6 py-6 text-white">
      <div className="mx-auto max-w-6xl text-center">
        <p className="mb-3 text-sm font-black uppercase tracking-[0.35em] text-yellow-500">
          FEDUP Resource Center
        </p>

        <h1 className="mb-2 text-3xl font-black text-yellow-500 md:text-6xl">
          Find Help Near You
        </h1>

        <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-300">
          
        </p>

        <div className="mx-auto mb-6 max-w-3xl rounded-xl border border-yellow-500/20 bg-zinc-900 p-5 text-left">
          <h3 className="mb-3 text-lg font-black text-yellow-500">
            How It Works
          </h3>

          <div className="space-y-2 text-gray-300">
            <p><strong>1.</strong> Select your state and city.</p>
            <p><strong>2.</strong> Choose the type of assistance you need.</p>
            <p><strong>3.</strong> Browse resources and connect directly.</p>
          </div>
        </div>

        
<div className="mb-8 flex justify-center">
  <div className="rounded-full border border-yellow-500/20 bg-zinc-900 px-6 py-3 text-sm font-bold text-gray-300">
    {states.length} States • {HELP_CATEGORIES.length} Categories
  </div>
</div>


          

<div className="mb-8 rounded-xl border border-yellow-500/20 bg-zinc-900 p-4">
          <button
            onClick={useMyLocation}
            className="mb-4 w-full rounded-xl bg-yellow-500 px-6 py-4 font-black text-black"
          >
            📍 Use My Location
          </button>

          <div className="mb-6 text-center font-black text-gray-400">OR</div>

          <div className="grid gap-4 md:grid-cols-2">
            <select
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                loadCities(e.target.value);
                setCity("");
                setCategory("");
                setResources([]);
                setSearched(false);
              }}
              className="rounded-lg border border-zinc-700 bg-black p-4 text-white"
            >
              <option value="">Select State</option>
              {states.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <select
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setCategory("");
              }}
              className="rounded-lg border border-zinc-700 bg-black p-4 text-white"
              disabled={!state}
            >
              <option value="">Select City</option>
              {cities.map((item) => (
                <option
                  key={item.city}
                  value={item.city}
                >
                  {item.city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {state && (
          <div className="mb-8 rounded-xl border border-yellow-500/20 bg-zinc-900 p-4">
            <h2 className="mb-4 text-xl font-black text-white">
              What do you need help with?
            </h2>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {HELP_CATEGORIES.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setCategory(item);
                    loadResources(item);
                  }}
                  className={
                    category === item
                      ? "rounded-lg bg-yellow-500 p-5 text-left font-black text-black"
                      : "rounded-lg border border-yellow-500/20 bg-black p-5 text-left font-black text-white hover:border-yellow-500"
                  }
                >
                  <span className="mr-2 text-2xl">{CATEGORY_ICONS[item]}</span>
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-gray-400">Loading resources...</p>
        ) : searched && resources.length === 0 ? (
          <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-8 text-gray-300">
            No resources found yet for this search.
          </div>
        ) : resources.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {resources.map((item) => (
              <div key={item.id} className="rounded-xl border border-yellow-500/20 bg-zinc-900 p-4">
                <div className="mb-3 inline-block rounded-full bg-yellow-500 px-3 py-1 text-xs font-black uppercase text-black">
                  {item.category}
                </div>

                <h2 className="mb-2 text-xl font-black text-white">
                  {item.organization_name}
                </h2>

                <p className="mb-3 text-xs uppercase tracking-wide text-yellow-500">
                  {item.city ? `${item.city}, ${item.state}` : item.state}
                </p>

                {item.description && <p className="mb-4 leading-relaxed text-gray-300">{item.description}</p>}

                <div className="space-y-3 text-sm text-gray-300">
                  {item.phone && <p><strong>Phone:</strong> {item.phone}</p>}
                  {item.address && <p><strong>Address:</strong> {item.address}</p>}
                  {item.eligibility && <p><strong>Eligibility:</strong> {item.eligibility}</p>}
                  {item.phone && (
  <a
    href={`tel:${item.phone}`}
    className="rounded-lg bg-yellow-500 px-4 py-3 text-center font-bold text-black"
  >
    📞 Call
  </a>
)}

{item.website && (
  <a
    href={item.website}
    target="_blank"
    rel="noopener noreferrer"
    className="block rounded-lg border border-yellow-500 px-4 py-2 text-center font-bold text-yellow-500"
  >
    🌐 Website
  </a>
)}

<a
  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.organization_name)}`}
  target="_blank"
  rel="noopener noreferrer"
  className="block rounded-lg border border-zinc-700 px-4 py-2 text-center font-bold text-white"
>
  📍 Directions
</a>

                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
}
