import { NextRequest, NextResponse } from 'next/server'

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID
const SANITY_DATASET = process.env.SANITY_DATASET
const SANITY_API_VERSION = '2023-05-03'
const SANITY_TOKEN = process.env.SANITY_TOKEN

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params
  const { name, comment } = await req.json()
  if (!slug || !name || !comment) return NextResponse.json({ error: 'Missing data' }, { status: 400 })

  // 1. Fetch blog post _id
  const query = `*[_type=="blog"&&slug.current=="${slug}"][0]{_id}`
  const sanityUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`
  const res = await fetch(sanityUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SANITY_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  })
  const data = await res.json()
  const blog = data.result
  if (!blog?._id) return NextResponse.json({ error: 'Blog not found' }, { status: 404 })

  // 2. Patch comments by _id
  const patchUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${SANITY_DATASET}`
  const patchBody = {
    mutations: [
      {
        patch: {
          id: blog._id,
          insert: {
            after: 'comments[-1]',
            items: [{ name, comment, createdAt: new Date().toISOString() }]
          }
        }
      }
    ]
  }

  const patchRes = await fetch(patchUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SANITY_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(patchBody)
  })
  const patchData = await patchRes.json()
  return NextResponse.json(patchData)
}