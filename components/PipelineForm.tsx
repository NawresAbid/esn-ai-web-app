'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

interface PipelineFormProps {
  onSubmit: (data: { name: string; email: string; company: string; message: string }) => void
  isExecuting: boolean
}

export default function PipelineForm({
  onSubmit,
  isExecuting,
}: PipelineFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isExecuting) {
      onSubmit(formData)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium mb-2">NOM COMPLET</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Jean Dupont"
          disabled={isExecuting}
          className="glass-input w-full text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50"
        />
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium mb-2">EMAIL</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="jean@entreprise.com"
          disabled={isExecuting}
          className="glass-input w-full text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50"
        />
      </div>

      {/* Company Field */}
      <div>
        <label className="block text-sm font-medium mb-2">ENTREPRISE</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Acme Corp"
          disabled={isExecuting}
          className="glass-input w-full text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50"
        />
      </div>

      {/* Message Field */}
      <div>
        <label className="block text-sm font-medium mb-2">MESSAGE</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Décrivez votre demande..."
          disabled={isExecuting}
          rows={4}
          className="glass-input w-full text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50 resize-none"
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isExecuting}
        whileHover={{ scale: isExecuting ? 1 : 1.02 }}
        whileTap={{ scale: isExecuting ? 1 : 0.98 }}
        className="w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
        style={{
          backgroundColor: isExecuting ? '#666666' : '#06b6d4',
          color: '#000000',
          boxShadow: isExecuting ? 'none' : '0 0 20px rgba(6, 182, 212, 0.3)',
        }}
      >
        {isExecuting ? (
          <>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
              <Zap size={18} />
            </motion.div>
            Exécution en cours...
          </>
        ) : (
          <>
            Déclencher l&apos;Automation ↗
            <Zap size={18} />
          </>
        )}
      </motion.button>
    </motion.form>
  )
}
