'use client'

import React, { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'

interface Project {
  _id: string
  title: string
  description: string
  link?: string
  image?: {
    asset: {
      url: string
    }
  }
  imageUrl?: string
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      const query = `*[_type == "project"]{
        _id,
        title,
        description,
        link,
        "imageUrl": image.asset->url
      }`
      const data = await client.fetch(query)
      setProjects(data)
    }
    fetchProjects()
  }, [])

  return (
    <section className="py-16 bg-gray-50 px-4">
      <h2 className="text-3xl font-semibold mb-8 text-center">My Projects</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.length === 0 && <p>Loading projects...</p>}
        {projects.map(project => (
          <div key={project._id} className="bg-white p-4 rounded-lg shadow">
            {project.imageUrl && (
              <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover rounded" />
            )}
            <h3 className="mt-4 text-xl font-bold">{project.title}</h3>
            <p className="mt-2 text-gray-700">{project.description}</p>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-2 block">
                View Project
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
// This code defines a React component that fetches and displays a list of projects from a Sanity CMS backend.
// It uses the Sanity client to query for projects, which include a title, description, optional link, and an image.