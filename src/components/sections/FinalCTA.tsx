import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-32 border-t border-yellow-500/20">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <p className="text-yellow-500 uppercase tracking-[6px] mb-4">
          Ready To Share Your Story?
        </p>

        <h2 className="text-6xl font-black mb-8">
          Your Past Does Not Define You
        </h2>

        <p className="text-xl text-gray-300 mb-12">
          FED UP is seeking powerful women ready to
          inspire, heal, and transform lives through
          their story.
        </p>

        <Link
          href="/apply"
          className="inline-flex bg-yellow-500 text-black font-black px-10 py-5 rounded-full text-lg hover:scale-105 transition"
        >
          APPLY FOR FED UP
        </Link>

      </div>
    </section>
  );
}