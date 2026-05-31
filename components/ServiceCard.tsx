'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  accent: string
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  accent,
}: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="glass-card p-6 group cursor-pointer transition-all duration-300 relative"
      style={{
        borderColor: accent + '40',
      }}
    >
      {/* Icon */}
      <div
        className="mb-4 inline-block p-3 rounded-lg transition-all duration-300 glass-card"
        style={{
          backgroundColor: accent + '15',
          borderColor: accent + '40',
        }}
      >
        <Icon size={24} style={{ color: accent }} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-3 tracking-tight">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-400 leading-relaxed mb-4">{description}</p>

      {/* Hover effect - neon border glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-lg pointer-events-none transition-opacity duration-300"
        style={{
          boxShadow: `inset 0 0 20px ${accent}20`,
        }}
      />
    </motion.div>
  )
}
