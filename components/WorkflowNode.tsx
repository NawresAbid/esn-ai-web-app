'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface WorkflowNodeProps {
  step: number
  title: string
  description: string
  isActive: boolean
  isCompleted: boolean
}

export default function WorkflowNode({
  step,
  title,
  description,
  isActive,
  isCompleted,
}: WorkflowNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: step * 0.1 }}
      className="relative flex items-center gap-4"
    >
      {/* Node Circle */}
      <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center relative"
        style={{
          backgroundColor: isCompleted ? '#00ff00' : isActive ? '#06b6d4' : '#0f0f0f',
          border: isCompleted ? '2px solid #00ff00' : isActive ? '2px solid #06b6d4' : '1px solid #1a1a1a',
        }}
      >
        {isCompleted ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Check size={24} style={{ color: '#000000' }} />
          </motion.div>
        ) : (
          <span className="font-bold text-sm">{step}</span>
        )}

        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: '#06b6d4' }}
            animate={{ scale: 1.3 }}
            transition={{ duration: 0.8, repeat: Infinity }}
            opacity={0.5}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </motion.div>
  )
}
