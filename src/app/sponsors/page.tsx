export default function SponsorsPage() {
  return (
    <main className="bg-black text-white">

      <section className="py-24 px-6 text-center">
        <h1 className="text-6xl font-black text-yellow-500 mb-6">
          SPONSOR FED UP
        </h1>

        <p className="max-w-3xl mx-auto text-xl text-gray-300">
          Align your brand with powerful stories of redemption,
          transformation, resilience, and second chances.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-8">

          <div className="border border-yellow-500/20 rounded-xl p-8 bg-zinc-900">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">
              Bronze
            </h2>

            <ul className="space-y-3 text-gray-300">
              <li>Website Recognition</li>
              <li>Social Media Mention</li>
              <li>Sponsor Directory Listing</li>
            </ul>
          </div>

          <div className="border border-yellow-500 rounded-xl p-8 bg-zinc-900">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">
              Silver
            </h2>

            <ul className="space-y-3 text-gray-300">
              <li>Everything in Bronze</li>
              <li>Featured Sponsor Placement</li>
              <li>Episode Mentions</li>
              <li>Email Newsletter Exposure</li>
            </ul>
          </div>

          <div className="border border-yellow-500/20 rounded-xl p-8 bg-zinc-900">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">
              Gold
            </h2>

            <ul className="space-y-3 text-gray-300">
              <li>Everything in Silver</li>
              <li>Premium Branding Placement</li>
              <li>Product Placement Opportunities</li>
              <li>Custom Partnership Opportunities</li>
            </ul>
          </div>

        </div>

      </section>

      <section className="text-center py-20 px-6">

        <h2 className="text-4xl font-black mb-6">
          Interested In Sponsoring FED UP?
        </h2>

        <p className="text-gray-400 mb-10">
          Let's discuss partnership opportunities.
        </p>

        <a
          href="mailto:feduptv@yahoo.com"
          className="inline-block bg-yellow-500 text-black font-black px-10 py-5 rounded-full"
        >
          CONTACT US
        </a>

      </section>

    </main>
  );
}