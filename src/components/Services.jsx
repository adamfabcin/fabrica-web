import Reveal from './Reveal'

const SERVICES = [
  { num: '01', name: 'Brand Identity', tag: 'Logo · Vizuál · Guidelines' },
  { num: '02', name: 'Social Media', tag: 'Content · Stratégia · Reklama' },
  { num: '03', name: 'Video & Motion', tag: 'Produkcia · Strih · Reels' },
  { num: '04', name: 'Web Design', tag: 'UI/UX · Landing page · E-shop' },
  { num: '05', name: 'Copywriting', tag: 'Texty · Kampane · SEO' },
]

export default function Services() {
  return (
    <section id="services" className="container">
      <Reveal className="section-head">
        <div className="sh-left">
          <div className="sh-num">01 — Čo robíme</div>
          <h2 className="sh-title">Marketing,<br />ktorý funguje.</h2>
        </div>
        <p className="sh-right">Od stratégie po realizáciu — nerobíme kúsky skladačky, staviame celý obraz naraz.</p>
      </Reveal>

      <div className="services-list">
        {SERVICES.map((s, i) => (
          <Reveal as="div" className="service-row" key={s.num} delay={i * 0.06}>
            <span className="srv-num">{s.num}</span>
            <span className="srv-name">{s.name}</span>
            <span className="srv-tag">{s.tag}</span>
            <span className="srv-arrow">→</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
