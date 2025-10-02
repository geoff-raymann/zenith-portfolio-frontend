// Navbar.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Menu, Sun, Moon } from 'lucide-react'
import logo from '../../../public/logo.png'

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Portfolio', href: '#projects' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About Us', href: '#bio' },
  { label: 'Contact Us', href: '#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto'
    if (menuOpen && menuRef.current) {
      const focusable = menuRef.current.querySelectorAll('a')
      if (focusable.length) (focusable[0] as HTMLElement).focus()
    }
  }, [menuOpen])

  // Keyboard navigation for closing menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (menuOpen && e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  // Dark mode effect
  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    } else {
      document.documentElement.classList.remove('dark')
      setDarkMode(false)
    }
  }, [])

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setDarkMode(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setDarkMode(true)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gradient-to-br from-black/90 to-gray-900/90 shadow-lg backdrop-blur-md'
          : 'bg-gradient-to-br from-black to-gray-900'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo links to homepage */}
        <Link href="#" aria-label="Home">
          <Image src={logo} alt="Logo" width={50} height={50} className="cursor-pointer" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 justify-center space-x-10" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="uppercase font-extrabold tracking-wide text-base font-sans text-white hover:text-yellow-400 transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Dark/Light Toggle */}
        <button
          onClick={toggleDarkMode}
          className="ml-4 text-yellow-400 hover:text-white transition"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-yellow-400 z-50 ml-2"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center space-y-8 z-40"
          tabIndex={-1}
          aria-modal="true"
          role="dialog"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="uppercase font-extrabold tracking-wide text-2xl font-sans text-white hover:text-yellow-400 transition"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={toggleDarkMode}
            className="mt-8 text-yellow-400 hover:text-white transition"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={32} /> : <Moon size={32} />}
          </button>
        </div>
      )}
    </header>
  )
}
