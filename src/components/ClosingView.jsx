import Reveal from './Reveal'

export default function ClosingView() {
  return (
    <Reveal as="section" className="closing-view">
      <img src="/closing-view.jpg" alt="Nitra, mesto v ktorom tvoríme" />
      <div className="closing-view-fade" />
      <footer className="closing-footer">
        <div className="foot-left">
          <span className="foot-wm">FABRICA</span>
          <span className="foot-copy">© 2026 Adam Fabcin</span>
        </div>
        <div className="foot-links">
          <a href="https://www.instagram.com/afabcin" target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </footer>
    </Reveal>
  )
}
