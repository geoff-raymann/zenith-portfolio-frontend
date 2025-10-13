'use client'
import { useEffect, useState } from 'react'

export interface Recommendation {
  _id: string
  name: string
  role: string
  company: string
  text: string
  avatar?: { asset: { url: string } } | null
}

export function useRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/recommendations')
      .then(res => res.json())
      .then(setRecommendations)
      .finally(() => setLoading(false))
  }, [])

  const addRecommendation = async (rec: Omit<Recommendation, '_id' | 'avatar'>) => {
    const res = await fetch('/api/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rec),
    })
    const newRec = await res.json()
    setRecommendations(prev => [newRec, ...prev])
  }

  return { recommendations, loading, addRecommendation }
}