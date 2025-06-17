
import { client } from '@/lib/sanity'
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface ContactInfo {
  _id: string
  email: string
  phone: string
  linkedin: string
  location: string
}

async function getContact(): Promise<ContactInfo> {
  const query = `*[_type == "contact"][0]{
    _id,
    email,
    phone,
    linkedin,
    location
  }`
  return await client.fetch(query)
}

export default async function Contact() {
  const contact = await getContact()

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Contact Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-md flex items-start gap-4">
            <MapPin className="text-blue-500 w-6 h-6 mt-1" />
            <div>
              <h3 className="text-lg font-semibold">Location</h3>
              <p className="text-gray-700 dark:text-gray-300">{contact.location}</p>
            </div>
          </div>

          <div className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-md flex items-start gap-4">
            <Phone className="text-green-500 w-6 h-6 mt-1" />
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-gray-700 dark:text-gray-300">{contact.phone}</p>
            </div>
          </div>

          <div className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-md flex items-start gap-4">
            <Mail className="text-red-500 w-6 h-6 mt-1" />
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-gray-700 dark:text-gray-300">{contact.email}</p>
            </div>
          </div>

          <div className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-md flex items-start gap-4">
            <Linkedin className="text-blue-600 w-6 h-6 mt-1" />
            <div>
              <h3 className="text-lg font-semibold">LinkedIn</h3>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {contact.linkedin}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
