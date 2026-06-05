import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-yellow-500/20 bg-black text-white">

      <div className="mx-auto max-w-7xl px-5 py-10">

        <div className="grid grid-cols-3 gap-6 text-center md:text-left">

          <div>
            <Image
              src="/images/logo.png"
              alt="FEDUP"
              width={60}
              height={60}
              style={{ width: "60px", height: "60px" }}
              className="mx-auto md:mx-0 mb-4"
            />

            <p className="text-sm text-gray-400">
              Females Ending Defeat.
              <br />
              Unleashing Purpose.
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-bold text-white">
              Explore
            </h3>

            <div className="space-y-2 text-gray-400 text-sm">
              <Link href="/">Home</Link><br />
              <Link href="/apply">Audition</Link><br />
              <Link href="/sponsors">Sponsors</Link><br />
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-bold text-white">
              Casting
            </h3>

            <div className="space-y-2 text-gray-400 text-sm">
              <p>Orlando, Florida</p>
              <p>July 11, 2026</p>
              <Link href="/portal">Portal</Link>
            </div>
          </div>

        </div>

      </div>

      <div className="border-t border-yellow-500/10 py-4 text-center text-xs text-gray-500">
        © 2026 FEDUP Reality Series. All Rights Reserved.
        <br />
        Website Designed & Managed by
        <a
          href="https://visionstampabay.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 text-yellow-500 hover:text-yellow-400"
        >
          VisionsTampaBay.com
        </a>
      </div>

    </footer>
  );
}
