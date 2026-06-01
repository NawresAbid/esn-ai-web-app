'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, DollarSign, Clock, Zap, User, Mail } from 'lucide-react'

const G = { fontFamily: "'Space Grotesk', sans-serif" } as const
const I = { fontFamily: "'Inter', sans-serif" } as const

interface LeadData {
  name: string
  email: string
  companySize: number // Changé en nombre pour n8n
  budget: number      // Changé en nombre pour n8n
  urgency: number     // Changé en nombre pour n8n
}

// Les valeurs (value) correspondent maintenant aux points bruts attendus par le nœud n8n Code
const companyOptions = [
  { value: 8, label: 'Startup', sub: '1-50' },
  { value: 15, label: 'PME', sub: '50-500' },
  { value: 25, label: 'Mid-Market', sub: '500-2K' },
  { value: 40, label: 'Enterprise', sub: '2K+' },
]

const budgetRanges = [
  { value: 10, label: '$25K' },
  { value: 20, label: '$75K' },
  { value: 35, label: '$150K' },
  { value: 50, label: '$300K' },
  { value: 75, label: '$500K+' },
]

const urgencyOptions = [
  { value: 5, label: 'Long terme', desc: '3-6 mois', color: '#06b6d4' },
  { value: 15, label: 'Court terme', desc: '4-8 semaines', color: '#ff00ff' },
  { value: 30, label: 'Immédiate', desc: '< 2 semaines', color: '#00ff00' },
]

