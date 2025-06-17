import { client } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanityImage'
import ScrollControls from '@/components/ScrollControls'

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

export default async function Projects() {
  const projects = await getProjects()

  return (
    <section className="py-20 px-6 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto relative">
        <h2 className="text-4xl font-bold text-center mb-6">Projects</h2>
        <ScrollControls targetId="project-scroll" />
        <div
          id="project-scroll"
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 pb-4 scrollbar-hide"
        > 

          {projects.map((project) => (
            <div
              key={project._id}
              className="min-w-[300px] max-w-[350px] bg-gray-100 dark:bg-gray-900 p-6 rounded-xl shadow hover:shadow-xl transition duration-300 flex flex-col snap-start"
            >
              {project.image && (
                <Image
                  src={urlForImage(project.image).url()}
                  alt={project.title}
                  width={500}
                  height={300}
                  className="rounded-lg mb-4 object-cover"
                />
              )}
              <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 text-sm mb-4">
                {project.tech?.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-gray-700 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {project.link && (
                <Link
                  href={project.link}
                  target="_blank"
                  className="mt-auto inline-block text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Visit Project →
                </Link>
              )}
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
          Scroll to view more projects →
        </p>
      </div>
    </section>
  )
}
