'use client'

import Image from 'next/image'
import { urlForImage } from '@/lib/sanityImage'
import { ReactNode } from 'react'

interface HeroData {
  _id: string
  headline: string
  subheadline: string
  ctaText: string
  ctaLink: string
  image: any
}

interface HeroBannerProps {
  hero: HeroData
  actions?: ReactNode
}

export default function HeroBanner({ hero, actions }: HeroBannerProps) {
  const bgImageUrl = hero.image ? urlForImage(hero.image).width(1600).url() : undefined

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-24 px-6 flex items-center min-h-[70vh]">
      {/* Animated background image */}
      {bgImageUrl && (
        <div className="absolute inset-0 -z-20 pointer-events-none">
          <Image
            src={bgImageUrl}
            alt="Background"
            fill
            className="object-cover w-full h-full opacity-25 blur-md animate-bg-zoom"
            priority
          />
        </div>
      )}
      {/* Decorative blurred circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 opacity-30 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 opacity-30 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 z-10">
        <div className="space-y-8 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg animate-gradient">
            {hero.headline}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 font-medium mb-4 animate-fade-in">
            {hero.subheadline}
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-6">
            <a
              href={hero.ctaLink}
              className="px-8 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:scale-105 hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200"
            >
              {hero.ctaText}
            </a>
            <a
              href="#bio"
              className="px-8 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-pink-500 to-yellow-400 text-white shadow-lg hover:scale-105 hover:from-yellow-400 hover:to-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all duration-200"
            >
              About Me
            </a>
            <a
              href="#projects"
              className="px-8 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-green-500 to-blue-400 text-white shadow-lg hover:scale-105 hover:from-blue-400 hover:to-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-200"
            >
              Portfolio
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-purple-500 to-pink-400 text-white shadow-lg hover:scale-105 hover:from-pink-400 hover:to-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-200"
            >
              Contact
            </a>
          </div>
        </div>
        {hero.image && (
          <div className="w-full h-[320px] md:h-[420px] relative flex items-center justify-center animate-fade-in">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/30 via-purple-400/30 to-pink-400/30 blur-2xl"></div>
            <Image
              src={urlForImage(hero.image).width(1000).url()}
              alt="Hero"
              fill
              className="object-cover rounded-xl shadow-2xl border-4 border-white dark:border-gray-900"
              priority
            />
          </div>
        )}
      </div>
      {/* Animations */}
      <style jsx>{`
        .animate-bg-zoom {
          animation: bgZoom 18s ease-in-out infinite alternate;
        }
        @keyframes bgZoom {
          0% { transform: scale(1) translateY(0); opacity: 0.22; }
          50% { transform: scale(1.08) translateY(-10px); opacity: 0.28; }
          100% { transform: scale(1.15) translateY(-20px); opacity: 0.22; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 4s ease-in-out infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-fade-in {
          animation: fadeInUp 1s cubic-bezier(.39,.575,.565,1) both;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </section>
  )
}
