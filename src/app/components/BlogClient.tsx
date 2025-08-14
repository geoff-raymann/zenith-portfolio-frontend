'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

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

export default function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    fetch('/api/blog') // 👈 API route for blog previews
      .then((res) => res.json())
      .then(setPosts)
      .catch(console.error)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.slice(0, 2).map((post) => (
        <div
          key={post._id}
          className="bg-white/80 dark:bg-gray-800/70 p-6 rounded-2xl shadow-md text-left"
        >
          {post.image?.asset?.url && (
            <Image
              src={post.image.asset.url}
              alt={post.title}
              width={600}
              height={300}
              className="rounded-lg mb-4 object-cover"
            />
          )}
          <h3 className="text-xl font-semibold">{post.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
          <p className="text-gray-700 dark:text-gray-300">{post.summary}</p>
        </div>
      ))}
    </div>
  )
}
