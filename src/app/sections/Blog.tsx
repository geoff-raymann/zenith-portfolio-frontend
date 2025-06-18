// Blog.tsx — server-side entry point
import BlogClient from '@/components/BlogClient'
import { getBlogPosts } from './BlogServer'

export default async function Blog() {
  const posts = await getBlogPosts()
  return <BlogClient posts={posts} />
}