export default function Module3LeadScoring() {
  const [data, setData] = useState<LeadData>({
    name: '',
    email: '',
    companySize: 0,
    budget: 10,
    urgency: 0,
  })
  const [showResult, setShowResult] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!data.name || !data.email || data.companySize === 0 || data.urgency === 0) return

    setIsSubmitting(true)
    setError(null)

    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL_LEADSCORING

    if (!webhookUrl) {
      setError("Configuration manquante : URL du webhook n8n introuvable.")
      setIsSubmitting(false)
      return
    }

    try {
      // Construction du payload correspondant exactement aux clés lues par le nœud "Code" de n8n
      const payload = {
        name: data.name.trim(),
        email: data.email.trim(),
        company_size: data.companySize, // Transmis sous forme de nombre entier
        budget: data.budget,             // Transmis sous forme de nombre entier
        urgency: data.urgency,           // Transmis sous forme de nombre entier
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      setShowResult(true)
    } catch (err) {
      console.error("Erreur d'envoi webhook:", err)
      setError("Une erreur est survenue lors de la transmission des données. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = data.name && data.email && data.companySize > 0 && data.urgency > 0

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', padding: '60px 24px' }}>
      <div style={{ maxWidth: 650, margin: '0 auto' }}>
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 48, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16, padding: '6px 14px', background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.25)' }}>
            <Zap size={14} style={{ color: '#06b6d4' }} />
            <span style={{ ...G, fontSize: 11, color: '#06b6d4', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Lead Generation · Sync Airtable</span>
          </div>
          <h1 style={{ ...G, fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, marginBottom: 12, color: '#fff', lineHeight: 1.2 }}>
            Moteur de Scoring <span style={{ color: '#06b6d4', textShadow: '0 0 20px rgba(6,182,212,0.4)' }}>Intelligent</span>
          </h1>
          <p style={{ ...I, fontSize: 15, color: '#9ca3af', margin: '0 auto', maxWidth: 500, lineHeight: 1.6 }}>
            Remplissez le formulaire. Les scores numériques et l'envoi d'emails automatisés sont gérés par n8n.
          </p>
        </motion.div>

        {showResult ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: 40, background: 'rgba(0,255,0,0.02)', border: '1px solid rgba(0,255,0,0.2)' }}>
            <h2 style={{ ...G, color: '#00ff00', fontSize: 24, marginBottom: 12 }}>✓ Envoyé avec succès !</h2>
            <p style={{ ...I, color: '#9ca3af', fontSize: 14, marginBottom: 24 }}>Le lead a été transmis. Le traitement et le scoring sont en cours d'exécution.</p>
            <motion.button
              onClick={() => {
                setShowResult(false)
                setData({ name: '', email: '', companySize: 0, budget: 10, urgency: 0 })
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '12px 28px',
                background: '#06b6d4',
                color: '#000',
                border: 'none',
                ...G,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ↻ Ajouter un autre lead
            </motion.button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ padding: 28, background: 'rgba(6,182,212,0.03)', border: '1px solid rgba(6,182,212,0.18)', backdropFilter: 'blur(20px)' }}>
              <h2 style={{ ...G, fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 28, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                Informations du Lead
              </h2>

              {/* Identity Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
                <div>
                  <label style={{ ...G, fontSize: 12, color: '#06b6d4', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <User size={14} /> Nom Complet
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Nawres Abid"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#fff',
                      ...I,
                      fontSize: 14,
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ ...G, fontSize: 12, color: '#06b6d4', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <Mail size={14} /> Adresse Email
                  </label>
                  <input
                    type="email"
                    placeholder="Ex: nom@entreprise.com"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#fff',
                      ...I,
                      fontSize: 14,
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Company Size */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ ...G, fontSize: 12, color: '#06b6d4', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <Building2 size={14} /> Taille de l'entreprise
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {companyOptions.map((opt) => (
                    <motion.button
                      key={opt.value}
                      type="button"
                      onClick={() => setData({ ...data, companySize: opt.value })}
                      whileHover={{ y: -2 }}
                      style={{
                        padding: '12px 14px',
                        background: data.companySize === opt.value ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${data.companySize === opt.value ? 'rgba(6,182,212,0.4)' : 'rgba(255,255,255,0.08)'}`,
                        color: '#e2e8f0',
                        ...I,
                        fontSize: 13,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>{opt.label}</div>
                      <div style={{ fontSize: 11, color: '#6b7280' }}>{opt.sub} employés</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ ...G, fontSize: 12, color: '#06b6d4', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <DollarSign size={14} /> Budget annuel
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: 8 }}>
                  {budgetRanges.map((range) => (
                    <motion.button
                      key={range.value}
                      type="button"
                      onClick={() => setData({ ...data, budget: range.value })}
                      whileHover={{ y: -2 }}
                      style={{
                        padding: '12px 12px',
                        background: data.budget === range.value ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${data.budget === range.value ? 'rgba(6,182,212,0.4)' : 'rgba(255,255,255,0.08)'}`,
                        color: '#e2e8f0',
                        ...I,
                        fontSize: 12,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div style={{ fontWeight: 600 }}>{range.label}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Urgency */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ ...G, fontSize: 12, color: '#06b6d4', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <Clock size={14} /> Timeline / Urgence
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {urgencyOptions.map((opt) => (
                    <motion.button
                      key={opt.value}
                      type="button"
                      onClick={() => setData({ ...data, urgency: opt.value })}
                      whileHover={{ x: 4 }}
                      style={{
                        padding: '12px 14px',
                        background: data.urgency === opt.value ? `${opt.color}15` : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${data.urgency === opt.value ? `${opt.color}40` : 'rgba(255,255,255,0.08)'}`,
                        color: '#e2e8f0',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                      }}
                    >
                      <Clock size={14} style={{ color: opt.color, flexShrink: 0 }} />
                      <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ ...G, fontSize: 13, fontWeight: 600, color: opt.color }}>{opt.label}</div>
                        <div style={{ ...I, fontSize: 11, color: '#6b7280' }}>{opt.desc}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {error && (
                <div style={{ ...I, color: '#ef4444', fontSize: 13, marginBottom: 16, textAlign: 'center' }}>
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                whileHover={isFormValid && !isSubmitting ? { scale: 1.02 } : {}}
                whileTap={isFormValid && !isSubmitting ? { scale: 0.98 } : {}}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  background: isFormValid ? '#06b6d4' : '#374151',
                  color: isFormValid ? '#000' : '#6b7280',
                  border: 'none',
                  ...G,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  cursor: isFormValid ? 'pointer' : 'not-allowed',
                  opacity: isFormValid ? 1 : 0.5,
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} style={{ width: 14, height: 14, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%' }} />
                    Synchronisation n8n...
                  </>
                ) : (
                  <>
                    ENVOYER À LA BASE
                    <Zap size={14} />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}