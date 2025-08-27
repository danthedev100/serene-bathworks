import Link from 'next/link';
import type { Product } from '@/lib/product-types';
import { formatZAR } from '@/lib/format';
import { getWhatsAppLink } from '@/lib/whatsapp';

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const isOOS = typeof product.stock === 'number' && product.stock === 0;
  const img = product.images?.[0] || '/images/products/placeholder.svg';

  return (
    <div className="card relative overflow-hidden">
      {isOOS && (
        <div className="absolute left-3 top-3 rounded-full bg-red-600/90 text-white text-xs px-2 py-1">
          Out of stock
        </div>
      )}

      <Link href={`/shop/${product.slug}`} className="block">
        <img src={img} alt={product.name} className="w-full h-auto" />
      </Link>

      <div className="card-body">
        <Link href={`/shop/${product.slug}`} className="block hover:underline">
          <h3 className="text-lg font-medium">{product.name}</h3>
        </Link>

        <div className="mt-1 text-neutraldark/70 text-sm">
          {formatZAR(product.priceZAR)} • {product.size}
        </div>

        {product.scentNotes?.length ? (
          <div className="mt-2 text-xs text-neutraldark/60">
            {product.scentNotes.join(', ')}
          </div>
        ) : null}

        <div className="mt-4">
          {isOOS ? (
            <div className="text-sm text-red-700/80">Unavailable</div>
          ) : (
            <a
              href={getWhatsAppLink(product, 1)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Order on WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
