import { motion } from 'framer-motion'

export default function Hero({ stage }) {
  return (
    <motion.section
      id="hero"
      animate={{ minHeight: stage === 'done' ? '0px' : '100svh' }}
      transition={{ duration: 0.9, delay: stage === 'done' ? 1.2 : 0, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}
