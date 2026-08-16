import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * THE ATOM.
 *
 * Every data-bearing element on this site is a numbered manifest field: a small
 * mono label sitting above a value, inside a ruled cell. Value props, service
 * stats, the estimator breakdown and the shipment widget are all compositions
 * of this one primitive — which is what keeps the document metaphor structural
 * rather than decorative.
 */
export function Field({
  box,
  label,
  children,
  className,
  emphasis = false,
  align = "left",
}: {
  box?: string;
  label: string;
  children: ReactNode;
  className?: string;
  /** Signal-coloured value. Reserve for live data and money. */
  emphasis?: boolean;
  align?: "left" | "right";
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-1.5 p-4",
        align === "right" && "items-end text-right",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {box ? (
          <span className="font-mono text-[10px] leading-none tracking-[0.18em] text-steel-hi tabular">
            {box}
          </span>
        ) : null}
        <span className="font-mono text-[10px] leading-none tracking-[0.18em] text-faint uppercase">
          {label}
        </span>
      </div>
      <div
        className={cn(
          "font-mono text-[15px] leading-snug tabular",
          emphasis ? "text-signal" : "text-paper"
        )}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * A row of fields separated by hairline rules, the way boxes sit across the top
 * of a customs form. Collapses to a stack on mobile without losing the rules.
 */
export function FieldRow({
  children,
  className,
  cols = 3,
}: {
  children: ReactNode;
  className?: string;
  cols?: 2 | 3 | 4;
}) {
  const grid = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[cols];

  return (
    <div
      className={cn(
        "grid grid-cols-1 border border-steel",
        // Hairline dividers via a gap that shows the parent's background.
        "gap-px bg-steel [&>*]:bg-graphite",
        grid,
        className
      )}
    >
      {children}
    </div>
  );
}
