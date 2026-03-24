// app/api/testimonials/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

interface Testimonial {
  _id: string
  name: string
  role: string
  company?: string
  quote: string
  avatar: null
}

const testimonials: Testimonial[] = []

export async function GET() {
  return NextResponse.json(testimonials)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const newTestimonial = {
    _id: uuidv4(),
    ...data,
    avatar: null,
  }
  testimonials.unshift(newTestimonial)
  return NextResponse.json(newTestimonial)
}
