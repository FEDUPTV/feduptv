const metrics = [
  { number: "01", label: "Complete Application" },
  { number: "02", label: "Share Your Story" },
  { number: "03", label: "Upload Media" },
  { number: "JUL 11", label: "Orlando Audition" },
];

export default function Metrics() {
  return (
    <section className="bg-[#f6f0e6] py-10 md:py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden bg-[#b9932f]/20 px-5 md:grid-cols-4 md:px-0">
        {metrics.map((item) => (
          <div key={item.label} className="bg-[#fff9ed] p-6 text-center md:p-8">
            <div className="text-3xl font-black text-[#C9A227] md:text-5xl">
              {item.number}
            </div>
            <div className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-[#6d5f4e] md:text-sm">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
