// Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Menu } from 'lucide-react'
import logo from '../../../public/logo.png' // Make sure your logo is available in public folder

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact Us', href: '#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => setMenuOpen(!menuOpen)

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [menuOpen])

  return (
    <header className="bg-gradient-to-br from-black to-gray-900 text-white py-4 z-50 relative">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6">
        <Image src={logo} alt="Logo" width={50} height={50} />

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 justify-center space-x-12 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-yellow-400 transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-yellow-400 z-50">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center space-y-6 z-40">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-lg px-6 py-3 bg-gray-800/70 rounded-2xl w-64 text-center hover:bg-gray-700 transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
