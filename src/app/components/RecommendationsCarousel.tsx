'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface Recommendation {
  _id: string
  name: string
  role: string
  company: string
  text: string
  avatar?: {
    asset: {
      url: string
    }
  }
}

type Props = {
  recommendations: Recommendation[]
  interval?: number
}

export default function RecommendationsCarousel({ recommendations, interval = 4000 }: Props) {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const total = recommendations.length

  useEffect(() => {
    if (total <= 1) return
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % total)
    }, interval)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [index, interval, total])

  if (!recommendations.length) return null

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden">
      <div className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${index * 100}%)`,
          width: `${total * 100}%`
        }}>
        {recommendations.map((rec) => (
          <div key={rec._id} className="w-full flex-shrink-0 px-2">
            <div className="bg-white/80 dark:bg-gray-800/70 p-6 rounded-2xl shadow-md h-full flex flex-col justify-between">
              <p className="italic mb-4 text-lg">&quot;{rec.text}&quot;</p>
              <div className="flex items-center gap-3 mt-4">
                {rec.avatar?.asset?.url && (
                  <Image src={rec.avatar.asset.url} alt={rec.name} width={40} height={40} className="rounded-full" />
                )}
                <div>
                  <div className="font-bold">{rec.name}</div>
                  <div className="text-xs text-gray-500">{rec.role}{rec.company ? `, ${rec.company}` : ''}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {recommendations.map((_, i) => (
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
