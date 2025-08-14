'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Testimonial {
  _id: string
  name: string
  title: string
  message: string
  avatar?: {
    asset: {
      url: string
    }
  }
}

export default function TestimonialPreview() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    fetch('/api/testimonials') // 👈 Next.js API route to fetch data
      .then((res) => res.json())
      .then(setTestimonials)
      .catch(console.error)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.slice(0, 3).map((t) => (
        <div
          key={t._id}
          className="bg-white/80 dark:bg-gray-800/70 p-6 rounded-2xl shadow-md text-left"
        >
          {t.avatar?.asset?.url && (
            <Image
              src={t.avatar.asset.url}
              alt={t.name}
              width={50}
              height={50}
              className="rounded-full mb-4"
            />
          )}
          <p className="text-gray-700 dark:text-gray-300 italic">"{t.message}"</p>
          <p className="mt-4 font-semibold">{t.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t.title}</p>
        </div>
      ))}
    </div>
  )
}
