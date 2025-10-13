'use client'

import { useEffect, useRef, useState } from 'react'
import { Testimonial } from '../hooks/useTestimonials'

type Props = {
  testimonials: Testimonial[]
  interval?: number
}

export default function TestimonialsCarousel({ testimonials, interval = 4000 }: Props) {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const total = testimonials.length

  useEffect(() => {
    if (total <= 1) return
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % total)
    }, interval)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [index, interval, total])

  if (!testimonials.length) return null

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden">
      <div className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${index * 100}%)`,
          width: `${total * 100}%`
        }}>
        {testimonials.map((t) => (
          <div key={t._id} className="w-full flex-shrink-0 px-2">
            <div className="bg-white/80 dark:bg-gray-800/70 p-6 rounded-2xl shadow-md h-full flex flex-col justify-between">
              <p className="italic mb-4 text-lg">"{t.quote}"</p>
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
          </div>
        ))}
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full ${i === index ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
