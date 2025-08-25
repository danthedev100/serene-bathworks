import { getAllProducts } from '@/lib/products';
import ProductCard from '@/components/site/ProductCard';
export const metadata = { title: 'Shop — Serene Bathworks' };
export default function ShopPage() {
  const products = getAllProducts();
  return (
    <section className="section">
      <div className="container">
        <h1 className="text-3xl font-semibold mb-6">Shop</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
