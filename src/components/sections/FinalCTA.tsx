import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-black py-24 text-white">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.18),transparent_60%)]" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">

        <p className="mb-4 text-sm font-black uppercase tracking-[0.4em] text-yellow-500">
          READY TO SHARE YOUR STORY?
        </p>

        <h2 className="mb-8 text-5xl font-black md:text-7xl">
          Your Past Does Not Define You
        </h2>

        <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-300">
          FEDUP is seeking powerful women ready to inspire others and step into purpose.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/apply"
            className="rounded-full bg-yellow-500 px-12 py-5 font-black text-black shadow-[0_0_40px_rgba(234,179,8,0.35)]"
          >
            SUBMIT YOUR STORY
          </Link>

          <Link
            href="/contact"
            className="rounded-full border border-yellow-500 px-12 py-5 font-black text-yellow-500"
          >
            CONTACT US
          </Link>
        </div>

      </div>
    </section>
  );
}
