'use client';

import * as React from 'react';
import type { Product } from '@/lib/product-types';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function OrderPanel({ product }: { product: Product }) {
  const [qty, setQty] = React.useState(1);

  const inc = () => setQty((q) => Math.min(20, q + 1));
  const dec = () => setQty((q) => Math.max(1, q - 1));

  const href = getWhatsAppLink(product, qty);

  return (
    <div className="flex items-center gap-3">
      <div className="inline-flex items-center border rounded-2xl overflow-hidden">
        <button
          type="button"
          onClick={dec}
          aria-label="Decrease quantity"
          className="px-3 py-2 hover:bg-neutraldark/5"
        >
          −
        </button>
        <input
          inputMode="numeric"
          value={qty}
          onChange={(e) => {
            const n = Number(e.target.value.replace(/\D/g, '') || 1);
            setQty(Math.min(20, Math.max(1, n)));
          }}
          className="w-12 text-center py-2"
        />
        <button
          type="button"
          onClick={inc}
          aria-label="Increase quantity"
          className="px-3 py-2 hover:bg-neutraldark/5"
        >
          +
        </button>
      </div>
      <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary">
        Order on WhatsApp
      </a>
    </div>
  );
}
