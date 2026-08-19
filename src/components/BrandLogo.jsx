import wordmarkPaths from '../assets/brand/wordmark-paths.json'

const ALL_GLYPHS = [...wordmarkPaths.fabrica, ...wordmarkPaths.studio]

export default function BrandLogo({ revealed }) {
  return (
    <svg viewBox="0 0 500 140" className="brand-logo" style={{ opacity: revealed ? 1 : 0 }}>
      {ALL_GLYPHS.map((g, i) => (
        <path key={i} d={g.d} fill="rgba(255,69,32,1)" stroke="none" />
      ))}
    </svg>
  )
}
