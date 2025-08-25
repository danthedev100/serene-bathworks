import { getAllProducts, getProductBySlug, getWhatsAppLink } from '@/lib/products';
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
            R{p.priceZAR} • {p.size}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.badges.map((b) => (
              <span key={b} className="badge">
                {b}
              </span>
            ))}
          </div>
          <p className="mt-4 text-neutraldark/80">{p.description}</p>
          <div className="mt-6 flex gap-3">
            <a href={getWhatsAppLink(p, 1)} target="_blank" className="btn-primary">
              Order on WhatsApp
            </a>
          </div>
          <div className="mt-6 text-sm text-neutraldark/70">
            Scent notes: {p.scentNotes.join(', ')}
          </div>
        </div>
      </div>
    </section>
  );
}
