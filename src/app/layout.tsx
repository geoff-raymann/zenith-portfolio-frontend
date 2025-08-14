// layout.tsx
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Zenith Portfolio',
  description: 'Portfolio site for showcasing my work',
}

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-black text-gray-900 dark:text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
