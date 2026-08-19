import { useEffect, useRef, useState } from 'react'
import heroScrub from '../assets/hero/hero-scrub.mp4'
import heroPoster from '../assets/hero/hero-poster.jpg'
import heroEnding from '../assets/hero/hero-ending.jpg'

const HERO_VH = 500
const VIDEO_BYTES = 54454825
const RING_CIRCUMFERENCE = 126

const GATES = [
  '(max-width: 720px)',
  '(orientation: portrait) and (max-width: 1024px)',
  '(orientation: portrait) and (pointer: coarse)',
  '(orientation: landscape) and (pointer: coarse) and (max-height: 560px)',
  '(prefers-reduced-motion: reduce)',
]

export default function ScrollIntro({ onDone }) {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const ringRef = useRef(null)
  const cueRef = useRef(null)
  const endFadeRef = useRef(null)
  const [staticMode, setStaticMode] = useState(false)

  useEffect(() => {
    const mqls = GATES.map((q) => matchMedia(q))
    const check = () => setStaticMode(mqls.some((m) => m.matches))
    check()
    mqls.forEach((m) => m.addEventListener('change', check))
    return () => mqls.forEach((m) => m.removeEventListener('change', check))
  }, [])

  useEffect(() => {
    if (staticMode) {
      onDone(true)
      return
    }
    onDone(false)

    const section = sectionRef.current
    const video = videoRef.current
    let blobUrl = null
    let cancelled = false
    let done = false
    let lastCueOpacity = null
    let lastEndFade = null

    let target = 0
    let shown = 0
    let rafId = null
    let lastTick = 0
    let seekBusy = false
    let pendingTime = null
    let heroOnScreen = true

    const requestSeek = (t) => {
      if (!video.duration) return
      if (seekBusy) { pendingTime = t; return }
      seekBusy = true
      video.currentTime = t
    }
    const onSeeked = () => {
      seekBusy = false
      if (pendingTime !== null) {
        const t = pendingTime
        pendingTime = null
        requestSeek(t)
      }
    }
    const onVideoError = () => { seekBusy = false; pendingTime = null }

    const heroProgress = () => {
      const rect = section.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      if (total <= 0) return 1
      return Math.min(1, Math.max(0, -rect.top / total))
    }

    const tick = (now) => {
      const dt = Math.min(100, now - (lastTick || now))
      lastTick = now
      const k = 0.16
      shown += (target - shown) * (1 - Math.pow(1 - k, dt / 16.667))
      if (Math.abs(target - shown) < 0.0005) {
        shown = target
        rafId = null
        lastTick = 0
      } else {
        rafId = requestAnimationFrame(tick)
      }
      if (video.duration) requestSeek(shown * video.duration)

      const cueOpacity = Math.max(0, 1 - shown / 0.05).toFixed(3)
      if (cueRef.current && cueOpacity !== lastCueOpacity) {
        lastCueOpacity = cueOpacity
        cueRef.current.style.opacity = cueOpacity
      }

      const endT = Math.min(1, Math.max(0, (shown - 0.9) / 0.1))
      const endFade = (endT * endT * (3 - 2 * endT)).toFixed(3)
      if (endFadeRef.current && endFade !== lastEndFade) {
        lastEndFade = endFade
        endFadeRef.current.style.opacity = endFade
      }

      if (shown > 0.995 && !done) {
        done = true
        onDone(true)
      } else if (shown <= 0.995 && done) {
        done = false
        onDone(false)
      }
    }

    const armLoop = () => {
      if (rafId === null && heroOnScreen) {
        lastTick = 0
        rafId = requestAnimationFrame(tick)
      }
    }

    const onScroll = () => {
      target = heroProgress()
      armLoop()
    }

    const io = new IntersectionObserver(([entry]) => {
      heroOnScreen = entry.isIntersecting
      if (heroOnScreen) armLoop()
    }, { threshold: 0 })
    io.observe(section)

    video.addEventListener('seeked', onSeeked)
    video.addEventListener('error', onVideoError)
    window.addEventListener('scroll', onScroll, { passive: true })

    const setRingOffset = (offset) => {
      if (ringRef.current) ringRef.current.style.setProperty('--ld', offset)
    }

    const failVideo = () => {
      const wrap = ringRef.current?.closest('.hero-load-ring')
      if (wrap) wrap.style.display = 'none'
    }

    const loadHeroBlob = async () => {
      const ctrl = new AbortController()
      let watchdog = setTimeout(() => ctrl.abort(), 20000)
      const res = await fetch(heroScrub, { signal: ctrl.signal })
      const total = Number(res.headers.get('Content-Length')) || VIDEO_BYTES
      const reader = res.body.getReader()
      const chunks = []
      let got = 0
      let lastRingAt = 0
      for (;;) {
        const { done: streamDone, value } = await reader.read()
        if (streamDone) break
        clearTimeout(watchdog)
        watchdog = setTimeout(() => ctrl.abort(), 20000)
        chunks.push(value)
        got += value.length
        const frac = Math.min(1, got / total)
        const now = performance.now()
        if (now - lastRingAt > 100 || frac === 1) {
          lastRingAt = now
          setRingOffset(Math.round(RING_CIRCUMFERENCE * (1 - frac)))
        }
      }
      clearTimeout(watchdog)
      if (cancelled) return
      blobUrl = URL.createObjectURL(new Blob(chunks))
      video.src = blobUrl
      video.load()
      video.addEventListener('canplay', () => {
        const wrap = ringRef.current?.closest('.hero-load-ring')
        if (wrap) wrap.style.opacity = '0'
        onScroll()
      }, { once: true })
    }

    loadHeroBlob().catch(failVideo)
    onScroll()

    return () => {
      cancelled = true
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
      video.removeEventListener('seeked', onSeeked)
      video.removeEventListener('error', onVideoError)
      if (rafId !== null) cancelAnimationFrame(rafId)
      if (blobUrl) URL.revokeObjectURL(blobUrl)
    }
  }, [staticMode, onDone])

  if (staticMode) {
    return <section className="hero-static" style={{ backgroundImage: `url(${heroEnding})` }} aria-hidden="true" />
  }

  return (
    <section ref={sectionRef} className="hero-scrub" style={{ height: `${HERO_VH}vh` }}>
      <div className="hero-scrub-stage">
        <video
          ref={videoRef}
          className="hero-scrub-video"
          poster={heroPoster}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="hero-load-ring" aria-hidden="true">
          <svg viewBox="0 0 48 48">
            <circle ref={ringRef} cx="24" cy="24" r="20" style={{ '--ld': RING_CIRCUMFERENCE }} />
          </svg>
        </div>
        <div ref={cueRef} className="hero-scroll-cue" aria-hidden="true">
          <svg width="16" height="9" viewBox="0 0 16 9" fill="none">
            <path d="M2 2L8 7L14 2" stroke="#FF4520" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div ref={endFadeRef} className="hero-end-fade" aria-hidden="true" style={{ opacity: 0 }} />
      </div>
    </section>
  )
}
