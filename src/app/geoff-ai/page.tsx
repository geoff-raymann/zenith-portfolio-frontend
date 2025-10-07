'use client'

import { useState, useRef } from 'react'
import { Bot, Send, Mic, MicOff, Menu } from 'lucide-react'

export default function GeoffAIPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi, I'm Geoffrey AI! Ask me anything about Geoffrey's skills, projects, experience, or how he can help you.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const [showMobileNav, setShowMobileNav] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Voice recognition setup
  let recognition: SpeechRecognition | null = null
  if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
    recognition = new (window as any).webkitSpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'
  }

  const handleVoiceInput = () => {
    if (!recognition) return
    if (listening) {
      recognition.stop()
      setListening(false)
      return
    }
    setListening(true)
    recognition.start()
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript
      setInput((prev) => prev + (prev ? ' ' : '') + transcript)
      setListening(false)
    }
    recognition.onerror = () => setListening(false)
    recognition.onend = () => setListening(false)
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    const userMessage = { role: 'user', content: input }
    setMessages((msgs) => [...msgs, userMessage])
    setInput('')
    setLoading(true)

    setTimeout(() => {
      chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' })
    }, 100)

    const res = await fetch('/api/geoff-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    })
    const data = await res.json()
    setMessages((msgs) => [...msgs, { role: 'assistant', content: data.reply }])
    setLoading(false)
    setTimeout(() => {
      chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' })
    }, 100)
  }

  // Mobile nav: simple overlay with links
  const mobileNav = (
    <div className="fixed inset-0 z-50 bg-black/60 flex flex-col items-center justify-start pt-20">
      <button
        className="absolute top-4 right-4 text-white text-3xl"
        onClick={() => setShowMobileNav(false)}
        aria-label="Close menu"
      >
        ×
      </button>
      <nav className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 w-11/12 max-w-xs flex flex-col gap-4">
        <a href="/" className="text-lg font-semibold text-blue-600 dark:text-blue-300">Home</a>
        <a href="/portfolio" className="text-lg font-semibold">Portfolio</a>
        <a href="/gallery" className="text-lg font-semibold">Gallery</a>
        <a href="/bio" className="text-lg font-semibold">About Us</a>
        <a href="/contact" className="text-lg font-semibold">Contact Us</a>
        <a href="/geoff-ai" className="text-lg font-semibold text-purple-600 dark:text-purple-300">Geoff AI</a>
      </nav>
    </div>
  )

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-950">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 bg-white/80 dark:bg-gray-900/80 rounded-full p-3 shadow-lg border border-gray-200 dark:border-gray-700"
        onClick={() => setShowMobileNav(true)}
        aria-label="Open menu"
      >
        <Menu size={28} />
      </button>
      {showMobileNav && mobileNav}
      {/* Desktop hover zone for Navbar */}
      <div className="hidden md:block geoff-ai-navbar-hover-zone" />
      <section className="flex flex-1 items-center justify-center py-4 px-1 md:py-10 md:px-2">
        <div className="w-full max-w-4xl min-h-[70vh] bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl p-0 flex flex-col border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-4 px-4 py-6 md:px-10 md:py-8 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950">
            <Bot className="text-blue-600 dark:text-blue-400" size={32} />
            <h1 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight">
              Geoffrey AI
            </h1>
            <span className="ml-auto text-xs md:text-sm text-gray-400 dark:text-gray-500 font-mono">powered by LLM</span>
          </div>
          {/* Chat area */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-2 py-4 md:px-10 md:py-8 space-y-4 md:space-y-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-950"
            style={{ minHeight: '300px', maxHeight: '60vh' }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
              >
                <span
                  className={`px-4 py-2 md:px-5 md:py-3 rounded-2xl shadow-md max-w-[90vw] md:max-w-2xl whitespace-pre-line text-base md:text-lg ${
                    msg.role === 'assistant'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                      : 'bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100'
                  }`}
                >
                  {msg.content}
                </span>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <span className="px-4 py-2 md:px-5 md:py-3 rounded-2xl bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 animate-pulse shadow-md">
                  Geoffrey AI is typing...
                </span>
              </div>
            )}
          </div>
          {/* Input area */}
          <form
            onSubmit={sendMessage}
            className="flex flex-col md:flex-row items-stretch gap-2 md:gap-3 px-2 py-3 md:px-10 md:py-6 border-t border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80"
          >
            <div className="flex flex-row md:flex-col gap-2">
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`rounded-full p-3 transition-colors ${
                  listening
                    ? 'bg-pink-200 dark:bg-pink-800 text-pink-700 dark:text-pink-200 animate-pulse'
                    : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800'
                }`}
                aria-label={listening ? 'Stop voice input' : 'Start voice input'}
                tabIndex={0}
              >
                {listening ? <MicOff size={22} /> : <Mic size={22} />}
              </button>
            </div>
            <input
              type="text"
              className="flex-1 px-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base md:text-lg"
              placeholder="Ask Geoffrey AI anything… or use the mic"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center text-base md:text-lg"
              disabled={loading}
              aria-label="Send"
            >
              <Send size={22} />
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}