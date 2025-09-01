'use client'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart'

export default function MainNav(){
  const count = useCart(s => s.items.reduce((n, i) => n + i.qty, 0))
  return (
    <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-40">
      <div className="container mx-auto p-4 flex items-center gap-6">
        <Link href="/" className="font-semibold">Serene Bathworks</Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/ingredients">Ingredients</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="ml-auto">
          <Link href="/cart" className="relative inline-flex">
            <ShoppingCart />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 text-xs bg-black text-white rounded-full w-5 h-5 grid place-content-center">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
