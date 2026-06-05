'use client'

import { useState } from 'react'
import { Building2, DollarSign, Clock, Zap, User, Mail, Send, RotateCcw, CheckCircle } from 'lucide-react'

interface LeadData {
  name: string
  email: string
  company_size: number
  budget: number
  urgency: number
}

const companyOptions = [
  { value: 8,  label: 'Startup',     sub: '1–50 employés' },
  { value: 15, label: 'PME',          sub: '50–500 employés' },
  { value: 25, label: 'Mid-market',   sub: '500–2 000 employés' },
  { value: 40, label: 'Enterprise',   sub: '2 000+ employés' },
]

const budgetOptions = [
  { value: 10, label: '$25K' },
  { value: 20, label: '$75K' },
  { value: 35, label: '$150K' },
  { value: 50, label: '$300K' },
  { value: 75, label: '$500K+' },
]

const urgencyOptions = [
  { value: 5,  label: 'Projet long terme', sub: '3–6 mois',            color: '#1D9E75', bg: 'rgba(29,158,117,.08)',  border: 'rgba(29,158,117,.35)' },
  { value: 15, label: 'Court terme',        sub: '4–8 semaines',        color: '#BA7517', bg: 'rgba(186,117,23,.08)',  border: 'rgba(186,117,23,.35)' },
  { value: 30, label: 'Besoin immédiat',    sub: 'Moins de 2 semaines', color: '#E24B4A', bg: 'rgba(226,75,74,.08)',   border: 'rgba(226,75,74,.35)' },
]

const EMPTY: LeadData = { name: '', email: '', company_size: 0, budget: 10, urgency: 0 }

