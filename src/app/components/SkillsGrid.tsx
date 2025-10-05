'use client'

interface Skill {
  _id: string
  name: string
  level: string
  icon: string
}

export default function SkillsGrid({ skills }: { skills: Skill[] }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Skills & Expertise
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {skills.map(skill => (
          <div key={skill._id} className="bg-white/80 dark:bg-gray-800/70 p-6 rounded-2xl shadow-md flex flex-col items-center">
            <img src={skill.icon} alt={skill.name} className="w-10 h-10 mb-2" />
            <div className="font-semibold">{skill.name}</div>
            <div className="text-xs text-gray-500">{skill.level}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
