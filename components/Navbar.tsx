'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/demos', label: 'Demos' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = (href: string) => {
    return pathname === href || (href !== '/' && pathname.startsWith(href))
  }

  return (
    <nav className="fixed top-0 w-full z-50 glass-card backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-lg font-bold tracking-wider"
            style={{ color: '#06b6d4' }}
          >
            ESN
          </motion.div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium transition-colors duration-200"
              style={{
                color: isActive(item.href) ? '#06b6d4' : '#ffffff',
              }}
            >
              {item.label}
              {isActive(item.href) && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-[-4px] left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#06b6d4' }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
