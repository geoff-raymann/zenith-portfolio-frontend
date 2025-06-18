// components/TestimonialsClient.tsx
'use client'
import Image from 'next/image'

interface Testimonial {
  _id: string
  name: string
  role: string
  company: string
  quote: string
  avatar?: {
    asset: {
      url: string
    }
  }
}

export default function TestimonialsClient({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Testimonials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-md p-6 text-center flex flex-col items-center space-y-4"
            >
              {t.avatar?.asset?.url && (
                <Image
                  src={t.avatar.asset.url}
                  alt={t.name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              )}
              <p className="text-gray-700 dark:text-gray-300 italic">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role} at {t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
