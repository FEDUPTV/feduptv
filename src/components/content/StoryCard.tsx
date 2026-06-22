import type { FedupContentItem } from "../../lib/fedupContent";

function Media({ item }: { item: FedupContentItem }) {
  if (item.videoUrl) {
    return (
      <video
        className="h-full w-full object-cover"
        src={item.videoUrl}
        poster={item.imageUrl}
        muted
        playsInline
        controls
      />
    );
  }

  if (item.imageUrl) {
    return (
      <img
        src={item.imageUrl}
        alt={item.title || item.handle || "FEDUP story"}
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-full min-h-72 items-end bg-[#111] p-5 text-[#C6A04A]">
      <span className="text-xs font-semibold uppercase tracking-[0.28em]">
        FEDUP
      </span>
    </div>
  );
}

export default function StoryCard({ item }: { item: FedupContentItem }) {
  return (
    <article className="group overflow-hidden bg-[#101010]">
      <div className="aspect-[4/5] overflow-hidden bg-[#111]">
        <Media item={item} />
      </div>
      <div className="space-y-4 p-5 md:p-6">
        <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.2em] text-[#AFA79A]">
          <span>{item.handle || item.title || "FEDUP Story"}</span>
          {item.category && <span className="text-[#C6A04A]">{item.category}</span>}
        </div>
        {item.title && (
          <h3 className="text-2xl leading-tight text-[#F4EFE6]">
            {item.title}
          </h3>
        )}
        {item.quote && (
          <p className="text-xl leading-tight text-[#D8D2C4] md:text-2xl">
            “{item.quote}”
          </p>
        )}
        {item.caption && (
          <p className="line-clamp-4 text-sm leading-6 text-[#AFA79A]">
            {item.caption}
          </p>
        )}
        {item.instagramUrl && (
          <a
            href={item.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B45A] transition hover:text-[#F4EFE6]"
          >
            View on Instagram
          </a>
        )}
      </div>
    </article>
  );
}
