'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import PipelineForm from './PipelineForm'
import WorkflowNode from './WorkflowNode'
import TerminalSimulator from './TerminalSimulator'

export default function Module1LivePipelineExplorer() {
  const [isExecuting, setIsExecuting] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [logs, setLogs] = useState<string[]>([])

  const workflowSteps = [
    {
      id: 1,
      title: 'Trigger - Formulaire soumis',
      description: 'Webhook trigger activated',
    },
    {
      id: 2,
      title: 'Notion - Fiche contact créée',
      description: 'Contact record created in Notion',
    },
    {
      id: 3,
      title: 'Gmail - Email de bienvenue envoyé',
      description: 'Welcome email sent via Gmail',
    },
    {
      id: 4,
      title: 'Slack #ventes - Notification équipe',
      description: 'Team notification posted to Slack',
    },
  ]

  const handleFormSubmit = async (data: {
    name: string
    email: string
    company: string
    message: string
  }) => {
    setIsExecuting(true)
    setCompletedSteps([])
    setLogs([])

    // 🔥 Real webhook call to n8n
    try {
      await fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL_CONTACT!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          message: data.message,
        }),
      })
    } catch (error) {
      console.error('Webhook error:', error)
    }

    // Keep the same animation/simulation below (no changes)
    const executionLogs: string[] = [
      `[${new Date().toISOString()}] ✓ Webhook triggered for ${data.email}`,
      `[${new Date().toISOString()}] Processing contact: ${data.name} (${data.company})`,
      `[${new Date().toISOString()}] Connecting to Notion API...`,
    ]

    for (let i = 0; i < workflowSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setCompletedSteps((prev) => [...prev, workflowSteps[i].id])

      const newLogs = [
        ...executionLogs,
        `[${new Date().toISOString()}] ✓ Step ${i + 1}: ${workflowSteps[i].title}`,
      ]

      if (i === 1) {
        newLogs.push(
          `[${new Date().toISOString()}] Created Notion page with contact data`,
          `[${new Date().toISOString()}] Triggering Gmail webhook...`
        )
      } else if (i === 2) {
        newLogs.push(
          `[${new Date().toISOString()}] Email sent to ${data.email}`,
          `[${new Date().toISOString()}] Triggering Slack notification...`
        )
      } else if (i === 3) {
        newLogs.push(
          `[${new Date().toISOString()}] Posted to Slack #ventes channel`,
          `[${new Date().toISOString()}] ✓ Workflow completed successfully`
        )
      }

      setLogs(newLogs)
    }

    setIsExecuting(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold mb-2">Module 1: Live Form Submission Pipeline</h2>
        <p className="text-gray-400">Watch your form submission flow through our automation pipeline in real-time</p>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Form */}
        <div className="glass-card p-6 rounded-lg border border-white/5">
          <h3 className="text-xl font-bold mb-4">Formulaire de Contact</h3>
          <PipelineForm onSubmit={handleFormSubmit} isExecuting={isExecuting} />
        </div>

        {/* Right Column: Pipeline Visualization */}
        <div className="glass-card p-6 rounded-lg border border-white/5">
          <h3 className="text-xl font-bold mb-6">Pipeline d&apos;Automation</h3>
          <div className="space-y-6">
            {workflowSteps.map((step) => (
              <div key={step.id} className="relative">
                <WorkflowNode
                  step={step.id}
                  title={step.title}
                  description={step.description}
                  isActive={isExecuting && completedSteps.length >= step.id - 1}
                  isCompleted={completedSteps.includes(step.id)}
                />

                {/* Connecting Line */}
                {step.id < workflowSteps.length && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="absolute left-8 top-16 w-0.5 h-8"
                    style={{
                      backgroundColor: completedSteps.includes(step.id)
                        ? '#00ff00'
                        : '#1a1a1a',
                      transformOrigin: 'top',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Terminal Logs */}
      {logs.length > 0 && <TerminalSimulator logs={logs} />}
    </motion.div>
  )
}