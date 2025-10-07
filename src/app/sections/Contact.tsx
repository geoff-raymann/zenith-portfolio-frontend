// Contact.tsx
import ContactClient from '@/components/ContactClient'
import { getContact } from './ContactServer'
import { NextRequest, NextResponse } from 'next/server'

// You can integrate with email (e.g. Nodemailer), Slack, or store in Sanity here.
export async function POST(req: NextRequest) {
  const data = await req.json()
  // TODO: Send email, Slack, or store in Sanity
  // Example: sendEmailNotification(data)
  // For now, just log and return success
  console.log('New contact message:', data)
  return NextResponse.json({ ok: true })
}

