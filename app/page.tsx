'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, ArrowUpRight } from 'lucide-react'
import NeonGrid from '@/components/ui/NeonGrid'
import Scanline from '@/components/ui/Scanline'
import Section from '@/components/ui/Section'
import { SERVICES, DEMOS } from '@/lib/data'

const G = { fontFamily: "'Space Grotesk', sans-serif" } as const
const I = { fontFamily: "'Inter', sans-serif" } as const
const FU = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function HomePage() {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 400], [0, 120])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <>
      {/* HERO */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#0a0a0a',
        }}
      >
        <NeonGrid />
        <Scanline />

        {/* Accent lines */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 1,
              height: '100%',
              background: 'linear-gradient(180deg, transparent, #06b6d4, transparent)',
              opacity: 0.2,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 1,
              height: '100%',
              background: 'linear-gradient(180deg, transparent, #ff00ff, transparent)',
              opacity: 0.1,
            }}
          />
        </div>

        <motion.div
          style={{
            y: heroY,
            opacity: heroOpacity,
            position: 'relative',
            zIndex: 10,
            maxWidth: 900,
            margin: '0 auto',
            padding: '0 24px',
            textAlign: 'center',
          }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              marginBottom: 32,
              borderRadius: 999,
              border: '1px solid rgba(6,182,212,0.3)',
              background: 'rgba(6,182,212,0.05)',
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#06b6d4',
                display: 'inline-block',
                animation: 'pulse 2s infinite',
              }}
            />
            <span
              style={{
                ...G,
                fontSize: 11,
                color: '#06b6d4',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              ESN · Intelligence Artificielle
            </span>
          </motion.div>

          {/* Title */}
          <div style={{ overflow: 'hidden', marginBottom: 16 }}>
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                ...G,
                fontSize: 'clamp(48px, 10vw, 96px)',
                fontWeight: 700,
                lineHeight: 1,
                color: '#fff',
                letterSpacing: '-0.03em',
              }}
            >
              Nous automatisons
            </motion.h1>
          </div>

          {/* Gradient text */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 16,
              marginBottom: 32,
            }}
          >
            {[
              { text: 'vos processus', grad: 'linear-gradient(135deg, #06b6d4, #ff00ff)' },
              { text: 'avec l\'IA', grad: 'linear-gradient(135deg, #ff00ff, #00ff00)' },
            ].map(({ text, grad }, i) => (
              <div key={text} style={{ overflow: 'hidden' }}>
                <motion.span
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.7 + i * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  style={{
                    ...G,
                    display: 'inline-block',
                    fontSize: 'clamp(36px, 7vw, 80px)',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    background: grad,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {text}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            style={{
              ...I,
              fontSize: 18,
              color: '#9ca3af',
              maxWidth: 600,
              margin: '0 auto 40px',
              lineHeight: 1.7,
            }}
          >
            De la stratégie IA à l'automatisation complète — nous concevons des solutions intelligentes sur mesure pour transformer vos opérations.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
              justifyContent: 'center',
            }}
          >
            <Link href="/demos" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(6,182,212,0.5)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  ...G,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '16px 32px',
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#000',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #06b6d4, #00b4d8)',
                  border: 'none',
                  clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)',
                }}
              >
                Voir les démos <ChevronRight size={16} />
              </motion.button>
            </Link>
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,0,255,0.2)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  ...G,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '16px 32px',
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#d1d5db',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  border: '1px solid rgba(6,182,212,0.4)',
                  background: 'transparent',
                  clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)',
                  transition: 'border-color 0.3s',
                }}
              >
                Contactez-nous
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 32,
              marginTop: 80,
              paddingTop: 40,
              borderTop: '1px solid rgba(255,255,255,0.06)',
              maxWidth: 500,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {[
              ['150+', 'Workflows automatisés'],
              ['3x', 'ROI moyen client'],
              ['48h', 'Mise en prod'],
            ].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    ...G,
                    fontSize: 32,
                    fontWeight: 700,
                    color: '#06b6d4',
                    textShadow: '0 0 20px rgba(6,182,212,0.5)',
                    marginBottom: 4,
                  }}
                >
                  {val}
                </div>
                <div
                  style={{
                    ...I,
                    fontSize: 11,
                    color: '#6b7280',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            opacity: 0.4,
          }}
        >
          <div
            style={{
              width: 1,
              height: 48,
              background: 'linear-gradient(180deg, transparent, #06b6d4)',
            }}
          />
          <span style={{ ...G, fontSize: 11, color: '#06b6d4', letterSpacing: '0.15em' }}>SCROLL</span>
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
      <section
        style={{
          position: 'relative',
          padding: '96px 24px',
          background: '#0a0a0a',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              width: '33%',
              height: 1,
              background: 'linear-gradient(90deg, transparent, #06b6d4)',
              opacity: 0.1,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: 0,
              width: '33%',
              height: 1,
              background: 'linear-gradient(-90deg, transparent, #ff00ff)',
              opacity: 0.1,
            }}
          />
        </div>

        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <Section>
            <motion.div
              variants={FU}
              style={{
                marginBottom: 48,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16,
              }}
            >
              <div>
                <span
                  style={{
                    ...G,
                    fontSize: 11,
                    color: '#06b6d4',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: 12,
                  }}
                >
                  — Nos expertises
                </span>
                <h2
                  style={{
                    ...G,
                    fontSize: 'clamp(32px, 5vw, 52px)',
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                  }}
                >
                  Ce que nous <span style={{ color: '#06b6d4', textShadow: '0 0 30px rgba(6,182,212,0.5)' }}>construisons</span>
                </h2>
              </div>
              <Link href="/services" style={{ textDecoration: 'none' }}>
                <motion.span
                  whileHover={{ x: 4 }}
                  style={{
                    ...G,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 13,
                    color: '#6b7280',
                    cursor: 'pointer',
                    transition: 'color 0.3s',
                  }}
                >
                  Tous les services <ArrowUpRight size={16} />
                </motion.span>
              </Link>
            </motion.div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 16,
              }}
            >
              {SERVICES.map((s) => {
                const Icon = s.icon
                return (
                  <ServiceCard key={s.id} s={s} Icon={Icon} />
                )
              })}
            </div>
          </Section>
        </div>
      </section>

      {/* DEMOS SECTION */}
      <section
        style={{
          position: 'relative',
          padding: '96px 24px',
          background: 'linear-gradient(180deg, #0a0a0a 0%, #080810 50%, #0a0a0a 100%)',
        }}
      >
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <Section>
            <motion.div
              variants={FU}
              style={{
                marginBottom: 48,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16,
              }}
            >
              <div>
                <span
                  style={{
                    ...G,
                    fontSize: 11,
                    color: '#a855f7',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: 12,
                  }}
                >
                  — Démonstrations live
                </span>
                <h2
                  style={{
                    ...G,
                    fontSize: 'clamp(32px, 5vw, 52px)',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                  }}
                >
                  <span style={{ color: '#fff' }}>Nos </span>
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #ff00ff, #06b6d4)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    solutions
                  </span>
                  <span style={{ color: '#fff' }}> en action</span>
                </h2>
              </div>
              <Link href="/demos" style={{ textDecoration: 'none' }}>
                <motion.span
                  whileHover={{ x: 4 }}
                  style={{
                    ...G,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 13,
                    color: '#6b7280',
                    cursor: 'pointer',
                  }}
                >
                  Voir toutes les démos <ArrowUpRight size={16} />
                </motion.span>
              </Link>
            </motion.div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 16,
              }}
            >
              {DEMOS.map((demo) => {
                const Icon = demo.icon
                return (
                  <motion.div
                    key={demo.id}
                    variants={FU}
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      backdropFilter: 'blur(16px)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 20px',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div style={{ display: 'flex', gap: 6 }}>
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            background: '#ef4444',
                            opacity: 0.6,
                          }}
                        />
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            background: '#eab308',
                            opacity: 0.6,
                          }}
                        />
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            background: '#22c55e',
                            opacity: 0.6,
                          }}
                        />
                      </div>
                      <span
                        style={{
                          ...G,
                          fontSize: 11,
                          color: demo.color,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {demo.label}
                      </span>
                      <Icon size={16} style={{ color: demo.color }} />
                    </div>
                    <div
                      style={{
                        padding: 20,
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 16,
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            ...G,
                            fontSize: 15,
                            fontWeight: 700,
                            color: '#fff',
                            marginBottom: 8,
                            lineHeight: 1.3,
                          }}
                        >
                          {demo.title}
                        </h3>
                        <p
                          style={{
                            ...I,
                            fontSize: 13,
                            color: '#6b7280',
                            lineHeight: 1.6,
                          }}
                        >
                          {demo.desc}
                        </p>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {demo.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              ...G,
                              fontSize: 11,
                              padding: '2px 10px',
                              color: demo.color,
                              background: `${demo.color}15`,
                              border: `1px solid ${demo.color}35`,
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link href="/demos" style={{ textDecoration: 'none', marginTop: 'auto' }}>
                        <motion.button
                          whileHover={{ scale: 1.03, boxShadow: `0 0 25px ${demo.glow}` }}
                          whileTap={{ scale: 0.97 }}
                          style={{
                            ...G,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                            padding: '10px',
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            background: `${demo.color}15`,
                            border: `1px solid ${demo.color}`,
                            color: demo.color,
                            transition: 'all 0.3s ease',
                            width: '100%',
                          }}
                        >
                          Tester la démo <ArrowUpRight size={14} />
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </Section>
        </div>
      </section>
    </>
  )
}

function ServiceCard({ s, Icon }: { s: (typeof SERVICES)[0]; Icon: any }) {
  return (
    <motion.div
      variants={FU}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'relative',
        padding: 24,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'all 0.4s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.border = `1px solid ${s.color}`
        el.style.boxShadow = `0 0 40px ${s.glow}, inset 0 0 40px ${s.glow}`
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.border = '1px solid rgba(255,255,255,0.07)'
        el.style.boxShadow = 'none'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 48,
          height: 48,
          borderBottom: `1px solid ${s.color}`,
          borderLeft: `1px solid ${s.color}`,
          opacity: 0.25,
        }}
      />
      <div
        style={{
          display: 'inline-flex',
          padding: 10,
          marginBottom: 20,
          background: `${s.color}15`,
          border: `1px solid ${s.color}40`,
        }}
      >
        <Icon size={24} style={{ color: s.color }} />
      </div>
      <h3
        style={{
          ...G,
          fontSize: 20,
          fontWeight: 700,
          color: '#fff',
          marginBottom: 12,
          letterSpacing: '-0.02em',
        }}
      >
        {s.title}
      </h3>
      <p
        style={{
          ...I,
          fontSize: 14,
          color: '#9ca3af',
          lineHeight: 1.7,
          marginBottom: 20,
        }}
      >
        {s.desc}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {s.tags.map((tag) => (
          <span
            key={tag}
            style={{
              ...G,
              fontSize: 11,
              padding: '4px 10px',
              color: s.color,
              background: `${s.color}10`,
              border: `1px solid ${s.color}30`,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
