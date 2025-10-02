'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

// BlogClient.tsx

type BlogPreviewProps = {
  limit?: number;
};

interface BlogPost {
  _id: string
  title: string
  date: string
  summary: string
  image?: {
    asset: {
      url: string
    }
  }
}

export default function BlogPreview({ limit = 2 }: BlogPreviewProps) {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    fetch('/api/blog') // 👈 API route for blog previews
      .then((res) => res.json())
      .then(setPosts)
      .catch(console.error)
  }, [])

  const items = posts.slice(0, limit)

  return (
    <section className="py-16 px-4 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Latest Blogposts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((post) => (
            <div key={post._id} className="bg-white/80 dark:bg-gray-800/70 p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{post.summary}</p>
              <span className="text-xs text-gray-500">{post.date}</span>
            </div>
          ))}
        </div>
        <Link
          href="/blog"
          className="mt-6 inline-block text-green-600 dark:text-green-400 hover:underline text-base font-semibold transition-colors"
        >
          Read More Blog Posts →
        </Link>
      </div>
    </section>
  )
}
