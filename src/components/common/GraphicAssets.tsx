import React from 'react';

/**
 * Hand-drawn / Pencil-sketched Navigation Icons
 */
export const HandDrawnHomeIcon: React.FC<{ className?: string; active?: boolean }> = ({ className = 'w-6 h-6', active = false }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    {active ? (
      <path
        d="M3.5 10.2 C3.3 9.8 3.7 9.3 4.1 9.0 L11.2 3.4 C11.7 3.0 12.3 3.0 12.8 3.4 L19.9 9.0 C20.3 9.3 20.7 9.8 20.5 10.2 L19.4 19.5 C19.3 20.3 18.6 21 17.8 21 L6.2 21 C5.4 21 4.7 20.3 4.6 19.5 Z"
        fill="#0F3EB0"
        stroke="#0F3EB0"
        strokeWidth="1.8"
      />
    ) : (
      <>
        <path
          d="M3.8 10.2 L11.3 3.6 C11.7 3.2 12.3 3.2 12.7 3.6 L20.2 10.2 C20.6 10.5 20.4 11.2 19.9 11.2 L18.8 11.2 L18.8 19.6 C18.8 20.4 18.2 21 17.4 21 L6.6 21 C5.8 21 5.2 20.4 5.2 19.6 L5.2 11.2 L4.1 11.2 C3.6 11.2 3.4 10.5 3.8 10.2 Z"
          stroke="#7E8494"
          strokeWidth="1.8"
        />
        <path d="M10 21 L10 14.5 C10 13.7 10.6 13 11.4 13 L12.6 13 C13.4 13 14 13.7 14 14.5 L14 21" stroke="#7E8494" strokeWidth="1.8" />
      </>
    )}
  </svg>
);

export const HandDrawnBookIcon: React.FC<{ className?: string; active?: boolean }> = ({ className = 'w-6 h-6', active = false }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path
      d="M3.8 6.2 C5.8 5.2 8.5 5.1 11.5 6.4 L11.5 19.4 C8.5 18.1 5.8 18.2 3.8 19.2 Z"
      stroke={active ? '#0F3EB0' : '#7E8494'}
      strokeWidth="1.8"
      fill={active ? '#0F3EB0' : 'none'}
      fillOpacity={active ? 0.12 : 0}
    />
    <path
      d="M20.2 6.2 C18.2 5.2 15.5 5.1 12.5 6.4 L12.5 19.4 C15.5 18.1 18.2 18.2 20.2 19.2 Z"
      stroke={active ? '#0F3EB0' : '#7E8494'}
      strokeWidth="1.8"
      fill={active ? '#0F3EB0' : 'none'}
      fillOpacity={active ? 0.12 : 0}
    />
    <path d="M12 6.2 L12 19.4" stroke={active ? '#0F3EB0' : '#7E8494'} strokeWidth="1.8" />
  </svg>
);

export const HandDrawnFlaskIcon: React.FC<{ className?: string; active?: boolean }> = ({ className = 'w-6 h-6', active = false }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path
      d="M9.5 3.5 L14.5 3.5 M10 3.5 L10 8.5 L4.8 18.2 C4.1 19.4 5 21 6.4 21 L17.6 21 C19 21 19.9 19.4 19.2 18.2 L14 8.5 L14 3.5"
      stroke={active ? '#0F3EB0' : '#7E8494'}
      strokeWidth="1.8"
      fill={active ? '#0F3EB0' : 'none'}
      fillOpacity={active ? 0.12 : 0}
    />
    <path d="M7 16 C9.5 14.5 14.5 17.5 17 16" stroke={active ? '#0F3EB0' : '#7E8494'} strokeWidth="1.5" />
    <circle cx="10" cy="18" r="0.8" fill={active ? '#0F3EB0' : '#7E8494'} />
    <circle cx="13.5" cy="17.5" r="1.1" fill={active ? '#0F3EB0' : '#7E8494'} />
  </svg>
);

