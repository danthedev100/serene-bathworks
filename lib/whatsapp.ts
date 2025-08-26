import type { Product } from './product-types';

export function getWhatsAppLink(product: Product, qty: number = 1) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '27000000000';
  const msg = `Order Request: ${product.name} (${product.whatsappSku}) x ${qty}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}
