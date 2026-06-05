export default function AboutShow() {
  const cards = [
    {
      title: "Real Stories",
      text: "Women sharing authentic experiences of hardship, resilience, and growth.",
    },
    {
      title: "Second Chances",
      text: "A platform for transformation, healing, and reclaiming purpose.",
    },
    {
      title: "Inspiration",
      text: "Stories that empower others facing similar challenges.",
    },
  ];

  return (
    <section className="bg-black py-16">
      <div className="mx-auto max-w-7xl px-6">

        <p className="mb-4 text-center text-sm font-bold tracking-[0.4em] text-yellow-500">
          ABOUT FEDUP
        </p>

        <h2 className="mb-6 text-center text-4xl font-black md:text-4xl md:text-5xl text-white">
          More Than A Reality Show
        </h2>

        <p className="mx-auto mb-12 max-w-4xl text-center text-lg md:text-xl text-gray-300">
          FEDUP follows women who have overcome adversity and are ready to
          inspire others through their journey.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-8 transition hover:border-yellow-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]"
            >
              <h3 className="mb-4 text-2xl font-black text-yellow-500">
                {card.title}
              </h3>

              <p className="text-gray-300">
                {card.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
