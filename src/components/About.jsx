import Reveal from './Reveal'

export default function About() {
  return (
    <section id="about" className="container">
      <div className="about-inner">
        <Reveal as="p" className="about-statement">
          Veríme, že <strong>dobrý marketing nie je o kričaní hlasnejšie</strong> — je o hovorení{' '}
          <em>múdrejšie</em>. Každý projekt staviame od základu, bez šablón a bez kompromisov.
        </Reveal>
      </div>
    </section>
  )
}
