import { getAllProducts } from '@/lib/products.server';
import ShopClient from '@/components/shop/ShopClient';

export const metadata = { title: 'Shop — Serene Bathworks' };

export default function ShopPage() {
  const products = getAllProducts(); // runs on the server
  return (
    <section className="section">
      <div className="container">
        <h1 className="text-3xl font-semibold mb-6">Shop</h1>
        <ShopClient products={products} /> {/* client-side filtering */}
      </div>
    </section>
  );
}
