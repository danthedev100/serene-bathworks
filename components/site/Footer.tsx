import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-neutrallight">
      <div className="container py-8 grid md:grid-cols-3 gap-6 text-sm">
        <div>
          <div className="font-semibold">Serene Bathworks</div>
          <p className="text-neutraldark/70 mt-2">
            Handcrafted bath bombs & mineral-rich salts from Cape Town.
          </p>
        </div>
        <div>
          <div className="font-semibold">Explore</div>
          <ul className="mt-2 space-y-1">
            <li>
              <Link href="/shop" className="hover:underline">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/ingredients" className="hover:underline">
                Ingredients
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Legal</div>
          <ul className="mt-2 space-y-1">
            <li>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-neutraldark/60 py-4">
        © {new Date().getFullYear()} Serene Bathworks
      </div>
    </footer>
  );
}
