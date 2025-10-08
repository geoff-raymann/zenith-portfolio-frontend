// app/api/blog/route.ts
import { NextRequest, NextResponse } from 'next/server'

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID
const SANITY_DATASET = process.env.SANITY_DATASET
const SANITY_API_VERSION = '2023-05-03'
const SANITY_TOKEN = process.env.SANITY_TOKEN

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=*[_type=="blog"]|order(date desc){_id, title, slug, date, summary, image, content}`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${SANITY_TOKEN}` }
  })
  const data = await res.json()
  return NextResponse.json(data.result)
}
