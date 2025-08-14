import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center space-y-4">
        <Image
          src="/logo.png" // ✅ Correct usage for image in public folder
          alt="Zenith Inc Logo"
          width={50}
          height={50}
          className="mb-2"
        />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {currentYear} <strong>Zenith Inc*</strong>. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
