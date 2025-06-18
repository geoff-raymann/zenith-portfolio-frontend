'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Event {
  _id: string
  title: string
  date: string
  description: string
  image?: { asset: { url: string } }
  video?: { asset: { url: string } }
}

interface Props {
  events: Event[]
}

export default function EventsClient({ events }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [autoScrollIndex, setAutoScrollIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!containerRef.current) return
      const container = containerRef.current
      const scrollAmount = container.scrollWidth / events.length
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })

      setAutoScrollIndex((i) => (i + 1) % events.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [events.length])

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -400, behavior: 'smooth' })
  }

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 400, behavior: 'smooth' })
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black relative">
      <h2 className="text-4xl font-bold text-center mb-12">Events & Activities</h2>

      {/* Arrows */}
      <button
        onClick={scrollLeft}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/70 backdrop-blur-md p-2 rounded-full shadow-md hover:scale-110 transition"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/70 backdrop-blur-md p-2 rounded-full shadow-md hover:scale-110 transition"
      >
        <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-200" />
      </button>

      <div
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 scroll-smooth px-4 pb-4 scrollbar-hide"
      >
        {events.map((event) => (
          <div
            key={event._id}
            className="min-w-[300px] max-w-[350px] bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow p-4 snap-start flex-shrink-0"
          >
            <div className="mb-3 rounded-lg overflow-hidden h-48">
              {event.video?.asset?.url ? (
                <video
                  src={event.video.asset.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : event.image?.asset?.url ? (
                <Image
                  src={event.image.asset.url}
                  alt={event.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
