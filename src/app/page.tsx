import Hero from '@/sections/Hero'
import Bio from '@/sections/Bio'
import Projects from '@/sections/Projects'
import Skills from '@/sections/Skills'
import Events from '@/sections/Events'
import Contact from '@/sections/Contact'

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4">
      <Hero />
      <Bio />
      <Projects />
      <Skills />
      <Events />
      <Contact />
    </main>
  )
}
