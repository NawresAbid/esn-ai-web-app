'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Empower Your Business
          </h1>
          <div className="relative inline-block">
            <h2
              className="text-4xl md:text-6xl font-bold mb-8 animate-gradient-shift"
              style={{
                backgroundImage: 'linear-gradient(to right, #06b6d4, #ff00ff, #06b6d4)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              with Next-Gen AI Agents
            </h2>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Deploy autonomous n8n workflows across your entire tech stack. Integrate AI, automate processes, and scale operations effortlessly.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            href="/demos"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-110 group"
            style={{
              backgroundColor: '#06b6d4',
              color: '#000000',
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 50px rgba(6, 182, 212, 0.6)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.3)'
            }}
          >
            Explore Our Automations
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={20} />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
