// sections/Recommendations.tsx
import { getRecommendations } from './RecommendationsServer'
import RecommendationsClient from '../components/RecommendationsClient'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Recommendations({ limit = 2 }: { limit?: number }) {
  const recommendations = await getRecommendations()
  return (
    <section className="py-16 px-4 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
          Top Recommendations
        </h2>
        <RecommendationsClient recommendations={recommendations.slice(0, limit)} />
        <Link
          href="/recommendations"
          className="mt-6 inline-block text-pink-600 dark:text-pink-400 hover:underline text-base font-semibold transition-colors"
        >
          See All Recommendations →
        </Link>
      </div>
    </section>
  )
}
