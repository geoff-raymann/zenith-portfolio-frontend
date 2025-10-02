'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Testimonial {
  _id: string
  name: string
  role: string
  company?: string
  quote: string
  avatar?: {
    asset: {
      url: string
    }
  }
}

type Props = {
  testimonials: Testimonial[]
  limit?: number
}

export default function TestimonialsClient({ testimonials, limit = 2 }: Props) {
  const items = testimonials.slice(0, limit)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((t) => (
        <div key={t._id} className="bg-white/80 dark:bg-gray-800/70 p-6 rounded-2xl shadow-md">
          <p className="italic mb-2">"{t.quote}"</p>
          <div className="flex items-center gap-3 mt-4">
            {t.avatar?.asset?.url && (
              <img src={t.avatar.asset.url} alt={t.name} className="w-10 h-10 rounded-full" />
            )}
            <div>
              <div className="font-bold">{t.name}</div>
              <div className="text-xs text-gray-500">{t.role}{t.company ? `, ${t.company}` : ''}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
