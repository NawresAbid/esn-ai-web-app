import { motion } from 'framer-motion'

interface SectionProps {
  children: React.ReactNode
}

export default function Section({ children }: SectionProps) {
  const FU = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as unknown as number[] },
    },
  }

  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={FU}>
      {children}
    </motion.div>
  )
}
