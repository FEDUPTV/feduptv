import type { FedupContentItem } from "../../lib/fedupContent";
import { FaPlay } from "react-icons/fa";

export default function SocialPostCard({ item }: { item: FedupContentItem }) {
  const linkHref = item.instagramUrl || item.ctaHref;
  const linkLabel = item.ctaLabel || (item.instagramUrl ? "View Post" : "View More");

  return (
    <article className="group bg-[#0F0F10] ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:ring-[#D6B45A]/50">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#151515]">
        {item.videoUrl ? (
          <video
            src={item.videoUrl}
            poster={item.imageUrl}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            muted
            playsInline
            preload="metadata"
          />
        ) : item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title || "FEDUP social post"}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.3em] text-[#C6A04A]">
            FEDUP
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/15 to-transparent" />
        {item.videoUrl && (
          <div className="absolute left-5 top-5 inline-flex items-center gap-3 bg-[#080808]/82 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#F4EFE6] backdrop-blur">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D6B45A] text-[#080808]">
              <FaPlay size={12} />
            </span>
            Reel
          </div>
        )}
        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[#D6B45A]">
            {item.category || "Instagram"}
          </p>
          <h3 className="mt-2 text-2xl leading-none text-[#F4EFE6]">
            {item.title}
          </h3>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#AFA79A]">
          <span>{item.videoUrl ? "Watch clip" : item.category || "Post"}</span>
          {item.handle && <span>{item.handle}</span>}
        </div>
        {item.caption && (
          <p className="line-clamp-3 text-sm leading-6 text-[#AFA79A]">
            {item.caption}
          </p>
        )}
        {linkHref && (
          <a
            href={linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-[#D6B45A] px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#080808] transition hover:bg-[#F4EFE6]"
          >
            {linkLabel}
          </a>
        )}
      </div>
    </article>
  );
}
