import Reveal from './Reveal'

export default function Contact() {
  return (
    <section id="contact" className="container">
      <div className="cta-inner">
        <Reveal as="div" className="cta-label">Poďme na to</Reveal>
        <Reveal as="h2" className="cta-title" delay={0.1}>
          Máš projekt?<br /><em>Porozprávajme sa.</em>
        </Reveal>
        <Reveal as="div" delay={0.2}>
          <a href="mailto:adamfabcin@icloud.com" className="cta-email">adamfabcin@icloud.com</a>
        </Reveal>
      </div>
    </section>
  )
}
