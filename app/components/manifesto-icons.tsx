import type { ReactNode } from "react";

interface IconProps {
  className?: string;
  size?: number;
}

/** Target / bullseye — represents "core" */
export function Icon3DCore({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Outer glow */}
        <filter id="core-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        {/* 3D lighting gradients */}
        <radialGradient id="core-outer" cx="42%" cy="38%" r="55%">
          <stop offset="0%" stopColor="#ff5555" />
          <stop offset="60%" stopColor="#cc2020" />
          <stop offset="100%" stopColor="#881010" />
        </radialGradient>
        <radialGradient id="core-white-ring" cx="42%" cy="38%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#f0f0f5" />
          <stop offset="100%" stopColor="#d8d8e0" />
        </radialGradient>
        <radialGradient id="core-inner" cx="42%" cy="38%" r="50%">
          <stop offset="0%" stopColor="#ff4444" />
          <stop offset="60%" stopColor="#cc1818" />
          <stop offset="100%" stopColor="#900e0e" />
        </radialGradient>
        <radialGradient id="core-center" cx="40%" cy="35%" r="45%">
          <stop offset="0%" stopColor="#ff6666" />
          <stop offset="100%" stopColor="#dd2222" />
        </radialGradient>
        {/* Ambient blue reflection from atom style */}
        <radialGradient id="core-ambient" cx="60%" cy="65%" r="40%">
          <stop offset="0%" stopColor="#8cb4ff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#8cb4ff" stopOpacity="0" />
        </radialGradient>
        <filter id="core-shadow" x="-25%" y="-15%" width="150%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="rgba(200,20,20,0.3)" />
        </filter>
      </defs>
      <g filter="url(#core-shadow)">
        {/* Base sphere shadow for 3D depth */}
        <ellipse cx="20" cy="34" rx="10" ry="2" fill="black" opacity="0.08" />
        {/* Outer red ring */}
        <circle cx="20" cy="19" r="15.5" fill="url(#core-outer)" />
        {/* White ring */}
        <circle cx="20" cy="19" r="11.5" fill="url(#core-white-ring)" />
        {/* Inner red ring */}
        <circle cx="20" cy="19" r="8" fill="url(#core-inner)" />
        {/* White center */}
        <circle cx="20" cy="19" r="5" fill="url(#core-white-ring)" />
        {/* Bullseye */}
        <circle cx="20" cy="19" r="2.5" fill="url(#core-center)" />
        {/* Ambient blue reflection */}
        <circle cx="20" cy="19" r="15.5" fill="url(#core-ambient)" />
        {/* Main specular highlight — glass-like */}
        <ellipse cx="14.5" cy="12.5" rx="7" ry="4" fill="white" opacity="0.45" transform="rotate(-20 14.5 12.5)" />
        {/* Secondary highlight */}
        <ellipse cx="15" cy="13.5" rx="4" ry="2" fill="white" opacity="0.25" transform="rotate(-20 15 13.5)" />
        {/* Rim light — bottom edge catch light */}
        <path d="M10 26 Q20 30 30 26" stroke="white" strokeWidth="0.8" fill="none" opacity="0.15" />
      </g>
    </svg>
  );
}

/** Fingerprint — represents "human-centered" */
export function Icon3DFingerprint({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="fp-pad" cx="45%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#ffdcc8" />
          <stop offset="60%" stopColor="#e8b8a0" />
          <stop offset="100%" stopColor="#c89880" />
        </radialGradient>
        <radialGradient id="fp-ambient" cx="60%" cy="65%" r="40%">
          <stop offset="0%" stopColor="#8cb4ff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#8cb4ff" stopOpacity="0" />
        </radialGradient>
        <filter id="fp-shadow" x="-25%" y="-15%" width="150%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="rgba(100,60,40,0.25)" />
        </filter>
      </defs>
      <g filter="url(#fp-shadow)">
        {/* Finger pad — rounded, skin-toned */}
        <rect x="6" y="3" width="28" height="35" rx="14" fill="url(#fp-pad)" />
        {/* Ambient blue reflection */}
        <rect x="6" y="3" width="28" height="35" rx="14" fill="url(#fp-ambient)" />
        {/* Fingerprint ridges */}
        <path d="M20 10C14 10 9.5 14.5 9.5 20" stroke="#a07060" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M20 13c-4 0-7 3-7 7v2" stroke="#a07060" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.55" />
        <path d="M20 16c-2.2 0-4 1.8-4 4v4" stroke="#a07060" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
        <path d="M20 19c-0.8 0-1.5.7-1.5 1.5v4" stroke="#a07060" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.45" />
        <path d="M20 10c6 0 10.5 4.5 10.5 10" stroke="#a07060" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M20 13c4 0 7 3 7 7v3" stroke="#a07060" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.55" />
        <path d="M20 16c2.2 0 4 1.8 4 4v5" stroke="#a07060" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
        <path d="M20 19c0.8 0 1.5.7 1.5 1.5v5.5" stroke="#a07060" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.45" />
        <line x1="20" y1="21" x2="20" y2="30" stroke="#a07060" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
        {/* Glass-like specular highlight */}
        <ellipse cx="15" cy="10" rx="6" ry="4" fill="white" opacity="0.5" transform="rotate(-10 15 10)" />
        <ellipse cx="15.5" cy="11" rx="3.5" ry="2" fill="white" opacity="0.3" transform="rotate(-10 15.5 11)" />
        {/* Rim light */}
        <path d="M12 35 Q20 38 28 35" stroke="white" strokeWidth="0.6" fill="none" opacity="0.15" />
      </g>
    </svg>
  );
}

