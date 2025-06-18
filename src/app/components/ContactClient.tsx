'use client'

import { Mail, Phone, MapPin, Linkedin } from 'lucide-react'
import { ContactInfo } from '../sections/ContactServer'

interface Props {
  contact: ContactInfo
}

export default function ContactClient({ contact }: Props) {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Contact Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card icon={<MapPin className="text-blue-500 w-6 h-6 mt-1" />} title="Location">
            {contact.location}
          </Card>
          <Card icon={<Phone className="text-green-500 w-6 h-6 mt-1" />} title="Phone">
            {contact.phone}
          </Card>
          <Card icon={<Mail className="text-red-500 w-6 h-6 mt-1" />} title="Email">
            {contact.email}
          </Card>
          <Card icon={<Linkedin className="text-blue-600 w-6 h-6 mt-1" />} title="LinkedIn">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {contact.linkedin}
            </a>
          </Card>
        </div>
      </div>
    </section>
  )
}

function Card({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-md flex items-start gap-4">
      {icon}
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm">{children}</p>
      </div>
    </div>
  )
}
