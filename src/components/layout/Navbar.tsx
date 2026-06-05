"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-yellow-500/20 bg-black/95 backdrop-blur-md">

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="FEDUP"
            width={60}
            height={60}
            priority
            style={{ height: "auto" }}
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-wide text-white">

          <Link href="/" className="hover:text-yellow-500">
            Home
          </Link>

          <Link href="/apply" className="hover:text-yellow-500">
            Audition
          </Link>

          <Link href="/sponsors" className="hover:text-yellow-500">
            Sponsors
          </Link>

          <Link href="/contact" className="hover:text-yellow-500">
            Contact
          </Link>

          <Link href="/portal" className="hover:text-yellow-500">
            Portal
          </Link>

        </div>

        <div className="flex items-center gap-4">

          <div className="hidden md:flex items-center gap-3">

            <a
              href="https://www.facebook.com/FedUpRealitySeries"
              target="_blank"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/fedddup_"
              target="_blank"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.youtube.com/@FedUpRealitySeries"
              target="_blank"
            >
              <FaYoutube />
            </a>

          </div>

          <Link
            href="/apply"
            className="rounded-full bg-yellow-500 px-5 py-2 font-black text-black"
          >
            Audition
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white text-2xl"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>

        </div>

      </nav>

      {open && (
        <div className="md:hidden border-t border-yellow-500/20 bg-black">

          <div className="flex flex-col p-4 text-center text-base font-bold uppercase text-white">

            <Link
              href="/"
              className="py-3 text-white hover:text-yellow-500 transition"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/apply"
              className="py-3 text-white hover:text-yellow-500 transition"
              onClick={() => setOpen(false)}
            >
              Audition
            </Link>

            <Link
              href="/sponsors"
              className="py-3 text-white hover:text-yellow-500 transition"
              onClick={() => setOpen(false)}
            >
              Sponsors
            </Link>

            <Link
              href="/contact"
              className="py-3 text-white hover:text-yellow-500 transition"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>

            <Link
              href="/portal"
              className="py-3 text-white hover:text-yellow-500 transition"
              onClick={() => setOpen(false)}
            >
              Portal
            </Link>

            <div className="mt-6 flex justify-center gap-6 text-2xl text-yellow-500">

              <a href="https://www.facebook.com/FedUpRealitySeries">
                <FaFacebookF />
              </a>

              <a href="https://www.instagram.com/fedddup_">
                <FaInstagram />
              </a>

              <a href="https://www.youtube.com/@FedUpRealitySeries">
                <FaYoutube />
              </a>

            </div>

          </div>

        </div>
      )}

    </header>
  );
}