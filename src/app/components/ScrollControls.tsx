'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'

export default function ScrollControls({ targetId }: { targetId: string }) {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const scroll = (dir: 'left' | 'right') => {
    const el = document.getElementById(targetId)
    if (el) {
      const scrollAmount = dir === 'left' ? -300 : 300
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="flex justify-end items-center gap-2 mt-2 mb-6">
      <button
        onClick={() => scroll('left')}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        aria-label="Scroll left"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={() => scroll('right')}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        aria-label="Scroll right"
      >
        <ChevronRight />
      </button>
    </div>
  )
}
