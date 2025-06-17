import { client } from '@/lib/sanity'
import Image from 'next/image'
import { BadgeCheck } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface Skill {
  _id: string
  name: string
  level: string
  icon: string
}

async function getSkills(): Promise<Skill[]> {
  const query = `*[_type == "skill"]{
    _id,
    name,
    level,
    icon
  }`
  return await client.fetch(query)
}

export default async function Skills() {
  const skills = await getSkills()

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Skills & Expertise</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-md p-6 flex flex-col items-center text-center space-y-3"
            >
              {skill.icon ? (
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={40}
                  height={40}
                  className="mb-1"
                />
              ) : (
                <BadgeCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
              )}
              <h3 className="text-lg font-semibold">{skill.name}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">{skill.level}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
