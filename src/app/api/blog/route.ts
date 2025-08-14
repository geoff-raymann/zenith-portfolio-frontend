// app/api/blog/route.ts
import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

export async function GET() {
  const query = `*[_type == "blog"] | order(date desc)[0...2]{
    _id,
    title,
    date,
    summary,
    image { asset->{url} }
  }`

  const posts = await client.fetch(query)
  return NextResponse.json(posts)
}
