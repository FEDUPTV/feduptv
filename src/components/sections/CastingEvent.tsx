export default function CastingEvent() {
  return (
    <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-20 px-6">

      <div className="max-w-6xl mx-auto text-center">

        <p className="uppercase tracking-[0.4em] font-black mb-4">
          LIVE CASTING EVENT
        </p>

        <h2 className="text-5xl md:text-7xl font-black mb-6">
          JULY 11, 2026
        </h2>

        <div className="text-2xl md:text-3xl font-bold mb-4">
          Orlando, Florida
        </div>

        <div className="text-lg mb-8">
          Private Location • Selected Applicants Only
        </div>

        <p className="max-w-3xl mx-auto text-xl mb-10">
          FED UP is now casting women ready to share their story,
          inspire others, and step into their purpose.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">

          <a
            href="/apply"
            className="bg-black text-white px-10 py-5 rounded-full font-black"
          >
            APPLY NOW
          </a>

          <a
            href="https://youtube.com/shorts/T5qM0mBlg7o?feature=share"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-black px-10 py-5 rounded-full font-black"
          >
            WATCH CASTING CALL
          </a>

        </div>

      </div>

    </section>
  );
}
