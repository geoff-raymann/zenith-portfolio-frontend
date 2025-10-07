import { getBios } from '../sections/BioServer'
import { getSkills } from '../sections/SkillsServer'
import Link from 'next/link'
import { User } from 'lucide-react'

export default async function PortfolioPage() {
  const bios = await getBios()
  const skills = await getSkills()

  return (
    <main className="flex flex-col bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-950 min-h-screen">
      <section className="py-20 px-6 bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
          {bios.map((bio) => (
            <div
              key={bio._id}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-md p-8 flex flex-col items-center text-center space-y-4"
            >
              <User className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              <h3 className="text-2xl font-semibold">{bio.name}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {bio.about}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Skills & Expertise
        </h2>
        <div className="max-w-5xl mx-auto">
          <div className="flex overflow-x-auto scrollbar-hide gap-6 py-2 px-1 snap-x snap-mandatory">
            {skills.map(skill => (
              <div
                key={skill._id}
                className="min-w-[160px] max-w-[180px] snap-center bg-white/80 dark:bg-gray-800/70 p-6 rounded-2xl shadow-md flex flex-col items-center"
              >
                <img src={skill.icon} alt={skill.name} className="w-10 h-10 mb-2" />
                <div className="font-semibold text-center">{skill.name}</div>
                <div className="text-xs text-gray-500 text-center">{skill.level}</div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">Scroll sideways to view more skills</p>
      </section>

      {/* Add similar sections for Experience, Education, Certifications, Languages, Awards */}

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