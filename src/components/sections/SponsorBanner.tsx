export default function SponsorBanner() {
  return (
    <section className="bg-yellow-500 text-black py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">

        <p className="uppercase tracking-[0.3em] font-bold mb-4">
          Sponsorship Opportunities
        </p>

        <h2 className="text-4xl md:text-6xl font-black mb-6">
          Partner With FEDUP
        </h2>

        <p className="max-w-3xl mx-auto text-xl mb-10">
          Connect your brand with powerful stories of redemption,
          transformation, and resilience.
        </p>

        <a
          href="/sponsors"
          className="inline-block bg-black text-white px-10 py-5 rounded-full font-black"
        >
          BECOME A SPONSOR
        </a>

      </div>
    </section>
  );
}