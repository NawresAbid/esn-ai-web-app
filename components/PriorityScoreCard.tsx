'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface PriorityScoreCardProps {
  score: number
  priority: 'HAUTE' | 'MOYENNE' | 'BASSE'
  emailTemplate: string
}

export default function PriorityScoreCard({
  score,
  priority,
  emailTemplate,
}: PriorityScoreCardProps) {
  const getPriorityColor = () => {
    switch (priority) {
      case 'HAUTE':
        return '#ff0000'
      case 'MOYENNE':
        return '#ffaa00'
      case 'BASSE':
        return '#00ff00'
      default:
        return '#06b6d4'
    }
  }

  const getTemplateContent = () => {
    switch (priority) {
      case 'HAUTE':
        return `function sendHighPriorityEmail(contact) {
  return emailService.send({
    template: "DIRECT_RESPONSE",
    to: contact.email,
    subject: "Proposition Personnalisée - Action Immédiate",
    priority: "urgent"
  });
}`
      case 'MOYENNE':
        return `function sendMediumPriorityEmail(contact) {
  return emailService.send({
    template: "NURTURE_SEQUENCE",
    to: contact.email,
    subject: "À Propos de Vos Besoins en Automation",
    schedule: "optimized"
  });
}`
      default:
        return `function sendLowPriorityEmail(contact) {
  return emailService.send({
    template: "EDUCATIONAL_CONTENT",
    to: contact.email,
    subject: "Ressources et Guides",
    frequency: "weekly"
  });
}`
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-8 rounded-lg border border-white/5 space-y-6"
    >
      {/* Score Display */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          <div className="text-6xl font-bold tracking-tight" style={{ color: '#06b6d4' }}>
            {score}
          </div>
          <p className="text-gray-400 text-sm mt-1">Priority Score</p>
        </motion.div>
      </div>

      {/* Priority Tag */}
      <div className="flex justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="px-6 py-2 rounded-full font-bold text-sm"
          style={{
            backgroundColor: getPriorityColor() + '20',
            border: `2px solid ${getPriorityColor()}`,
            color: getPriorityColor(),
          }}
        >
          {priority} PRIORITÉ
        </motion.div>
      </div>

      {/* Code Preview */}
      <div>
        <label className="block text-sm font-semibold mb-3">
          Email Template Sélectionné:
        </label>
        <motion.pre
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-4 rounded-lg bg-black/60 font-mono text-xs leading-relaxed overflow-x-auto border border-white/10"
          style={{ color: '#00ff00' }}
        >
          {getTemplateContent()}
        </motion.pre>
      </div>

      {/* CTA Button */}
      <Link
        href="/demos#module1"
        className="inline-block w-full text-center px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105"
        style={{
          backgroundColor: '#06b6d4',
          color: '#000000',
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
        }}
      >
        <div className="flex items-center justify-center gap-2">
          Voir le Résultat en Action
          <ArrowRight size={16} />
        </div>
      </Link>
    </motion.div>
  )
}
