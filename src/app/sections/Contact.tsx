'use client'

import React, { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'

interface Contact {
  _id: string
  email: string
  phone?: string
  linkedin?: string
}

const Contact = () => {
  const [contact, setContact] = useState<Contact | null>(null)

  useEffect(() => {
    const fetchContact = async () => {
      const query = `*[_type == "contact"][0]{
        _id,
        email,
        phone,
        linkedin
      }`
      const data = await client.fetch(query)
      setContact(data)
    }
    fetchContact()
  }, [])

  if (!contact) return <p>Loading contact info...</p>

  return (
    <section className="py-16 px-4 text-center bg-white">
      <h2 className="text-3xl font-semibold mb-6">Contact Me</h2>
      <p className="mb-4 text-gray-600">Feel free to reach out via email or LinkedIn.</p>
      <p className="font-medium text-blue-600">{contact.email}</p>
      {contact.phone && <p className="mt-2">{contact.phone}</p>}
      {contact.linkedin && (
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mt-2 block">
          LinkedIn Profile
        </a>
      )}
    </section>
  )
}

export default Contact