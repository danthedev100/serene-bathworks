import { getAllProducts, getProductBySlug } from '@/lib/products.server';
import OrderPanel from '@/components/pdp/OrderPanel';
import { formatZAR } from '@/lib/format';
import { notFound } from 'next/navigation';

export const dynamic = 'error';

export async function generateStaticParams() {
  const all = getAllProducts();
  return all.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProductBySlug(params.slug);
  if (!p) return {};
  return { title: `${p.name} — Serene Bathworks`, description: p.description };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProductBySlug(params.slug);
  if (!p) return notFound();

  const img = p.images[0] || '/images/products/placeholder.svg';

  return (
    <section className="section">
      <div className="container grid md:grid-cols-2 gap-8">
        <img src={img} alt={p.name} className="rounded-2xl shadow-sm w-full h-auto" />
        <div>
          <h1 className="text-3xl font-semibold">{p.name}</h1>
          <div className="mt-2 text-neutraldark/70">
            {formatZAR(p.priceZAR)} • {p.size}
          </div>

          {p.stock != null && (
            <div className="mt-3 text-sm text-neutraldark/70">
              {p.stock === 0 ? 'Out of stock' : `In stock: ${p.stock}`}
            </div>
          )}

          <p className="mt-4 text-neutraldark/80">{p.description}</p>

          <div className="mt-6">
            <OrderPanel product={p} />
          </div>

          <div className="mt-6 text-sm text-neutraldark/70">
            Scent notes: {p.scentNotes.join(', ')}
          </div>
        </div>
      </div>
    </section>
  );
}
