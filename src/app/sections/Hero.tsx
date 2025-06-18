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

  return <HeroBanner hero={hero} />
}
