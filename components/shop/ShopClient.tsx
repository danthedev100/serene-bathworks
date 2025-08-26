'use client';

import * as React from 'react';
import type { Product } from '@/lib/product-types';
import ProductCard from '@/components/site/ProductCard';

type Props = { products: Product[] };

export default function ShopClient({ products }: Props) {
  const categories = React.useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ['all', ...Array.from(set)];
  }, [products]);

  const scents = React.useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.scentNotes.forEach((s) => set.add(s)));
    return ['all', ...Array.from(set)];
  }, [products]);

  const [q, setQ] = React.useState('');
  const [cat, setCat] = React.useState<string>('all');
  const [scent, setScent] = React.useState<string>('all');

  const filtered = products.filter((p) => {
    const matchesCat = cat === 'all' || p.category === cat;
    const matchesScent = scent === 'all' || p.scentNotes.includes(scent);
    const hay = (p.name + ' ' + p.tags.join(' ') + ' ' + p.scentNotes.join(' ')).toLowerCase();
    const matchesQuery = q.trim() === '' || hay.includes(q.toLowerCase());
    return matchesCat && matchesScent && matchesQuery;
  });

  return (
    <>
      <div className="mb-5 grid gap-3 md:grid-cols-[1fr_auto_auto] items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, tag, or scent…"
          className="w-full border rounded-2xl px-4 py-2"
        />
        <div className="flex flex-wrap gap-2 md:justify-end">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-2 rounded-2xl text-sm border ${
                cat === c ? 'bg-primary text-white border-primary' : 'border-neutraldark/15 hover:bg-neutraldark/5'
              }`}
            >
              {c === 'all' ? 'All' : c.replace('-', ' ')}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 md:justify-end">
          <label className="text-sm text-neutraldark/70">Scent</label>
          <select
            value={scent}
            onChange={(e) => setScent(e.target.value)}
            className="border rounded-2xl px-3 py-2 text-sm"
          >
            {scents.map((s) => (
              <option key={s} value={s}>
                {s === 'all' ? 'All scents' : s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-sm text-neutraldark/70 mb-3">{filtered.length} result(s)</div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
