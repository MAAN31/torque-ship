import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * A ruled panel with registration marks at the corners — the crop marks you get
 * on a printed shipping document. Hover lifts the border to signal, nothing
 * else moves; cards that float on hover cost more in perceived latency than
 * they return in delight.
 */
export function Card({
  children,
  className,
  interactive = false,
  marks = true,
  bordered = true,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  marks?: boolean;
  /**
   * Explicit prop rather than passing `border-0` in className. Tailwind resolves
   * conflicting utilities by CSS source order, not by the order they appear in
   * the class attribute, so `border` + `border-0` on one element is a coin flip.
   */
  bordered?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative bg-graphite",
        bordered && "border border-steel",
        interactive && bordered && "transition-colors duration-200 hover:border-steel-hi",
        className
      )}
    >
      {marks ? <RegistrationMarks /> : null}
      {children}
    </div>
  );
}

function RegistrationMarks() {
  const base = "pointer-events-none absolute size-2 border-signal/0 transition-colors duration-300 group-hover:border-signal/70";
  return (
    <span aria-hidden="true">
      <span className={cn(base, "left-[-1px] top-[-1px] border-l-2 border-t-2")} />
      <span className={cn(base, "right-[-1px] top-[-1px] border-r-2 border-t-2")} />
      <span className={cn(base, "bottom-[-1px] left-[-1px] border-b-2 border-l-2")} />
      <span className={cn(base, "bottom-[-1px] right-[-1px] border-b-2 border-r-2")} />
    </span>
  );
}
