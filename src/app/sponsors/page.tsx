"use client";

import { useState } from "react";

export default function SponsorsPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="bg-black text-white">

      <section className="px-6 py-24 text-center">
        <h1 className="mb-6 text-7xl font-black text-yellow-500">
          SPONSOR FEDUP
        </h1>

        <p className="mx-auto max-w-4xl text-2xl text-gray-300">
          Align your brand with powerful stories of redemption,
          transformation, resilience, and second chances.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-24 md:grid-cols-3">

        <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-8">
          <h3 className="mb-6 text-4xl font-black text-yellow-500">Bronze</h3>

          <ul className="space-y-4 text-lg text-gray-300">
            <li>Website Recognition</li>
            <li>Social Media Mention</li>
            <li>Sponsor Directory Listing</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-yellow-500 bg-zinc-900 p-8">
          <h3 className="mb-6 text-4xl font-black text-yellow-500">Silver</h3>

          <ul className="space-y-4 text-lg text-gray-300">
            <li>Everything in Bronze</li>
            <li>Featured Placement</li>
            <li>Episode Mentions</li>
            <li>Email Newsletter Exposure</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-8">
          <h3 className="mb-6 text-4xl font-black text-yellow-500">Gold</h3>

          <ul className="space-y-4 text-lg text-gray-300">
            <li>Everything in Silver</li>
            <li>Premium Branding</li>
            <li>Product Placement</li>
            <li>Custom Partnerships</li>
          </ul>
        </div>

      </section>

      <section className="bg-zinc-950 py-24">
        <div className="mx-auto max-w-7xl px-6">

          <h2 className="mb-16 text-center text-5xl font-black">
            Why Partner With FEDUP?
          </h2>

          <div className="grid gap-6 md:grid-cols-3">

            {[
              "Nationwide Exposure",
              "Social Media Promotion",
              "Event Visibility",
              "Community Impact",
              "Product Placement",
              "Custom Opportunities",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-yellow-500/20 bg-black p-8 text-center"
              >
                <h3 className="text-2xl font-black text-yellow-500">
                  {item}
                </h3>
              </div>
            ))}

          </div>
        </div>
      </section>

      <section className="bg-black py-24">
        <div className="mx-auto max-w-6xl px-6">

          <h2 className="mb-16 text-center text-5xl font-black">
            Audience Reach
          </h2>

          <div className="grid gap-8 text-center md:grid-cols-4">

            <div>
              <div className="text-5xl font-black text-yellow-500">
                2M+
              </div>
              <p className="mt-2 text-gray-400">
                Monthly Views
              </p>
            </div>

            <div>
              <div className="text-5xl font-black text-yellow-500">
                USA
              </div>
              <p className="mt-2 text-gray-400">
                Nationwide Reach
              </p>
            </div>

            <div>
              <div className="text-5xl font-black text-yellow-500">
                REAL
              </div>
              <p className="mt-2 text-gray-400">
                Authentic Stories
              </p>
            </div>

            <div>
              <div className="text-5xl font-black text-yellow-500">
                LIVE
              </div>
              <p className="mt-2 text-gray-400">
                Casting Events
              </p>
            </div>

          </div>

        </div>
      </section>

      <section className="bg-zinc-950 py-24">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="mb-12 text-center text-5xl font-black">
            Request Sponsorship Information
          </h2>

          {submitted ? (
            <div className="rounded-2xl border border-yellow-500 bg-black p-10 text-center">
              <h3 className="text-3xl font-black text-yellow-500">
                Thank You
              </h3>

              <p className="mt-4 text-gray-300">
                We will contact you shortly.
              </p>
            </div>
          ) : (
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <input
                placeholder="Company Name"
                className="w-full rounded-xl bg-black p-4"
              />

              <input
                placeholder="Contact Name"
                className="w-full rounded-xl bg-black p-4"
              />

              <input
                placeholder="Email Address"
                className="w-full rounded-xl bg-black p-4"
              />

              <input
                placeholder="Phone Number"
                className="w-full rounded-xl bg-black p-4"
              />

              <select className="w-full rounded-xl bg-black p-4">
                <option>Bronze</option>
                <option>Silver</option>
                <option>Gold</option>
                <option>Custom Partnership</option>
              </select>

              <textarea
                rows={5}
                placeholder="Tell us about your company..."
                className="w-full rounded-xl bg-black p-4"
              />

              <button
                className="w-full rounded-xl bg-yellow-500 p-5 font-black text-black"
              >
                REQUEST INFORMATION
              </button>
            </form>
          )}

        </div>
      </section>

    </main>
  );
}
