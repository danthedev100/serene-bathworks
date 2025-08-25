import Link from 'next/link';
import { Card, CardBody } from '../ui/Card';
import type { Product } from '@/lib/products';
import { getWhatsAppLink } from '@/lib/products';
export default function ProductCard({ product }: { product: Product }) {
  const img = product.images[0] || '/images/products/placeholder.svg';
  return (
    <Card className="h-full">
      <img src={img} alt={product.name} className="w-full h-56 object-cover rounded-t-2xl" />
      <CardBody>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold">{product.name}</h3>
            <div className="text-neutraldark/70 text-sm">R{product.priceZAR}</div>
          </div>
        </div>
        <div className="mt-2 mb-3">
          {product.badges.map((b) => (
            <span key={b} className="badge">
              {b}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Link
            href={`/shop/${product.slug}`}
            className="inline-flex items-center justify-center rounded-2xl px-4 py-2 border border-neutraldark/15 hover:bg-neutraldark/5 text-sm"
          >
            Details
          </Link>
          <a href={getWhatsAppLink(product, 1)} target="_blank" className="btn-primary text-sm">
            Order on WhatsApp
          </a>
        </div>
      </CardBody>
    </Card>
  );
}
