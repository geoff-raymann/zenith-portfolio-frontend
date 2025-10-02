import { client } from '@/lib/sanity'

export interface Recommendation {
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

export async function getRecommendations(): Promise<Recommendation[]> {
  const query = `*[_type == "recommendation"] | order(_createdAt desc){
    _id,
    name,
    role,
    company,
    text,
    avatar { asset->{url} }
  }`
  return await client.fetch(query)
}