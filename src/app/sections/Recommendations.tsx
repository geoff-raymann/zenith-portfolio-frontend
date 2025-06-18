// sections/Recommendations.tsx
import { client } from '@/lib/sanity'
// Make sure RecommendationsClient.tsx exists at src/components/ or update the path if needed
import RecommendationsClient from '../components/RecommendationsClient'

export const dynamic = 'force-dynamic'

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

async function getRecommendations(): Promise<Recommendation[]> {
  const query = `*[_type == "recommendation"] | order(_createdAt desc){
    _id,
    name,
    relationship,
    recommendation,
    avatar { asset->{url} }
  }`
  return await client.fetch(query)
}

export default async function Recommendations() {
  const recommendations = await getRecommendations()
  return <RecommendationsClient recommendations={recommendations} />
}
