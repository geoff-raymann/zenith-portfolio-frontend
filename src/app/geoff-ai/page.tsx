'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Mic, MicOff } from 'lucide-react'

function MeatballsLoader() {
  // 3 swelling dots (meatballs) animation
  return (
    <span className="inline-flex items-center gap-1 h-6">
      <span className="block w-2.5 h-2.5 rounded-full bg-blue-400 dark:bg-blue-300 animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="block w-2.5 h-2.5 rounded-full bg-blue-400 dark:bg-blue-300 animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="block w-2.5 h-2.5 rounded-full bg-blue-400 dark:bg-blue-300 animate-bounce" style={{ animationDelay: '300ms' }} />
      <style jsx>{`
        .animate-bounce {
          animation: meatball-bounce 0.9s infinite both;
        }
        @keyframes meatball-bounce {
          0%, 80%, 100% { transform: scale(1); }
          40% { transform: scale(1.6); }
        }
      `}</style>
    </span>
  )
}

export default function GeoffAIPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi, I'm Geoff AI! Ask me anything about Geoffrey's skills, projects, experience, or how he can help you.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Hide footer on this page
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (footer) footer.style.display = 'none'
    return () => {
      if (footer) footer.style.display = ''
    }
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  // Voice recognition setup
  // TypeScript: Use correct type for SpeechRecognition
  let recognition: any = null
  if (typeof window !== 'undefined' && window.webkitSpeechRecognition) {
    recognition = new window.webkitSpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'
  }

  const handleVoiceInput = () => {
    if (typeof window === 'undefined' || !window.webkitSpeechRecognition) {
      alert('Speech recognition is not supported in this browser.')
      return
    }
    if (listening) {
      recognition.stop()
      setListening(false)
      return
    }
    try {
      setListening(true)
      recognition.start()
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput((prev) => prev + (prev ? ' ' : '') + transcript)
        setListening(false)
      }
      recognition.onerror = (e: any) => {
        setListening(false)
        if (e.error === 'not-allowed' || e.error === 'denied') {
          alert('Microphone access was denied. Please allow mic access in your browser settings.')
        }
      }
      recognition.onend = () => setListening(false)
    } catch (err) {
      setListening(false)
      alert('Could not start voice recognition. Please check your browser settings.')
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    const userMessage = { role: 'user', content: input }
    setMessages((msgs) => [...msgs, userMessage, { role: 'assistant', content: '__LOADER__' }])
    setInput('')
    setLoading(true)
    setShowLoader(true)

    const res = await fetch('/api/geoff-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    })
    const data = await res.json()
    const fullReply = data.reply

    // Remove loader before typing effect
    setMessages((msgs) => msgs.filter(m => m.content !== '__LOADER__'))

    // Typing effect for assistant's reply (word by word)
    const words = fullReply.split(' ')
    let current = ''
    for (let i = 0; i <= words.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 80))
      current = words.slice(0, i).join(' ')
      setMessages((msgs) => {
        // Remove any unfinished assistant message at the end
        const base = msgs.filter((m, idx) => idx !== msgs.length - 1 || m.role !== 'assistant')
        return [...base, { role: 'assistant', content: current }]
      })
      // Hide loader as soon as the first word is typed
      if (i === 1) setShowLoader(false)
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-950">
      <div className="max-w-6xl mx-auto px-2 md:px-6 pt-28 pb-0 flex flex-col h-[calc(100vh-0px)]">
        {/* Chat area with invisible scroll and space below Navbar */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto space-y-4 mb-2 scrollbar-none"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
            >
              <span
                className={`px-2 md:px-4 py-2 md:py-3 rounded-2xl shadow-md w-auto max-w-[90vw] md:max-w-4xl ${
                  msg.role === 'assistant'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                    : 'bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100'
                }`}
                style={{
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-line',
                  minHeight: msg.content === '__LOADER__' ? '2.5rem' : undefined,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {msg.content === '__LOADER__' ? <MeatballsLoader /> : msg.content}
              </span>
            </div>
          ))}
        </div>
        {/* Input area fixed to bottom */}
        <div className="sticky bottom-0 bg-gradient-to-t from-white/90 via-gray-50/80 to-transparent dark:from-black/90 dark:via-gray-900/80 dark:to-transparent pt-4 pb-4">
          <form
            onSubmit={sendMessage}
            className="flex items-stretch gap-2 md:gap-3"
          >
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`rounded-full p-3 transition-colors self-center ${
                listening
                  ? 'bg-pink-200 dark:bg-pink-800 text-pink-700 dark:text-pink-200 animate-pulse'
                  : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800'
              }`}
              aria-label={listening ? 'Stop voice input' : 'Start voice input'}
              tabIndex={0}
            >
              {listening ? <MicOff size={22} /> : <Mic size={22} />}
            </button>
            <div className="relative flex-1">
              <input
                type="text"
                className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base md:text-lg"
                placeholder="Ask Geoff AI anything… or use the mic"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center text-base md:text-lg"
                disabled={loading}
                aria-label="Send"
                style={{ minWidth: 36, minHeight: 36 }}
              >
                <Send size={20} />
              </button>
            </div>
          </form>
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
            Geoff AI can make mistakes. Consider checking important information
          </div>
        </div>
        <style jsx global>{`
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-none {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </main>
  )
}

// Fix for missing SpeechRecognition types
declare global {
  interface Window {
    webkitSpeechRecognition: any
  }
}