export const HandDrawnCatIcon: React.FC<{ className?: string; active?: boolean }> = ({ className = 'w-6 h-6', active = false }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path
      d="M6 7.5 L4 3 L9 5 C10 4.5 11 4.3 12 4.3 C13 4.3 14 4.5 15 5 L20 3 L18 7.5 C19.5 9 20.3 11 20.3 13 C20.3 17.5 16.5 20.5 12 20.5 C7.5 20.5 3.7 17.5 3.7 13 C3.7 11 4.5 9 6 7.5 Z"
      stroke={active ? '#0F3EB0' : '#7E8494'}
      strokeWidth="1.8"
      fill={active ? '#0F3EB0' : 'none'}
      fillOpacity={active ? 0.12 : 0}
    />
    {/* Eyes */}
    <ellipse cx="8.5" cy="12.5" rx="1.2" ry="1.6" fill={active ? '#0F3EB0' : '#7E8494'} stroke="none" />
    <ellipse cx="15.5" cy="12.5" rx="1.2" ry="1.6" fill={active ? '#0F3EB0' : '#7E8494'} stroke="none" />
    {/* Nose & mouth */}
    <path d="M12 14.5 L11.3 15.4 Q12 16 12.7 15.4 Z" fill={active ? '#0F3EB0' : '#7E8494'} stroke="none" />
    <path d="M11 16.2 Q12 17 12 16.2 Q12 17 13 16.2" stroke={active ? '#0F3EB0' : '#7E8494'} strokeWidth="1.2" />
    {/* Whiskers */}
    <path d="M5.5 13.5 L2.5 13 M5.5 15 L2.8 15.8" stroke={active ? '#0F3EB0' : '#7E8494'} strokeWidth="1.2" />
    <path d="M18.5 13.5 L21.5 13 M18.5 15 L21.2 15.8" stroke={active ? '#0F3EB0' : '#7E8494'} strokeWidth="1.2" />
  </svg>
);

export const HandDrawnProfileIcon: React.FC<{ className?: string; active?: boolean }> = ({ className = 'w-6 h-6', active = false }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <circle
      cx="12"
      cy="12"
      r="9.5"
      stroke={active ? '#0F3EB0' : '#7E8494'}
      strokeWidth="1.8"
      fill={active ? '#0F3EB0' : 'none'}
      fillOpacity={active ? 0.12 : 0}
    />
    <circle
      cx="12"
      cy="9.5"
      r="3.5"
      stroke={active ? '#0F3EB0' : '#7E8494'}
      strokeWidth="1.8"
      fill={active ? '#0F3EB0' : 'none'}
      fillOpacity={active ? 0.2 : 0}
    />
    <path
      d="M6.2 18.2 C7.5 15.8 9.5 14.8 12 14.8 C14.5 14.8 16.5 15.8 17.8 18.2"
      stroke={active ? '#0F3EB0' : '#7E8494'}
      strokeWidth="1.8"
    />
  </svg>
);

/**
 * Background Artwork from mockup: Reaching White Cat
 */
export const BackgroundCatReaching: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 200 240" className={className} fill="none">
    {/* Body of the cat stretched diagonally */}
    <g transform="translate(15, 10) rotate(-8 100 120)">
      {/* Soft back shadow */}
      <path
        d="M130 180 C150 150 145 100 120 70 C100 45 75 35 60 25 C50 18 42 12 35 5 C30 0 25 2 26 8 C28 18 36 28 42 38 C32 45 28 58 35 70 C42 82 55 90 70 100 C90 115 110 145 118 185 Z"
        fill="#E8E4DA"
        opacity="0.5"
      />
      {/* Main Body & Left Front Paw Reaching Up */}
      <path
        d="M125 185 C145 155 140 105 116 75 C98 52 74 42 58 30 C50 24 40 16 32 8 C28 4 22 6 24 12 C26 22 34 32 42 42 C30 48 26 62 34 74 C42 86 56 94 72 105 C92 120 112 150 120 190 Z"
        fill="#FFFFFF"
      />
      {/* Head */}
      <ellipse cx="62" cy="62" rx="22" ry="18" fill="#FFFFFF" transform="rotate(-15 62 62)" />
      {/* Left Ear with pink inside */}
      <polygon points="52,48 40,28 62,38" fill="#FFFFFF" />
      <polygon points="50,46 43,32 58,40" fill="#FDA4AF" />
      {/* Right Ear with pink inside */}
      <polygon points="76,52 88,32 68,44" fill="#FFFFFF" />
      <polygon points="77,50 84,36 71,44" fill="#FDA4AF" />
      {/* Eyes (closed happy or small cute eyes) */}
      <ellipse cx="56" cy="60" rx="2.5" ry="3.2" fill="#23262F" />
      <circle cx="55" cy="59" r="0.9" fill="#FFFFFF" />
      <ellipse cx="70" cy="64" rx="2.5" ry="3.2" fill="#23262F" />
      <circle cx="69" cy="63" r="0.9" fill="#FFFFFF" />
      {/* Nose and mouth */}
      <polygon points="62,67 60,65 64,65" fill="#FB7185" />
      <path d="M60 69 Q62 71 64 69" stroke="#7E8494" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* Pink Cheek */}
      <ellipse cx="50" cy="66" rx="3.5" ry="2" fill="#FECDD3" opacity="0.8" />
      <ellipse cx="74" cy="69" rx="3.5" ry="2" fill="#FECDD3" opacity="0.8" />
      {/* Paw pads on reaching paw */}
      <ellipse cx="28" cy="15" rx="3.5" ry="4" fill="#FDA4AF" opacity="0.7" transform="rotate(-25 28 15)" />
      <circle cx="23" cy="9" r="1.5" fill="#FDA4AF" opacity="0.7" />
      <circle cx="28" cy="7" r="1.5" fill="#FDA4AF" opacity="0.7" />
      <circle cx="34" cy="10" r="1.5" fill="#FDA4AF" opacity="0.7" />
      {/* Back tail curved */}
      <path
        d="M125 185 C140 195 160 190 170 175 C176 165 174 150 166 142 C160 135 152 140 156 148 C160 155 162 165 155 172 C148 178 135 180 120 175 Z"
        fill="#FFFFFF"
      />
    </g>
  </svg>
);

