'use client'

import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { useState } from 'react'

interface Event {
  _id: string
  title: string
  date: string
  description: any
  image?: {
    asset: {
      url: string
    }
  }
  video?: {
    asset: {
      url: string
    }
  }
}

interface Props {
  events: Event[]
}

export default function EventsClient({ events }: Props) {
  const groupedEvents = events.reduce((groups: Record<string, Event[]>, event) => {
    const date = new Date(event.date)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    if (!groups[key]) groups[key] = []
    groups[key].push(event)
    return groups
  }, {})

  const sortedGroups = Object.entries(groupedEvents).sort((a, b) => (a[0] < b[0] ? 1 : -1))
  const INITIAL_GROUPS = 4
  const [visibleGroups, setVisibleGroups] = useState(INITIAL_GROUPS)

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Events & Activities</h2>
        <div className="space-y-20">
          {sortedGroups.slice(0, visibleGroups).map(([groupKey, groupEvents]) => {
            const [year, month] = groupKey.split('-')
            const groupLabel = new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', {
              month: 'long',
              year: 'numeric'
            })

            return (
              <div key={groupKey}>
                <h3 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-blue-400">{groupLabel}</h3>
                <div className="flex overflow-x-auto gap-6 pb-2 scrollbar-hide">
                  {groupEvents.map((event) => (
                    <div
                      key={event._id}
                      className="min-w-[300px] max-w-xs flex-shrink-0 bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow p-6"
                    >
                      <div className="rounded-lg overflow-hidden mb-4">
                        {event.video?.asset?.url ? (
                          <video
                            src={event.video.asset.url}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                        ) : event.image?.asset?.url ? (
                          <Image
                            src={event.image.asset.url}
                            alt={event.title}
                            width={800}
                            height={400}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                        ) : null}
                      </div>
                      <h4 className="text-xl font-semibold mb-1">{event.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                      <div className="text-gray-700 dark:text-gray-300">
                        <PortableText value={event.description} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {visibleGroups < sortedGroups.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleGroups((prev) => prev + INITIAL_GROUPS)}
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
