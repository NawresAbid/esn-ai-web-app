'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { Code2, Workflow, Zap, Database, MessageSquare, Send } from 'lucide-react'

interface NodeProps {
  label: string
  icon: ReactNode
  color: string
  delay: number
}

function TechNode({ label, icon, color, delay }: NodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.1 }}
      className="glass-card p-4 rounded-lg flex flex-col items-center gap-2 group cursor-pointer transition-all duration-300"
      style={{
        borderColor: color + '40',
      }}
    >
      <div
        className="p-3 rounded-lg"
        style={{
          backgroundColor: color + '15',
        }}
      >
        <div style={{ color }}>{icon}</div>
      </div>
      <span className="text-sm font-semibold text-center">{label}</span>
    </motion.div>
  )
}

export default function TechStackGraphic() {
  const topTier = [
    { label: 'Frontend', icon: <Code2 size={24} />, color: '#06b6d4' },
  ]

  const middleTier = [
    { label: 'n8n', icon: <Workflow size={24} />, color: '#ff00ff' },
  ]

  const bottomTier = [
    { label: 'OpenAI/Groq', icon: <Zap size={24} />, color: '#06b6d4' },
    { label: 'Notion', icon: <Database size={24} />, color: '#ff00ff' },
    { label: 'Airtable', icon: <Database size={24} />, color: '#00ff00' },
    { label: 'Slack', icon: <Send size={24} />, color: '#06b6d4' },
  ]

  return (
    <div className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Tech Stack</h2>
          <p className="text-gray-400">Seamlessly integrated ecosystem</p>
        </motion.div>

        {/* Tech Stack Diagram */}
        <div className="relative">
          {/* Top Tier - Frontend */}
          <div className="flex justify-center mb-12">
            {topTier.map((node, idx) => (
              <TechNode
                key={node.label}
                label={node.label}
                icon={node.icon}
                color={node.color}
                delay={0.1 * idx}
              />
            ))}
          </div>

          {/* Connecting Line 1 */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center mb-12"
            style={{
              transformOrigin: 'top',
              opacity: 0.3,
            }}
          >
            <div
              style={{
                width: '2px',
                height: '80px',
                backgroundColor: '#06b6d4',
              }}
              className="animate-pulse-glow"
            />
          </motion.div>

          {/* Middle Tier - n8n */}
          <div className="flex justify-center mb-12">
            {middleTier.map((node, idx) => (
              <TechNode
                key={node.label}
                label={node.label}
                icon={node.icon}
                color={node.color}
                delay={0.3 + 0.1 * idx}
              />
            ))}
          </div>

          {/* Connecting Lines 2 */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex justify-center mb-12"
            style={{
              transformOrigin: 'top',
              opacity: 0.3,
            }}
          >
            <div
              style={{
                width: '2px',
                height: '80px',
                backgroundColor: '#ff00ff',
              }}
              className="animate-pulse-glow"
            />
          </motion.div>

          {/* Bottom Tier - Services */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bottomTier.map((node, idx) => (
              <TechNode
                key={node.label}
                label={node.label}
                icon={node.icon}
                color={node.color}
                delay={0.5 + 0.1 * idx}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
