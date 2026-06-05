"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaYoutube, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-yellow-500/20 bg-black/95 backdrop-blur-md">
      <nav className="mx-auto flex items-center justify-between px-4 py-3 md:max-w-7xl md:px-6">

        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="FEDUP"
            width={60}
            height={60}
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 font-semibold uppercase text-white">
          <Link href="/">Home</Link>
          <Link href="/apply">Audition</Link>
          <Link href="/sponsors">Sponsors</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href="https://www.facebook.com/FedUpRealitySeries" target="_blank">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com/fedddup_" target="_blank">
            <FaInstagram />
          </a>
          <a href="https://www.youtube.com/@FedUpRealitySeries" target="_blank">
            <FaYoutube />
          </a>

          <Link
            href="/apply"
            className="rounded-full bg-yellow-500 px-6 py-3 font-black text-black"
          >
            Audition
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
        >
          {open ? <FaTimes size={32} /> : <span className="font-black uppercase tracking-wider">Menu</span>}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-yellow-500/20 bg-black">
          <div className="flex flex-col items-center gap-6 py-10 text-xl font-bold text-white">

            <Link href="/" onClick={() => setOpen(false)}>HOME</Link>
            <Link href="/apply" onClick={() => setOpen(false)}>AUDITION</Link>
            <Link href="/sponsors" onClick={() => setOpen(false)}>SPONSORS</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>CONTACT</Link>
            <Link href="/portal" onClick={() => setOpen(false)}>PORTAL</Link>

            <Link
              href="/apply"
              className="mt-4 rounded-full bg-yellow-500 px-8 py-4 font-black text-black"
            >
              START AUDITION
            </Link>

            <div className="mt-4 flex gap-6 text-yellow-500">
              <FaFacebookF size={24} />
              <FaInstagram size={24} />
              <FaYoutube size={24} />
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
