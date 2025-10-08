'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Menu } from 'lucide-react'

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  date: string
  summary: string
  image?: { asset: { url: string } }
}

type GroupedBlogs = { [month: string]: BlogPost[] }

function groupByMonth(posts: BlogPost[]): GroupedBlogs {
  return posts.reduce((acc, post) => {
    const month = format(new Date(post.date), 'MMMM yyyy')
    acc[month] = acc[month] || []
    acc[month].push(post)
    return acc
  }, {} as GroupedBlogs)
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [grouped, setGrouped] = useState<GroupedBlogs>({})

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setGrouped(groupByMonth(data))
      })
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-950 pb-24">
      <div className="max-w-4xl mx-auto px-4 py-12 pt-20">
        <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Blog
        </h1>
        {Object.entries(grouped).map(([month, posts]) => (
          <section key={month} className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-300">{month}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map(post => (
                <Link
                  href={`/blog/${post.slug.current}`}
                  key={post._id}
                  className="bg-white/80 dark:bg-gray-800/70 p-6 rounded-2xl shadow-md hover:shadow-xl transition"
                >
                  {post.image?.asset?.url && (
                    <img src={post.image.asset.url} alt={post.title} className="rounded-lg mb-3 w-full h-40 object-cover" />
                  )}
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{post.summary}</p>
                  <span className="text-xs text-gray-500">{format(new Date(post.date), 'dd MMM yyyy')}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
      {/* Floating Geoff AI button */}
      <Link
        href="/geoff-ai"
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg transition-all font-bold text-lg flex items-center gap-2"
      >
        <Menu size={22} /> Ask Geoff AI
      </Link>
    </main>
  )
}