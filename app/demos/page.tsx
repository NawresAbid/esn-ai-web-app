'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Module1LivePipelineExplorer from '@/components/Module1LivePipelineExplorer'
import Module2AIChat from '@/components/Module2AIChat'
import Module3LeadScoring from '@/components/Module3LeadScoring'

type TabType = 'module1' | 'module2' | 'module3'

export default function DemosPage() {
  const [activeTab, setActiveTab] = useState<TabType>('module1')

  const tabs: {
    id: TabType
    label: string
    color: string
  }[] = [
    { id: 'module1', label: 'Pipeline Explorer', color: '#06b6d4' },
    { id: 'module2', label: 'AI Chatbot', color: '#ff00ff' },
    { id: 'module3', label: 'Lead Scoring', color: '#00ff00' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Interactive Demos
          </h1>
          <p className="text-gray-400 text-lg">
            Explore our three powerful n8n workflow demonstrations
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              style={{
                backgroundColor:
                  activeTab === tab.id
                    ? tab.color
                    : 'rgba(0, 0, 0, 0.3)',
                color:
                  activeTab === tab.id
                    ? '#000000'
                    : '#ffffff',
                border:
                  activeTab === tab.id
                    ? `2px solid ${tab.color}`
                    : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow:
                  activeTab === tab.id
                    ? `0 0 20px ${tab.color}40`
                    : 'none',
              }}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'module1' && <Module1LivePipelineExplorer />}
          {activeTab === 'module2' && <Module2AIChat />}
          {activeTab === 'module3' && <Module3LeadScoring />}
        </motion.div>
      </div>
    </div>
  )
}
