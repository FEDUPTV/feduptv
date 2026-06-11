export default function CastingCall() {
  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">

          <p className="text-yellow-500 uppercase tracking-[0.3em] font-bold mb-4">
            Now Casting
          </p>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Who We&apos;re Looking For
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We are looking for powerful women whose stories deserve to be heard.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {[
            "Formerly incarcerated women",
            "Mothers rebuilding their lives",
            "Women overcoming addiction",
            "Women fighting for their families",
            "Entrepreneurs and business owners",
            "Women creating a second chance",
            "Women with powerful redemption stories",
            "Women ready to inspire others",
          ].map((item) => (
            <div
              key={item}
              className="border border-yellow-500/20 bg-zinc-900 rounded-xl p-6 text-lg"
            >
              ✓ {item}
            </div>
          ))}

        </div>

        <div className="text-center mt-16">

          <a
            href="/apply"
            className="inline-block bg-yellow-500 text-black font-black px-10 py-5 rounded-full text-lg"
          >
            APPLY TO BE CAST
          </a>

        </div>

      </div>
    </section>
  );
}
