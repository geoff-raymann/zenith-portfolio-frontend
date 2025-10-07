// app/page.tsx
import Hero from './sections/Hero'
import Testimonials from './sections/Testimonials'
import BlogPreview from '@/components/BlogClient'
import Recommendations from './sections/Recommendations'
import Link from 'next/link'
import Projects from './sections/Projects'

export default function Home() {
  return (
    <main className="flex flex-col bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-950 min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Recent Projects */}
      <Projects limit={2} />

      {/* Recent Testimonials */}
      <Testimonials limit={2} />

      {/* Latest Blogposts */}
      <BlogPreview limit={2} />

      {/* Top Recommendations */}
      <Recommendations limit={2} />

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
