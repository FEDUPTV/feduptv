"use client";

import { useState } from "react";

const packages = [
  { name: "Bronze", items: ["Website Recognition", "Social Media Mention", "Sponsor Directory Listing"] },
  { name: "Silver", items: ["Everything in Bronze", "Featured Placement", "Episode Mentions", "Email Newsletter Exposure"] },
  { name: "Gold", items: ["Everything in Silver", "Premium Branding", "Product Placement", "Custom Partnerships"] },
];

const benefits = [
  "Nationwide Exposure",
  "Social Media Promotion",
  "Event Visibility",
  "Community Impact",
  "Product Placement",
  "Custom Opportunities",
];

export default function SponsorsPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="cinematic-shell text-[#17130e]">
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
        <div className="max-w-4xl">
          <p className="fedup-eyebrow mb-5">Brand Partnerships</p>
          <h1 className="fedup-title text-5xl md:text-7xl">Sponsor FEDUP</h1>
          <p className="fedup-body mt-6 text-lg md:text-2xl">
            Align your brand with powerful stories of redemption, transformation, resilience, and second chances.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-16 md:grid-cols-3 md:px-6 md:pb-24">
        {packages.map((item) => (
          <div key={item.name} className="premium-card p-7 md:p-8">
            <h3 className="mb-7 text-4xl font-black text-[#E5C76B]">{item.name}</h3>
            <ul className="space-y-4 text-[#5c5144]">
              {item.items.map((benefit) => <li key={benefit}>{benefit}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="bg-[#fff9ed] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-6">
          <h2 className="fedup-title mb-10 text-center text-4xl md:text-6xl">Why partner with FEDUP?</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {benefits.map((item) => (
              <div key={item} className="bg-white p-6 text-center shadow-[0_14px_32px_rgba(61,45,22,0.1)]">
                <h3 className="text-xl font-black text-[#E5C76B]">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f0e6] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <h2 className="fedup-title mb-12 text-center text-4xl md:text-6xl">Audience Reach</h2>
          <div className="grid gap-8 text-center md:grid-cols-4">
            {[["2M+", "Monthly Views"], ["USA", "Nationwide Reach"], ["REAL", "Authentic Stories"], ["LIVE", "Casting Events"]].map(([number, label]) => (
              <div key={label}>
                <div className="text-5xl font-black text-[#C9A227]">{number}</div>
                <p className="mt-2 text-[#5c5144]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff9ed] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-6">
          <h2 className="fedup-title mb-10 text-center text-4xl md:text-5xl">Request Sponsorship Information</h2>
          {submitted ? (
            <div className="premium-card p-10 text-center">
              <h3 className="text-3xl font-black text-[#E5C76B]">Thank You</h3>
              <p className="mt-4 text-[#5c5144]">We will contact you shortly.</p>
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              {["Company Name", "Contact Name", "Email Address", "Phone Number"].map((placeholder) => (
                <input key={placeholder} placeholder={placeholder} className="w-full border border-[#B9932F]/20 bg-white p-4 text-lg text-[#17130e] outline-none focus:border-[#B9932F]" />
              ))}
              <select className="w-full border border-[#B9932F]/20 bg-white p-4 text-lg text-[#17130e] outline-none focus:border-[#B9932F]">
                <option>Bronze</option>
                <option>Silver</option>
                <option>Gold</option>
                <option>Custom Partnership</option>
              </select>
              <textarea rows={5} placeholder="Tell us about your company..." className="w-full border border-[#B9932F]/20 bg-white p-4 text-lg text-[#17130e] outline-none focus:border-[#B9932F]" />
              <button className="premium-button w-full rounded-sm p-5 text-sm">Request Information</button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
