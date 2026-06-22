import Link from "next/link";

export default function MerchPage() {
  return (
    <main className="min-h-screen bg-[#080808] px-5 py-20 text-[#F4EFE6] md:px-6 md:py-28">
      <section className="mx-auto max-w-4xl">
        <p className="fedup-kicker">Merch</p>
        <h1 className="mt-4 text-5xl leading-[0.95] md:text-7xl">
          Official FEDUP merchandise is not public yet.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#AFA79A]">
          The store is being held until fulfillment, payments, and launch
          operations are ready. For now, casting and story submissions remain
          the priority.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/apply" className="fedup-solid-button">
            Apply Now
          </Link>
          <Link href="/" className="fedup-ghost-button">
            Back Home
          </Link>
        </div>
      </section>
    </main>
  );
}
