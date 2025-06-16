'use client'
import React, { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'

interface Skill {
  _id: string
  name: string
  level: string
}

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([])

  useEffect(() => {
    const fetchSkills = async () => {
      const query = `*[_type == "skill"]{
        _id,
        name,
        level
      }`
      const data = await client.fetch(query)
      setSkills(data)
    }
    fetchSkills()
  }, [])

  return (
    <section className="py-16 px-4 bg-white">
      <h2 className="text-3xl font-semibold mb-8 text-center">Skills</h2>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.length === 0 && <p>Loading skills...</p>}
        {skills.map(skill => (
          <li key={skill._id} className="bg-gray-100 p-4 rounded shadow text-center">
            <h3 className="font-semibold">{skill.name}</h3>
            <p className="text-sm text-gray-600">{skill.level}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Skills

