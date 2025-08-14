// app/api/testimonials/route.ts
import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

export async function GET() {
  const query = `*[_type == "testimonial"] | order(_createdAt desc)[0...3]{
    _id,
    name,
    title,
    message,
    avatar { asset->{url} }
  }`

  const testimonials = await client.fetch(query)
  return NextResponse.json(testimonials)
}
