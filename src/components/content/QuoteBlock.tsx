import type { FedupContentItem } from "../../lib/fedupContent";

export default function QuoteBlock({ item }: { item: FedupContentItem }) {
  return (
    <figure className="border-l-2 border-[#7A1F24] pl-5 md:pl-8">
      {item.quote && (
        <blockquote className="max-w-4xl text-3xl leading-tight text-[#F4EFE6] md:text-5xl">
          “{item.quote}”
        </blockquote>
      )}
      <figcaption className="mt-5 text-sm uppercase tracking-[0.24em] text-[#AFA79A]">
        {item.title}
        {item.subtitle && (
          <span className="mt-2 block normal-case tracking-[0] text-[#D8D2C4]">
            {item.subtitle}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
