import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-yellow-500/20 bg-black text-white">

      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-8">
          <Image
            src="/images/logo.png"
            alt="FEDUP"
            width={60}
            height={60}
          />

          <p className="mt-4 text-gray-400">
            Females Ending Defeat. Unleashing Purpose.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8 text-sm">

          <div>
            <h3 className="mb-4 font-bold text-white">Explore</h3>

            <div className="space-y-3">
              <Link href="/">Home</Link><br />
              <Link href="/apply">Audition</Link><br />
              <Link href="/sponsors">Sponsors</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-bold text-white">Casting</h3>

            <div className="space-y-3 text-gray-400">
              <p>Orlando, Florida</p>
              <p>July 11, 2026</p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-bold text-white">Contact</h3>

            <div className="space-y-3">
              <Link href="/contact">Contact FEDUP</Link><br />
              <Link href="/portal">Portal</Link>
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-yellow-500/20 pt-6 text-center text-sm text-gray-500">
          <p>© 2026 FEDUP Reality Series. All Rights Reserved.</p>

          <p className="mt-2">
            Website Designed & Managed by
            {" "}
            <a
              href="https://visionstampabay.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:underline"
            >
              Visionstampabay.com
            </a>
          </p>
        </div>

      </div>

    </footer>
  );
}
