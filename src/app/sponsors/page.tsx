"use client";

import { useState } from "react";

export default function SponsorsPage() {
  const [submitted, setSubmitted] = useState(false);

  const packages = [
    {
      name: "Bronze",
      items: ["Website Recognition", "Social Media Mention", "Sponsor Directory Listing"],
    },
    {
      name: "Silver",
      items: ["Everything in Bronze", "Featured Placement", "Episode Mentions", "Email Newsletter Exposure"],
    },
    {
      name: "Gold",
      items: ["Everything in Silver", "Premium Branding", "Product Placement", "Custom Partnerships"],
    },
  ];

  const benefits = [
    "Nationwide Exposure",
    "Social Media Promotion",
    "Event Visibility",
    "Community Impact",
    "Product Placement",
    "Custom Opportunities",
  ];

  return (
    <main className="bg-black text-white">
      <section className="px-6 py-16 text-center md:py-24">
        <h1 className="mx-auto mb-6 max-w-4xl text-5xl font-black leading-tight text-yellow-500 md:text-7xl">
          Sponsor FEDUP
        </h1>

        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300 md:text-2xl">
          Align your brand with powerful stories of redemption, transformation,
          resilience, and second chances.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-16 md:grid-cols-3 md:pb-24">
        {packages.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl border border-yellow-500/30 bg-zinc-900 p-7 md:p-8"
          >
            <h3 className="mb-6 text-4xl font-black text-yellow-500">
              {item.name}
            </h3>

            <ul className="space-y-4 text-lg text-gray-300">
              {item.items.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="bg-zinc-950 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-10 text-center text-4xl font-black md:text-5xl">
            Why Partner With FEDUP?
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {benefits.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-yellow-500/20 bg-black p-6 text-center"
              >
                <h3 className="text-2xl font-black text-yellow-500">
                  {item}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-4xl font-black md:text-5xl">
            Audience Reach
          </h2>

          <div className="grid gap-10 text-center md:grid-cols-4">
            {[
              ["2M+", "Monthly Views"],
              ["USA", "Nationwide Reach"],
              ["REAL", "Authentic Stories"],
              ["LIVE", "Casting Events"],
            ].map(([number, label]) => (
              <div key={label}>
                <div className="text-5xl font-black text-yellow-500">
                  {number}
                </div>
                <p className="mt-2 text-xl text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-10 text-center text-4xl font-black md:text-5xl">
            Request Sponsorship Information
          </h2>

          {submitted ? (
            <div className="rounded-2xl border border-yellow-500 bg-black p-10 text-center">
              <h3 className="text-3xl font-black text-yellow-500">Thank You</h3>
              <p className="mt-4 text-gray-300">We will contact you shortly.</p>
            </div>
          ) : (
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <input placeholder="Company Name" className="w-full rounded-xl bg-black p-4 text-lg" />
              <input placeholder="Contact Name" className="w-full rounded-xl bg-black p-4 text-lg" />
              <input placeholder="Email Address" className="w-full rounded-xl bg-black p-4 text-lg" />
              <input placeholder="Phone Number" className="w-full rounded-xl bg-black p-4 text-lg" />

              <select className="w-full rounded-xl bg-black p-4 text-lg">
                <option>Bronze</option>
                <option>Silver</option>
                <option>Gold</option>
                <option>Custom Partnership</option>
              </select>

              <textarea
                rows={5}
                placeholder="Tell us about your company..."
                className="w-full rounded-xl bg-black p-4 text-lg"
              />

              <button className="w-full rounded-xl bg-yellow-500 p-5 font-black text-black">
                REQUEST INFORMATION
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