/**
 * Atomic Orbital Neon Yellow/Lime Sketch for Workout Card
 */
export const AtomicOrbitalSketch: React.FC<{ className?: string }> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Ellipse 1 */}
    <ellipse
      cx="50"
      cy="50"
      rx="40"
      ry="16"
      transform="rotate(45 50 50)"
      stroke="#CBE329"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Ellipse 2 */}
    <ellipse
      cx="50"
      cy="50"
      rx="40"
      ry="16"
      transform="rotate(-45 50 50)"
      stroke="#CBE329"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Nucleus dot */}
    <circle cx="50" cy="50" r="5" fill="#CBE329" />
  </svg>
);

export const LolaMascotAvatar: React.FC<{ size?: number; className?: string }> = ({ size = 42, className = '' }) => (
  <div
    className={`relative rounded-full overflow-hidden flex items-center justify-center bg-[#E3DECB] border-2 border-white shadow-xs shrink-0 ${className}`}
    style={{ width: size, height: size }}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Warm beige bg */}
      <circle cx="50" cy="50" r="50" fill="#EDE9DD" />
      {/* Ears */}
      <polygon points="26,45 15,18 42,28" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
      <polygon points="25,40 19,23 37,30" fill="#FDA4AF" />
      
      <polygon points="74,45 85,18 58,28" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
      <polygon points="75,40 81,23 63,30" fill="#FDA4AF" />

      {/* Head */}
      <ellipse cx="50" cy="56" rx="34" ry="30" fill="#FFFFFF" />
      
      {/* Big Cute Eyes */}
      <ellipse cx="36" cy="52" rx="7.5" ry="9.5" fill="#23262F" />
      <ellipse cx="64" cy="52" rx="7.5" ry="9.5" fill="#23262F" />
      
      {/* Iris blue reflection */}
      <circle cx="36" cy="53" r="5.5" fill="#0F3EB0" />
      <circle cx="64" cy="53" r="5.5" fill="#0F3EB0" />

      {/* Highlights in eyes */}
      <circle cx="34" cy="49" r="2.8" fill="#FFFFFF" />
      <circle cx="38" cy="54" r="1.2" fill="#FFFFFF" />
      <circle cx="62" cy="49" r="2.8" fill="#FFFFFF" />
      <circle cx="66" cy="54" r="1.2" fill="#FFFFFF" />

      {/* Nose */}
      <polygon points="50,61 47,58 53,58" fill="#FB7185" />

      {/* Mouth */}
      <path d="M47 62 Q50 65 50 63 Q50 65 53 62" fill="none" stroke="#7E8494" strokeWidth="1.2" strokeLinecap="round" />

      {/* Cheeks */}
      <ellipse cx="28" cy="61" rx="4" ry="2.5" fill="#FECDD3" opacity="0.8" />
      <ellipse cx="72" cy="61" rx="4" ry="2.5" fill="#FECDD3" opacity="0.8" />

      {/* Whiskers */}
      <line x1="22" y1="58" x2="10" y2="56" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="21" y1="62" x2="11" y2="63" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="78" y1="58" x2="90" y2="56" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="79" y1="62" x2="89" y2="63" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  </div>
);

