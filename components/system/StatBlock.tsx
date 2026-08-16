import { Ticker } from "./Ticker";
import { PlaceholderTag } from "./Stamp";
import { cn } from "@/lib/cn";

/**
 * Oversized figure over a mono label. When `placeholder` is set the figure is
 * dimmed, hatched and tagged — an unverified number should look unverified.
 */
export function StatBlock({
  value,
  suffix = "",
  label,
  placeholder = false,
  className,
}: {
  value: number;
  suffix?: string;
  label: string;
  placeholder?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative p-6", placeholder && "hatch", className)}>
      <div
        className={cn(
          "font-display text-[clamp(2.5rem,7vw,4rem)] font-extrabold leading-none tracking-[-0.04em] tabular",
          placeholder ? "text-steel-hi" : "text-signal"
        )}
      >
        {placeholder ? (
          <span aria-hidden="true">—</span>
        ) : (
          <Ticker value={value} suffix={suffix} />
        )}
      </div>

      <div className="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-mist">
        {label}
      </div>

      {placeholder ? <PlaceholderTag className="mt-3" /> : null}

      {/* Screen readers get the truth, not the animated intermediate value. */}
      <span className="sr-only">
        {placeholder ? `${label}: figure pending` : `${label}: ${value}${suffix}`}
      </span>
    </div>
  );
}
