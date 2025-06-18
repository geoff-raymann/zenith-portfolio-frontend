import { client } from '@/lib/sanity'

export interface Testimonial {
  _id: string
  author: string
  content: string
  role: string
  avatar?: {
    asset: {
      url: string
    }
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const query = `*[_type == "testimonial"]{
    _id,
    author,
    content,
    role,
    avatar { asset->{url} }
  }`
  return await client.fetch(query)
}