export const LolaMascotBig: React.FC<{ size?: number; className?: string }> = ({ size = 180, className = '' }) => (
  <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
      <defs>
        <radialGradient id="chemFlaskGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#CBE329" />
          <stop offset="100%" stopColor="#0F3EB0" />
        </radialGradient>
      </defs>

      {/* Subtle aura */}
      <circle cx="100" cy="110" r="75" fill="#EDE9DD" opacity="0.8" />

      {/* Ears */}
      <polygon points="56,70 30,16 85,38" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
      <polygon points="52,62 38,28 76,44" fill="#FDA4AF" />
      
      <polygon points="144,70 170,16 115,38" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
      <polygon points="148,62 162,28 124,44" fill="#FDA4AF" />

      {/* Body & Paws */}
      <ellipse cx="100" cy="148" rx="55" ry="42" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="2" />

      {/* Head */}
      <ellipse cx="100" cy="85" rx="58" ry="48" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="2" />

      {/* Big Shiny Eyes */}
      <ellipse cx="76" cy="78" rx="13" ry="16" fill="#23262F" />
      <ellipse cx="124" cy="78" rx="13" ry="16" fill="#23262F" />
      
      <ellipse cx="76" cy="80" rx="9" ry="11" fill="#0F3EB0" />
      <ellipse cx="124" cy="80" rx="9" ry="11" fill="#0F3EB0" />

      <circle cx="72" cy="72" r="5" fill="#FFFFFF" />
      <circle cx="79" cy="82" r="2.2" fill="#FFFFFF" />
      <circle cx="120" cy="72" r="5" fill="#FFFFFF" />
      <circle cx="127" cy="82" r="2.2" fill="#FFFFFF" />

      {/* Cheeks */}
      <ellipse cx="60" cy="94" rx="8" ry="4.5" fill="#FECDD3" />
      <ellipse cx="140" cy="94" rx="8" ry="4.5" fill="#FECDD3" />

      {/* Nose */}
      <polygon points="100,92 94,87 106,87" fill="#FB7185" />
      
      {/* Cute Mouth */}
      <path d="M94 94 Q100 99 100 96 Q100 99 106 94" fill="none" stroke="#7E8494" strokeWidth="2" strokeLinecap="round" />

      {/* Whiskers */}
      <line x1="50" y1="88" x2="25" y2="84" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="48" y1="94" x2="26" y2="96" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="150" y1="88" x2="175" y2="84" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="152" y1="94" x2="174" y2="96" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </div>
);

export const BeakerIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <ellipse cx="50" cy="84" rx="28" ry="8" fill="#F1F5F9" opacity="0.5" />
    <path
      d="M42 20 L58 20 L58 35 L76 72 C79 78 74 84 66 84 L34 84 C26 84 21 78 24 72 L42 35 Z"
      stroke="#23262F"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="white"
    />
    <path
      d="M30 74 C36 71 44 76 52 73 C60 70 66 74 70 74 L66 82 L34 82 Z"
      fill="#E2E8F0"
      opacity="0.8"
    />
    <line x1="39" y1="20" x2="61" y2="20" stroke="#23262F" strokeWidth="3" strokeLinecap="round" />
    <line x1="38" y1="52" x2="45" y2="52" stroke="#7E8494" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="34" y1="62" x2="43" y2="62" stroke="#7E8494" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="30" y1="72" x2="41" y2="72" stroke="#7E8494" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const MoleculeIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <radialGradient id="sphereGradDark" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#7E8494" />
        <stop offset="50%" stopColor="#23262F" />
        <stop offset="100%" stopColor="#0F172A" />
      </radialGradient>
      <radialGradient id="sphereGradLight" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="60%" stopColor="#CBD5E1" />
        <stop offset="100%" stopColor="#7E8494" />
      </radialGradient>
    </defs>
    <ellipse cx="52" cy="85" rx="30" ry="6" fill="#E2E8F0" opacity="0.6" />
    <line x1="32" y1="62" x2="52" y2="46" stroke="#7E8494" strokeWidth="4" strokeLinecap="round" />
    <line x1="52" y1="46" x2="74" y2="60" stroke="#7E8494" strokeWidth="4" strokeLinecap="round" />
    <line x1="52" y1="46" x2="50" y2="24" stroke="#7E8494" strokeWidth="4" strokeLinecap="round" />
    <circle cx="32" cy="62" r="10" fill="url(#sphereGradLight)" />
    <circle cx="50" cy="24" r="9" fill="url(#sphereGradLight)" />
    <circle cx="74" cy="60" r="11" fill="url(#sphereGradDark)" />
    <circle cx="52" cy="46" r="13" fill="url(#sphereGradDark)" />
  </svg>
);

