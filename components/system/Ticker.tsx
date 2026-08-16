"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** easeOutExpo — fast arrival, mechanical settle. */
const ease = (p: number) => (p === 1 ? 1 : 1 - Math.pow(2, -10 * p));

function useCountTo(
  target: number,
  duration: number,
  setDisplay: (n: number) => void
) {
  const raf = useRef(0);

  return (from: number) => {
    cancelAnimationFrame(raf.current);
    let start = 0;
    const delta = target - from;

    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      setDisplay(from + delta * ease(p));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };

    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  };
}

/**
 * A number that animates to its value.
 *
 * `mode="in-view"` (default) — counts up from zero the first time it scrolls
 * into view. Three details that matter more than the effect itself:
 *
 * 1. The FINAL value renders on the server. We only drop to zero for elements
 *    that are off-screen at mount, so a figure never visibly snaps backwards,
 *    and a visitor with JS disabled or still loading reads the correct number
 *    instead of a zero.
 * 2. Reduced motion is read from matchMedia inside the effect, not from a hook
 *    that returns null on first paint — so there is no window in which
 *    "unknown" is treated as "animate".
 * 3. It is one rAF loop writing state, not a spring on a layout property. It
 *    cannot thrash layout.
 *
 * `mode="on-change"` — renders its value statically on mount, then animates
 * from the previous value to the new one whenever the value changes. This is
 * what makes the estimator feel like it is recalculating rather than repainting.
 */
export function Ticker({
  value,
  duration = 1100,
  decimals = 0,
  prefix = "",
  suffix = "",
  mode = "in-view",
  className,
}: {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  mode?: "in-view" | "on-change";
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const previous = useRef(value);
  const mounted = useRef(false);
  const run = useCountTo(value, duration, setDisplay);

  /* mode: in-view */
  useEffect(() => {
    if (mode !== "in-view") return;
    const el = ref.current;
    if (!el || prefersReduced()) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return; // already visible

    setDisplay(0);

    let stop: (() => void) | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        stop = run(0);
      },
      { threshold: 0.35 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      stop?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration, mode]);

  /* mode: on-change */
  useEffect(() => {
    if (mode !== "on-change") return;

    if (!mounted.current) {
      mounted.current = true;
      previous.current = value;
      return;
    }

    const from = previous.current;
    previous.current = value;

    if (prefersReduced()) {
      setDisplay(value);
      return;
    }

    return run(from);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration, mode]);

  const text = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={cn("tabular", className)}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}
