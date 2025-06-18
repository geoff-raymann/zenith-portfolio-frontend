import Hero from '@/sections/Hero'
import Bio from '@/sections/Bio'
import Projects from '@/sections/Projects'
import Skills from '@/sections/Skills'
import Events from '@/sections/Events'
import Contact from '@/sections/Contact'
import Blog from './sections/Blog'
import Testimonials from './sections/Testimonials'
import Recommendations from './sections/Recommendations'
import Navbar from './components/Navbar'
import Footer from './sections/Footer'

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4">
      <Navbar />
      <Hero />
      <Bio />
      <Projects />
      <Skills />
      <Events />
      <Contact />
      <Blog />
      <Testimonials />
      <Recommendations />
      <Footer />
    </main>
  )
}
