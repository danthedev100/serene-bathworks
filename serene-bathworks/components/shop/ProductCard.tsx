// components/shop/ProductCard.tsx
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

function fromCents(c:number){ return (c/100).toFixed(2) }

export default function ProductCard({ product }: { product: any }) {
  const active = product.variants.filter((v: any) => v.active)
  const from = Math.min(...active.map((v: any) => v.priceCents))
  return (
    <Card className="hover:shadow-lg transition">
      <Link href={`/product/${product.slug}`}>
        <img src={product.images?.[0] || '/placeholder.jpg'} alt={product.name} className="w-full h-64 object-cover"/>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{product.name}</h3>
            <Badge>from R {fromCents(from)}</Badge>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
