import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative">

      <Image
        src="/images/banner.png"
        alt="FED UP Reality Series"
        width={1600}
        height={900}
        priority
        className="w-full h-auto"
      />

      <div className="absolute inset-0 flex items-end justify-center pb-10">
        <a
          href="/apply"
          className="bg-yellow-500 text-black font-black px-10 py-5 rounded-full text-lg"
        >
          APPLY NOW
        </a>
      </div>
<a
  href="#"
  className="border border-yellow-500 text-yellow-500 px-10 py-5 rounded-full font-bold"
>
  ▶ WATCH TRAILER
</a>
    </section>
  );
}