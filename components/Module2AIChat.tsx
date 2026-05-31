'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2 } from 'lucide-react'

interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const BOT_RESPONSES = [
  "Merci pour votre question! Basé sur vos données:\n- Priorité: HAUTE\n- Recommandation: Implémenter un RAG avancé\n- Temps estimé: 2-3 semaines",
  "Excellente question! Voici mon analyse:\n- L'automatisation peut économiser 40% du temps\n- Intégration n8n recommandée\n- Coût d'implémentation: modéré",
  "Je comprends votre demande. Voici les étapes:\n1. Audit du système existant\n2. Conception du workflow\n3. Implémentation et tests\n4. Déploiement en production",
  "Parfait! Voici mes recommandations:\n- Utiliser Groq pour LLM rapide\n- Notion pour la base de données\n- Slack pour les notifications\n- n8n pour l'orchestration",
]

export default function Module2AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      text: 'Bonjour! Je suis votre assistant IA. Comment puis-je vous aider avec vos besoins en automation?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate API processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Add bot response
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)],
      sender: 'bot',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, botMessage])
    setIsLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold mb-2">Module 2: AI Chatbot Support Widget</h2>
        <p className="text-gray-400">Chat with our AI-powered support agent</p>
      </div>

      {/* Chat Container */}
      <div className="glass-card p-6 rounded-lg border border-white/5 flex flex-col h-[600px]">
        {/* Messages Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto mb-4 space-y-4 pr-4"
        >
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className="max-w-xs px-4 py-3 rounded-lg"
                style={{
                  backgroundColor:
                    message.sender === 'user'
                      ? '#06b6d420'
                      : '#ff00ff20',
                  borderColor:
                    message.sender === 'user'
                      ? '#06b6d440'
                      : '#ff000040',
                  borderWidth: '1px',
                  color: message.sender === 'user' ? '#06b6d4' : '#ff00ff',
                }}
              >
                <p className="text-sm whitespace-pre-wrap text-white">{message.text}</p>
              </div>
            </motion.div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-center gap-2" style={{ color: '#ff00ff' }}>
                <Loader2 size={16} className="animate-spin" />
                <span className="text-sm">Calling Groq/OpenAI APIs via Webhook...</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Votre question..."
            disabled={isLoading}
            className="flex-1 glass-input text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-magenta-500/50 disabled:opacity-50"
          />
          <motion.button
            type="submit"
            disabled={isLoading || !input.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
            style={{
              backgroundColor: isLoading || !input.trim() ? '#666666' : '#06b6d4',
              color: '#000000',
            }}
          >
            <Send size={18} />
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}
