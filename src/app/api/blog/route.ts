// app/api/blog/route.ts
import { NextResponse } from 'next/server'

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID
const SANITY_DATASET = process.env.SANITY_DATASET
const SANITY_API_VERSION = '2023-05-03'
const SANITY_TOKEN = process.env.SANITY_TOKEN

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=*[_type=="blog"]|order(date desc){_id, title, slug, date, summary, image, content}`
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${SANITY_TOKEN}` }
    })
    
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch from Sanity' }, { status: res.status })
    }
    
    const data = await res.json()
    
    // Ensure data is serializable
    const serializedData = JSON.parse(JSON.stringify(data.result || []))
    
    return NextResponse.json(serializedData)
  } catch (error) {
    console.error('Blog API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}
