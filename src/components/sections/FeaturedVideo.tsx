"use client";

import { useState } from "react";

const videos = [
  {
    title: "Official Casting Call",
    src: "/images/mainvideo.mov",
  },
  {
    title: "FEDUP Mentioned",
    src: "/images/mainvideo2.mov",
  },
];

export default function FeaturedVideo() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextVideo = () => {
    setActiveIndex((prev) => (prev + 1) % videos.length);
  };

  const activeVideo = videos[activeIndex];

  return (
    <section className="bg-black py-10 border-t border-yellow-500/20">
      <div className="mx-auto max-w-7xl px-6">

        <p className="mb-4 text-center text-sm font-bold tracking-[0.4em] text-yellow-500">
          WATCH THE MOVEMENT
        </p>

        <h2 className="mb-6 text-center text-4xl md:text-5xl font-black text-white">
          {activeVideo.title}
        </h2>

        <video
          key={activeVideo.src}
          src={activeVideo.src}
          controls
          muted
          playsInline
          preload="metadata"
          onEnded={nextVideo}
          className="w-full rounded-xl md:rounded-2xl border border-yellow-500/20"
        />

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {videos.map((video, index) => (
            <button
              key={video.src}
              onClick={() => setActiveIndex(index)}
              className={
                activeIndex === index
                  ? "rounded-xl px-6 py-3 font-bold bg-yellow-500 text-black"
                  : "rounded-xl px-6 py-3 font-bold border border-yellow-500/20 bg-zinc-900 text-white"
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
