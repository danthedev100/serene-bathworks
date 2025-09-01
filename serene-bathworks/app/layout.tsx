// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import MainNav from '@/components/navigation/MainNav'

export const metadata: Metadata = { title: 'Serene Bathworks' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MainNav />
        {children}
      </body>
    </html>
  )
}
