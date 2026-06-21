"use client";

import { useEffect } from "react";

export default function SuccessPage() {
  useEffect(() => {
    console.log("APPLICATION SUCCESS PAGE VIEWED");
  }, []);

  return (
    <main className="cinematic-shell min-h-screen text-[#17130e] flex items-center justify-center">
      <div className="premium-card max-w-2xl text-center p-8 md:p-10">
        <p className="fedup-eyebrow mb-4">Casting</p>
        <h1 className="fedup-title text-5xl mb-6">
          Audition Received
        </h1>

        <p className="text-xl text-[#5c5144]">
          Thank you for sharing your story.
        </p>

        <p className="mt-4 text-gray-400">
          Our casting team will review your application.
          Selected applicants will be contacted regarding
          the Orlando audition.
        </p>

      </div>
    </main>
  );
}
