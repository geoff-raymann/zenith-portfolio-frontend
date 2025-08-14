// app/page.tsx
import Hero from './sections/Hero'
import Bio from './sections/Bio'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'

// Previews
import TestimonialPreview from '@/components/TestimonialsClient'
import BlogPreview from '@/components/BlogClient'

import Link from 'next/link'
import RecommendationsClient from './components/RecommendationsClient'

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Bio />
      <Projects />
      <Skills />

      {/* Testimonials Preview Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">What Others Are Saying</h2>
          <TestimonialPreview />
          <Link
            href="/testimonials"
            className="mt-6 inline-block text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
          >
            Read More Testimonials →
          </Link>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">From the Blog</h2>
          <BlogPreview />
          <Link
            href="/blog"
            className="mt-6 inline-block text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
          >
            Read More Blog Posts →
          </Link>
        </div>
      </section>

      {/* Recommendations Preview Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Professional Recommendations</h2>
          <RecommendationsClient recommendations={[]} />
          <Link
            href="/recommendations"
            className="mt-6 inline-block text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
          >
            Read More Recommendations →
          </Link>
        </div>
      </section>

      <Contact />
    </main>
  )
}