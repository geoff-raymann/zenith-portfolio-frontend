'use client'

interface Recommendation {
  _id: string
  name: string
  role: string
  company: string
  text: string
}

export default function RecommendationsClient({ recommendations }: { recommendations: Recommendation[] }) {
  const displayLimit = 2 // preview only a few

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {recommendations.slice(0, displayLimit).map((rec) => (
        <div
          key={rec._id}
          className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md p-6 rounded-xl shadow-md"
        >
          <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{rec.text}"</p>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            — <strong>{rec.name}</strong>, {rec.role} at {rec.company}
          </div>
        </div>
      ))}
    </div>
  )
}
