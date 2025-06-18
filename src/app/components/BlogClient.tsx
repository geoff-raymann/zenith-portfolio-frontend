// BlogClient.tsx — client-side component
'use client'
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

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Latest Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md p-6 rounded-2xl shadow-md"
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
              <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {post.date
                  ? new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })
                  : 'No date'}
              </p>
              <p className="text-gray-700 dark:text-gray-300">{post.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
