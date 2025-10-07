import { getProjects } from '../sections/GalleryServer'
import Link from 'next/link'

const categories = ['FinTech', 'Telemed', 'eCommerce', 'CyberSec', 'Archives']

export default async function GalleryPage() {
  const projects = await getProjects()

  return (
    <main className="flex flex-col bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-950 min-h-screen">
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Project Gallery
          </h1>
          {categories.map(category => (
            <div key={category} className="mb-16">
              <h2 className="text-2xl font-extrabold mb-6 text-left bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 bg-clip-text text-transparent">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.filter(p => p.category === category).map(project => (
                  <div key={project._id} className="bg-white/80 dark:bg-gray-800/70 rounded-2xl shadow-md p-6 flex flex-col">
                    {project.image?.asset?.url && (
                      <img
                        src={project.image.asset.url}
                        alt={project.title}
                        className="w-full h-48 object-cover rounded-xl mb-4"
                      />
                    )}
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.tech.map((tech, idx) => (
                        <span key={idx} className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded text-xs font-semibold">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-auto">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                        >
                          Live Site
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 dark:text-gray-300 hover:underline font-semibold"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Floating Call to Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link
          href="/contact"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all font-bold text-lg animate-bounce"
        >
          Contact Me
        </Link>
      </div>
    </main>
  )
}