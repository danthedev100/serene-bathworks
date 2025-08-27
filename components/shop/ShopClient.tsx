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
  const [minPrice, setMinPrice] = React.useState<number | ''>('');
  const [maxPrice, setMaxPrice] = React.useState<number | ''>('');
  const [sort, setSort] =
    React.useState<'name-asc' | 'price-asc' | 'price-desc'>('name-asc');

  const filtered = products.filter((p) => {
    const matchesCat = cat === 'all' || p.category === cat;
    const matchesScent = scent === 'all' || p.scentNotes.includes(scent);
    const hay = (
      p.name +
      ' ' +
      p.tags.join(' ') +
      ' ' +
      p.scentNotes.join(' ')
    ).toLowerCase();
    const matchesQuery = q.trim() === '' || hay.includes(q.toLowerCase());
    const matchesMin = minPrice === '' || p.priceZAR >= Number(minPrice);
    const matchesMax = maxPrice === '' || p.priceZAR <= Number(maxPrice);
    return matchesCat && matchesScent && matchesQuery && matchesMin && matchesMax;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'name-asc') return a.name.localeCompare(b.name);
    if (sort === 'price-asc') return a.priceZAR - b.priceZAR;
    return b.priceZAR - a.priceZAR;
  });

  return (
    <>
      <div className="mb-5 grid gap-3 lg:grid-cols-[1fr_auto_auto_auto] items-center">
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
                cat === c
                  ? 'bg-primary text-white border-primary'
                  : 'border-neutraldark/15 hover:bg-neutraldark/5'
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

        <div className="flex items-center gap-2 md:justify-end flex-wrap">
          <input
            type="number"
            min={0}
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value === '' ? '' : Number(e.target.value))
            }
            placeholder="Min R"
            className="w-24 border rounded-2xl px-3 py-2 text-sm"
          />
          <span className="text-neutraldark/50">—</span>
          <input
            type="number"
            min={0}
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))
            }
            placeholder="Max R"
            className="w-24 border rounded-2xl px-3 py-2 text-sm"
          />
          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value as 'name-asc' | 'price-asc' | 'price-desc')
            }
            className="border rounded-2xl px-3 py-2 text-sm"
          >
            <option value="name-asc">Sort: Name (A→Z)</option>
            <option value="price-asc">Sort: Price (Low→High)</option>
            <option value="price-desc">Sort: Price (High→Low)</option>
          </select>
        </div>
      </div>

      <div className="text-sm text-neutraldark/70 mb-3">
        {filtered.length} result(s)
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
