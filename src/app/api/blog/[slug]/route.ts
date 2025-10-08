import { NextRequest, NextResponse } from 'next/server'

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID
const SANITY_DATASET = process.env.SANITY_DATASET
const SANITY_API_VERSION = '2023-05-03'
const SANITY_TOKEN = process.env.SANITY_TOKEN

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  // Extract slug from the URL
  const url = new URL(req.url)
  const segments = url.pathname.split('/')
  const slug = segments[segments.length - 1]

  if (!slug || typeof slug !== 'string') {
    return NextResponse.json({ error: 'Missing or invalid slug' }, { status: 400 })
  }

  // Include likes and comments in the query!
  const query = `*[_type=="blog"&&slug.current=="${slug}"][0]{_id,title,date,summary,image,content,likes,comments}`
  const sanityUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`

  try {
    const res = await fetch(sanityUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SANITY_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
    if (!res.ok) {
      const text = await res.text()
      console.error('Sanity fetch failed:', text)
      return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 })
    }
    const data = await res.json()
    if (!data.result) {
      console.error('Blog post not found')
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }
    return NextResponse.json(data.result)
  } catch (err) {
    console.error('Unexpected server error:', err)
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 })
  }
}