export default function Module3LeadScoring() {
  const [data, setData]             = useState<LeadData>(EMPTY)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError]           = useState<string | null>(null)

  const isValid =
    data.name.trim() !== '' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
    data.company_size > 0 &&
    data.urgency > 0

  const handleSubmit = async () => {
    if (!isValid || isSubmitting) return
    setIsSubmitting(true)
    setError(null)

    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL_LEADSCORING
    if (!webhookUrl) {
      setError('Configuration manquante : NEXT_PUBLIC_N8N_WEBHOOK_URL_LEADSCORING introuvable.')
      setIsSubmitting(false)
      return
    }

    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:         data.name.trim(),
          email:        data.email.trim(),
          company_size: data.company_size,
          budget:       data.budget,
          urgency:      data.urgency,
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setShowSuccess(true)
    } catch {
      setError('Erreur de transmission. Vérifiez la connexion et réessayez.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const reset = () => {
    setData(EMPTY)
    setShowSuccess(false)
    setError(null)
  }

  const progress = [
    data.name || data.email,
    data.company_size > 0,
    data.budget > 0,
    data.urgency > 0,
  ]

  // ─── Shared style tokens ──────────────────────────────────────────────
  const card: React.CSSProperties = {
    background: '#111',
    border: '1px solid rgba(255,255,255,.08)',
    borderRadius: 12,
    padding: '20px 24px',
    marginBottom: 12,
  }

  const sectionTitle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 12,
    fontWeight: 600,
    color: '#6b7280',
    letterSpacing: '.08em',
    textTransform: 'uppercase',
    marginBottom: 14,
  }

  // ─── Render ───────────────────────────────────────────────────────────
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', padding: '48px 20px', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: 580, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 28, textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 12px', borderRadius: 6,
            background: 'rgba(55,138,221,.08)', border: '1px solid rgba(55,138,221,.2)',
            fontSize: 11, color: '#378ADD', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 14,
          }}>
            <Zap size={12} /> Lead scoring · Sync Airtable
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>
            Qualifier un lead
          </h1>
          <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
            Le scoring et les notifications sont calculés automatiquement par n8n.
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          {progress.map((done, i) => (
            <div key={i} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: done ? '#378ADD' : 'rgba(255,255,255,.1)',
              transition: 'background .3s',
            }} />
          ))}
        </div>

        {showSuccess ? (
          /* ── Success state ── */
          <div style={{
            textAlign: 'center', padding: '40px 24px',
            background: 'rgba(29,158,117,.06)', border: '1px solid rgba(29,158,117,.25)', borderRadius: 12,
          }}>
            <CheckCircle size={40} style={{ color: '#1D9E75', marginBottom: 16 }} />
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Lead transmis avec succès</h2>
            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 24 }}>
              Le scoring et les notifications sont en cours de traitement par n8n.
            </p>
            <button onClick={reset} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 20px', borderRadius: 8,
              background: 'transparent', border: '1px solid rgba(255,255,255,.15)',
              color: '#e2e8f0', fontSize: 13, cursor: 'pointer',
            }}>
              <RotateCcw size={14} /> Ajouter un autre lead
            </button>
          </div>
        ) : (
          <>
            {/* ── Section 1 : Identité ── */}
            <div style={card}>
              <div style={sectionTitle}><User size={14} /> Identité</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#9ca3af', marginBottom: 6 }}>
                    Nom complet
                  </label>
                  <input
                    type="text"
                    placeholder="Jean Dupont"
                    value={data.name}
                    onChange={e => setData({ ...data, name: e.target.value })}
                    style={{
                      width: '100%', padding: '9px 12px', fontSize: 14,
                      background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)',
                      borderRadius: 8, color: '#fff', outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#9ca3af', marginBottom: 6 }}>
                    Adresse email
                  </label>
                  <input
                    type="email"
                    placeholder="jean@entreprise.com"
                    value={data.email}
                    onChange={e => setData({ ...data, email: e.target.value })}
                    style={{
                      width: '100%', padding: '9px 12px', fontSize: 14,
                      background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)',
                      borderRadius: 8, color: '#fff', outline: 'none',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ── Section 2 : Taille entreprise ── */}
            <div style={card}>
              <div style={sectionTitle}><Building2 size={14} /> Taille de l'entreprise</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {companyOptions.map(opt => {
                  const sel = data.company_size === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setData({ ...data, company_size: opt.value })}
                      style={{
                        padding: '10px 14px', textAlign: 'left', cursor: 'pointer',
                        background: sel ? 'rgba(55,138,221,.12)' : 'rgba(255,255,255,.03)',
                        border: sel ? '1.5px solid rgba(55,138,221,.45)' : '1px solid rgba(255,255,255,.08)',
                        borderRadius: 8, transition: 'all .15s',
                      }}
                    >
                      <div style={{ fontSize: 14, fontWeight: 600, color: sel ? '#378ADD' : '#e2e8f0' }}>{opt.label}</div>
                      <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{opt.sub}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ── Section 3 : Budget ── */}
            <div style={card}>
              <div style={sectionTitle}><DollarSign size={14} /> Budget annuel</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                {budgetOptions.map(opt => {
                  const sel = data.budget === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setData({ ...data, budget: opt.value })}
                      style={{
                        padding: '10px 8px', textAlign: 'center', cursor: 'pointer',
                        background: sel ? 'rgba(55,138,221,.12)' : 'rgba(255,255,255,.03)',
                        border: sel ? '1.5px solid rgba(55,138,221,.45)' : '1px solid rgba(255,255,255,.08)',
                        borderRadius: 8, transition: 'all .15s',
                        fontSize: 13, fontWeight: 600, color: sel ? '#378ADD' : '#e2e8f0',
                      }}
                    >
                      {opt.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ── Section 4 : Urgence ── */}
            <div style={card}>
              <div style={sectionTitle}><Clock size={14} /> Délai de démarrage</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {urgencyOptions.map(opt => {
                  const sel = data.urgency === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setData({ ...data, urgency: opt.value })}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '11px 14px', cursor: 'pointer', textAlign: 'left',
                        background: sel ? opt.bg : 'rgba(255,255,255,.03)',
                        border: sel ? `1.5px solid ${opt.border}` : '1px solid rgba(255,255,255,.08)',
                        borderRadius: 8, transition: 'all .15s',
                      }}
                    >
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: opt.color, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: sel ? opt.color : '#e2e8f0' }}>{opt.label}</div>
                        <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{opt.sub}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ fontSize: 13, color: '#ef4444', background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.2)', borderRadius: 8, padding: '10px 14px', marginBottom: 12 }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!isValid || isSubmitting}
              style={{
                width: '100%', padding: '13px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: isValid ? '#378ADD' : 'rgba(255,255,255,.06)',
                color: isValid ? '#fff' : '#4b5563',
                border: 'none', borderRadius: 8,
                fontSize: 14, fontWeight: 600, cursor: isValid ? 'pointer' : 'not-allowed',
                transition: 'all .2s', opacity: isSubmitting ? .7 : 1,
              }}
            >
              {isSubmitting ? (
                <>
                  <span style={{ width: 16, height: 16, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  Synchronisation n8n…
                </>
              ) : (
                <><Send size={14} /> Envoyer à la base</>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  )
}