export default function WhyApply() {
  const benefits = [
    "Share Your Story",
    "Be Seen & Heard",
    "Inspire Other Women",
    "Join A Supportive Community",
    "Turn Pain Into Purpose",
    "Potential National Exposure",
  ];

  return (
    <section className="py-16 md:py-24 border-t border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-yellow-500 uppercase tracking-[6px] text-center mb-4">
          Why Apply
        </p>

        <h2 className="text-4xl md:text-5xl font-black text-center mb-12">
          Your Story Matters
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((item) => (
            <div
              key={item}
              className="bg-zinc-900 border border-yellow-500/20 rounded-2xl p-8"
            >
              <p className="text-xl font-semibold">
                ✓ {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
