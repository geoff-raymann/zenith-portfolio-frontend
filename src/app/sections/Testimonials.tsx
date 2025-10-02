// sections/Testimonials.tsx
import { client } from '@/lib/sanity'
import TestimonialsClient from '../components/TestimonialsClient'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Testimonial {
  _id: string
  name: string
  role: string
  company?: string
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

export default async function Testimonials({ limit = 2 }: { limit?: number }) {
  const testimonials = await getTestimonials()
  return (
    <section className="py-16 px-4 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          What Clients Say
        </h2>
        <TestimonialsClient testimonials={testimonials.slice(0, limit)} />
        <Link
          href="/testimonials"
          className="mt-6 inline-block text-blue-600 dark:text-blue-400 hover:underline text-base font-semibold transition-colors"
        >
          Read More Testimonials →
        </Link>
      </div>
    </section>
  )
}
