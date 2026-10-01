import Reveal from './Reveal'
import deskImg from '../assets/closing-desk.png'

export default function ClosingView() {
  return (
    <Reveal as="section" className="closing-view">
      <img src={deskImg} alt="" className="closing-desk" />
      <footer className="closing-footer">
        <div className="foot-left">
          <span className="foot-wm">FABRICA</span>
          <span className="foot-copy">© 2026 Fabrica Studio s. r. o.</span>
        </div>
        <div className="foot-links">
          <a href="https://www.instagram.com/afabcin" target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </footer>
    </Reveal>
  )
}
