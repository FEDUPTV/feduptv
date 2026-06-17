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

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function loadCities(selectedState: string) {
    const res = await fetch(`/api/cities?state=${encodeURIComponent(selectedState)}`);
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
    fetch("/api/states").then((r) => r.json()).then((d) => setStates(d.states || []));

    if (state) {
      window.setTimeout(() => {
        void loadResources("");
      }, 0);
    }
  }, [loadResources, state]);

  return (
    <main className="cinematic-shell min-h-screen px-5 py-12 text-[#17130e] md:py-20">
      <div className="mx-auto max-w-6xl">
        <section className="mx-auto mb-10 max-w-4xl text-center">
          <p className="fedup-eyebrow mb-5">FEDUP Resource Center</p>
          <h1 className="fedup-title text-5xl md:text-7xl">Find help near you</h1>
          <p className="fedup-body mx-auto mt-6 max-w-3xl text-lg">
            Browse trusted support resources by state, city, and need.
          </p>
        </section>

        <div className="premium-card mx-auto mb-8 max-w-3xl p-6 text-left">
          <h3 className="mb-4 text-xl font-black text-[#E5C76B]">How It Works</h3>
          <div className="grid gap-3 text-[#5c5144] md:grid-cols-3">
            <p><strong className="text-[#17130e]">1.</strong> Select your state and city.</p>
            <p><strong className="text-[#17130e]">2.</strong> Choose the assistance type.</p>
            <p><strong className="text-[#17130e]">3.</strong> Connect directly.</p>
          </div>
        </div>

        <div className="mb-8 text-center">
          <span className="inline-flex border border-[#B9932F]/20 bg-[#fff9ed] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#5c5144]">
            {states.length} States / {HELP_CATEGORIES.length} Categories
          </span>
        </div>

        <div className="premium-card mb-8 p-5 md:p-6">
          <button onClick={useMyLocation} className="premium-button mb-5 w-full rounded-sm px-6 py-4 text-sm">
            Use My Location
          </button>

          <div className="mb-5 text-center text-xs font-black uppercase tracking-[0.28em] text-zinc-500">Or</div>

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
              className="border border-[#B9932F]/20 bg-white p-4 text-[#17130e] outline-none focus:border-[#B9932F]"
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
              className="border border-[#B9932F]/20 bg-white p-4 text-[#17130e] outline-none focus:border-[#B9932F] disabled:opacity-50"
              disabled={!state}
            >
              <option value="">Select City</option>
              {cities.map((item) => (
                <option key={item.city} value={item.city}>{item.city}</option>
              ))}
            </select>
          </div>
        </div>

        {state && (
          <div className="premium-card mb-8 p-5 md:p-6">
            <h2 className="mb-5 text-2xl font-black text-[#17130e]">What do you need help with?</h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {HELP_CATEGORIES.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setCategory(item);
                    loadResources(item);
                  }}
                  className={
                    category === item
                      ? "bg-[#C9A227] p-4 text-left text-sm font-black text-black"
                      : "bg-white p-4 text-left text-sm font-black text-[#17130e] transition hover:bg-[#f1e5d2] hover:text-[#8A6B22]"
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-center text-[#5c5144]">Loading resources...</p>
        ) : searched && resources.length === 0 ? (
          <div className="premium-card p-8 text-center text-[#5c5144]">
            No resources found yet for this search.
          </div>
        ) : resources.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {resources.map((item) => (
              <div key={item.id} className="premium-card p-6">
                <div className="mb-4 inline-flex bg-[#C9A227] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-black">
                  {item.category}
                </div>
                <h2 className="mb-2 text-2xl font-black text-[#17130e]">{item.organization_name}</h2>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#E5C76B]">
                  {item.city ? `${item.city}, ${item.state}` : item.state}
                </p>
                {item.description && <p className="mb-5 leading-7 text-[#5c5144]">{item.description}</p>}

                <div className="space-y-3 text-sm text-[#5c5144]">
                  {item.phone && <p><strong className="text-[#17130e]">Phone:</strong> {item.phone}</p>}
                  {item.address && <p><strong className="text-[#17130e]">Address:</strong> {item.address}</p>}
                  {item.eligibility && <p><strong className="text-[#17130e]">Eligibility:</strong> {item.eligibility}</p>}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  {item.phone && <a href={`tel:${item.phone}`} className="premium-button rounded-sm px-4 py-3 text-xs">Call</a>}
                  {item.website && (
                    <a href={item.website} target="_blank" rel="noopener noreferrer" className="premium-button-secondary rounded-sm px-4 py-3 text-xs">
                      Website
                    </a>
                  )}
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.organization_name)}`} target="_blank" rel="noopener noreferrer" className="rounded-sm border border-[#17130e]/15 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.06em] text-[#5c5144] hover:border-[#B9932F]">
                    Directions
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
