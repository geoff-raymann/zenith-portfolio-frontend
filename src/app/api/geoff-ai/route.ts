import { NextRequest, NextResponse } from 'next/server'

const MODEL = 'phi3' // or 'gemma', 'mistral', etc.

export async function POST(req: NextRequest) {
  const { messages } = await req.json()
  const context = `
You are Geoff AI, a helpful assistant for Geoffrey Odiwour's portfolio website.
Geoffrey is a software engineer with expertise in FinTech, Telemed, eCommerce, and CyberSec.
He works with Python, Django, React, and more.
Answer as Geoffrey would, using his skills and experience.
`
  const prompt =
    context +
    messages.map((m: any) => (m.role === 'user' ? `User: ${m.content}` : `Geoff AI: ${m.content}`)).join('\n') +
    "\nGeoff AI:"

  try {
    const ollamaRes = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        prompt,
        stream: false,
      }),
    })

    if (!ollamaRes.ok) {
      const errorText = await ollamaRes.text()
      console.error('Ollama server error:', errorText)
      return NextResponse.json({ reply: "Sorry, the Ollama model is unavailable or not found." }, { status: 500 })
    }

    const data = await ollamaRes.json()
    return NextResponse.json({ reply: data.response })
  } catch (error) {
    console.error('Ollama error:', error)
    return NextResponse.json({ reply: "Sorry, I'm having trouble responding right now." }, { status: 500 })
  }
}
