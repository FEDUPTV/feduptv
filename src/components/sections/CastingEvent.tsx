import Link from "next/link";

export default function CastingEvent() {
  return (
    <section id="audition-event" className="bg-[#fff9ed] py-16 text-[#17130e] md:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[0.9fr_1.1fr] md:items-center md:px-6">
        <div>
          <p className="fedup-eyebrow mb-4">Live Casting Event</p>
          <h2 className="fedup-title text-5xl md:text-7xl">July 11, 2026</h2>
          <p className="mt-4 text-2xl font-black text-[#E5C76B]">Orlando, Florida</p>
        </div>

        <div className="premium-card p-7 md:p-9">
          <p className="fedup-body text-lg">
            Open casting opportunity for women ready to share their story, inspire others, and step into their purpose.
          </p>
          <Link href="/apply" className="premium-button mt-8 rounded-sm px-8 py-4 text-sm">
            Start Application
          </Link>
        </div>
      </div>
    </section>
  );
}
