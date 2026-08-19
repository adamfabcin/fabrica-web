import Reveal from './Reveal'

export default function About() {
  return (
    <section id="about" className="container">
      <div className="about-inner">
        <Reveal as="p" className="about-statement">
          Dobrý marketing nie je o tom, <strong>kto kričí hlasnejšie</strong>, ale o tom,{' '}
          <em>kto hovorí múdrejšie</em>. Každý projekt staviame od základu — bez šablón, bez kompromisov.
        </Reveal>
      </div>
    </section>
  )
}