/** Magnifying glass — represents "evidence-driven" */
export function Icon3DMagnifier({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Handle gradient — dark metal */}
        <linearGradient id="mag-handle" x1="26" y1="26" x2="36" y2="36">
          <stop offset="0%" stopColor="#555" />
          <stop offset="30%" stopColor="#222" />
          <stop offset="70%" stopColor="#111" />
          <stop offset="100%" stopColor="#333" />
        </linearGradient>
        {/* Handle highlight */}
        <linearGradient id="mag-handle-hi" x1="25" y1="27" x2="35" y2="37">
          <stop offset="0%" stopColor="white" stopOpacity="0.2" />
          <stop offset="50%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        {/* Rim — dark metal with 3D gradient */}
        <radialGradient id="mag-rim" cx="42%" cy="38%" r="55%">
          <stop offset="0%" stopColor="#666" />
          <stop offset="40%" stopColor="#333" />
          <stop offset="80%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#222" />
        </radialGradient>
        {/* Glass — translucent with blue tint (atom-style) */}
        <radialGradient id="mag-glass" cx="40%" cy="35%" r="50%">
          <stop offset="0%" stopColor="#eef5ff" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#d0e4ff" stopOpacity="0.6" />
          <stop offset="80%" stopColor="#a8c8f0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#90b8e8" stopOpacity="0.25" />
        </radialGradient>
        {/* Blue ambient glow inside lens — atom style */}
        <radialGradient id="mag-inner-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8cb4ff" stopOpacity="0.15" />
          <stop offset="70%" stopColor="#8cb4ff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#8cb4ff" stopOpacity="0" />
        </radialGradient>
        <filter id="mag-shadow" x="-25%" y="-15%" width="150%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="rgba(0,0,0,0.3)" />
        </filter>
        {/* Lens glow — subtle outer emission */}
        <filter id="mag-lens-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
        </filter>
      </defs>
      <g filter="url(#mag-shadow)">
        {/* Ground shadow */}
        <ellipse cx="22" cy="37" rx="10" ry="1.5" fill="black" opacity="0.06" />
        {/* Handle */}
        <line x1="24.5" y1="24.5" x2="34.5" y2="34.5" stroke="url(#mag-handle)" strokeWidth="5" strokeLinecap="round" />
        <line x1="24.5" y1="24.5" x2="34.5" y2="34.5" stroke="url(#mag-handle-hi)" strokeWidth="5" strokeLinecap="round" />
        {/* Handle edge highlight */}
        <line x1="25.5" y1="26" x2="33.5" y2="34" stroke="white" strokeWidth="0.6" strokeLinecap="round" opacity="0.15" />
        {/* Outer rim — thick for 3D feel */}
        <circle cx="16" cy="16" r="13" fill="url(#mag-rim)" />
        {/* Inner rim bevel */}
        <circle cx="16" cy="16" r="12" fill="none" stroke="#555" strokeWidth="0.5" opacity="0.3" />
        {/* Glass fill */}
        <circle cx="16" cy="16" r="10.5" fill="url(#mag-glass)" />
        {/* Blue inner glow — atom style */}
        <circle cx="16" cy="16" r="10.5" fill="url(#mag-inner-glow)" />
        {/* Inner rim shadow */}
        <circle cx="16" cy="16" r="10.5" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
        {/* Main specular reflection — bright, glass-like */}
        <ellipse cx="11.5" cy="11" rx="5.5" ry="3" fill="white" opacity="0.7" transform="rotate(-25 11.5 11)" />
        <ellipse cx="12" cy="11.5" rx="3" ry="1.5" fill="white" opacity="0.4" transform="rotate(-25 12 11.5)" />
        {/* Secondary reflection — bottom */}
        <ellipse cx="19" cy="21" rx="3" ry="1.2" fill="white" opacity="0.12" transform="rotate(-25 19 21)" />
        {/* Rim light on metal */}
        <path d="M5 22 Q8 28 14 28" stroke="white" strokeWidth="0.5" fill="none" opacity="0.2" />
      </g>
    </svg>
  );
}

