// lib/products.server.ts
import 'server-only';
import fs from 'fs';
import path from 'path';
import type { Product } from './product-types';

const productsDir = path.join(process.cwd(), 'content', 'products');

export function getAllProducts(): Product[] {
  const files = fs.readdirSync(productsDir).filter((f) => f.endsWith('.json'));

  const items = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(productsDir, file), 'utf-8');
      const data = JSON.parse(raw) as any;

      // normalize possible comma-strings → arrays
      const toArr = (v: unknown) =>
        Array.isArray(v)
          ? v
          : String(v ?? '')
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean);

      const p: Product = {
        id: String(data.id),
        name: String(data.name),
        slug: String(data.slug),
        priceZAR: Number(data.priceZAR ?? 0),
        category: data.category === 'bath-salt' ? 'bath-salt' : 'bath-bomb',
        size: String(data.size ?? ''),
        scentNotes: toArr(data.scentNotes),
        tags: toArr(data.tags),
        images: toArr(data.images),
        description: String(data.description ?? ''),
        whatsappSku: String(data.whatsappSku ?? data.slug),

        // ✅ add these two lines here
        stock: data.stock == null ? null : Math.max(0, Number(data.stock) | 0),
        active: typeof data.active === 'boolean' ? data.active : true,
      };

      return p;
    })
    // hide inactive products by default
    .filter((p) => p.active !== false)
    .sort((a, b) => a.name.localeCompare(b.name));

  return items;
}

export function getProductBySlug(slug: string): Product | null {
  const all = getAllProducts();
  return all.find((p) => p.slug === slug) ?? null;
}
