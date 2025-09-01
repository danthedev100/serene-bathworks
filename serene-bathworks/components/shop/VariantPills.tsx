// components/shop/VariantPills.tsx
'use client'
import { cn } from '@/lib/utils'

export function VariantPills({ options, value, onChange }:{
  options: string[]; value?: string; onChange: (v:string)=>void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button key={opt} onClick={() => onChange(opt)}
          className={cn('px-3 py-1 rounded border', value === opt ? 'bg-black text-white' : 'bg-white')}>
          {opt}
        </button>
      ))}
    </div>
  )
}
