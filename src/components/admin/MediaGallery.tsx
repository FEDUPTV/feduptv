"use client";

import { useState } from "react";

export default function MediaGallery({
  photos,
  videos,
}: {
  photos: string[];
  videos: string[];
}) {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-black text-white">Photos ({photos.length})</h3>
        {photos.length ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {photos.map((url, index) => (
              <button
                key={url}
                type="button"
                onClick={() => setActivePhoto(url)}
                className="group overflow-hidden rounded-xl border border-yellow-500/20 bg-black"
              >
                <img
                  src={url}
                  alt={`Applicant photo ${index + 1}`}
                  className="h-36 w-full object-cover transition duration-300 group-hover:scale-105 md:h-44"
                />
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No photos uploaded.</p>
        )}
      </div>

      <div>
        <h3 className="mb-4 text-lg font-black text-white">Videos ({videos.length})</h3>
        {videos.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {videos.map((url) => (
              <video key={url} src={url} controls className="w-full rounded-xl border border-yellow-500/20 bg-black" />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No videos uploaded.</p>
        )}
      </div>

      {activePhoto && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setActivePhoto(null)}
        >
          <img
            src={activePhoto}
            alt="Applicant preview"
            className="max-h-[90vh] max-w-[95vw] rounded-2xl object-contain"
          />
        </div>
      )}
    </div>
  );
}
