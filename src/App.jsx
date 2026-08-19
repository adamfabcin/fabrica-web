import { useState } from 'react'
import BrandLogo from './components/BrandLogo'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import ScrollIntro from './components/ScrollIntro'
import Services from './components/Services'
import About from './components/About'
import Process from './components/Process'
import Clients from './components/Clients'
import Contact from './components/Contact'
import ClosingView from './components/ClosingView'

export default function App() {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="page">
      <BrandLogo revealed={revealed} />
      <Cursor />
      <Nav revealed={revealed} />
      <ScrollIntro onDone={setRevealed} />
      <Services />
      <About />
      <Process />
      <Clients />
      <Contact />
      <ClosingView />
    </div>
  )
}
