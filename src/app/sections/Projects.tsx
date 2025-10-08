// sections/Projects.server.tsx
import { client } from '@/lib/sanity'
import ProjectsList from '../components/ProjectsList'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Project {
  _id: string
  title: string
  description: string
  link: string
  tech: string[]
  image?: {
    asset: {
      url: string
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
    image { asset->{url} }
  }`
  return await client.fetch(query)
}

export default async function ProjectsSection({ limit = 2 }: { limit?: number }) {
  const projects = await getProjects()
  return (
    <section className="py-16 px-4 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 bg-clip-text text-transparent">
          Latest Projects
        </h2>
        <ProjectsList projects={projects.slice(0, limit)} />
        <Link
          href="/gallery"
          className="mt-6 inline-block text-purple-600 dark:text-purple-400 hover:underline text-base font-semibold transition-colors"
        >
          View All Projects →
        </Link>
      </div>
    </section>
  )
}
