'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 border border-white/5 rounded-lg text-center neon-glow-cyan"
      >
        <CheckCircle size={48} className="mx-auto mb-4" style={{ color: '#00ff00' }} />
        <h2 className="text-2xl font-bold mb-2">Message Received!</h2>
        <p className="text-gray-400 mb-6">
          Thank you! Watch your request traverse our automation pipeline in the Demos page.
        </p>
        <Link
          href="/demos#module1"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          style={{
            backgroundColor: '#06b6d4',
            color: '#000000',
          }}
        >
          View in Demos <ArrowRight size={16} />
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-8 border-2 rounded-lg neon-glow-cyan max-w-2xl mx-auto"
      style={{
        borderColor: '#06b6d4' + '40',
      }}
    >
      {/* Name Field */}
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-semibold mb-2">
          Nom
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Jean Dupont"
          required
          className="glass-input w-full text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
        />
      </div>

      {/* Email Field */}
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-semibold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="jean@entreprise.com"
          required
          className="glass-input w-full text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
        />
      </div>

      {/* Project Description Field */}
      <div className="mb-8">
        <label htmlFor="project" className="block text-sm font-semibold mb-2">
          Description du Projet
        </label>
        <textarea
          id="project"
          name="project"
          value={formData.project}
          onChange={handleChange}
          placeholder="Décrivez votre projet et vos besoins en automation..."
          required
          rows={5}
          className="glass-input w-full text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50"
        style={{
          backgroundColor: loading ? '#888888' : '#06b6d4',
          color: '#000000',
        }}
      >
        {loading ? (
          <>
            <div className="animate-spin-slow">
              <Send size={18} />
            </div>
            Envoi en cours...
          </>
        ) : (
          <>
            Envoyer ma Demande
            <Send size={18} />
          </>
        )}
      </button>
    </motion.form>
  )
}
