// BlogServer.tsx — server-side logic
import { client } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

interface BlogPost {
  _id: string
  title: string
  date: string
  summary: string
  image?: {
    asset: {
      url: string
    }
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "blog"] | order(date desc){
    _id,
    title,
    date,
    summary,
    image { asset->{url} }
  }`
  return await client.fetch(query)
}
