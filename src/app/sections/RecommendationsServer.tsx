import { client } from '@/lib/sanity'

export interface Recommendation {
  _id: string
  name: string
  position: string
  message: string
  company: string
}

export async function getRecommendations(): Promise<Recommendation[]> {
  const query = `*[_type == "recommendation"]{
    _id,
    name,
    position,
    message,
    company
  }`
  return await client.fetch(query)
}