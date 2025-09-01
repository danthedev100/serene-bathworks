// app/shop/page.tsx
import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/shop/ProductCard'

export const revalidate = 30

export default async function ShopPage() {
  const products = await prisma.product.findMany({ include: { variants: true }, orderBy: { createdAt: 'desc' } })
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </main>
  )
}
