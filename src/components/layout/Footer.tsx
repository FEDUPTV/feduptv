import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/apply", label: "Apply" },
  { href: "/audition", label: "Audition" },
  { href: "/resources", label: "Resources" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/merch", label: "Merch" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#17130e] text-[#f7efe2]">
      <div className="cinematic-rule" />

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-6 md:py-16">
        <div>
          <Image
            src="/images/fedup_logo.png"
            alt="FEDUP"
            width={68}
            height={68}
            className="mb-5 h-[68px] w-[68px]"
          />
          <p className="max-w-sm text-sm leading-7 text-[#cdbfaa]">
            Females Ending Defeat. Unleashing Purpose. Premium reality storytelling rooted in truth, resilience, and second chances.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-[#E5C76B]">
            Explore
          </h3>
          <div className="grid gap-3 text-sm text-zinc-400">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-[#E5C76B]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-[#E5C76B]">
            Casting
          </h3>
          <div className="space-y-3 text-sm leading-6 text-zinc-400">
            <p>Orlando, Florida</p>
            <p>July 11, 2026</p>
            <Link href="/portal" className="text-[#E5C76B] transition hover:text-white">
              Producer Portal
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-xs leading-6 text-zinc-500">
        <p>(c) 2026 FEDUP Reality Series. All Rights Reserved.</p>
        <p>
          Website Designed & Managed by{" "}
          <a href="https://visionstampabay.com" target="_blank" rel="noopener noreferrer" className="text-[#C9A227] hover:text-[#E5C76B]">
            VisionsTampaBay.com
          </a>
        </p>
      </div>
    </footer>
  );
}
