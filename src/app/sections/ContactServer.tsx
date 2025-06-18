// ContactServer.tsx
import { client } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

export interface ContactInfo {
  _id: string
  email: string
  phone: string
  linkedin: string
  location: string
}

export async function getContact(): Promise<ContactInfo> {
  const query = `*[_type == "contact"][0]{
    _id,
    email,
    phone,
    linkedin,
    location
  }`
  return await client.fetch(query)
}