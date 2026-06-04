export default function AboutShow() {
  return (
    <section
      id="about"
      className="bg-zinc-950 border-y border-yellow-500/10 py-24 px-6"
    >
      <div className="max-w-5xl mx-auto text-center">

        <p className="text-yellow-500 uppercase tracking-[0.3em] font-bold mb-4">
          About FED UP
        </p>

        <h2 className="text-4xl md:text-6xl font-black text-white mb-10">
          More Than A Reality Show
        </h2>

        <div className="space-y-8 text-lg md:text-xl text-gray-300 leading-relaxed">

          <p>
            FED UP follows women who have faced incarceration,
            hardship, loss, betrayal, addiction, and life's toughest
            obstacles—and refused to let their past define their future.
          </p>

          <p>
            This series shines a light on redemption, resilience,
            personal growth, and the journey to rebuild what was lost.
          </p>

          <p>
            These are real stories. Real struggles.
            Real victories.
          </p>

        </div>

      </div>
    </section>
  );
}