'use client'

import Image from 'next/image'

interface Project {
  _id: string
  title: string
  description: string
  link: string
  tech: string[]
  image?: {
    asset: {
      _ref: string
      _type: string
      url?: string // Add url if available
    }
  }
}

export default function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <div key={project._id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col items-center">
          {project.image?.asset?.url && (
            <div className="mb-4 w-full h-48 relative">
              <Image
                src={project.image.asset.url}
                alt={project.title}
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">{project.description}</p>
          <div className="text-xs text-gray-500 mb-2">
            <span className="font-semibold">Tech:</span> {project.tech.join(', ')}
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            View Project →
          </a>
        </div>
      ))}
    </div>
  )
}
