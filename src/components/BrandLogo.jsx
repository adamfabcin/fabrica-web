export default function BrandLogo({ revealed }) {
  return (
    <svg
      viewBox="0 0 500 140"
      className="brand-logo"
      style={{ opacity: revealed ? 1 : 0 }}
      role="img"
      aria-label="FABRICA STUDIO"
    >
      <text
        x="250" y="78" textAnchor="middle"
        fontFamily="'Helvetica Neue', 'Arial Black', Helvetica, Arial, sans-serif"
        fontWeight="900" fontSize="88" letterSpacing="10" fill="#FF4520"
      >FABRICA</text>
      <text
        x="250" y="118" textAnchor="middle"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontWeight="400" fontSize="26" letterSpacing="26" fill="#FF4520"
      >STUDIO</text>
    </svg>
  )
}
