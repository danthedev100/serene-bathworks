export type Product = {
  id: string;
  name: string;
  slug: string;
  priceZAR: number;
  category: 'bath-bomb' | 'bath-salt'| 'shower-steamer';
  size: string;
  badges: string[];
  scentNotes: string[];
  tags: string[];
  images: string[];
  description: string;
  whatsappSku: string;
};
