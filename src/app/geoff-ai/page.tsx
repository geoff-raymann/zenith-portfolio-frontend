'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Mic, MicOff } from 'lucide-react'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface SpeechResult {
  transcript: string
  confidence: number
}

interface SpeechResultList {
  [index: number]: SpeechResult[]
  length: number
  isFinal: boolean
}

interface WebkitSpeechRecognitionEvent extends Event {
  results: SpeechResultList
  resultIndex: number
}

interface WebkitSpeechRecognitionErrorEvent extends Event {
  error: string
}

interface WebkitSpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  onresult: ((event: WebkitSpeechRecognitionEvent) => void) | null
  onerror: ((event: WebkitSpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
}

function MeatballsLoader() {
  return (
    <span className="inline-flex items-center gap-1 h-6">
      <span
        className="block w-2.5 h-2.5 rounded-full bg-blue-400 dark:bg-blue-300 animate-bounce"
        style={{ animationDelay: '0ms' }}
      />
      <span
        className="block w-2.5 h-2.5 rounded-full bg-blue-400 dark:bg-blue-300 animate-bounce"
        style={{ animationDelay: '150ms' }}
      />
      <span
        className="block w-2.5 h-2.5 rounded-full bg-blue-400 dark:bg-blue-300 animate-bounce"
        style={{ animationDelay: '300ms' }}
      />
      <style jsx>{`
        @keyframes meatball-bounce {
          0%, 80%, 100% {
            transform: scale(1);
          }
          40% {
            transform: scale(1.6);
          }
        }
        .animate-bounce {
          animation: meatball-bounce 0.9s infinite both;
        }
      `}</style>
    </span>
  )
}

export default function GeoffAIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hi, I'm Geoff AI! Ask me anything about Geoffrey's skills, projects, experience, or how he can help you.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<WebkitSpeechRecognition | null>(null)

  // Hide footer on this page
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (footer) {
      footer.style.display = 'none'
      return () => {
        footer.style.display = ''
      }
    }
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        chatContainerRef.current?.scrollTo({
          top: chatContainerRef.current?.scrollHeight ?? 0,
          behavior: 'smooth',
        })
      }, 0)
    }
  }, [messages, loading])

  // Initialize voice recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition() as WebkitSpeechRecognition
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = 'en-US'
        recognitionRef.current = recognition
      }
    }
  }, [])

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser.')
      return
    }

    if (listening) {
      recognitionRef.current.stop()
      setListening(false)
      return
    }

    try {
      setListening(true)
      recognitionRef.current.onresult = (event: WebkitSpeechRecognitionEvent) => {
        const lastResultIndex = event.results.length - 1
        const transcript = event.results[lastResultIndex][0].transcript
        setInput((prev) => prev + (prev ? ' ' : '') + transcript)
        setListening(false)
      }

      recognitionRef.current.onerror = (event: WebkitSpeechRecognitionErrorEvent) => {
        setListening(false)
        if (event.error === 'not-allowed' || event.error === 'denied') {
          alert('Microphone access was denied. Please enable mic access in your browser settings.')
        } else {
          console.error('Speech recognition error:', event.error)
        }
      }

      recognitionRef.current.onend = () => {
        setListening(false)
      }

      recognitionRef.current.start()
    } catch (error) {
      setListening(false)
      console.error('Voice input error:', error)
      alert('Could not start voice recognition. Please check your browser settings.')
    }
  }

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: ChatMessage = { role: 'user', content: input }
    setMessages((msgs) => [...msgs, userMessage, { role: 'assistant', content: '__LOADER__' }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/geoff-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      if (!res.ok) {
        const errorData = await res.text()
        console.error(`API error (${res.status}):`, errorData)
        throw new Error(`Server error: ${res.status}`)
      }

      const data = await res.json()
      const fullReply = data.reply || "I'm having trouble responding right now."

      // Remove loader message
      setMessages((msgs) => msgs.filter((m) => m.content !== '__LOADER__'))

      // Typing effect for assistant's reply
      const words = fullReply.split(' ')
      let current = ''

      for (let i = 0; i <= words.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 80))
        current = words.slice(0, i).join(' ')
        setMessages((msgs) => {
          const base = msgs.filter(
            (m, idx) => idx !== msgs.length - 1 || m.role !== 'assistant'
          )
          return [...base, { role: 'assistant', content: current }]
        })
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      console.error('Error sending message:', errorMessage)
      setMessages((msgs) => msgs.filter((m) => m.content !== '__LOADER__'))
      setMessages((msgs) => [
        ...msgs,
        { role: 'assistant', content: "Sorry, I'm having trouble responding right now." },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-950">
      <div className="max-w-6xl mx-auto px-2 md:px-6 pt-28 pb-0 flex flex-col h-[calc(100vh-0px)]">
        {/* Chat area */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto space-y-4 mb-2"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={`${idx}-${msg.role}`}
              className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
            >
              <span
                className={`px-4 py-3 rounded-2xl shadow-md w-auto max-w-[90vw] md:max-w-xl text-sm md:text-base ${
                  msg.role === 'assistant'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                    : 'bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100'
                }`}
                style={{
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {msg.content === '__LOADER__' ? <MeatballsLoader /> : msg.content}
              </span>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="sticky bottom-0 bg-gradient-to-t from-white/95 via-gray-50/90 to-transparent dark:from-black/95 dark:via-gray-900/90 dark:to-transparent pt-4 pb-6">
          <form onSubmit={sendMessage} className="flex items-stretch gap-2 md:gap-3">
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`rounded-full p-3 transition-colors flex-shrink-0 ${
                listening
                  ? 'bg-pink-200 dark:bg-pink-800 text-pink-700 dark:text-pink-200 animate-pulse'
                  : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800'
              }`}
              aria-label={listening ? 'Stop voice input' : 'Start voice input'}
              disabled={loading}
            >
              {listening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>

            <div className="relative flex-1">
              <input
                type="text"
                className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                placeholder="Ask Geoff AI anything… or use the mic"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                autoFocus
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </form>

          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center px-4">
            Geoff AI can make mistakes. Consider checking important information.
          </div>
        </div>

        <style jsx global>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </main>
  )
}

// Global type augmentation for webkit Speech Recognition
declare global {
  interface Window {
    webkitSpeechRecognition: new () => WebkitSpeechRecognition
  }
}
