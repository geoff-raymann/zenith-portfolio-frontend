// sections/Testimonials.tsx
import { client } from '@/lib/sanity'
import TestimonialsClient from '@/components/TestimonialsClient'

export const dynamic = 'force-dynamic'

interface Testimonial {
  _id: string
  name: string
  role: string
  company: string
  quote: string
  avatar?: {
    asset: {
      url: string
    }
  }
}

async function getTestimonials(): Promise<Testimonial[]> {
  const query = `*[_type == "testimonial"] | order(_createdAt desc){
    _id,
    name,
    role,
    company,
    quote,
    avatar { asset->{url} }
  }`
  return await client.fetch(query)
}

export default async function Testimonials() {
  const testimonials = await getTestimonials()
  return <TestimonialsClient testimonials={testimonials} />
}
