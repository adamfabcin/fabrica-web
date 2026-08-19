import Reveal from './Reveal'
import logo1 from '../assets/clients/client-logo-1.png'
import logo2 from '../assets/clients/client-logo-2.png'
import logo3 from '../assets/clients/client-logo-3.png'
import logo4 from '../assets/clients/client-logo-4.png'
import logo5 from '../assets/clients/client-logo-5.png'
import logo6 from '../assets/clients/client-logo-6.png'

const LOGOS = [logo1, logo2, logo3, logo4, logo5, logo6]
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
            <div className="client-logo" key={i}>
              <img src={logo} alt="Klient" />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
