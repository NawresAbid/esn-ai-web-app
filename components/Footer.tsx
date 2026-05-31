import { Code2, Palette, Zap } from 'lucide-react'

export default function Footer() {
  const badges = [
    { label: 'Next.js', icon: Code2, color: '#06b6d4' },
    { label: 'Tailwind CSS', icon: Palette, color: '#06b6d4' },
    { label: 'Framer Motion', icon: Zap, color: '#ff00ff' },
    { label: 'n8n', icon: Code2, color: '#ff00ff' },
  ]

  return (
    <footer className="w-full border-t border-white/5 bg-black/20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Tech Badges */}
          <div className="flex flex-wrap justify-center gap-4">
            {badges.map((badge) => {
              const Icon = badge.icon
              return (
                <div
                  key={badge.label}
                  className="glass-card px-4 py-2 flex items-center gap-2 text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    borderColor: badge.color + '40',
                  }}
                >
                  <Icon size={16} style={{ color: badge.color }} />
                  <span>{badge.label}</span>
                </div>
              )
            })}
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500 text-center">
            © 2024 ESN AI Automation. Built for the future.
          </p>
        </div>
      </div>
    </footer>
  )
}
