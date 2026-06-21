import type { AppKey } from "./apps/registry";

const ICONES: { key: AppKey; label: string; bg: string; svg: React.ReactNode }[] = [
  {
    key: "agenda",
    label: "agenda",
    bg: "#D0DCEE",
    svg: (
      <svg width="34" height="34" viewBox="0 0 58 58" fill="none">
        <rect x="7" y="11" width="44" height="39" rx="3" fill="#fff" stroke="#111" strokeWidth="2.5" />
        <rect x="7" y="11" width="44" height="13" rx="3" fill="#81215B" />
        <rect x="7" y="18" width="44" height="6" fill="#81215B" />
        <rect x="17" y="7" width="5" height="9" rx="2.5" fill="#fff" stroke="#111" strokeWidth="2" />
        <rect x="36" y="7" width="5" height="9" rx="2.5" fill="#fff" stroke="#111" strokeWidth="2" />
        <rect x="13" y="26" width="32" height="18" rx="2" fill="#D0DCEE" />
        <text x="29" y="40" textAnchor="middle" fontFamily="Anonymous Pro, monospace" fontWeight="700" fontSize="17" fill="#111">15</text>
        <circle cx="17" cy="49" r="2" fill="#81215B" />
        <circle cx="24" cy="49" r="2" fill="#111" opacity=".2" />
        <circle cx="31" cy="49" r="2" fill="#111" opacity=".2" />
        <circle cx="38" cy="49" r="2" fill="#111" opacity=".2" />
      </svg>
    ),
  },
  {
    key: "arquivo",
    label: "arquivo de estilo",
    bg: "#FDEAB8",
    svg: (
      <svg width="34" height="34" viewBox="0 0 58 58" fill="none">
        <rect x="8" y="14" width="42" height="14" rx="4" fill="#81215B" stroke="#111" strokeWidth="2.5" />
        <rect x="8" y="25" width="42" height="20" fill="#D0DCEE" stroke="#111" strokeWidth="2.5" />
        <rect x="8" y="39" width="42" height="6" rx="3" fill="#D0DCEE" stroke="#111" strokeWidth="2.5" />
        <line x1="8" y1="21" x2="50" y2="21" stroke="#111" strokeWidth="1.5" opacity=".3" />
        <rect x="23" y="23" width="12" height="9" rx="2" fill="#FDEAB8" stroke="#111" strokeWidth="2" />
        <circle cx="29" cy="28" r="2" fill="#111" />
        <rect x="8" y="14" width="6" height="6" rx="1" fill="#FDEAB8" stroke="#111" strokeWidth="1.5" />
        <rect x="44" y="14" width="6" height="6" rx="1" fill="#FDEAB8" stroke="#111" strokeWidth="1.5" />
        <rect x="8" y="38" width="6" height="6" rx="1" fill="#FDEAB8" stroke="#111" strokeWidth="1.5" />
        <rect x="44" y="38" width="6" height="6" rx="1" fill="#FDEAB8" stroke="#111" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    key: "travel",
    label: "travel",
    bg: "#F5D0C0",
    svg: (
      <svg width="34" height="34" viewBox="0 0 58 58" fill="none">
        <path d="M22 15 Q22 9 29 9 Q36 9 36 15" stroke="#111" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <rect x="9" y="15" width="40" height="31" rx="5" fill="#fff" stroke="#111" strokeWidth="2.5" />
        <rect x="9" y="27" width="40" height="7" fill="#81215B" />
        <line x1="9" y1="27" x2="49" y2="27" stroke="#111" strokeWidth="1.5" />
        <line x1="9" y1="34" x2="49" y2="34" stroke="#111" strokeWidth="1.5" />
        <rect x="13" y="28" width="5" height="5" rx="1" fill="#FDEAB8" stroke="#111" strokeWidth="1.5" />
        <rect x="40" y="28" width="5" height="5" rx="1" fill="#FDEAB8" stroke="#111" strokeWidth="1.5" />
        <circle cx="17" cy="47" r="3" fill="#111" />
        <circle cx="41" cy="47" r="3" fill="#111" />
      </svg>
    ),
  },
  {
    key: "analytics",
    label: "analytics",
    bg: "#E8D4E8",
    svg: (
      <svg width="34" height="34" viewBox="0 0 58 58" fill="none">
        <line x1="9" y1="47" x2="51" y2="47" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="9" y1="10" x2="9" y2="47" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="13" y="36" width="9" height="11" rx="1.5" fill="#81215B" stroke="#111" strokeWidth="1.5" />
        <rect x="25" y="28" width="9" height="19" rx="1.5" fill="#D0DCEE" stroke="#111" strokeWidth="1.5" />
        <rect x="37" y="18" width="9" height="29" rx="1.5" fill="#FDEAB8" stroke="#111" strokeWidth="1.5" />
        <polyline points="17,37 29,29 41,19" stroke="#111" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 2" />
        <circle cx="41" cy="19" r="3" fill="#111" />
      </svg>
    ),
  },
  {
    key: "config",
    label: "configurações",
    bg: "#D8E8D0",
    svg: (
      <svg width="34" height="34" viewBox="0 0 58 58" fill="none">
        <line x1="10" y1="18" x2="48" y2="18" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="38" cy="18" r="5.5" fill="#FDEAB8" stroke="#111" strokeWidth="2.5" />
        <line x1="10" y1="31" x2="48" y2="31" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="23" cy="31" r="5.5" fill="#D0DCEE" stroke="#111" strokeWidth="2.5" />
        <line x1="10" y1="44" x2="48" y2="44" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="31" cy="44" r="5.5" fill="#81215B" stroke="#111" strokeWidth="2.5" />
      </svg>
    ),
  },
];

export default function DesktopIcons({ onOpen }: { onOpen: (key: AppKey) => void }) {
  return (
    <div className="icones-wrap">
      {ICONES.map((ic) => (
        <div key={ic.key} className="icone" onClick={() => onOpen(ic.key)}>
          <div className="icone-box" style={{ background: ic.bg }}>{ic.svg}</div>
          <span className="icone-label">{ic.label}</span>
        </div>
      ))}
    </div>
  );
}