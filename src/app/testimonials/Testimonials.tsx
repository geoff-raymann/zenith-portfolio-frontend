// /app/testimonials/page.tsx
import TestimonialsClient from '@/components/TestimonialsClient'
import { getTestimonials } from '../sections/TestimonialsServer'

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()
  return <TestimonialsClient testimonials={testimonials} />
}