import { client } from '@/lib/sanity'

export interface Project {
  _id: string
  title: string
  description: string
  image?: {
    asset: {
      url: string
    }
  }
  link?: string
  github?: string
  tech: string[]
  category: string
}

export async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(_createdAt desc){
    _id,
    title,
    description,
    image { asset->{url} },
    link,
    github,
    tech,
    category
  }`
  return await client.fetch(query)
}