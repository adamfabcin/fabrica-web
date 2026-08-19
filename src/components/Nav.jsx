import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { href: '#services', label: 'Služby' },
  { href: '#about', label: 'O nás' },
  { href: '#process', label: 'Proces' },
  { href: '#clients', label: 'Klienti' },
  { href: '#contact', label: 'Kontakt' },
]

export default function Nav({ revealed }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav id="nav" className={scrolled && revealed ? 'scrolled' : ''}>
        <div className="nav-logo-slot" />
        <motion.div
          className="nav-links"
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 0.6, delay: revealed ? 0.1 : 0 }}
          style={{ pointerEvents: revealed ? 'auto' : 'none' }}
        >
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </motion.div>
        <motion.div
          className="nav-right"
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 0.6, delay: revealed ? 0.15 : 0 }}
          style={{ pointerEvents: revealed ? 'auto' : 'none' }}
        >
          <a href="#contact" className="nav-cta">Začnime →</a>
          <button
            type="button"
            className="nav-burger"
            aria-label={menuOpen ? 'Zavrieť menu' : 'Otvoriť menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={menuOpen ? 'is-open' : ''} />
            <span className={menuOpen ? 'is-open' : ''} />
          </button>
        </motion.div>
      </nav>

      <AnimatePresence>
        {menuOpen && revealed && (
          <motion.div
            className="nav-mobile-panel"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={closeMenu}>{l.label}</a>
            ))}
            <a href="#contact" className="nav-mobile-cta" onClick={closeMenu}>Začnime →</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
