"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaYoutube, FaTimes, FaBars } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/audition", label: "Audition" },
  { href: "/resources", label: "Resources" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080808]/92 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" aria-label="FEDUP home" className="flex items-center gap-3">
          <Image
            src="/images/fedup_logo.png"
            alt="FEDUP"
            width={58}
            height={58}
            priority
            className="h-14 w-14 object-contain"
          />
          <span className="hidden text-xs font-semibold uppercase tracking-[0.32em] text-[#D6B45A] sm:block">
            Reality Series
          </span>
        </Link>

        <div className="hidden items-center gap-7 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[#D8D2C4] md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-[#DCC06A]">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <a href="https://www.facebook.com/FedUpRealitySeries" target="_blank" rel="noopener noreferrer" aria-label="FEDUP Facebook">
            <FaFacebookF className="text-lg text-[#b8aa98] transition hover:text-[#DCC06A]" />
          </a>
          <a href="https://www.instagram.com/fedddup_" target="_blank" rel="noopener noreferrer" aria-label="FEDUP Instagram">
            <FaInstagram className="text-xl text-[#b8aa98] transition hover:text-[#DCC06A]" />
          </a>
          <a href="https://www.youtube.com/@FedUpRealitySeries" target="_blank" rel="noopener noreferrer" aria-label="FEDUP YouTube">
            <FaYoutube className="text-xl text-[#b8aa98] transition hover:text-[#DCC06A]" />
          </a>
          <Link href="/apply" className="fedup-solid-button px-5 py-3 text-xs">
            Apply Now
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="fedup-mobile-menu-button fixed top-5 inline-flex h-11 w-11 items-center justify-center border border-white/10 bg-[#080808]/80 text-[#F4EFE6] md:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-[#080808] md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {[...navLinks, { href: "/apply", label: "Apply Now" }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-4 text-lg uppercase tracking-[0.14em] text-[#F4EFE6]"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-5 py-5 text-[#AFA79A]">
              <a href="https://www.facebook.com/FedUpRealitySeries" target="_blank" rel="noopener noreferrer" aria-label="FEDUP Facebook">
                <FaFacebookF size={20} />
              </a>
              <a href="https://www.instagram.com/fedddup_" target="_blank" rel="noopener noreferrer" aria-label="FEDUP Instagram">
                <FaInstagram size={22} />
              </a>
              <a href="https://www.youtube.com/@FedUpRealitySeries" target="_blank" rel="noopener noreferrer" aria-label="FEDUP YouTube">
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
