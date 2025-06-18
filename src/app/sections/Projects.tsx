// sections/Projects.server.tsx
import { client } from '@/lib/sanity'
import ProjectsList from '../components/ProjectsList'

export const dynamic = 'force-dynamic'

interface Project {
  _id: string
  title: string
  description: string
  link: string
  tech: string[]
  image: {
    asset: {
      _ref: string
      _type: string
    }
  }
}

async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(_createdAt desc){
    _id,
    title,
    description,
    link,
    tech,
    image
  }`
  return await client.fetch(query)
}

export default async function ProjectsSection() {
  const projects = await getProjects()
  return <ProjectsList projects={projects} />
}
