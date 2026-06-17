const cards = [
  {
    title: "Real Stories",
    text: "Women sharing authentic experiences of hardship, resilience, conflict, and growth.",
  },
  {
    title: "Second Chances",
    text: "A platform for transformation, healing, accountability, and reclaiming purpose.",
  },
  {
    title: "Cultural Impact",
    text: "Reality storytelling built to move audiences beyond spectacle and into purpose.",
  },
];

export default function AboutShow() {
  return (
    <section className="bg-[#fff9ed] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="mb-12 max-w-4xl">
          <p className="fedup-eyebrow mb-4">About FEDUP</p>
          <h2 className="fedup-title text-4xl md:text-6xl">More than a reality show</h2>
          <p className="fedup-body mt-5 text-lg md:text-xl">
            FEDUP follows women who have overcome adversity and are ready to inspire others through a journey that is raw, layered, and made for premium documentary television.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <div key={card.title} className="premium-card p-7 md:p-8">
              <h3 className="mb-4 text-2xl font-black text-[#E5C76B]">{card.title}</h3>
              <p className="leading-7 text-[#5c5144]">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
