"use client";

import { useState } from "react";

const videos = [
  { title: "Official Casting Call", src: "/images/mainvideo.mov" },
  { title: "FEDUP Mentioned", src: "/images/mainvideo2.mov" },
];

export default function FeaturedVideo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeVideo = videos[activeIndex];

  return (
    <section className="bg-[#f6f0e6] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="mb-9 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="fedup-eyebrow mb-4">Watch The Movement</p>
            <h2 className="fedup-title text-4xl md:text-6xl">{activeVideo.title}</h2>
          </div>
          <p className="fedup-body max-w-2xl md:justify-self-end">
            Preview the voice, tension, and purpose behind FEDUP through casting footage and media moments.
          </p>
        </div>

        <div className="premium-card p-2">
          <video
            key={activeVideo.src}
            src={activeVideo.src}
            controls
            muted
            playsInline
            preload="metadata"
            onEnded={() => setActiveIndex((prev) => (prev + 1) % videos.length)}
            className="aspect-video w-full bg-[#120f0b] object-cover"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {videos.map((video, index) => (
            <button
              key={video.src}
              onClick={() => setActiveIndex(index)}
              className={
                activeIndex === index
                  ? "premium-button rounded-sm px-5 py-3 text-xs"
                  : "premium-button-secondary rounded-sm px-5 py-3 text-xs"
              }
            >
              {video.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
