import { cn } from "@/lib/cn";

type Tone = "signal" | "flag" | "neutral";

const TONES: Record<Tone, string> = {
  signal: "text-signal border-signal",
  flag: "text-flag border-flag",
  neutral: "text-mist border-steel-hi",
};

/**
 * A rubber stamp. Used for shipment status, availability, and the placeholder
 * markers. Rotation is fixed (not random) so it is stable across SSR/hydration.
 */
export function Stamp({
  children,
  tone = "signal",
  rotate = -3,
  className,
  live = false,
}: {
  children: string;
  tone?: Tone;
  rotate?: -6 | -3 | 0 | 3 | 6;
  className?: string;
  /** Adds the blinking status dot. Reduced-motion users get a static dot. */
  live?: boolean;
}) {
  return (
    <span
      style={{ transform: `rotate(${rotate}deg)` }}
      className={cn(
        "inline-flex items-center gap-2 border-2 px-3 py-1.5",
        "font-mono text-[11px] font-bold uppercase leading-none tracking-[0.22em]",
        TONES[tone],
        className
      )}
    >
      {live ? (
        <span
          aria-hidden="true"
          className="live-dot inline-block size-1.5 rounded-full bg-current"
        />
      ) : null}
      {children}
    </span>
  );
}

/**
 * Marks provisional content. Deliberately loud: placeholder copy must never be
 * able to slip into production looking finished.
 */
export function PlaceholderTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border border-dashed border-signal/60 px-2 py-1",
        "font-mono text-[10px] uppercase tracking-[0.2em] text-signal/90",
        className
      )}
    >
      <span aria-hidden="true">◆</span> Placeholder
    </span>
  );
}
