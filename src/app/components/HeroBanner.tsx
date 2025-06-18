'use client'

import Image from 'next/image'
import { urlForImage } from '@/lib/sanityImage'

interface HeroData {
  _id: string
  headline: string
  subheadline: string
  ctaText: string
  ctaLink: string
  image: any
}

export default function HeroBanner({ hero }: { hero: HeroData }) {
  return (
    <section className="bg-white dark:bg-gray-950 py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            {hero.headline}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">{hero.subheadline}</p>
          <a
            href={hero.ctaLink}
            className="inline-block px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition"
          >
            {hero.ctaText}
          </a>
        </div>
        {hero.image && (
          <div className="w-full h-[300px] md:h-[400px] relative">
            <Image
              src={urlForImage(hero.image).width(1000).url()}
              alt="Hero Image"
              fill
              className="object-cover rounded-xl shadow-md"
            />
          </div>
        )}
      </div>
    </section>
  )
}
