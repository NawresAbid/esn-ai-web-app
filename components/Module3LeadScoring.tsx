'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, DollarSign, Clock, Zap, CheckCircle } from 'lucide-react'
import PriorityScoreCard from './PriorityScoreCard'

const G = { fontFamily: "'Space Grotesk', sans-serif" } as const
const I = { fontFamily: "'Inter', sans-serif" } as const

interface LeadData {
  companySize: string
  budget: number
  urgency: string
  employees: string
  maturity: string
}

const companyOptions = [
  { value: 'startup', label: 'Startup', sub: '1-50', score: 30 },
  { value: 'smb', label: 'PME', sub: '50-500', score: 50 },
  { value: 'mid', label: 'Mid-Market', sub: '500-2K', score: 60 },
  { value: 'enterprise', label: 'Enterprise', sub: '2K+', score: 75 },
]

const budgetRanges = [
  { value: 25000, label: '$25K', score: 5 },
  { value: 75000, label: '$75K', score: 10 },
  { value: 150000, label: '$150K', score: 15 },
  { value: 300000, label: '$300K', score: 20 },
  { value: 500000, label: '$500K+', score: 25 },
]

const urgencyOptions = [
  { value: 'long', label: 'Long terme', desc: '3-6 mois', score: 10, color: '#06b6d4' },
  { value: 'medium', label: 'Court terme', desc: '4-8 semaines', score: 20, color: '#ff00ff' },
  { value: 'high', label: 'Immédiate', desc: '< 2 semaines', score: 30, color: '#00ff00' },
]

const maturityOptions = [
  { value: 'none', label: 'Aucune', desc: 'Débutant en automation', score: 0 },
  { value: 'low', label: 'Basique', desc: 'Quelques workflows', score: 10 },
  { value: 'medium', label: 'Intermédiaire', desc: 'Processus partiels', score: 15 },
  { value: 'high', label: 'Avancé', desc: 'Bien établis', score: 20 },
]

