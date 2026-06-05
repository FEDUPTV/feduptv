const metrics = [
  { number: "USA", label: "Nationwide Casting" },
  { number: "REAL", label: "Stories" },
  { number: "NOW", label: "Accepting Applications" },
  { number: "JULY 11", label: "Orlando Casting Event" },
];

export default function Metrics() {
  return (
    <section className="bg-black py-10 border-t border-yellow-500/20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 text-center md:grid-cols-4">
        {metrics.map((item) => (
          <div key={item.label}>
            <div className="text-3xl font-black text-yellow-500 md:text-5xl">
              {item.number}
            </div>
            <div className="mt-2 text-sm text-gray-300 md:text-base">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
