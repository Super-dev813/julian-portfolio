import type { Principle } from "@/data/resume";

const frame = "fill-card stroke-border";

function Monitor() {
  return (
    <>
      <rect x="10" y="10" width="300" height="120" rx="14" className={frame} />
      <path d="M30 42 H290" className="stroke-border" strokeDasharray="4 6" />
      <polyline points="30,104 70,94 105,100 140,80 175,86 210,62 245,72 286,50" fill="none" className="stroke-muted-foreground" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="286" cy="50" r="12" className="art-ping fill-brand/25" />
      <circle cx="286" cy="50" r="5" className="fill-brand" />
      {[0, 1, 2, 3, 4, 5].map((bar) => (
        <rect key={bar} x={34 + bar * 44} y={118} width="24" height="4" rx="2" className="fill-raised" />
      ))}
    </>
  );
}

function Queue() {
  return (
    <>
      <rect x="14" y="50" width="56" height="40" rx="10" className={frame} />
      <path d="M70 70 H250" className="stroke-border" strokeWidth="2" />
      {[104, 144, 184].map((x) => (
        <rect key={x} x={x} y="55" width="30" height="30" rx="7" className="fill-raised stroke-border" />
      ))}
      <circle cx="276" cy="70" r="26" className="fill-card stroke-brand" strokeWidth="2" />
      <circle cx="276" cy="70" r="7" className="fill-brand" />
      {[0, 1, 2].map((dot) => (
        <circle key={dot} cx="72" cy="70" r="4" className="art-travel fill-brand" style={{ animationDelay: `${dot * -1.1}s` }} />
      ))}
    </>
  );
}

function Guardrail() {
  return (
    <>
      <path d="M160 14 L208 32 V68 C208 98 187 118 160 128 C133 118 112 98 112 68 V32 Z" className={frame} />
      <path
        d="M160 44 C162 62 166 66 184 70 C166 74 162 78 160 96 C158 78 154 74 136 70 C154 66 158 62 160 44Z"
        className="art-breathe fill-brand"
      />
      <path d="M36 96 A26 26 0 0 1 88 96" fill="none" className="stroke-border" strokeWidth="6" strokeLinecap="round" />
      <path d="M62 96 L74 80" className="stroke-brand" strokeWidth="3" strokeLinecap="round" />
      <path d="M232 96 A26 26 0 0 1 284 96" fill="none" className="stroke-border" strokeWidth="6" strokeLinecap="round" />
      <path d="M258 96 L248 79" className="stroke-brand" strokeWidth="3" strokeLinecap="round" />
    </>
  );
}

function Tests() {
  return (
    <>
      {[20, 56, 92].map((y, row) => (
        <g key={y}>
          <rect x="40" y={y} width="190" height="26" rx="8" className={frame} />
          <rect x="54" y={y + 10} width={110 - row * 24} height="6" rx="3" className="fill-raised" />
          <g className="art-tick" style={{ animationDelay: `${row * 0.6}s` }}>
            <circle cx="262" cy={y + 13} r="12" fill="none" className="stroke-brand" strokeWidth="2" />
            <path d={`M256 ${y + 13} l4 4 l8 -8`} fill="none" className="stroke-brand" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
      ))}
    </>
  );
}

const ART = { monitor: Monitor, queue: Queue, guardrail: Guardrail, tests: Tests };

/** Small line illustration for each working principle. Decorative. */
export function PrincipleArt({ art }: { art: Principle["art"] }) {
  const Art = ART[art];
  return (
    <svg viewBox="0 0 320 140" aria-hidden className="h-auto w-full max-w-[320px]">
      <Art />
    </svg>
  );
}
