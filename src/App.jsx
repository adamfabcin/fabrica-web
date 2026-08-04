import { useEffect, useRef, useState } from 'react'
import VideoIntro from './components/VideoIntro'
import BrandLogo from './components/BrandLogo'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Process from './components/Process'
import Clients from './components/Clients'
import Contact from './components/Contact'
import Footer from './components/Footer'

const REVEAL_DWELL_MS = 3200

export default function App() {
  const [stage, setStage] = useState('video') // video -> reveal -> done
  const [videoDuration, setVideoDuration] = useState(8)
  const fallbackTimer = useRef(null)

  useEffect(() => {
    if (stage !== 'done') {
      document.body.style.overflow = 'hidden'
      return
    }
    const t = setTimeout(() => { document.body.style.overflow = '' }, 1200)
    return () => clearTimeout(t)
  }, [stage])

  useEffect(() => {
    if (stage !== 'video') return
    fallbackTimer.current = setTimeout(() => setStage('reveal'), 9000)
    return () => clearTimeout(fallbackTimer.current)
  }, [stage])

  useEffect(() => {
    if (stage !== 'reveal') return
    const t = setTimeout(() => setStage('done'), REVEAL_DWELL_MS)
    return () => clearTimeout(t)
  }, [stage])

  const handleVideoEnded = () => {
    clearTimeout(fallbackTimer.current)
    setStage('reveal')
  }

  return (
    <div className="page">
      <VideoIntro
        visible={stage === 'video'}
        onEnded={handleVideoEnded}
        onDuration={setVideoDuration}
      />
      <BrandLogo stage={stage} drawDuration={videoDuration} />
      <Cursor active={stage === 'done'} />
      <Nav stage={stage} />
      <Hero stage={stage} />
      <Services />
      <About />
      <Process />
      <Clients />
      <Contact />
      <Footer />
    </div>
  )
}
