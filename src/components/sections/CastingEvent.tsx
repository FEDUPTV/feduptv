import Link from "next/link";

export default function CastingEvent() {
  return (
    <section className="bg-yellow-500 py-20 text-black">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="mb-4 text-sm font-black uppercase tracking-[0.35em]">
          Live Casting Event
        </p>

        <h2 className="mb-4 text-5xl font-black md:text-7xl">
          July 11, 2026
        </h2>

        <h3 className="mb-4 text-3xl font-black">
          Orlando, Florida
        </h3>

        <p className="mb-8 text-lg font-medium leading-relaxed">
          Open casting opportunity for women ready to share their story,
          inspire others, and step into their purpose.
        </p>

        <Link
          href="/apply"
          className="inline-flex rounded-full bg-black px-10 py-4 font-black uppercase text-white transition hover:bg-zinc-900"
        >
          Start Application
        </Link>
      </div>
    </section>
  );
}
