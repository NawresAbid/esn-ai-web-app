'use client'

import { motion } from 'framer-motion'
import ServiceCard from '@/components/ServiceCard'
import { Brain, Workflow, Database, MessageSquare } from 'lucide-react'

export default function ServicesPage() {
  const services = [
    {
      title: 'AI Consulting & Strategy',
      description: 'Enterprise architecture design tailored to your business needs and scalability requirements.',
      icon: Brain,
      accent: '#06b6d4',
    },
    {
      title: 'Autonomous Workflows',
      description: 'Custom n8n core pipeline integrations connecting your entire tech stack seamlessly.',
      icon: Workflow,
      accent: '#ff00ff',
    },
    {
      title: 'Advanced RAG Systems',
      description: 'Custom AI vector knowledge trained on your internal data for intelligent assistance.',
      icon: Database,
      accent: '#06b6d4',
    },
    {
      title: 'Intelligent Agentic Chatbots',
      description: 'Multi-channel customer support NLP agents powered by cutting-edge language models.',
      icon: MessageSquare,
      accent: '#00ff00',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Our{' '}
            <span
              className="bg-gradient-to-r from-cyan-400 to-magenta-500 bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(to right, #06b6d4, #ff00ff)',
              }}
            >
              Services
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive solutions designed to transform your business with AI and automation
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * (index + 1) }}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
                accent={service.accent}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
