import 'server-only';
import fs from 'fs';
import path from 'path';
import type { Product } from './product-types';

const productsDir = path.join(process.cwd(), 'content', 'products');

export function getAllProducts(): Product[] {
  const files = fs.readdirSync(productsDir).filter((f) => f.endsWith('.json'));
  const items = files.map((file) => {
    const raw = fs.readFileSync(path.join(productsDir, file), 'utf-8');
    const data = JSON.parse(raw) as Product;

    // Defensive normalization if CSV importer used comma strings
    const toArr = (v: unknown) =>
      Array.isArray(v) ? v : String(v ?? '').split(',').map((s) => s.trim()).filter(Boolean);

    (data as any).badges = toArr((data as any).badges);
    (data as any).scentNotes = toArr((data as any).scentNotes);
    (data as any).tags = toArr((data as any).tags);
    (data as any).images = toArr((data as any).images);

    return data;
  });
  return items.sort((a, b) => a.name.localeCompare(b.name));
}

export function getProductBySlug(slug: string): Product | null {
  const all = getAllProducts();
  return all.find((p) => p.slug === slug) ?? null;
}
