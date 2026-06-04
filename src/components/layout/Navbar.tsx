import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-yellow-500/20 bg-black/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="FED UP"
            width={70}
            height={70}
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-wide text-white">

          <Link
            href="/"
            className="hover:text-yellow-500 transition"
          >
            Home
          </Link>

          <Link
            href="/apply"
            className="hover:text-yellow-500 transition"
          >
            Apply
          </Link>

          <Link
            href="/sponsors"
            className="hover:text-yellow-500 transition"
          >
            Sponsors
          </Link>

          <Link
            href="/contact"
            className="hover:text-yellow-500 transition"
          >
            Contact
          </Link>

        </div>

        <div className="flex items-center gap-4">

          <div className="hidden md:flex items-center gap-3">

            <a
              href="https://www.facebook.com/FedUpRealitySeries"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-500 transition"
            >
              <FaFacebookF size={18} />
            </a>

            <a
              href="https://www.instagram.com/fedddup_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-500 transition"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="https://www.youtube.com/@FedUpRealitySeries"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-500 transition"
            >
              <FaYoutube size={18} />
            </a>

          </div>

          <Link
            href="/apply"
            className="
              rounded-full
              bg-yellow-500
              px-6
              py-3
              text-sm
              font-black
              uppercase
              text-black
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-[0_0_30px_rgba(212,175,55,.45)]
            "
          >
            Apply Now
          </Link>

        </div>

      </nav>
    </header>
  );
}