export const NotebookIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <ellipse cx="50" cy="86" rx="28" ry="6" fill="#E2E8F0" opacity="0.6" />
    <rect x="25" y="30" width="52" height="52" rx="4" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
    <rect x="22" y="26" width="52" height="52" rx="4" fill="#FFFFFF" stroke="#23262F" strokeWidth="2" />
    <line x1="30" y1="42" x2="66" y2="42" stroke="#E2E8F0" strokeWidth="1.5" />
    <line x1="30" y1="52" x2="66" y2="52" stroke="#E2E8F0" strokeWidth="1.5" />
    <line x1="30" y1="62" x2="66" y2="62" stroke="#E2E8F0" strokeWidth="1.5" />
    <line x1="30" y1="70" x2="54" y2="70" stroke="#E2E8F0" strokeWidth="1.5" />
    {[28, 36, 44, 52, 60, 68].map((x, i) => (
      <g key={i}>
        <rect x={x - 2} y="20" width="4" height="10" rx="2" fill="#7E8494" stroke="#23262F" strokeWidth="1" />
      </g>
    ))}
  </svg>
);

export const AnalyticsIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <defs>
      <linearGradient id="waveFill" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0F3EB0" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#0F3EB0" stopOpacity="0.0" />
      </linearGradient>
    </defs>
    <line x1="16" y1="78" x2="88" y2="78" stroke="#E2E8F0" strokeWidth="1.5" />
    <line x1="16" y1="55" x2="88" y2="55" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="16" y1="32" x2="88" y2="32" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
    
    <path
      d="M18 70 C30 78, 40 40, 52 45 C64 50, 72 26, 86 36 L86 78 L18 78 Z"
      fill="url(#waveFill)"
    />
    
    <path
      d="M18 64 C28 50, 42 70, 55 60 C68 50, 76 68, 86 52"
      stroke="#7E8494"
      strokeWidth="2"
      strokeLinecap="round"
    />
    
    <path
      d="M18 70 C30 78, 40 40, 52 45 C64 50, 72 26, 86 36"
      stroke="#0F3EB0"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    <circle cx="52" cy="45" r="3" fill="#0F3EB0" stroke="#FFFFFF" strokeWidth="1.5" />
    <circle cx="86" cy="36" r="3.5" fill="#0F3EB0" stroke="#FFFFFF" strokeWidth="1.5" />
  </svg>
);

export const WatercolorStain: React.FC<{ color?: string; className?: string }> = ({
  color = '#0F3EB0',
  className = 'w-48 h-48',
}) => (
  <svg viewBox="0 0 200 200" className={className} fill="none">
    <path
      d="M90 20 C140 10, 180 50, 175 100 C170 150, 130 185, 85 180 C40 175, 15 130, 25 80 C35 30, 60 25, 90 20 Z"
      fill={color}
    />
  </svg>
);

export const ChemicalFlaskSketch: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <path
      d="M44 20 L56 20 M47 20 L47 38 L28 76 C25 82 29 88 36 88 L64 88 C71 88 75 82 72 76 L53 38 L53 20"
      stroke="#7E8494"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M33 70 C40 67 48 72 56 68 C62 65 67 69 67 69" stroke="#7E8494" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="42" cy="76" r="1.5" fill="#7E8494" />
    <circle cx="55" cy="74" r="2" fill="#7E8494" />
  </svg>
);

export const BenzeneSketch: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <polygon
      points="50,15 80,32 80,68 50,85 20,68 20,32"
      stroke="#7E8494"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="50" cy="50" r="20" stroke="#7E8494" strokeWidth="1.5" strokeDasharray="3 3" />
  </svg>
);

