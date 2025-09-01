import { prisma } from "../lib/prisma";

async function main() {
  const salts = await prisma.category.upsert({
    where: { slug: "bath-salts" },
    update: {},
    create: { name: "Bath Salts", slug: "bath-salts" },
  });

  const product = await prisma.product.upsert({
    where: { slug: "bath-salts" },
    update: {},
    create: {
      name: "Bath Salts",
      slug: "bath-salts",
      categoryId: salts.id,
      description: "Mineral-rich bath salts hand-blended with essential oils.",
      images: ["/images/bath-salts-hero.jpg"],
    },
  });

  const scents = ["Rosemary","Rose","Lavender","Eucalyptus","Lemon","Lemongrass"];
  for (const scent of scents) {
    for (const size of ["100g","500g"]) {
      const price = size === "100g" ? 6500 : 25000; // R65 / R250
      await prisma.variant.upsert({
        where: { sku: `SALTS-${size}-${scent}` },
        update: {},
        create: {
          productId: product.id,
          sku: `SALTS-${size}-${scent}`,
          size, scent,
          priceCents: price,
          stock: 10,
          active: true,
          image: `/images/bath-salts-${scent.toLowerCase()}.jpg`,
        },
      });
    }
  }
}

main().then(()=>process.exit(0)).catch(e=>{ console.error(e); process.exit(1); });
