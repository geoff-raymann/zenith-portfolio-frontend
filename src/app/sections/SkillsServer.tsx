import { client } from '@/lib/sanity'

export interface Skill {
  _id: string
  name: string
  level: string
  icon: string
}

export async function getSkills(): Promise<Skill[]> {
  const query = `*[_type == "skill"]{_id, name, level, icon}`
  return await client.fetch(query)
}