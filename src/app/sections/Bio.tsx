// sections/Bio.server.tsx
import { client } from '@/lib/sanity'
import BioCard from '../components/BioCard'

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

export default async function BioSection() {
  const bios = await getBio()
  return <BioCard bios={bios} />
}