/** Heart — represents "we love" */
export function Icon3DHeart({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Main heart gradient — rich red with 3D depth */}
        <radialGradient id="heart-body" cx="42%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#ff5070" />
          <stop offset="40%" stopColor="#e83050" />
          <stop offset="75%" stopColor="#c01838" />
          <stop offset="100%" stopColor="#a01028" />
        </radialGradient>
        {/* Top specular shine */}
        <radialGradient id="heart-shine" cx="35%" cy="25%" r="35%">
          <stop offset="0%" stopColor="white" stopOpacity="0.6" />
          <stop offset="60%" stopColor="white" stopOpacity="0.1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        {/* Ambient blue reflection — atom style */}
        <radialGradient id="heart-ambient" cx="65%" cy="70%" r="35%">
          <stop offset="0%" stopColor="#8cb4ff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#8cb4ff" stopOpacity="0" />
        </radialGradient>
        {/* Bottom shadow gradient */}
        <linearGradient id="heart-depth" x1="20" y1="8" x2="20" y2="34">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="80%" stopColor="rgba(80,0,15,0.3)" />
          <stop offset="100%" stopColor="rgba(60,0,10,0.15)" />
        </linearGradient>
        <filter id="heart-shadow" x="-25%" y="-15%" width="150%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="rgba(200,20,40,0.35)" />
        </filter>
      </defs>
      <g filter="url(#heart-shadow)">
        {/* Ground shadow */}
        <ellipse cx="20" cy="36" rx="9" ry="1.5" fill="black" opacity="0.06" />
        {/* Heart base */}
        <path
          d="M20 34C20 34 4 24.5 4 14.5c0-5.5 4.2-9.5 9.2-9.5 3 0 5.4 1.6 6.8 4C21.4 6.6 23.8 5 26.8 5 31.8 5 36 9 36 14.5 36 24.5 20 34 20 34z"
          fill="url(#heart-body)"
        />
        {/* Depth shadow overlay */}
        <path
          d="M20 34C20 34 4 24.5 4 14.5c0-5.5 4.2-9.5 9.2-9.5 3 0 5.4 1.6 6.8 4C21.4 6.6 23.8 5 26.8 5 31.8 5 36 9 36 14.5 36 24.5 20 34 20 34z"
          fill="url(#heart-depth)"
        />
        {/* Main shine */}
        <path
          d="M20 34C20 34 4 24.5 4 14.5c0-5.5 4.2-9.5 9.2-9.5 3 0 5.4 1.6 6.8 4C21.4 6.6 23.8 5 26.8 5 31.8 5 36 9 36 14.5 36 24.5 20 34 20 34z"
          fill="url(#heart-shine)"
        />
        {/* Ambient blue reflection */}
        <path
          d="M20 34C20 34 4 24.5 4 14.5c0-5.5 4.2-9.5 9.2-9.5 3 0 5.4 1.6 6.8 4C21.4 6.6 23.8 5 26.8 5 31.8 5 36 9 36 14.5 36 24.5 20 34 20 34z"
          fill="url(#heart-ambient)"
        />
        {/* Sharp specular — glass-like left lobe */}
        <ellipse cx="11.5" cy="11" rx="4" ry="2.8" fill="white" opacity="0.55" transform="rotate(-25 11.5 11)" />
        <ellipse cx="12" cy="11.5" rx="2" ry="1.2" fill="white" opacity="0.35" transform="rotate(-25 12 11.5)" />
        {/* Subtle right lobe highlight */}
        <ellipse cx="27" cy="11.5" rx="3" ry="2" fill="white" opacity="0.2" transform="rotate(20 27 11.5)" />
        {/* Rim light — bottom edge */}
        <path d="M10 27 Q20 32 30 27" stroke="white" strokeWidth="0.6" fill="none" opacity="0.12" />
      </g>
    </svg>
  );
}

/** Map of style keys to their 3D icons */
export const manifestoIcons: Record<string, ReactNode> = {
  purple: <Icon3DCore />,
  orange: <Icon3DFingerprint />,
  pink: <Icon3DMagnifier />,
  blue: <Icon3DHeart />,
};
