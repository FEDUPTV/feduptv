import Image from "next/image";
import { merchProducts } from "../../components/merch/merchProducts";

const sloganLab = [
  "Females Ending Defeat Unleashing Purpose",
  "From Prison to Purpose",
  "Pain Into Purpose",
  "FEDUP: The Movement",
  "Survival. Redemption. Purpose.",
];

export default function MerchPage() {
  return (
    <main className="cinematic-shell min-h-screen text-[#17130e]">
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="fedup-eyebrow mb-5">Official Store Preview</p>
            <h1 className="fedup-title text-5xl md:text-7xl">FEDUP Merch</h1>
            <p className="fedup-body mt-6 text-xl md:text-2xl">
              Wear the movement. Represent the purpose.
            </p>
          </div>

          <div className="premium-card p-6 md:p-8">
            <p className="text-lg leading-8 text-[#5c5144]">
              Official FEDUP merchandise is coming soon. Products will be fulfilled through a dropshipping partner.
            </p>
            <p className="mt-5 text-sm font-black uppercase tracking-[0.22em] text-[#B9932F]">
              Stripe / Shopify / Printful / Printify ready
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8 md:px-6">
        <div className="premium-card p-5 md:p-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="fedup-eyebrow mb-3">Slogan Lab</p>
              <h2 className="text-2xl font-black md:text-3xl">Design language to test before launch</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {sloganLab.map((slogan) => (
                <span key={slogan} className="bg-[#f1e5d2] px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#5c5144]">
                  {slogan}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-6 md:pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {merchProducts.map((product, index) => (
            <article key={product.sku} className="premium-card group overflow-hidden">
              <div className="relative aspect-[7/5] overflow-hidden bg-[#efe3cf]">
                <Image
                  src={product.image}
                  alt={`${product.name} FEDUP merch mockup`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.025]"
                />
                <div className="absolute left-5 top-5 bg-[#17130e] px-3 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#DCC06A]">
                  Drop 0{index + 1}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-black text-[#17130e]">{product.name}</h2>
                  <span className="text-xl font-black text-[#B9932F]">{product.price}</span>
                </div>

                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#7b6b58]">
                  {product.tone}
                </p>
                <p className="leading-7 text-[#5c5144]">{product.description}</p>

                {product.concepts && (
                  <div className="mt-5 border-t border-[#B9932F]/15 pt-4">
                    <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#B9932F]">
                      Concepts
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.concepts.map((concept) => (
                        <span key={concept} className="bg-white px-3 py-2 text-xs font-bold text-[#5c5144]">
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {product.slogans && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.slogans.map((slogan) => (
                      <span key={slogan} className="border border-[#B9932F]/20 px-3 py-2 text-xs font-bold text-[#5c5144]">
                        {slogan}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-[#5c5144]">
                  <div>
                    <p className="font-black uppercase tracking-[0.16em] text-[#B9932F]">SKU</p>
                    <p className="mt-1 break-words">{product.sku}</p>
                  </div>
                  <div>
                    <p className="font-black uppercase tracking-[0.16em] text-[#B9932F]">Variants</p>
                    <p className="mt-1">{product.variants.map((variant) => variant.label).join(", ")}</p>
                  </div>
                </div>

                <button className="premium-button-secondary mt-6 w-full rounded-sm px-5 py-3 text-xs" disabled>
                  {product.status}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#fff9ed] px-5 py-14 text-center md:px-6 md:py-20">
        <p className="fedup-eyebrow mb-5">Coming Soon</p>
        <h2 className="fedup-title mx-auto max-w-4xl text-4xl md:text-6xl">
          A merch line built for the movement, without checkout until fulfillment is ready.
        </h2>
      </section>
    </main>
  );
}
