import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative">
      <Image
        src="/images/banner.png"
        alt="FEDUP Reality Series"
        width={1600}
        height={900}
        priority
        className="w-full h-auto"
      />

      <div className="border-t border-yellow-500/20" />
    </section>
  );
}