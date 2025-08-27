// lib/product-types.ts
export type Product = {
  id: string;
  name: string;
  slug: string;
  priceZAR: number;
  category: 'bath-bomb' | 'bath-salt';
  size: string;
  scentNotes: string[];
  tags: string[];
  images: string[];
  description: string;
  whatsappSku: string;

  // New optional fields:
  stock?: number | null;   // null/undefined => not tracked
  active?: boolean;        // undefined => treated as active/visible
};
