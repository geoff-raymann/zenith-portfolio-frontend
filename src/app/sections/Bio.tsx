
import { client } from '@/lib/sanity'
import { User } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface Bio {
  _id: string
  name: string
  about: string
}

async function getBio(): Promise<Bio[]> {
  const query = `*[_type == "bio"]{
    _id,
    name,
    about
  }`
  return await client.fetch(query)
}

export default async function Bio() {
  const bios = await getBio()

  return (
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
  )
}
