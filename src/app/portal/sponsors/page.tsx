"use client";

import { useEffect, useState } from "react";

type Sponsor = {
  id: string;
  company: string | null;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  package: string | null;
  revenue: number | null;
  status: string | null;
  website_listing: string | null;
};

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [form, setForm] = useState({
    company: "",
    contact_name: "",
    email: "",
    phone: "",
    package: "",
    revenue: "",
    status: "Lead",
    website_listing: "",
    notes: "",
  });

  async function loadSponsors() {
    const response = await fetch("/api/sponsors");
    const data = await response.json();
    setSponsors(data.sponsors || []);
  }

  useEffect(() => {
    loadSponsors();
  }, []);

  async function addSponsor() {
    const response = await fetch("/api/sponsors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      setForm({
        company: "",
        contact_name: "",
        email: "",
        phone: "",
        package: "",
        revenue: "",
        status: "Lead",
        website_listing: "",
        notes: "",
      });
      loadSponsors();
    } else {
      alert("Failed to add sponsor.");
    }
  }

  return (
    <main className="min-h-screen bg-black p-6 text-white md:p-10">
      <h1 className="mb-8 text-5xl font-black text-yellow-500">
        Sponsor CRM
      </h1>

      <div className="mb-8 rounded-2xl border border-yellow-500/20 bg-zinc-900 p-6">
        <h2 className="mb-5 text-2xl font-black text-yellow-500">
          Add Sponsor
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {Object.keys(form).map((key) => (
            <input
              key={key}
              value={(form as any)[key]}
              onChange={(e) =>
                setForm({
                  ...form,
                  [key]: e.target.value,
                })
              }
              placeholder={key.replace("_", " ").toUpperCase()}
              className="rounded-xl border border-zinc-700 bg-black p-4 text-white"
            />
          ))}
        </div>

        <button
          onClick={addSponsor}
          className="mt-5 rounded-xl bg-yellow-500 px-8 py-4 font-black text-black"
        >
          Add Sponsor
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-yellow-500/20 bg-zinc-900">
        <div className="border-b border-zinc-800 p-6">
          <h2 className="text-2xl font-black text-yellow-500">
            Sponsors ({sponsors.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-zinc-800">
              <tr>
                <th className="p-4">Company</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Email</th>
                <th className="p-4">Package</th>
                <th className="p-4">Revenue</th>
                <th className="p-4">Status</th>
                <th className="p-4">Website Listing</th>
              </tr>
            </thead>

            <tbody>
              {sponsors.map((sponsor) => (
                <tr key={sponsor.id} className="border-t border-zinc-800">
                  <td className="p-4">{sponsor.company || "-"}</td>
                  <td className="p-4">{sponsor.contact_name || "-"}</td>
                  <td className="p-4">{sponsor.email || "-"}</td>
                  <td className="p-4">{sponsor.package || "-"}</td>
                  <td className="p-4">${sponsor.revenue || 0}</td>
                  <td className="p-4">{sponsor.status || "Lead"}</td>
                  <td className="p-4">{sponsor.website_listing || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
