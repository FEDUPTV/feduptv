const metrics = [
  { number: "1", label: "Complete Application" },
  { number: "2", label: "Share Your Story" },
  { number: "3", label: "Upload Media" },
  { number: "JULY 11", label: "Orlando Audition" },
];

export default function Metrics() {
  return (
    <section className="bg-black py-8 border-t border-yellow-500/20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 text-center md:grid-cols-4">
        {metrics.map((item) => (
          <div key={item.label}>
            <div className="text-4xl font-black text-yellow-500 md:text-5xl">
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
