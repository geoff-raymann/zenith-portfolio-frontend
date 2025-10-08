'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { format } from 'date-fns'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

interface BlogPost {
  _id: string
  title: string
  date: string
  summary: string
  content: any[]
  image?: { asset: { url: string } }
  likes?: number
  comments?: { name: string; comment: string; createdAt?: string }[]
}

export default function BlogDetails() {
  const { slug } = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [name, setName] = useState('')
  const [localLikes, setLocalLikes] = useState(0)
  const [hasLiked, setHasLiked] = useState(false)
  const [localComments, setLocalComments] = useState<{ name: string; comment: string; createdAt: string }[]>([])

  // Fetch post from Sanity (optional, or you can skip if you want only local)
  useEffect(() => {
    fetch(`/api/blog/${slug}`)
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(err => setError(err.message))
  }, [slug])

  // Load likes/comments from localStorage
  useEffect(() => {
    if (!slug) return
    setHasLiked(!!window.localStorage.getItem(`liked-${slug}`))
    setLocalLikes(Number(window.localStorage.getItem(`likes-${slug}`) || 0))
    const local = window.localStorage.getItem(`comments-${slug}`)
    setLocalComments(local ? JSON.parse(local) : [])
  }, [slug])

  // Like handler (local only)
  const handleLike = () => {
    if (hasLiked) return
    const newLikes = localLikes + 1
    setLocalLikes(newLikes)
    setHasLiked(true)
    window.localStorage.setItem(`liked-${slug}`, 'true')
    window.localStorage.setItem(`likes-${slug}`, String(newLikes))
  }

  // Comment handler (local only)
  const handleComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && comment) {
      const newComment = { name, comment, createdAt: new Date().toISOString() }
      const updatedComments = [...localComments, newComment]
      setLocalComments(updatedComments)
      window.localStorage.setItem(`comments-${slug}`, JSON.stringify(updatedComments))
      setName('')
      setComment('')
    }
  }

  function renderDate(dateStr?: string) {
    if (!dateStr) return 'Unknown date'
    const d = new Date(dateStr)
    return isNaN(d.getTime()) ? 'Unknown date' : format(d, 'dd MMM yyyy')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-950 pb-24">
      <div className="max-w-3xl mx-auto px-4 py-12 pt-20">
        {error ? (
          <div className="text-red-600 dark:text-red-400 font-bold">{error}</div>
        ) : post ? (
          <>
            {post.image?.asset?.url && (
              <img src={post.image.asset.url} alt={post.title} className="rounded-xl mb-6 w-full h-64 object-cover" />
            )}
            <h1 className="text-3xl font-extrabold mb-2">{post.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs text-gray-500">{renderDate(post.date)}</span>
              <button
                className={`ml-auto bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-200 px-4 py-2 rounded-full font-bold transition ${hasLiked ? 'opacity-60 cursor-not-allowed' : ''}`}
                onClick={handleLike}
                disabled={hasLiked}
                aria-disabled={hasLiked}
              >
                ❤️ Like {localLikes}
              </button>
            </div>
            <p className="text-lg mb-6 text-gray-700 dark:text-gray-200">{post.summary}</p>
            <div className="prose dark:prose-invert max-w-none mb-8">
              {post.content && <PortableText value={post.content} />}
            </div>
            {/* Comments */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-2">Comments ({localComments.length})</h2>
              <form onSubmit={handleComment} className="flex flex-col gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700"
                  required
                  disabled={false}
                />
                <textarea
                  placeholder="Your comment"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700"
                  required
                  disabled={false}
                />
                <button
                  type="submit"
                  className="self-end bg-blue-600 text-white px-4 py-2 rounded font-bold"
                >
                  Post Comment
                </button>
              </form>
              <div className="space-y-2">
                {localComments.map((c, i) => (
                  <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded p-3">
                    <span className="font-bold">{c.name}:</span> {c.comment}
                    {c.createdAt && (
                      <span className="block text-xs text-gray-400 mt-1">
                        {renderDate(c.createdAt)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
            {/* Deep dive with Geoff AI */}
            <Link
              href={`/geoff-ai?context=blogpost:${post._id}`}
              className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg transition-all font-bold text-lg flex items-center gap-2"
            >
              Ask Geoff AI about this post
            </Link>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </main>
  )
}