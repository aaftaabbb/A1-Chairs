const ChairIllustration = ({ className = '', strokeWidth = 1.4, showTexture = true }) => (
  <svg
    className={className}
    viewBox="0 0 96 96"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {showTexture && (
      <>
        <g strokeWidth="0.6" opacity="0.14">
          {[22, 30, 38, 46, 54, 62, 70].map(x => (
            <line key={x} x1={x} y1="8" x2={x} y2="90" />
          ))}
        </g>
        <ellipse cx="48" cy="91" rx="27" ry="3.2" stroke="none" fill="currentColor" opacity="0.16" />
      </>
    )}
    <rect x="39" y="9" width="18" height="9" rx="4.5" strokeWidth="1.5" />
    <path d="M34 19 C32 40 32 52 36 60 L60 60 C64 52 64 40 62 19 C56 15 42 15 36 19 Z" fill="currentColor" opacity="0.08" />
    <path d="M36 19 C34 40 34 52 37 60 M60 19 C62 40 62 52 59 60" opacity="0.6" strokeWidth="1.4" />
    <path d="M39 32 C44 28 52 28 57 32" opacity="0.5" strokeWidth="1.2" />
    <rect x="25" y="41" width="9" height="5" rx="2.5" strokeWidth="1.5" />
    <rect x="62" y="41" width="9" height="5" rx="2.5" strokeWidth="1.5" />
    <line x1="30" y1="46" x2="30" y2="60" opacity="0.7" strokeWidth="1.3" />
    <line x1="66" y1="46" x2="66" y2="60" opacity="0.7" strokeWidth="1.3" />
    <path d="M31 58 C24 59 24 67 31 68 L65 68 C72 67 72 59 65 58 Z" fill="currentColor" opacity="0.10" />
    <path d="M33 60 C28 61 28 66 34 66 L62 66 C68 66 68 61 63 60 Z" strokeWidth="1.3" />
    <line x1="48" y1="67" x2="48" y2="77" strokeWidth="1.5" />
    <line x1="48" y1="77" x2="31" y2="87" strokeWidth="1.5" />
    <line x1="48" y1="77" x2="65" y2="87" strokeWidth="1.5" />
    <line x1="48" y1="77" x2="21" y2="83" strokeWidth="1.5" />
    <line x1="48" y1="77" x2="75" y2="83" strokeWidth="1.5" />
    <circle cx="31" cy="88" r="1.7" stroke="none" fill="currentColor" />
    <circle cx="65" cy="88" r="1.7" stroke="none" fill="currentColor" />
    <circle cx="21" cy="84" r="1.7" stroke="none" fill="currentColor" />
    <circle cx="75" cy="84" r="1.7" stroke="none" fill="currentColor" />
  </svg>
);

export default ChairIllustration;