import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * A page section rendered as a numbered block on the manifest.
 *
 * Server component by design — the structural chrome of the site ships as
 * static HTML and none of it waits on hydration. Only the pieces that genuinely
 * move are client components.
 */
export function Section({
  id,
  children,
  className,
  bleed = false,
  divided = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Full-bleed sections skip the max-width container (route map, switcher). */
  bleed?: boolean;
  /**
   * The hairline rule above the section. A prop rather than a `border-t-0`
   * override, because Tailwind resolves `border-t` vs `border-t-0` by CSS source
   * order rather than class order — the override is not reliably the winner.
   */
  divided?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("relative", divided && "border-t border-steel", className)}
    >
      <div className={bleed ? "" : "mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12"}>
        {children}
      </div>
    </section>
  );
}

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}

/**
 * The section header. Box number + kicker sit on a rule above the title, the
 * way a form field header sits above its input.
 */
export function SectionHead({
  box,
  kicker,
  title,
  body,
  className,
  as: Heading = "h2",
}: {
  box: string;
  kicker: string;
  title: string;
  body?: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <header className={cn("relative", className)}>
      <div className="flex items-baseline gap-4 border-b border-steel pb-3">
        <span className="font-mono text-[11px] tracking-[0.2em] text-signal tabular">
          BOX {box}
        </span>
        <span className="font-mono text-[11px] tracking-[0.2em] text-faint">{kicker}</span>
      </div>

      <Heading className="mt-7 max-w-[18ch] font-display text-[clamp(2rem,6vw,4.25rem)] font-extrabold leading-[0.94] tracking-[-0.03em] text-paper text-balance">
        {title}
      </Heading>

      {body ? (
        <p className="mt-5 max-w-[52ch] text-[16px] leading-relaxed text-mist sm:text-[17px]">
          {body}
        </p>
      ) : null}
    </header>
  );
}
