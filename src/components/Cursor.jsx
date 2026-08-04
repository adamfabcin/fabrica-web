import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor({ active = true }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const ringX = useSpring(x, { damping: 22, stiffness: 220, mass: 0.4 })
  const ringY = useSpring(y, { damping: 22, stiffness: 220, mass: 0.4 })
  const trailX = useSpring(x, { damping: 28, stiffness: 60, mass: 1.1 })
  const trailY = useSpring(y, { damping: 28, stiffness: 60, mass: 1.1 })

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', move)

    const interactive = document.querySelectorAll('a, button, .service-row, .nav-cta, .client-logo')
    const enter = () => document.body.classList.add('hovering')
    const leave = () => document.body.classList.remove('hovering')
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [x, y])

  return (
    <div id="cursor">
      <motion.div
        className="cursor-trail"
        style={{ x: trailX, y: trailY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div className="cursor-dot" style={{ x, y }} />
      <motion.div className="cursor-ring" style={{ x: ringX, y: ringY }} />
    </div>
  )
}
