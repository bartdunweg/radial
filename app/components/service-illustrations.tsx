const strokeW = 1;

function Iso({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

/** Research & Strategy — layered lens / magnifier */
function ResearchStrategy() {
  return (
    <Iso>
      {/* Stacked isometric planes */}
      <g stroke="currentColor" strokeWidth={strokeW}>
        {[0, 20, 40].map((y) => (
          <path
            key={y}
            d={`M100 ${50 + y} L150 ${75 + y} L100 ${100 + y} L50 ${75 + y} Z`}
            fill="none"
          />
        ))}
        {/* Vertical connectors */}
        <line x1={50} y1={75} x2={50} y2={115} />
        <line x1={150} y1={75} x2={150} y2={115} />
        <line x1={100} y1={100} x2={100} y2={140} />
        {/* Search circle */}
        <circle cx={100} cy={70} r={16} />
        <line x1={112} y1={80} x2={124} y2={92} />
      </g>
    </Iso>
  );
}

/** Product Design — layered screens */
function ProductDesign() {
  return (
    <Iso>
      <g stroke="currentColor" strokeWidth={strokeW}>
        {/* Back screen */}
        <path d="M60 40 L140 40 L140 105 L60 105 Z" fill="none" rx={4} />
        {/* Front screen offset */}
        <path d="M70 50 L150 50 L150 115 L70 115 Z" fill="none" />
        {/* UI elements on front screen */}
        <rect x={80} y={60} width={30} height={4} rx={1} />
        <rect x={80} y={70} width={55} height={3} rx={1} />
        <rect x={80} y={78} width={55} height={3} rx={1} />
        <rect x={80} y={90} width={24} height={16} rx={2} />
        <rect x={110} y={90} width={24} height={16} rx={2} />
        {/* Pen tool */}
        <path d="M148 28 L155 42 L151 46 L143 32 Z" />
        <line x1={153} y1={44} x2={150} y2={48} />
      </g>
    </Iso>
  );
}

/** Design Systems — modular blocks / components */
function DesignSystems() {
  return (
    <Iso>
      <g stroke="currentColor" strokeWidth={strokeW}>
        {/* Isometric cubes - modular grid */}
        {[
          [70, 80], [110, 80], [90, 60], [90, 100],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <path d={`M${cx} ${cy - 15} L${cx + 18} ${cy - 5} L${cx} ${cy + 5} L${cx - 18} ${cy - 5} Z`} />
            <path d={`M${cx - 18} ${cy - 5} L${cx} ${cy + 5} L${cx} ${cy + 18} L${cx - 18} ${cy + 8} Z`} />
            <path d={`M${cx + 18} ${cy - 5} L${cx} ${cy + 5} L${cx} ${cy + 18} L${cx + 18} ${cy + 8} Z`} />
          </g>
        ))}
        {/* Connection lines */}
        <line x1={88} y1={75} x2={92} y2={75} strokeDasharray="2 2" />
        <line x1={100} y1={65} x2={100} y2={78} strokeDasharray="2 2" />
      </g>
    </Iso>
  );
}

/** Build MVPs — rocket / launch platform */
function BuildMvps() {
  return (
    <Iso>
      <g stroke="currentColor" strokeWidth={strokeW}>
        {/* Launch platform - isometric base */}
        <path d="M100 120 L150 95 L100 70 L50 95 Z" />
        {/* Rocket body */}
        <path d="M100 25 L108 50 L108 80 L92 80 L92 50 Z" />
        {/* Rocket nose */}
        <path d="M92 50 L100 25 L108 50" />
        {/* Fins */}
        <path d="M92 75 L82 85 L92 80" />
        <path d="M108 75 L118 85 L108 80" />
        {/* Exhaust lines */}
        <line x1={97} y1={82} x2={95} y2={92} strokeDasharray="3 2" />
        <line x1={100} y1={82} x2={100} y2={95} strokeDasharray="3 2" />
        <line x1={103} y1={82} x2={105} y2={92} strokeDasharray="3 2" />
      </g>
    </Iso>
  );
}

/** Boost Branding — diamond / prism */
function BoostBranding() {
  return (
    <Iso>
      <g stroke="currentColor" strokeWidth={strokeW}>
        {/* Central diamond */}
        <path d="M100 30 L140 70 L100 130 L60 70 Z" />
        {/* Inner facets */}
        <line x1={100} y1={30} x2={100} y2={130} />
        <line x1={60} y1={70} x2={140} y2={70} />
        {/* Radiating lines */}
        <line x1={100} y1={30} x2={100} y2={15} strokeDasharray="2 3" />
        <line x1={140} y1={70} x2={158} y2={70} strokeDasharray="2 3" />
        <line x1={60} y1={70} x2={42} y2={70} strokeDasharray="2 3" />
        {/* Small accent shapes */}
        <circle cx={100} cy={70} r={8} />
      </g>
    </Iso>
  );
}

/** AI Integration — neural network nodes */
function AiIntegration() {
  return (
    <Iso>
      <g stroke="currentColor" strokeWidth={strokeW}>
        {/* Central brain/chip */}
        <rect x={82} y={55} width={36} height={36} rx={4} />
        <rect x={88} y={61} width={24} height={24} rx={2} />
        {/* Connection points on chip */}
        {[70, 82, 94].map((y) => (
          <g key={`l-${y}`}>
            <line x1={82} y1={y} x2={62} y2={y} />
            <circle cx={60} cy={y} r={3} />
          </g>
        ))}
        {[70, 82, 94].map((y) => (
          <g key={`r-${y}`}>
            <line x1={118} y1={y} x2={138} y2={y} />
            <circle cx={140} cy={y} r={3} />
          </g>
        ))}
        {/* Top/bottom connections */}
        <line x1={100} y1={55} x2={100} y2={38} />
        <circle cx={100} cy={35} r={3} />
        <line x1={100} y1={91} x2={100} y2={108} />
        <circle cx={100} cy={111} r={3} />
        {/* Diagonal connections */}
        <line x1={60} y1={70} x2={100} y2={35} strokeDasharray="2 2" />
        <line x1={140} y1={70} x2={100} y2={35} strokeDasharray="2 2" />
      </g>
    </Iso>
  );
}

/** Design Sprints — stopwatch / speed */
function DesignSprints() {
  return (
    <Iso>
      <g stroke="currentColor" strokeWidth={strokeW}>
        {/* Clock face */}
        <circle cx={100} cy={82} r={38} />
        <circle cx={100} cy={82} r={34} />
        {/* Clock button */}
        <rect x={96} y={38} width={8} height={8} rx={1} />
        {/* Clock hands */}
        <line x1={100} y1={82} x2={100} y2={58} />
        <line x1={100} y1={82} x2={118} y2={74} />
        {/* Tick marks */}
        {[0, 90, 180, 270].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 100 + Math.cos(rad) * 30;
          const y1 = 82 + Math.sin(rad) * 30;
          const x2 = 100 + Math.cos(rad) * 34;
          const y2 = 82 + Math.sin(rad) * 34;
          return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
        {/* Speed lines */}
        <line x1={148} y1={72} x2={165} y2={68} strokeDasharray="3 2" />
        <line x1={148} y1={82} x2={168} y2={82} strokeDasharray="3 2" />
        <line x1={148} y1={92} x2={165} y2={96} strokeDasharray="3 2" />
      </g>
    </Iso>
  );
}

/** Foundation Sprint — building blocks / foundation */
function FoundationSprint() {
  return (
    <Iso>
      <g stroke="currentColor" strokeWidth={strokeW}>
        {/* Isometric base platform */}
        <path d="M100 130 L160 100 L100 70 L40 100 Z" />
        {/* Stacked layers */}
        <path d="M100 115 L145 92 L100 69 L55 92 Z" />
        <path d="M100 100 L130 85 L100 70 L70 85 Z" />
        {/* Vertical edges */}
        <line x1={40} y1={100} x2={40} y2={110} />
        <line x1={160} y1={100} x2={160} y2={110} />
        <line x1={100} y1={130} x2={100} y2={140} />
        {/* Flag on top */}
        <line x1={100} y1={70} x2={100} y2={38} />
        <path d="M100 38 L118 44 L100 50" />
        {/* Compass accent */}
        <circle cx={100} cy={92} r={6} />
        <line x1={100} y1={86} x2={100} y2={98} />
        <line x1={94} y1={92} x2={106} y2={92} />
      </g>
    </Iso>
  );
}

/** UX/UI Audits — checklist / magnifier */
function UxUiAudits() {
  return (
    <Iso>
      <g stroke="currentColor" strokeWidth={strokeW}>
        {/* Clipboard */}
        <rect x={70} y={35} width={50} height={70} rx={3} />
        <rect x={88} y={30} width={14} height={10} rx={2} />
        {/* Checklist lines */}
        {[52, 65, 78, 91].map((y) => (
          <g key={y}>
            <rect x={80} y={y} width={8} height={8} rx={1} />
            <rect x={94} y={y + 2} width={18} height={4} rx={1} />
          </g>
        ))}
        {/* Check marks on first two */}
        <path d="M82 56 L84 59 L87 53" />
        <path d="M82 69 L84 72 L87 66" />
        {/* Magnifier overlay */}
        <circle cx={138} cy={95} r={18} />
        <line x1={151} y1={108} x2={162} y2={119} strokeWidth={1.5} />
      </g>
    </Iso>
  );
}

/** User Testing — people / conversation */
function UserTesting() {
  return (
    <Iso>
      <g stroke="currentColor" strokeWidth={strokeW}>
        {/* Person left */}
        <circle cx={72} cy={55} r={10} />
        <path d="M60 75 L72 68 L84 75 L84 100 L60 100 Z" />
        {/* Person right */}
        <circle cx={128} cy={55} r={10} />
        <path d="M116 75 L128 68 L140 75 L140 100 L116 100 Z" />
        {/* Screen between them */}
        <rect x={88} y={60} width={24} height={18} rx={2} />
        <line x1={88} y1={78} x2={100} y2={82} />
        {/* Speech bubbles */}
        <path d="M55 38 Q55 30 63 30 L83 30 Q91 30 91 38 L91 48 Q91 56 83 56 L70 56 L65 62 L65 56 L63 56 Q55 56 55 48 Z" />
        {/* Dots in bubble */}
        <circle cx={67} cy={43} r={2} />
        <circle cx={73} cy={43} r={2} />
        <circle cx={79} cy={43} r={2} />
      </g>
    </Iso>
  );
}

/** Design for Mendix — low-code blocks */
function DesignForMendix() {
  return (
    <Iso>
      <g stroke="currentColor" strokeWidth={strokeW}>
        {/* Screen frame */}
        <rect x={55} y={30} width={90} height={65} rx={3} />
        <line x1={55} y1={42} x2={145} y2={42} />
        {/* Dot indicators in title bar */}
        <circle cx={64} cy={36} r={2} />
        <circle cx={72} cy={36} r={2} />
        <circle cx={80} cy={36} r={2} />
        {/* Drag-and-drop blocks */}
        <rect x={65} y={50} width={28} height={14} rx={2} />
        <rect x={65} y={70} width={28} height={14} rx={2} />
        <rect x={100} y={50} width={35} height={34} rx={2} />
        {/* Connector arrows */}
        <path d="M93 57 L100 57" strokeDasharray="2 2" />
        <path d="M79 64 L79 70" strokeDasharray="2 2" />
        {/* Puzzle piece accent */}
        <path d="M130 105 L130 115 Q138 120 130 125 L130 135 L150 135 L150 125 Q142 120 150 115 L150 105 Z" />
      </g>
    </Iso>
  );
}

/** Web Apps — browser window with app UI */
function WebApps() {
  return (
    <Iso>
      <g stroke="currentColor" strokeWidth={strokeW}>
        {/* Browser frame */}
        <rect x={45} y={30} width={110} height={85} rx={3} />
        <line x1={45} y1={44} x2={155} y2={44} />
        {/* Browser dots */}
        <circle cx={55} cy={37} r={2} />
        <circle cx={63} cy={37} r={2} />
        <circle cx={71} cy={37} r={2} />
        {/* URL bar */}
        <rect x={80} y={34} width={65} height={6} rx={3} />
        {/* Sidebar */}
        <line x1={80} y1={44} x2={80} y2={115} />
        <rect x={52} y={52} width={20} height={4} rx={1} />
        <rect x={52} y={62} width={18} height={3} rx={1} />
        <rect x={52} y={70} width={20} height={3} rx={1} />
        <rect x={52} y={78} width={16} height={3} rx={1} />
        {/* Main content */}
        <rect x={88} y={52} width={55} height={24} rx={2} />
        <rect x={88} y={84} width={26} height={20} rx={2} />
        <rect x={118} y={84} width={26} height={20} rx={2} />
      </g>
    </Iso>
  );
}

/** Mobile Apps — phone with app interface */
function MobileApps() {
  return (
    <Iso>
      <g stroke="currentColor" strokeWidth={strokeW}>
        {/* Phone body */}
        <rect x={72} y={20} width={56} height={110} rx={8} />
        {/* Screen */}
        <rect x={78} y={34} width={44} height={80} rx={2} />
        {/* Notch */}
        <rect x={90} y={24} width={20} height={6} rx={3} />
        {/* UI elements */}
        <rect x={84} y={40} width={32} height={4} rx={1} />
        <rect x={84} y={50} width={24} height={3} rx={1} />
        <rect x={84} y={60} width={32} height={18} rx={2} />
        <rect x={84} y={84} width={15} height={15} rx={2} />
        <rect x={103} y={84} width={15} height={15} rx={2} />
        {/* Bottom bar */}
        <line x1={84} y1={106} x2={116} y2={106} />
        <rect x={94} y={109} width={12} height={2} rx={1} />
      </g>
    </Iso>
  );
}

/** Dashboards — chart and data panels */
function DashboardsIllustration() {
  return (
    <Iso>
      <g stroke="currentColor" strokeWidth={strokeW}>
        {/* Main frame */}
        <rect x={40} y={30} width={120} height={90} rx={3} />
        {/* Top metric cards */}
        <rect x={48} y={38} width={32} height={18} rx={2} />
        <rect x={84} y={38} width={32} height={18} rx={2} />
        <rect x={120} y={38} width={32} height={18} rx={2} />
        {/* Bar chart */}
        <rect x={48} y={64} width={60} height={48} rx={2} />
        <rect x={56} y={86} width={8} height={22} rx={1} />
        <rect x={68} y={78} width={8} height={30} rx={1} />
        <rect x={80} y={82} width={8} height={26} rx={1} />
        <rect x={92} y={74} width={8} height={34} rx={1} />
        {/* Side panel */}
        <rect x={114} y={64} width={38} height={48} rx={2} />
        <circle cx={133} cy={82} r={12} />
        <path d="M133 70 L133 82 L143 78" fill="none" />
      </g>
    </Iso>
  );
}

/** Interactive Displays — touchscreen kiosk */
function InteractiveDisplays() {
  return (
    <Iso>
      <g stroke="currentColor" strokeWidth={strokeW}>
        {/* Screen */}
        <rect x={55} y={20} width={90} height={70} rx={4} />
        {/* Stand */}
        <path d="M95 90 L95 120 L85 130" />
        <path d="M105 90 L105 120 L115 130" />
        <line x1={80} y1={130} x2={120} y2={130} />
        {/* Touch UI elements */}
        <rect x={65} y={30} width={70} height={25} rx={2} />
        <rect x={65} y={62} width={22} height={20} rx={2} />
        <rect x={91} y={62} width={22} height={20} rx={2} />
        <rect x={117} y={62} width={18} height={20} rx={2} />
        {/* Touch indicator */}
        <circle cx={130} cy={50} r={5} />
        <circle cx={130} cy={50} r={9} strokeDasharray="2 2" />
      </g>
    </Iso>
  );
}

/** Interviews — microphone / conversation */
function InterviewsIllustration() {
  return (
    <Iso>
      <g stroke="currentColor" strokeWidth={strokeW}>
        {/* Microphone */}
        <rect x={90} y={35} width={20} height={35} rx={10} />
        <path d="M82 60 Q82 80 100 80 Q118 80 118 60" fill="none" />
        <line x1={100} y1={80} x2={100} y2={95} />
        <line x1={88} y1={95} x2={112} y2={95} />
        {/* Sound waves */}
        <path d="M75 50 Q70 55 75 60" fill="none" />
        <path d="M68 45 Q60 55 68 65" fill="none" />
        <path d="M125 50 Q130 55 125 60" fill="none" />
        <path d="M132 45 Q140 55 132 65" fill="none" />
        {/* Notes / transcript lines */}
        <rect x={60} y={108} width={80} height={3} rx={1} />
        <rect x={68} y={116} width={64} height={3} rx={1} />
        <rect x={60} y={124} width={72} height={3} rx={1} />
      </g>
    </Iso>
  );
}

const illustrations: Record<string, () => React.JSX.Element> = {
  "discover": ResearchStrategy,
  "product-design": ProductDesign,
  "design-system": DesignSystems,
  "launch-mvp": BuildMvps,
  "brand-integration": BoostBranding,
  "design-sprint": DesignSprints,
  "foundation-sprint": FoundationSprint,
  "ux-ui-audit": UxUiAudits,
  "user-testing": UserTesting,
  "design-for-mendix": DesignForMendix,
  "interviews": InterviewsIllustration,
  "web-apps": WebApps,
  "mobile-apps": MobileApps,
  "dashboards": DashboardsIllustration,
  "interactive-displays": InteractiveDisplays,
};

export function ServiceIllustration({ slug, className }: { slug: string; className?: string }) {
  const Illustration = illustrations[slug];
  if (!Illustration) return null;
  return (
    <div className={`${className} text-foreground/40`}>
      <Illustration />
    </div>
  );
}
