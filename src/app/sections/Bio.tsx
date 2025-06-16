'use client'
import React, { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'

interface Bio {
  _id: string
  name: string
  about: string
}

const Bio = () => {
  const [bio, setBio] = useState<Bio | null>(null)

  useEffect(() => {
    const fetchBio = async () => {
      const query = `*[_type == "bio"][0]{
        _id,
        name,
        about
      }`
      const data = await client.fetch(query)
      setBio(data)
    }
    fetchBio()
  }, [])

  if (!bio) return <p>Loading bio...</p>

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4">About Me</h2>
      <h3 className="text-xl font-bold mb-2">{bio.name}</h3>
      <p className="text-gray-700">{bio.about}</p>
    </section>
  )
}

export default Bio
