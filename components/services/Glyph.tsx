/**
 * Custom category glyphs. Drawn here rather than pulled from an icon set —
 * a generic freight icon pack is exactly the stock-site look the brief rules
 * out, and five bespoke marks are what make the modules visually distinct.
 *
 * All five share one 120×120 grid, one stroke weight, and one rule: steel for
 * structure, signal for the single element that carries the meaning.
 */

const S = "var(--color-steel-hi)";
const A = "var(--color-signal)";

type Props = { className?: string };

const wrap = (children: React.ReactNode, className?: string) => (
  <svg
    viewBox="0 0 120 120"
    className={className}
    fill="none"
    strokeWidth="2"
    strokeLinecap="square"
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
);

/** Stacked containers with the lane running through. */
export const GlyphFreight = ({ className }: Props) =>
  wrap(
    <>
      <rect x="14" y="30" width="46" height="24" stroke={S} />
      <rect x="14" y="58" width="46" height="24" stroke={S} />
      <path d="M24 30v24M34 30v24M44 30v24M24 58v24M34 58v24M44 58v24" stroke={S} strokeWidth="1" />
      <path d="M68 66h34m0 0-9-9m9 9-9 9" stroke={A} strokeWidth="3" />
      <path d="M14 96h92" stroke={S} strokeWidth="1" strokeDasharray="4 4" />
    </>,
    className
  );

/** Customs seal — the stamp that either lands or doesn't. */
export const GlyphCustoms = ({ className }: Props) =>
  wrap(
    <>
      <path
        d="M60 14 88 26v26c0 22-12 34-28 42-16-8-28-20-28-42V26L60 14Z"
        stroke={S}
      />
      <path
        d="M60 24 78 32v20c0 16-8 25-18 30-10-5-18-14-18-30V32L60 24Z"
        stroke={S}
        strokeWidth="1"
      />
      <path d="M48 58l9 9 17-19" stroke={A} strokeWidth="3" />
      <path d="M20 104h80" stroke={S} strokeWidth="1" strokeDasharray="4 4" />
    </>,
    className
  );

/** Layered document set, top sheet ruled and signed. */
export const GlyphDocs = ({ className }: Props) =>
  wrap(
    <>
      <rect x="30" y="16" width="58" height="72" stroke={S} strokeWidth="1" />
      <rect x="24" y="22" width="58" height="72" stroke={S} strokeWidth="1" />
      <rect x="18" y="28" width="58" height="72" stroke={S} />
      <path d="M28 44h38M28 54h38M28 64h26" stroke={S} strokeWidth="1" />
      <path d="M28 82h20" stroke={A} strokeWidth="3" />
    </>,
    className
  );

/** Pallet positions in a receiving bay. */
export const GlyphLastMile = ({ className }: Props) =>
  wrap(
    <>
      <rect x="16" y="20" width="88" height="60" stroke={S} strokeWidth="1" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={24 + c * 20}
            y={28 + r * 16}
            width="14"
            height="10"
            stroke={r === 2 && c === 3 ? A : S}
            strokeWidth={r === 2 && c === 3 ? 2.5 : 1}
          />
        ))
      )}
      <path d="M16 92h88" stroke={S} />
      <path d="M60 92v14m0 0-7-7m7 7 7-7" stroke={A} strokeWidth="3" />
    </>,
    className
  );

/** The lane forks. One branch is the recovery. */
export const GlyphSideways = ({ className }: Props) =>
  wrap(
    <>
      <path d="M12 60h34" stroke={S} strokeWidth="3" />
      <path d="M46 60c22 0 22-30 44-30h18" stroke={S} strokeWidth="1" strokeDasharray="5 5" />
      <path d="M46 60c22 0 22 30 44 30h18" stroke={A} strokeWidth="3" />
      <circle cx="46" cy="60" r="5" fill="var(--color-ink)" stroke={A} strokeWidth="3" />
      <path d="M84 22l12 20H72l12-20Z" stroke={S} strokeWidth="1" />
      <path d="M84 30v6" stroke={S} strokeWidth="1" />
    </>,
    className
  );

export const GLYPHS: Record<string, (p: Props) => React.ReactElement> = {
  "sourcing-freight": GlyphFreight,
  "customs-compliance": GlyphCustoms,
  documentation: GlyphDocs,
  "last-mile": GlyphLastMile,
  "when-things-go-sideways": GlyphSideways,
};
