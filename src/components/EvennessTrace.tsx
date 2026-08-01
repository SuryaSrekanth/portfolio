/**
 * The evenness trace.
 *
 * A yarn evenness tester prints a wavering line: the thickness of the strand
 * as it runs past the sensor. Spikes up are thick places, dips down are thin
 * places, and an inspector marks the ones outside tolerance. That readout is
 * the visual spine of this site.
 *
 * The geometry is computed once at module load from fixed sine terms, so the
 * server and the browser always render byte-identical markup.
 */

type Fault = {
  /** Position along the trace, in viewBox units. */
  x: number;
  /** -1 draws a thick place (spike up), 1 draws a thin place (dip down). */
  direction: -1 | 1;
  magnitude: number;
  label: string;
};

const WIDTH = 1200;
const HEIGHT = 140;
const BASELINE = HEIGHT / 2;
const STEP = 4;

const FAULTS: Fault[] = [
  { x: 196, direction: -1, magnitude: 34, label: "thick place" },
  { x: 468, direction: 1, magnitude: 27, label: "thin place" },
  { x: 742, direction: -1, magnitude: 41, label: "nep" },
  { x: 1012, direction: 1, magnitude: 23, label: "thin place" },
];

/** Steady background variation. Real yarn is never flat. */
function baseline(x: number): number {
  return (
    BASELINE +
    9 * Math.sin(x / 37) +
    5.5 * Math.sin(x / 13.7 + 1.2) +
    3 * Math.sin(x / 6.1 + 0.4)
  );
}

/** A fault is a localised bump, widest at its centre and fading out fast. */
function faultOffset(x: number): number {
  let offset = 0;
  for (const fault of FAULTS) {
    const spread = 15;
    const distance = x - fault.x;
    offset +=
      fault.direction *
      fault.magnitude *
      Math.exp(-(distance * distance) / (2 * spread * spread));
  }
  return offset;
}

function sampleAt(x: number): number {
  return baseline(x) + faultOffset(x);
}

const points: Array<[number, number]> = [];
for (let x = 0; x <= WIDTH; x += STEP) {
  points.push([x, sampleAt(x)]);
}

const linePath = points
  .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y.toFixed(2)}`)
  .join(" ");

/** Same line, closed along the bottom, for the soft gradient wash. */
const areaPath = `${linePath} L${WIDTH} ${HEIGHT} L0 ${HEIGHT} Z`;

/** Approximate arc length, used to seed the draw-on animation. */
const traceLength = Math.round(
  points.reduce((total, point, i) => {
    if (i === 0) return 0;
    const [px, py] = points[i - 1];
    return total + Math.hypot(point[0] - px, point[1] - py);
  }, 0),
);

type Props = {
  /**
   * "hero" is taller, labelled and animated. "divider" is a quiet rule
   * between sections.
   */
  variant?: "hero" | "divider";
  className?: string;
};

export default function EvennessTrace({
  variant = "hero",
  className = "",
}: Props) {
  const isHero = variant === "hero";
  const gradientId = `trace-wash-${variant}`;
  const strokeId = `trace-stroke-${variant}`;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      role="img"
      aria-label="A yarn evenness trace with four marked faults"
      className={className}
      style={
        { "--trace-length": traceLength } as React.CSSProperties & {
          "--trace-length": number;
        }
      }
    >
      <defs>
        <linearGradient id={strokeId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--indigo)" />
          <stop offset="100%" stopColor="var(--violet)" />
        </linearGradient>
        {/*
          The wash starts below the band the line travels in. Anchoring it at
          the very top instead makes the fill visibly heavier wherever the
          line peaks, which reads as an artefact rather than atmosphere.
        */}
        <linearGradient id={gradientId} x1="0" y1="0.42" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--violet)" stopOpacity="0.13" />
          <stop offset="100%" stopColor="var(--violet)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {isHero && <path d={areaPath} fill={`url(#${gradientId})`} />}

      <path
        d={linePath}
        fill="none"
        stroke={`url(#${strokeId})`}
        strokeWidth={isHero ? 2 : 1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className="trace-path"
        opacity={isHero ? 1 : 0.7}
      />

      {isHero &&
        FAULTS.map((fault, i) => {
          const y = sampleAt(fault.x);
          return (
            <g
              key={fault.x}
              className="trace-marker"
              style={{ animationDelay: `${1.5 + i * 0.16}s` }}
            >
              <circle cx={fault.x} cy={y} r={9} fill="var(--signal)" opacity={0.16} />
              <circle
                cx={fault.x}
                cy={y}
                r={3.5}
                fill="var(--signal)"
                stroke="var(--paper)"
                strokeWidth={1.5}
              />
            </g>
          );
        })}
    </svg>
  );
}

export { FAULTS, sampleAt };
