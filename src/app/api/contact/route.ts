import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, message } = await req.json()
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: 'New Contact Message from Portfolio',
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone || 'N/A'}
        Message: ${message}
      `,
      html: `
        <div style="max-width:600px;margin:0 auto;padding:32px 24px;background:linear-gradient(135deg,#f0f4ff 0%,#f9e6ff 100%);border-radius:18px;font-family:'Segoe UI',Arial,sans-serif;color:#222;">
          <div style="text-align:center;margin-bottom:32px;">
            <span style="display:inline-block;background:linear-gradient(90deg,#3b82f6,#a21caf,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-size:2rem;font-weight:800;letter-spacing:1px;">
              Zenith Portfolio Contact
            </span>
          </div>
          <div style="background:#fff;border-radius:12px;padding:24px 20px;box-shadow:0 2px 12px rgba(80,80,120,0.07);">
            <h2 style="margin:0 0 16px 0;font-size:1.3rem;color:#3b82f6;font-weight:700;">New Contact Message</h2>
            <table style="width:100%;font-size:1rem;">
              <tr>
                <td style="padding:6px 0;font-weight:600;color:#a21caf;">Name:</td>
                <td style="padding:6px 0;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-weight:600;color:#a21caf;">Email:</td>
                <td style="padding:6px 0;"><a href="mailto:${email}" style="color:#3b82f6;text-decoration:none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-weight:600;color:#a21caf;">Phone:</td>
                <td style="padding:6px 0;">${phone || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-weight:600;color:#a21caf;vertical-align:top;">Message:</td>
                <td style="padding:6px 0;white-space:pre-line;">${message}</td>
              </tr>
            </table>
          </div>
          <div style="text-align:center;margin-top:32px;">
            <a href="mailto:${email}" style="display:inline-block;padding:12px 32px;background:linear-gradient(90deg,#3b82f6,#a21caf,#ec4899);color:#fff;font-weight:700;border-radius:999px;text-decoration:none;box-shadow:0 2px 8px rgba(80,80,120,0.09);font-size:1rem;">
              Reply to ${firstName}
            </a>
          </div>
          <div style="margin-top:32px;text-align:center;font-size:0.95rem;color:#888;">
            <span style="font-weight:600;">Zenith Portfolio</span> &mdash; You received this message from your website contact form.
          </div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 })
  }
}