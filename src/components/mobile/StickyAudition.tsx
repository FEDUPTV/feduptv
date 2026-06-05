"use client";

import Link from "next/link";

export default function StickyAudition() {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 md:hidden">
      <Link
        href="/apply"
        className="w-full max-w-sm rounded-full bg-yellow-500 py-4 text-center font-black uppercase text-black shadow-xl"
      >
        Start Audition
      </Link>
    </div>
  );
}
