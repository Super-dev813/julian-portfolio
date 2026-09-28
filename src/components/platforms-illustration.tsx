/** Illustrative composite for client work with no public screens: a portal, an internal tool, and a dashboard. */
export function PlatformsIllustration() {
  return (
    <svg viewBox="0 0 1440 810" role="img" aria-label="Illustration of a customer portal, an internal tool, and a dashboard built on React, Angular, and Vue" className="h-full w-full">
      <rect width="1440" height="810" className="fill-raised" />
      <g className="stroke-border" strokeWidth="2">
        <rect x="120" y="150" width="620" height="470" rx="18" className="fill-card" />
        <rect x="120" y="150" width="620" height="64" rx="18" className="fill-background" />
        <rect x="160" y="252" width="250" height="150" rx="12" className="fill-raised" />
        <rect x="450" y="252" width="250" height="150" rx="12" className="fill-raised" />
        <rect x="160" y="432" width="540" height="18" rx="9" className="fill-raised" />
        <rect x="160" y="470" width="420" height="18" rx="9" className="fill-raised" />
        <rect x="160" y="540" width="170" height="44" rx="22" className="fill-brand" />
      </g>
      <g className="stroke-border" strokeWidth="2">
        <rect x="560" y="300" width="560" height="400" rx="18" className="fill-card" />
        <rect x="560" y="300" width="560" height="64" rx="18" className="fill-background" />
        {[0, 1, 2, 3, 4].map((row) => (
          <g key={row}>
            <rect x="600" y={400 + row * 56} width="160" height="16" rx="8" className="fill-raised" />
            <rect x="790" y={400 + row * 56} width="120" height="16" rx="8" className="fill-raised" />
            <rect x="940" y={400 + row * 56} width="140" height="16" rx="8" className={row === 1 ? "fill-brand" : "fill-raised"} />
          </g>
        ))}
      </g>
      <g className="stroke-border" strokeWidth="2">
        <rect x="960" y="120" width="380" height="300" rx="18" className="fill-card" />
        {[130, 90, 170, 60, 150, 110].map((height, index) => (
          <rect key={index} x={1000 + index * 52} y={380 - height} width="30" height={height} rx="6" className={index === 3 ? "fill-brand" : "fill-raised"} />
        ))}
      </g>
      <g className="fill-muted-foreground" fontFamily="var(--font-sans)" fontSize="24">
        <text x="160" y="192">Customer portal</text>
        <text x="600" y="342">Internal tool</text>
        <text x="1000" y="170">Dashboard</text>
      </g>
    </svg>
  );
}
