import Counter from "../animations/Counter";

export default function Metrics() {
  return (
    <section className="bg-black border-y border-yellow-500/20 py-20">

      <div className="max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-10 text-center">

          <div>
            <h3 className="text-5xl font-black text-yellow-500">
              <Counter end={2137482} />
            </h3>
            <p className="text-gray-400 mt-2">
              Monthly Views
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-black text-yellow-500">
              USA
            </h3>
            <p className="text-gray-400 mt-2">
              Nationwide Casting
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-black text-yellow-500">
              REAL
            </h3>
            <p className="text-gray-400 mt-2">
              Stories
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-black text-yellow-500">
              NOW
            </h3>
            <p className="text-gray-400 mt-2">
              Casting
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
