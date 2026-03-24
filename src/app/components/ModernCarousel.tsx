'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type CarouselItem = {
  _id: string
  name: string
  role: string
  company?: string
  text?: string // for recommendations
  quote?: string // for testimonials
  avatar?: { asset: { url: string } } | null
}

type Props = {
  items: CarouselItem[]
  interval?: number
  title?: string
  colorFrom?: string
  colorTo?: string
}

export default function ModernCarousel({
  items,
  interval = 4000,
  title,
  colorFrom = 'from-blue-100',
  colorTo = 'to-purple-100',
}: Props) {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const total = items.length

  useEffect(() => {
    if (total <= 1) return
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % total)
    }, interval)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [index, interval, total])

  if (!items.length) return null

  return (
    <section className="w-full flex flex-col items-center">
      {title && (
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
          {title}
        </h2>
      )}
      <div className="relative w-full max-w-xl mx-auto overflow-visible">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${index * 100}%)`,
            width: `${total * 100}%`,
          }}
        >
          {items.map((item) => (
            <div
              key={item._id}
              className="w-full flex-shrink-0 px-2 md:px-4"
              style={{ minWidth: 0 }}
            >
              <div
                className={`bg-gradient-to-br ${colorFrom} ${colorTo} dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl h-full flex flex-col justify-between border border-gray-200 dark:border-gray-700`}
              >
                <p className="italic mb-6 text-lg md:text-xl text-gray-800 dark:text-gray-100 break-words">
                  &quot;{item.text || item.quote}&quot;
                </p>
                <div className="flex items-center gap-4 mt-4">
                  {item.avatar?.asset?.url && (
                    <Image
                      src={item.avatar.asset.url}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover border-2 border-blue-400 shadow"
                    />
                  )}
                  <div>
                    <div className="font-bold text-base md:text-lg text-gray-900 dark:text-gray-100">{item.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {item.role}
                      {item.company ? `, ${item.company}` : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {items.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full border-2 border-blue-400 transition-all duration-200 ${
                i === index
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125 shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}