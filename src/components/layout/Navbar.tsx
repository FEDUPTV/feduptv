"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaYoutube, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-yellow-500/20 bg-black/95 backdrop-blur-md">
      <nav className="mx-auto flex items-center justify-between px-4 py-3 md:max-w-7xl md:px-6">
        <Link href="/">
          <Image
            src="/images/fedup_logo.png"
            alt="FEDUP"
            width={60}
            height={60}
            priority
            style={{ width: "60px", height: "60px" }}
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 font-semibold uppercase text-white">
          <Link href="/">Home</Link>

          <Link href="/audition">Audition</Link>

          <Link href="/resources">Resources</Link>
          <Link href="/sponsors">Sponsors</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://www.facebook.com/FedUpRealitySeries"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="text-[#1877F2] text-xl hover:scale-110 transition-all" />
          </a>

          <a
            href="https://www.instagram.com/fedddup_"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-[#E4405F] text-xl hover:scale-110 transition-all" />
          </a>

          <a
            href="https://www.youtube.com/@FedUpRealitySeries"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="text-[#FF0000] text-xl hover:scale-110 transition-all" />
          </a>

          <Link
            href="/apply"
            className="rounded-full bg-yellow-500 px-6 py-3 font-black text-black"
          >
            Apply Now
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
        >
          {open ? (
            <FaTimes size={30} />
          ) : (
            <span className="font-black uppercase tracking-wider">Menu</span>
          )}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-yellow-500/20 bg-black">
          <div className="flex flex-col items-center gap-6 py-10 text-xl font-bold text-white">
            <Link href="/" onClick={() => setOpen(false)}>
              HOME
            </Link>

            <Link href="/apply" onClick={() => setOpen(false)}>
              APPLY NOW
            </Link>

            <Link href="/audition" onClick={() => setOpen(false)}>
              AUDITION DETAILS
            </Link>

            <Link href="/resources" onClick={() => setOpen(false)}>
              RESOURCES
            </Link>

            <Link href="/sponsors" onClick={() => setOpen(false)}>
              SPONSORS
            </Link>

            <Link href="/contact" onClick={() => setOpen(false)}>
              CONTACT
            </Link>

            <Link href="/portal" onClick={() => setOpen(false)}>
              PORTAL
            </Link>

            <div className="mt-4 flex gap-6">
              <FaFacebookF className="text-[#1877F2]" size={24} />
              <FaInstagram className="text-[#E4405F]" size={24} />
              <FaYoutube className="text-[#FF0000]" size={24} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
