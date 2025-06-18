// sections/Skills.server.tsx
import { client } from '@/lib/sanity'
import SkillsGrid from '../components/SkillsGrid'

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

export default async function SkillsSection() {
  const skills = await getSkills()
  return <SkillsGrid skills={skills} />
}
