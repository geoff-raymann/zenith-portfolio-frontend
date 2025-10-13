import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

let recommendations: any[] = []

export async function GET() {
  return NextResponse.json(recommendations)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const newRec = {
    _id: uuidv4(),
    ...data,
    avatar: null,
  }
  recommendations.unshift(newRec)
  return NextResponse.json(newRec)
}