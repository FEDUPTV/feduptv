"use client";

import { useState } from "react";

const videos = [
  {
    title: "Official Casting Video",
    src: "/images/mainvideo.mov",
  },
  {
    title: "FEDUP Story Trailer",
    src: "/images/mainvideo2.mov",
  },
];

export default function FeaturedTrailer() {
  const [activeVideo, setActiveVideo] = useState(videos[0]);

  return (
    <section className="bg-black py-12 border-t border-yellow-500/20">
      <div className="mx-auto max-w-7xl px-6">

        <p className="mb-4 text-center text-sm font-bold tracking-[0.4em] text-yellow-500">
          WATCH THE MOVEMENT
        </p>

        <h2 className="mb-8 text-center text-4xl md:text-5xl font-black text-white">
          {activeVideo.title}
        </h2>

        <video
          key={activeVideo.src}
          src={activeVideo.src}
          controls
          autoPlay
          playsInline
          className="w-full rounded-2xl border border-yellow-500/20"
        />

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {videos.map((video) => (
            <button
              key={video.src}
              onClick={() => setActiveVideo(video)}
              className={`rounded-xl px-6 py-3 font-bold transition ${
                activeVideo.src === video.src
                  ? "bg-yellow-500 text-black"
                  : "bg-zinc-900 text-white border border-yellow-500/20"
              }`}
            >
              {video.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
