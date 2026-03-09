/**
 * Realistic device mockups (iPhone 15 Pro + MacBook Pro) as detailed SVGs.
 * Devices are dark (Space Black) with white screens.
 */

export function IPhoneMockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 572"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Drop shadow */}
      <defs>
        <filter id="iphone-shadow" x="-10" y="-6" width="300" height="600" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.25" />
        </filter>
        <linearGradient id="iphone-bezel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a3a3c" />
          <stop offset="100%" stopColor="#1c1c1e" />
        </linearGradient>
        <linearGradient id="iphone-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#636366" />
          <stop offset="50%" stopColor="#48484a" />
          <stop offset="100%" stopColor="#2c2c2e" />
        </linearGradient>
      </defs>

      <g filter="url(#iphone-shadow)">
        {/* Titanium frame */}
        <rect x="16" y="16" width="248" height="540" rx="44" ry="44"
          fill="url(#iphone-edge)" />
        {/* Inner body */}
        <rect x="19" y="19" width="242" height="534" rx="42" ry="42"
          fill="url(#iphone-bezel)" />
        {/* Screen - white */}
        <rect x="26" y="26" width="228" height="520" rx="36" ry="36"
          fill="white" />

        {/* Dynamic Island */}
        <rect x="104" y="36" width="72" height="24" rx="12"
          fill="#1c1c1e" />
        {/* Camera lens in Dynamic Island */}
        <circle cx="152" cy="48" r="5" fill="#0a0a0a" />
        <circle cx="152" cy="48" r="3" fill="#1a1a2e" opacity="0.6" />

        {/* Side button (power) - right */}
        <rect x="264" y="160" width="3" height="64" rx="1.5" fill="#48484a" />
        {/* Volume buttons - left */}
        <rect x="13" y="140" width="3" height="32" rx="1.5" fill="#48484a" />
        <rect x="13" y="182" width="3" height="32" rx="1.5" fill="#48484a" />
        {/* Silent switch - left */}
        <rect x="13" y="112" width="3" height="18" rx="1.5" fill="#48484a" />

        {/* Home indicator */}
        <rect x="100" y="524" width="80" height="5" rx="2.5"
          fill="#c7c7cc" />

        {/* Screen content - subtle wireframe UI */}
        {/* Status bar */}
        <rect x="40" y="40" width="28" height="6" rx="3" fill="#e5e5ea" />
        <rect x="212" y="40" width="28" height="6" rx="3" fill="#e5e5ea" />
        {/* Hero image placeholder */}
        <rect x="40" y="72" width="200" height="120" rx="16" fill="#f2f2f7" />
        {/* Title */}
        <rect x="40" y="208" width="140" height="10" rx="5" fill="#e5e5ea" />
        <rect x="40" y="226" width="100" height="8" rx="4" fill="#f2f2f7" />
        {/* Cards */}
        <rect x="40" y="252" width="200" height="72" rx="12" fill="#f2f2f7" />
        <rect x="40" y="336" width="200" height="72" rx="12" fill="#f2f2f7" />
        {/* Tab bar */}
        <rect x="40" y="476" width="200" height="36" rx="8" fill="#f9f9f9" />
        <circle cx="80" cy="494" r="4" fill="#d1d1d6" />
        <circle cx="120" cy="494" r="4" fill="#d1d1d6" />
        <circle cx="160" cy="494" r="4" fill="#d1d1d6" />
        <circle cx="200" cy="494" r="4" fill="#d1d1d6" />
      </g>
    </svg>
  );
}

export function MacBookMockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <filter id="macbook-shadow" x="-10" y="-6" width="740" height="490" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.2" />
        </filter>
        <linearGradient id="macbook-lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a3a3c" />
          <stop offset="100%" stopColor="#2c2c2e" />
        </linearGradient>
        <linearGradient id="macbook-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#48484a" />
          <stop offset="100%" stopColor="#3a3a3c" />
        </linearGradient>
        <linearGradient id="macbook-keyboard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1c1c1e" />
          <stop offset="100%" stopColor="#2c2c2e" />
        </linearGradient>
      </defs>

      <g filter="url(#macbook-shadow)">
        {/* ===== LID / SCREEN ===== */}
        {/* Outer lid */}
        <rect x="72" y="8" width="576" height="368" rx="16" ry="16"
          fill="url(#macbook-lid)" />
        {/* Screen bezel (thin) */}
        <rect x="80" y="16" width="560" height="350" rx="10" ry="10"
          fill="#1c1c1e" />
        {/* Screen - white */}
        <rect x="88" y="24" width="544" height="334" rx="4" ry="4"
          fill="white" />
        {/* Camera */}
        <circle cx="360" cy="20" r="3" fill="#2c2c2e" />
        <circle cx="360" cy="20" r="1.5" fill="#48484a" />

        {/* ===== BASE ===== */}
        {/* Hinge */}
        <rect x="72" y="376" width="576" height="6" rx="1"
          fill="#48484a" />
        {/* Base body - tapered */}
        <path d="M32 382 H688 Q696 382 694 388 L686 420 Q684 426 676 426 H44 Q36 426 34 420 L26 388 Q24 382 32 382 Z"
          fill="url(#macbook-base)" />
        {/* Keyboard area */}
        <rect x="120" y="388" width="480" height="10" rx="2"
          fill="url(#macbook-keyboard)" opacity="0.5" />
        {/* Trackpad */}
        <rect x="270" y="404" width="180" height="14" rx="4"
          fill="#2c2c2e" stroke="#48484a" strokeWidth="0.5" />
        {/* Notch cutout at bottom of screen (for Apple logo area) */}
        <rect x="330" y="430" width="60" height="2" rx="1"
          fill="#636366" opacity="0.3" />

        {/* Screen content */}
        {/* Menu bar */}
        <rect x="96" y="30" width="528" height="20" rx="0" fill="#f9f9f9" />
        <circle cx="106" cy="40" r="3" fill="#e5e5ea" />
        <rect x="116" y="37" width="30" height="6" rx="3" fill="#e5e5ea" />
        <rect x="152" y="37" width="24" height="6" rx="3" fill="#e5e5ea" />
        <rect x="182" y="37" width="28" height="6" rx="3" fill="#e5e5ea" />
        {/* Hero section */}
        <rect x="96" y="70" width="528" height="160" rx="0" fill="#f2f2f7" />
        <rect x="140" y="120" width="240" height="16" rx="8" fill="#e5e5ea" />
        <rect x="180" y="146" width="160" height="10" rx="5" fill="#e5e5ea" opacity="0.7" />
        <rect x="210" y="170" width="100" height="28" rx="14" fill="#e5e5ea" />
        {/* Content cards */}
        <rect x="96" y="244" width="168" height="100" rx="8" fill="#f2f2f7" />
        <rect x="276" y="244" width="168" height="100" rx="8" fill="#f2f2f7" />
        <rect x="456" y="244" width="168" height="100" rx="8" fill="#f2f2f7" />
      </g>
    </svg>
  );
}
