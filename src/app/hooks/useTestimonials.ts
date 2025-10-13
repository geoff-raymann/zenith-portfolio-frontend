'use client'
import { useEffect, useState } from 'react'

export interface Testimonial {
  _id: string
  name: string
  role: string
  company?: string
  quote: string
  avatar?: { asset: { url: string } } | null
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(setTestimonials)
      .finally(() => setLoading(false))
  }, [])

  const addTestimonial = async (t: Omit<Testimonial, '_id' | 'avatar'>) => {
    const res = await fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(t),
    })
    const newTestimonial = await res.json()
    setTestimonials(prev => [newTestimonial, ...prev])
  }

  return { testimonials, loading, addTestimonial }
}