import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#f6f0e6] py-16 text-[#17130e] md:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A227]/60 to-transparent" />
      <div className="mx-auto max-w-5xl px-5 text-center md:px-6">
        <p className="fedup-eyebrow mb-5">Ready To Share Your Story?</p>
        <h2 className="fedup-title text-4xl md:text-7xl">Your past does not define you</h2>
        <p className="fedup-body mx-auto mt-6 max-w-3xl text-lg md:text-xl">
          FEDUP is seeking powerful women ready to inspire others and step into purpose.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/apply" className="premium-button rounded-sm px-10 py-5 text-sm">
            Submit Your Story
          </Link>
          <Link href="/contact" className="premium-button-secondary rounded-sm px-10 py-5 text-sm">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
