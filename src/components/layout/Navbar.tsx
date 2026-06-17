"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaYoutube, FaTimes } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/audition", label: "Audition" },
  { href: "/resources", label: "Resources" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/merch", label: "Merch" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#f7efe2]/10 bg-[#17130e]/92 shadow-[0_16px_45px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" aria-label="FEDUP home" className="flex items-center gap-3">
          <Image
            src="/images/fedup_logo.png"
            alt="FEDUP"
            width={58}
            height={58}
            priority
            className="h-14 w-14"
          />
          <span className="hidden text-xs font-black uppercase tracking-[0.32em] text-[#E5C76B] sm:block">
            FEDUP
          </span>
        </Link>

        <div className="hidden items-center gap-7 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-zinc-300 md:flex">
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
          <Link href="/apply" className="premium-button rounded-sm px-5 py-3 text-xs">
            Apply Now
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-sm border border-[#f7efe2]/10 px-4 py-3 text-sm font-black uppercase tracking-[0.22em] text-[#f7efe2] md:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? <FaTimes size={18} /> : "Menu"}
        </button>
      </nav>

      {open && (
        <div className="border-t border-[#f7efe2]/10 bg-[#17130e] md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {[...navLinks, { href: "/apply", label: "Apply Now" }, { href: "/portal", label: "Portal" }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-[#f7efe2]/10 py-4 text-lg font-black uppercase tracking-[0.14em] text-[#f7efe2]"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-5 py-5 text-zinc-400">
              <FaFacebookF size={20} />
              <FaInstagram size={22} />
              <FaYoutube size={24} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
