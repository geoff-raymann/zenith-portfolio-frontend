'use client'
import Image from 'next/image'

interface Recommendation {
  _id: string
  name: string
  relationship: string
  recommendation: string
  avatar?: {
    asset: {
      url: string
    }
  }
}

export default function RecommendationsClient({ recommendations }: { recommendations: Recommendation[] }) {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Recommendations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((rec) => (
            <div
              key={rec._id}
              className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-md p-6 text-center flex flex-col items-center space-y-4"
            >
              {rec.avatar?.asset?.url && (
                <Image
                  src={rec.avatar.asset.url}
                  alt={rec.name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              )}
              <p className="text-gray-700 dark:text-gray-300 italic">&ldquo;{rec.recommendation}&rdquo;</p>
              <div>
                <p className="font-semibold">{rec.name}</p>
                <p className="text-sm text-gray-500">{rec.relationship}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
