import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import wordmarkPaths from '../assets/brand/wordmark-paths.json'

function usePos() {
  const [vw, setVw] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1280))
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  const introWidth = Math.min(440, vw * 0.8)
  return {
    video:  { top: '50%', left: '50%', x: '-50%', y: '-50%', width: introWidth, filter: 'blur(0px)' },
    reveal: { top: '50%', left: '50%', x: '-50%', y: '-50%', width: introWidth, filter: 'blur(0px)' },
    done:   { top: 34, left: 48, x: 0, y: '-50%', width: 108, filter: 'blur(0px)' },
  }
}

const DOCK_TRANSITION = {
  top: { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
  left: { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
  width: { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
  y: { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
  filter: { duration: 1.2, times: [0, 0.4, 1], ease: 'easeInOut' },
}

const ALL_GLYPHS = [...wordmarkPaths.fabrica, ...wordmarkPaths.studio]
const TOTAL_LEN = ALL_GLYPHS.reduce((sum, g) => sum + g.len, 0)

function buildSlots(drawDuration) {
  let cursor = 0
  return ALL_GLYPHS.map((g) => {
    const delay = drawDuration * (cursor / TOTAL_LEN)
    const duration = drawDuration * (g.len / TOTAL_LEN)
    cursor += g.len
    return { ...g, delay, duration }
  })
}

export default function BrandLogo({ stage, drawDuration = 8 }) {
  const POS = usePos()
  const pos = POS[stage] ?? POS.video
  const filled = stage !== 'video'
  const slots = buildSlots(drawDuration)

  return (
    <motion.svg
      viewBox="0 0 500 140"
      className="brand-logo"
      initial={POS.video}
      animate={pos}
      transition={
        stage === 'done'
          ? DOCK_TRANSITION
          : { duration: 0.7, ease: 'easeOut' }
      }
    >
      {slots.map((g, i) => (
        <motion.path
          key={i}
          d={g.d}
          strokeWidth="2"
          strokeLinejoin="round"
          initial={{
            strokeDasharray: g.len,
            strokeDashoffset: g.len,
            fill: 'rgba(255,69,32,0)',
            stroke: 'rgba(255,255,255,.92)',
          }}
          animate={{
            strokeDashoffset: 0,
            fill: filled ? 'rgba(255,69,32,1)' : 'rgba(255,69,32,0)',
            stroke: filled ? 'rgba(255,69,32,0)' : 'rgba(255,255,255,.92)',
          }}
          transition={{
            strokeDashoffset: { duration: g.duration, delay: g.delay, ease: 'linear' },
            fill: { duration: 0.6, ease: 'easeOut' },
            stroke: { duration: 0.6, ease: 'easeOut' },
          }}
        />
      ))}
    </motion.svg>
  )
}
