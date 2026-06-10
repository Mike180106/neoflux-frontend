// Íconos del sidebar (trazos outline, heredan color con currentColor)
const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const HomeIcon = () => (
  <svg {...base}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </svg>
);

export const PiggyIcon = () => (
  <svg {...base}>
    <path d="M19 10c.9.3 1.8.4 2 1.2.2.7 0 1.8-.5 2.3-.4.4-1 .5-1.5.5-.5 2-2 3.5-4 4v2h-2.5v-1.5h-3V20H7v-2.2C5 16.6 4 14.9 4 13c0-3.3 3.1-6 7-6 3.5 0 6.5 1.3 8 3Z" />
    <path d="M4.5 12H3c-.6 0-1-.4-1-1V9.8" />
    <circle cx="16" cy="11" r="0.5" fill="currentColor" />
    <path d="M9 7.5c.5-1.5 2-2.5 3.5-2.5" />
  </svg>
);

export const LoanIcon = () => (
  <svg {...base}>
    <circle cx="12" cy="7" r="4" />
    <path d="M12 5.5v3M10.8 6.2h2.4M10.8 7.8h2.4" />
    <path d="M3 17.5c1.5-1.5 3-2 4.5-1.5l3.5 1c1 .3 1.5 1 1.2 1.8-.2.7-1 1-1.7.8l-2.5-.6" />
    <path d="M12.5 19.5c2.5.8 4.5.5 6-.5l2.5-1.8" />
  </svg>
);

export const WalletIcon = () => (
  <svg {...base}>
    <rect x="3" y="6" width="18" height="14" rx="2" />
    <path d="M7 6V4.5A1.5 1.5 0 0 1 8.5 3h7A1.5 1.5 0 0 1 17 4.5V6" />
    <path d="M3 10h18" />
  </svg>
);

export const SettingsIcon = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.36a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.64 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.64a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.0a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1Z" />
  </svg>
);

export const HelpIcon = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.7" />
    <circle cx="12" cy="16.5" r="0.5" fill="currentColor" />
  </svg>
);

export const LogoutIcon = () => (
  <svg {...base}>
    <path d="M14 4h-8a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h8" />
    <path d="M10 12h11M18 9l3 3-3 3" />
  </svg>
);

export const CollapseIcon = () => (
  <svg {...base}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M14 4v16" />
  </svg>
);

export const CoinIcon = () => (
  <svg {...base} width={28} height={28}>
    <circle cx="12" cy="12" r="9" />
    <path d="M14.5 9.2c-.4-.8-1.4-1.2-2.5-1.2-1.4 0-2.5.7-2.5 1.8s1 1.6 2.5 1.9c1.5.3 2.5.8 2.5 1.9s-1.1 1.8-2.5 1.8c-1.1 0-2.1-.4-2.5-1.2" />
    <path d="M12 6.5v1.5M12 16v1.5" />
  </svg>
);
