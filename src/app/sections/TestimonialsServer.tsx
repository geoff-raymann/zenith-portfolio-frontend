// TestimonialsServer.tsx
import { client } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

interface Testimonial {
  _id: string
  name: string
  role: string
  quote: string
  image?: {
    asset: {
      url: string
    }
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const query = `*[_type == "testimonial"] | order(_createdAt desc){
    _id,
    name,
    role,
    quote,
    image { asset->{url} }
  }`
  return await client.fetch(query)
}
