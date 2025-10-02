// sections/HeroSection.server.tsx
import { client } from '@/lib/sanity'
import HeroBanner from '../components/HeroBanner'

export const dynamic = 'force-dynamic'

interface HeroData {
  _id: string
  headline: string
  subheadline: string
  ctaText: string
  ctaLink: string
  image: any
}

async function getHero(): Promise<HeroData[]> {
  const query = `*[_type == "hero"]{
    _id,
    headline,
    subheadline,
    ctaText,
    ctaLink,
    image
  }`
  return await client.fetch(query)
}

export default async function HeroSection() {
  const [hero] = await getHero()
  if (!hero) return null

  const actions = (
    <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
      <a
        href="#bio"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition font-bold text-lg"
      >
        About Me
      </a>
      <a
        href="#projects"
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full shadow-lg transition font-bold text-lg"
      >
        Portfolio
      </a>
      <a
        href="#contact"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg transition font-bold text-lg"
      >
        Contact
      </a>
    </div>
  )

  return (
    <section className="py-16 px-4 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <HeroBanner hero={hero} actions={actions} />
      </div>
    </section>
  )
}
