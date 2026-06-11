import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative">
      <Image
        src="/images/fedup_banner.png"
        alt="FEDUP Reality Series"
        width={1600}
        height={900}
        priority
        className="w-full h-auto"
      />

      <div className="border-y border-yellow-500/20 bg-zinc-950 px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-center text-sm font-bold uppercase tracking-[0.22em] text-gray-300 md:text-left">
            Casting now for women ready to be seen, heard, and fed up.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
            <Link
              href="/apply"
              className="rounded-full bg-yellow-500 px-6 py-3 text-center font-black text-black"
            >
              Apply Now
            </Link>
            <Link
              href="/audition"
              className="rounded-full border border-yellow-500 px-6 py-3 text-center font-black text-yellow-500"
            >
              Audition Details
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-yellow-500/20" />
    </section>
  );
}
