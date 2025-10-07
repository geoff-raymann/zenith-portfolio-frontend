// Navbar.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About Us', href: '/bio' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Geoff AI', href: '/geoff-ai' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const pathname = usePathname()
  const navbarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Sync with localStorage and system preference
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

  const isGeoffAI = pathname === '/geoff-ai'

  useEffect(() => {
    if (!isGeoffAI) return
    const hoverZone = document.querySelector('.geoff-ai-navbar-hover-zone')
    const navbar = navbarRef.current
    if (!hoverZone || !navbar) return

    const showNavbar = () => navbar.classList.add('reveal')
    const hideNavbar = () => navbar.classList.remove('reveal')

    hoverZone.addEventListener('mouseenter', showNavbar)
    hoverZone.addEventListener('mouseleave', hideNavbar)
    navbar.addEventListener('mouseenter', showNavbar)
    navbar.addEventListener('mouseleave', hideNavbar)

    return () => {
      hoverZone.removeEventListener('mouseenter', showNavbar)
      hoverZone.removeEventListener('mouseleave', hideNavbar)
      navbar.removeEventListener('mouseenter', showNavbar)
      navbar.removeEventListener('mouseleave', hideNavbar)
    }
  }, [isGeoffAI])

  return (
    <header
      ref={navbarRef}
      className={`fixed top-0 left-0 w-full z-50 bg-gradient-to-br from-black to-gray-900 dark:from-gray-900 dark:to-black transition-colors duration-500 ${isGeoffAI ? 'geoff-ai-navbar' : ''}`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo links to homepage */}
        <Link href="/" aria-label="Home">
          <Image src="/logo.png" alt="Logo" width={50} height={50} className="cursor-pointer" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 justify-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`uppercase font-extrabold tracking-wide text-base font-sans transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400
                ${pathname === link.href
                  ? 'text-yellow-400 underline underline-offset-4'
                  : 'text-white dark:text-gray-100 hover:text-yellow-400 dark:hover:text-yellow-300'}
              `}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Dark/Light Toggle */}
        <button
          onClick={toggleDarkMode}
          className="ml-4 text-yellow-400 hover:text-white dark:hover:text-yellow-300 transition-colors duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-pressed={darkMode}
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden ml-2 text-yellow-400 z-50"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden fixed inset-0 bg-black/95 flex flex-col items-center justify-center space-y-8 z-40">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`uppercase font-extrabold tracking-wide text-2xl font-sans transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400
                ${pathname === link.href
                  ? 'text-yellow-400 underline underline-offset-4'
                  : 'text-white dark:text-gray-100 hover:text-yellow-400 dark:hover:text-yellow-300'}
              `}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}

          {/* Dark/Light Toggle Mobile */}
          <button
            onClick={toggleDarkMode}
            className="mt-8 text-yellow-400 hover:text-white dark:hover:text-yellow-300 transition-colors duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={darkMode}
          >
            {darkMode ? <Sun size={32} /> : <Moon size={32} />}
          </button>
        </nav>
      )}
    </header>
  )
}
