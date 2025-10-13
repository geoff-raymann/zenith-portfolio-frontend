'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRecommendations } from '../hooks/useRecommendations'

export default function AddRecommendationPage() {
  const [form, setForm] = useState({ name: '', role: '', company: '', text: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const { addRecommendation } = useRecommendations()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await addRecommendation(form)
    setSuccess(true)
    setTimeout(() => {
      router.push('/')
    }, 1200)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-950">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold mb-2 text-center">Add a Recommendation</h1>
        <input
          name="name"
          placeholder="Your Name"
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="role"
          placeholder="Your Role"
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700"
          value={form.role}
          onChange={handleChange}
          required
        />
        <input
          name="company"
          placeholder="Company (optional)"
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700"
          value={form.company}
          onChange={handleChange}
        />
        <textarea
          name="text"
          placeholder="Your Recommendation"
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700"
          value={form.text}
          onChange={handleChange}
          required
          rows={4}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded py-2 font-bold hover:bg-blue-700 transition"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
        {success && (
          <div className="text-green-600 text-center font-semibold mt-2">
            Thank you for your recommendation!
          </div>
        )}
      </form>
    </main>
  )
}