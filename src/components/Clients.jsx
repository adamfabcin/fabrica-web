import Reveal from './Reveal'
import logo1 from '../assets/clients/client-logo-1.png'
import logo2 from '../assets/clients/client-logo-2.png'
import logo3 from '../assets/clients/client-logo-3.png'
import logo4 from '../assets/clients/client-logo-4.png'
import logo5 from '../assets/clients/client-logo-5.png'
import logo6 from '../assets/clients/client-logo-6.png'

const LOGOS = [
  { src: logo1, name: 'Project Optimal', href: 'https://projectoptimal.eu' },
  { src: logo2, name: "Barny's", href: 'https://www.barnys.sk' },
  { src: logo3, name: 'Be A Pro!', href: 'https://www.beapro.sk' },
  { src: logo4, name: 'Beccstage', href: 'https://www.instagram.com/beccstage.show/' },
  { src: logo5, name: 'Jahodovo', href: 'https://www.jahodovo.sk' },
  { src: logo6, name: 'SefferStav', href: 'https://www.sefferstav.sk' },
]
const TRACK = [...LOGOS, ...LOGOS]

export default function Clients() {
  return (
    <section id="clients" className="container">
      <Reveal className="clients-header">
        <div className="sh-left">
          <div className="sh-num">03 — Klienti</div>
          <h2 className="sh-title">Značky,<br />ktorým veríme.</h2>
        </div>
        <div className="clients-tagline">
          Pracujeme s ľuďmi, ktorí to myslia vážne. Každý projekt berieme ako vlastný.
        </div>
      </Reveal>

      <Reveal className="clients-track-wrap" delay={0.1}>
        <div className="clients-track">
          {TRACK.map((logo, i) => (
            <a
              className="client-logo"
              key={i}
              href={logo.href}
              target="_blank"
              rel="noreferrer"
              aria-label={logo.name}
            >
              <img src={logo.src} alt={logo.name} />
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