export default function Module3LeadScoring() {
  const [data, setData] = useState<LeadData>({
    companySize: '',
    budget: 75000,
    urgency: '',
    employees: '',
    maturity: '',
  })
  const [showResult, setShowResult] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateScore = useMemo(() => {
    return (): number => {
      if (!data.companySize || !data.urgency || !data.employees || !data.maturity) return 0
      let score = 0
      const sizeOpt = companyOptions.find(o => o.value === data.companySize)
      if (sizeOpt) score += sizeOpt.score
      const budgetOpt = budgetRanges.find(o => o.value === data.budget)
      if (budgetOpt) score += budgetOpt.score
      const urgOpt = urgencyOptions.find(o => o.value === data.urgency)
      if (urgOpt) score += urgOpt.score
      const matOpt = maturityOptions.find(o => o.value === data.maturity)
      if (matOpt) score += matOpt.score
      return Math.min(Math.max(score, 0), 100)
    }
  }, [data])

  const score = calculateScore()

  const getPriorityLevel = () => {
    if (score >= 75) return { tag: 'HAUTE PRIORITÉ', color: '#00ff00', priority: 'HIGH' }
    if (score >= 50) return { tag: 'PRIORITÉ MOYENNE', color: '#ff00ff', priority: 'MEDIUM' }
    return { tag: 'FAIBLE PRIORITÉ', color: '#06b6d4', priority: 'LOW' }
  }

  const handleSubmit = async () => {
    if (!data.companySize || !data.urgency || !data.employees || !data.maturity) return
    setIsCalculating(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setShowResult(true)
    setIsCalculating(false)
  }

  const isFormValid = data.companySize && data.urgency && data.employees && data.maturity

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', padding: '60px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16, padding: '6px 14px', background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.25)' }}>
            <Zap size={14} style={{ color: '#06b6d4' }} />
            <span style={{ ...G, fontSize: 11, color: '#06b6d4', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Lead Scoring · Scoring Automatique</span>
          </div>
          <h1 style={{ ...G, fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700, marginBottom: 12, color: '#fff', lineHeight: 1.2 }}>
            Moteur de Scoring <span style={{ color: '#06b6d4', textShadow: '0 0 20px rgba(6,182,212,0.4)' }}>Intelligent</span>
          </h1>
          <p style={{ ...I, fontSize: 16, color: '#9ca3af', maxWidth: 600, lineHeight: 1.6 }}>
            Évaluez les leads en temps réel avec un scoring basé sur plusieurs facteurs d'importance.
          </p>
        </motion.div>

        {showResult ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <PriorityScoreCard score={score} priority={getPriorityLevel()} formData={data} />
            <motion.button
              onClick={() => {
                setShowResult(false)
                setData({ companySize: '', budget: 75000, urgency: '', employees: '', maturity: '' })
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                marginTop: 24,
                padding: '12px 28px',
                background: '#06b6d4',
                color: '#000',
                border: 'none',
                ...G,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                borderRadius: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              ↻ Recommencer
            </motion.button>
          </motion.div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} style={{ position: 'sticky', top: 100 }}>
              <div style={{ padding: 28, background: 'rgba(6,182,212,0.03)', border: '1px solid rgba(6,182,212,0.18)', backdropFilter: 'blur(20px)' }}>
                <h2 style={{ ...G, fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 28, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  Paramètres d'évaluation
                </h2>

                {/* Company Size */}
                <div style={{ marginBottom: 28 }}>
                  <label style={{ ...G, fontSize: 12, color: '#06b6d4', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <Building2 size={14} /> Taille de l'entreprise
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {companyOptions.map((opt) => (
                      <motion.button
                        key={opt.value}
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
                          boxShadow: data.companySize === opt.value ? '0 0 20px rgba(6,182,212,0.2)' : 'none',
                          borderRadius: 0,
                          textAlign: 'left',
                        }}
                      >
                        <div style={{ fontWeight: 600, marginBottom: 4 }}>{opt.label}</div>
                        <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>{opt.sub}</div>
                        <div style={{ fontSize: 11, color: '#06b6d4', fontWeight: 700 }}>+{opt.score}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Employees */}
                <div style={{ marginBottom: 28 }}>
                  <label style={{ ...G, fontSize: 12, color: '#06b6d4', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <Building2 size={14} /> Nombre d'employés
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {['< 50', '50-200', '200-500', '500+'].map((size) => (
                      <motion.button
                        key={size}
                        onClick={() => setData({ ...data, employees: size })}
                        whileHover={{ y: -2 }}
                        style={{
                          padding: '10px 12px',
                          background: data.employees === size ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.02)',
                          border: `1px solid ${data.employees === size ? 'rgba(6,182,212,0.4)' : 'rgba(255,255,255,0.08)'}`,
                          color: '#e2e8f0',
                          ...I,
                          fontSize: 13,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          borderRadius: 0,
                        }}
                      >
                        {size}
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
                        onClick={() => setData({ ...data, budget: range.value })}
                        whileHover={{ y: -2 }}
                        style={{
                          padding: '10px 12px',
                          background: data.budget === range.value ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.02)',
                          border: `1px solid ${data.budget === range.value ? 'rgba(6,182,212,0.4)' : 'rgba(255,255,255,0.08)'}`,
                          color: '#e2e8f0',
                          ...I,
                          fontSize: 12,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          borderRadius: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <div style={{ fontWeight: 600 }}>{range.label}</div>
                        <div style={{ fontSize: 10, color: '#06b6d4' }}>+{range.score}</div>
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
                          borderRadius: 0,
                        }}
                      >
                        <Clock size={14} style={{ color: opt.color, flexShrink: 0 }} />
                        <div style={{ flex: 1, textAlign: 'left' }}>
                          <div style={{ ...G, fontSize: 13, fontWeight: 600, color: opt.color }}>{opt.label}</div>
                          <div style={{ ...I, fontSize: 11, color: '#6b7280' }}>{opt.desc}</div>
                        </div>
                        <span style={{ ...G, fontSize: 11, color: opt.color, fontWeight: 700 }}>+{opt.score}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Maturity */}
                <div style={{ marginBottom: 28 }}>
                  <label style={{ ...G, fontSize: 12, color: '#06b6d4', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <Zap size={14} /> Maturité en automation
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {maturityOptions.map((opt) => (
                      <motion.button
                        key={opt.value}
                        onClick={() => setData({ ...data, maturity: opt.value })}
                        whileHover={{ x: 4 }}
                        style={{
                          padding: '12px 14px',
                          background: data.maturity === opt.value ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.02)',
                          border: `1px solid ${data.maturity === opt.value ? 'rgba(6,182,212,0.4)' : 'rgba(255,255,255,0.08)'}`,
                          color: '#e2e8f0',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          textAlign: 'left',
                          borderRadius: 0,
                        }}
                      >
                        <div style={{ ...G, fontSize: 13, fontWeight: 600, color: '#06b6d4', marginBottom: 4 }}>{opt.label}</div>
                        <div style={{ ...I, fontSize: 11, color: '#6b7280' }}>{opt.desc}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  onClick={handleSubmit}
                  disabled={!isFormValid || isCalculating}
                  whileHover={isFormValid && !isCalculating ? { scale: 1.02 } : {}}
                  whileTap={isFormValid && !isCalculating ? { scale: 0.98 } : {}}
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
                  {isCalculating ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} style={{ width: 14, height: 14, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%' }} />
                      Calcul en cours...
                    </>
                  ) : (
                    <>
                      CALCULER LE SCORE
                      <Zap size={14} />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Score Preview */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} style={{ position: 'sticky', top: 100 }}>
              <div style={{ padding: 32, background: 'rgba(6,182,212,0.02)', border: '1px solid rgba(6,182,212,0.15)', backdropFilter: 'blur(20px)' }}>
                <h3 style={{ ...G, fontSize: 14, color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>
                  Score en temps réel
                </h3>

                {/* Large Score */}
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                  <motion.div
                    key={score}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      fontSize: 'clamp(48px, 12vw, 96px)',
                      fontWeight: 700,
                      ...G,
                      background: 'linear-gradient(135deg, #06b6d4, #00ff00)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      marginBottom: 16,
                    }}
                  >
                    {score}
                  </motion.div>

                  <motion.div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 16px',
                      background: `${getPriorityLevel().color}15`,
                      border: `1px solid ${getPriorityLevel().color}40`,
                      borderRadius: 0,
                      marginBottom: 32,
                    }}
                  >
                    <CheckCircle size={14} style={{ color: getPriorityLevel().color }} />
                    <span style={{ ...G, fontSize: 12, fontWeight: 700, color: getPriorityLevel().color, letterSpacing: '0.05em' }}>
                      {getPriorityLevel().tag}
                    </span>
                  </motion.div>
                </div>

                {/* Breakdown */}
                <div>
                  <h4 style={{ ...G, fontSize: 11, color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    Détail des points
                  </h4>

                  <AnimatePresence>
                    {[
                      { label: 'Taille entreprise', value: companyOptions.find(o => o.value === data.companySize)?.score || 0 },
                      { label: 'Budget annuel', value: budgetRanges.find(o => o.value === data.budget)?.score || 0 },
                      { label: 'Timeline', value: urgencyOptions.find(o => o.value === data.urgency)?.score || 0 },
                      { label: 'Maturity', value: maturityOptions.find(o => o.value === data.maturity)?.score || 0 },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                      >
                        <span style={{ ...I, fontSize: 12, color: '#9ca3af' }}>{item.label}</span>
                        <span style={{ ...G, fontSize: 12, fontWeight: 700, color: '#06b6d4' }}>
                          {item.value > 0 && '+'}
                          {item.value}
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <motion.div
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', marginTop: 12, borderTop: '1px solid rgba(6,182,212,0.2)' }}
                  >
                    <span style={{ ...G, fontSize: 13, fontWeight: 700, color: '#fff' }}>Total</span>
                    <motion.span
                      key={score}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      style={{ ...G, fontSize: 16, fontWeight: 700, color: '#06b6d4' }}
                    >
                      {score}/100
                    </motion.span>
                  </motion.div>
                </div>

                {/* Info */}
                <div style={{ marginTop: 24, padding: 12, background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.1)', borderRadius: 0 }}>
                  <p style={{ ...I, fontSize: 11, color: '#6b7280', lineHeight: 1.6 }}>
                    Le score met à jour en temps réel basé sur vos sélections. Remplissez tous les champs pour voir le scoring complet.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
