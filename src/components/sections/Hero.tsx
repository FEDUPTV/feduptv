import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="theme-dark relative overflow-hidden bg-[#17130e]">
      <div className="relative min-h-[72vh] overflow-hidden md:min-h-[82vh]">
        <Image
          src="/images/fedup_banner.png"
          alt="FEDUP Reality Series"
          fill
          priority
          sizes="100vw"
          className="hero-image object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#17130e] via-[#17130e]/62 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17130e] via-transparent to-[#17130e]/36" />

        <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-7xl items-end px-5 pb-12 pt-24 md:min-h-[82vh] md:px-6 md:pb-16">
          <div className="max-w-3xl">
            <p className="fedup-eyebrow mb-5">Casting Now</p>
            <h1 className="fedup-title text-5xl md:text-7xl lg:text-8xl">
              Raw stories. Polished for prime time.
            </h1>
            <p className="fedup-body mt-6 max-w-2xl text-base md:text-xl">
              FEDUP follows women who have lived through defeat, rebuilt with purpose, and are ready for the camera to meet the truth.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/apply" className="premium-button rounded-sm px-8 py-4 text-sm">
                Apply Now
              </Link>
              <Link href="/audition" className="premium-button-secondary rounded-sm px-8 py-4 text-sm">
                Audition Details
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-y border-[#f7efe2]/10 bg-[#211c15]/92 px-5 py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm uppercase tracking-[0.18em] text-[#cdbfaa] md:flex-row md:items-center md:justify-between">
          <span>Females Ending Defeat. Unleashing Purpose.</span>
          <span className="text-[#E5C76B]">Orlando Audition - July 11, 2026</span>
        </div>
      </div>
    </section>
  );
}
