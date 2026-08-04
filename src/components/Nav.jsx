import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Nav({ stage }) {
  const [scrolled, setScrolled] = useState(false)
  const revealed = stage === 'done'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-logo-slot" />
      <motion.div
        className="nav-links"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.6, delay: revealed ? 1.2 : 0 }}
      >
        <a href="#services">Služby</a>
        <a href="#about">O nás</a>
        <a href="#process">Proces</a>
        <a href="#clients">Klienti</a>
        <a href="#contact">Kontakt</a>
      </motion.div>
      <motion.a
        href="#contact"
        className="nav-cta"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.6, delay: revealed ? 1.3 : 0 }}
      >
        Začnime →
      </motion.a>
    </nav>
  )
}
