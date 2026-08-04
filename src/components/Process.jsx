import Reveal from './Reveal'

const STEPS = [
  { num: '01', title: 'Discovery', desc: 'Spoznáme tvoj biznis, ciele a cieľovú skupinu do hĺbky.' },
  { num: '02', title: 'Stratégia', desc: 'Navrhneme plán, ktorý dáva zmysel — merateľný a realistický.' },
  { num: '03', title: 'Tvorba', desc: 'Dizajn, texty, video — všetko pod jednou strechou.' },
  { num: '04', title: 'Launch & Rast', desc: 'Vypustíme, sledujeme a optimalizujeme. Bez prestania.' },
]

export default function Process() {
  return (
    <section id="process" className="container">
      <Reveal className="section-head">
        <div className="sh-left">
          <div className="sh-num">02 — Ako pracujeme</div>
          <h2 className="sh-title">Jednoduchý<br />proces.</h2>
        </div>
      </Reveal>

      <div className="process-grid">
        {STEPS.map((s, i) => (
          <Reveal as="div" className="process-cell" key={s.num} delay={i * 0.08}>
            <div className="pc-num">{s.num}</div>
            <div className="pc-title">{s.title}</div>
            <div className="pc-desc">{s.desc}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
