import fs from 'fs';
import path from 'path';
export type Product = {
  id: string;
  name: string;
  slug: string;
  priceZAR: number;
  category: 'bath-bomb' | 'bath-salt';
  size: string;
  badges: string[];
  scentNotes: string[];
  tags: string[];
  images: string[];
  description: string;
  whatsappSku: string;
};
const productsDir = path.join(process.cwd(), 'content', 'products');
export function getAllProducts(): Product[] {
  const files = fs.readdirSync(productsDir).filter((f) => f.endsWith('.json'));
  const items = files.map((file) => {
    const raw = fs.readFileSync(path.join(productsDir, file), 'utf-8');
    const data = JSON.parse(raw);
    ['badges', 'scentNotes', 'tags', 'images'].forEach((k) => {
      if (typeof (data as any)[k] === 'string')
        (data as any)[k] = (data as any)[k]
          .split(',')
          .map((s: string) => s.trim())
          .filter(Boolean);
      if (!Array.isArray((data as any)[k])) (data as any)[k] = [];
    });
    return data as Product;
  });
  return items.sort((a, b) => a.name.localeCompare(b.name));
}
export function getProductBySlug(slug: string): Product | null {
  const all = getAllProducts();
  return all.find((p) => p.slug === slug) ?? null;
}
export function getWhatsAppLink(product: Product, qty: number = 1): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '27000000000';
  const msg = `Order Request: ${product.name} (${product.whatsappSku}) x ${qty}`;
  const encoded = encodeURIComponent(msg);
  return `https://wa.me/${phone}?text=${encoded}`;
}
