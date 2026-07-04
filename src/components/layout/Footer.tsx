import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/audition", label: "Audition" },
  { href: "/resources", label: "Resources" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/portal", label: "Portal" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080808] text-[#F4EFE6]">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr] md:px-6">
        <div>
          <Image
            src="/images/fedup_logo.png"
            alt="FEDUP"
            width={64}
            height={64}
            className="mb-4 h-16 w-16 object-contain"
          />
          <p className="max-w-sm text-sm leading-7 text-[#D8D2C4]">
            Raw stories. Real women. Real purpose. A premium reality series
            built around truth, survival, consequence, and redemption.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#D6B45A]">
            Network
          </h3>
          <div className="grid gap-3 text-sm text-[#AFA79A]">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-[#F4EFE6]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#D6B45A]">
            Casting
          </h3>
          <div className="space-y-2 text-sm leading-6 text-[#AFA79A]">
            <p>Orlando, Florida</p>
            <p>July 11, 2026</p>
            <Link href="/apply" className="text-[#D6B45A] transition hover:text-[#F4EFE6]">
              Apply Now
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#D6B45A]">
            Social
          </h3>
          <div className="flex gap-4 text-[#AFA79A]">
            <a href="https://www.instagram.com/fedddup_" target="_blank" rel="noopener noreferrer" aria-label="FEDUP Instagram" className="transition hover:text-[#D6B45A]">
              <FaInstagram size={22} />
            </a>
            <a href="https://www.facebook.com/FedUpRealitySeries" target="_blank" rel="noopener noreferrer" aria-label="FEDUP Facebook" className="transition hover:text-[#D6B45A]">
              <FaFacebookF size={20} />
            </a>
            <a href="https://www.youtube.com/@FedUpRealitySeries" target="_blank" rel="noopener noreferrer" aria-label="FEDUP YouTube" className="transition hover:text-[#D6B45A]">
              <FaYoutube size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-4 text-center text-xs leading-6 text-[#AFA79A]">
        <p>(c) 2026 FEDUP Reality Series. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
