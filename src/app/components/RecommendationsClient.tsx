'use client'

import React from 'react'

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

type RecommendationsClientProps = {
  recommendations: Recommendation[]
}

export default function RecommendationsClient({ recommendations }: RecommendationsClientProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {recommendations.map((rec) => (
        <div key={rec._id} className="bg-white/80 dark:bg-gray-800/70 p-6 rounded-2xl shadow-md">
          <p className="italic mb-2">"{rec.text}"</p>
          <div className="flex items-center gap-3 mt-4">
            {rec.avatar?.asset?.url && (
              <img src={rec.avatar.asset.url} alt={rec.name} className="w-10 h-10 rounded-full" />
            )}
            <div>
              <div className="font-bold">{rec.name}</div>
              <div className="text-xs text-gray-500">{rec.role}{rec.company ? `, ${rec.company}` : ''}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
