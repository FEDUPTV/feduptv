const metrics = [
  { number: "USA", label: "Nationwide Casting" },
  { number: "REAL", label: "Stories" },
  { number: "NOW", label: "Auditions Open" },
  { number: "JULY 11", label: "Orlando Event" },
];

export default function Metrics() {
  return (
    <section className="bg-black py-8 border-t border-yellow-500/20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:gap-10 gap-y-10 px-6 text-center md:grid-cols-4">
        {metrics.map((item) => (
          <div key={item.label}>
            <div className="text-4xl font-black text-yellow-500 md:text-4xl md:text-5xl">
              {item.number}
            </div>
            <div className="mt-2 text-base text-gray-300 md:text-lg">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
