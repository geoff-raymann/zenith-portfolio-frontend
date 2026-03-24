// sections/HeroSection.server.tsx
import { client } from '@/lib/sanity'
import HeroBanner from '../components/HeroBanner'

export const dynamic = 'force-dynamic'

interface HeroImage {
  asset?: {
    url: string
  }
}

interface HeroData {
  _id: string
  headline: string
  subheadline: string
  ctaText: string
  ctaLink: string
  image: HeroImage
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

  return (
    <section className="py-16 px-4 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <HeroBanner hero={hero} />
      </div>
    </section>
  )
}
