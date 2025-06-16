'use client'
import React, { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'

interface Event {
  _id: string
  title: string
  date: string
  description: string
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      const query = `*[_type == "event"] | order(date desc){
        _id,
        title,
        date,
        description
      }`
      const data = await client.fetch(query)
      setEvents(data)
    }
    fetchEvents()
  }, [])

  return (
    <section className="py-16 px-4 bg-gray-50">
      <h2 className="text-3xl font-semibold mb-8 text-center">Events & Activities</h2>
      <ul className="space-y-6">
        {events.length === 0 && <p>Loading events...</p>}
        {events.map(event => (
          <li key={event._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold">{event.title}</h3>
            <time className="block text-sm text-gray-500 mb-2">
              {new Date(event.date).toLocaleDateString()}
            </time>
            <p className="text-gray-600">{event.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Events

