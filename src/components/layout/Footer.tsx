import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-yellow-500/20 px-6 py-10 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
        <div>
          
        <img
          src="/images/logo.png"
          alt="FEDUP"
          className="mb-4 h-16 w-auto"
        />

        <h3 className="mb-3 font-black text-yellow-500">
        </h3>
        
          <p className="text-gray-400">
            Females Ending Defeat. Unleashing Purpose.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-bold text-white">Explore</h4>
          <Link href="/" className="block mb-2 text-gray-400 hover:text-yellow-500">Home</Link>
          <Link href="/apply" className="block mb-2 text-gray-400 hover:text-yellow-500">Apply</Link>
          <Link href="/sponsors" className="block mb-2 text-gray-400 hover:text-yellow-500">Sponsors</Link>
        </div>

        <div>
          <h4 className="mb-3 font-bold text-white">Casting</h4>
          <p className="text-gray-400">Orlando, Florida</p>
          <p className="text-gray-400">July 11, 2026</p>
        </div>

        <div>
          <h4 className="mb-3 font-bold text-white">Contact</h4>

          <Link href="/contact" className="block mb-2 text-gray-400 hover:text-yellow-500">
            Contact FEDUP
          </Link>

          <Link href="/portal" className="block text-gray-400 hover:text-yellow-500">
            Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
