import type { FedupContentItem } from "../../lib/fedupContent";

export default function JudgeCard({ item }: { item: FedupContentItem }) {
  return (
    <article className="grid gap-5 border-t border-white/10 py-6 md:grid-cols-[180px_1fr] md:items-center">
      <div className="aspect-[4/5] overflow-hidden bg-[#151515]">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title || "FEDUP judge announcement"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-end p-4 text-xs uppercase tracking-[0.28em] text-[#C6A04A]">
            FEDUP
          </div>
        )}
      </div>
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.24em] text-[#C6A04A]">
          {item.subtitle || item.category || "Confirmed Face"}
        </p>
        <h3 className="text-3xl leading-none text-[#F4EFE6] md:text-4xl">
          {item.title}
        </h3>
        {item.handle && <p className="text-sm text-[#D8D2C4]">{item.handle}</p>}
        {item.caption && (
          <p className="max-w-2xl text-sm leading-7 text-[#AFA79A]">
            {item.caption}
          </p>
        )}
        {item.instagramUrl && (
          <a
            href={item.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B45A]"
          >
            View Announcement
          </a>
        )}
      </div>
    </article>
  );
}
