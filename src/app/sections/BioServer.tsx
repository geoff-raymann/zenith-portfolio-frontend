import { client } from '@/lib/sanity'

export interface Bio {
  _id: string
  name: string
  about: string
}

export async function getBios(): Promise<Bio[]> {
  const query = `*[_type == "bio"]{_id, name, about}`
  return await client.fetch(query)
}