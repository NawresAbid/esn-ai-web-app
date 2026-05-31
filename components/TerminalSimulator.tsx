'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface TerminalSimulatorProps {
  logs: string[]
}

export default function TerminalSimulator({ logs }: TerminalSimulatorProps) {
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (logs.length === 0) {
      setDisplayedLogs([])
      return
    }

    // Display logs with a delay for each one
    const timer = setInterval(() => {
      setDisplayedLogs((prev) => {
        if (prev.length < logs.length) {
          return [...prev, logs[prev.length]]
        }
        return prev
      })
    }, 300)

    return () => clearInterval(timer)
  }, [logs])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [displayedLogs])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 glass-card p-4 rounded-lg border border-white/5 bg-black/40"
    >
      <div className="flex items-center gap-2 mb-3 text-xs font-mono">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
        <span className="text-gray-400">Execution Logs</span>
      </div>

      <div
        ref={scrollRef}
        className="bg-black/80 rounded p-3 font-mono text-xs leading-relaxed max-h-48 overflow-y-auto"
        style={{
          color: '#00ff00',
        }}
      >
        {displayedLogs.length === 0 ? (
          <div className="text-gray-600">Waiting for execution...</div>
        ) : (
          displayedLogs.map((log, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="whitespace-pre-wrap break-words"
            >
              {log}
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  )
}
