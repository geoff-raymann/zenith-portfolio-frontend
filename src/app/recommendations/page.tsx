// app/recommendations/page.tsx
import { client } from '@/lib/sanity'
import RecommendationsClient from '@/components/RecommendationsClient'

export const dynamic = 'force-dynamic'

interface Recommendation {
  _id: string
  name: string
  role: string
  company: string
  text: string
}

async function getRecommendations(): Promise<Recommendation[]> {
  const query = `*[_type == "recommendation"]{
    _id,
    name,
    role,
    company,
    text
  }`
  return await client.fetch(query)
}

export default async function RecommendationsPage() {
  const recommendations = await getRecommendations()
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Professional Recommendations</h2>
        <RecommendationsClient recommendations={recommendations} />
      </div>
    </section>
  )
}
