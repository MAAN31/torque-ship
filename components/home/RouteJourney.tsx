"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { home } from "@/lib/content";
import { fieldIn, useRevealGroup } from "@/lib/motion";

const STOPS = home.route.stops;

/**
 * MOTION AS INFORMATION.
 *
 * The lane draws itself as you scroll and each handoff ignites as the line
 * reaches it — the animation IS the content. A container marker rides the lane.
 *
 * Built from DOM + transforms rather than an animated SVG on purpose. A
 * full-width SVG needs preserveAspectRatio="none" to align with the label grid,
 * which then distorts every node and stroke horizontally. Two divs and a scaleX
 * align perfectly at any width, composite on the GPU, and never touch layout.
 *
 * Two implementations by breakpoint:
 *   ≥ sm  — scroll-linked lane draw
 *   < sm  — a static spine with plain per-item reveals
 *
 * The mobile version is not the desktop animation shrunk. Scroll-linked drawing
 * on a phone is per-frame work for a graphic that is mostly off-screen, and a
 * stacked timeline reads better on a narrow viewport regardless.
 */
export function RouteJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.6"],
  });

  return (
    <div ref={ref}>
      {/* ------------------------------------------------ desktop / tablet */}
      <div className="hidden sm:block">
        {/* Lane. Node centres sit at 10/30/50/70/90% — the column centres of the
            5-column label grid below, so the two are locked together. */}
        <div aria-hidden="true" className="relative h-12">
          <div className="absolute inset-x-[10%] top-1/2 -translate-y-1/2">
            <div className="h-0.5 w-full bg-steel" />

            <motion.div
              className="absolute inset-0 h-0.5 origin-left bg-signal"
              style={{ scaleX: reduced ? 1 : scrollYProgress }}
            />

            {STOPS.map((_, i) => (
              <RouteNode key={i} index={i} progress={scrollYProgress} reduced={!!reduced} />
            ))}

            {!reduced ? <Marker progress={scrollYProgress} /> : null}
          </div>
        </div>

        <ol className="mt-4 grid grid-cols-5">
          {STOPS.map((s, i) => (
            <RouteLabel
              key={s.code}
              stop={s}
              index={i}
              progress={scrollYProgress}
              reduced={!!reduced}
            />
          ))}
        </ol>
      </div>

      {/* ------------------------------------------------------ mobile */}
      <MobileRoute />
    </div>
  );
}

/* ------------------------------------------------------------------ nodes */

/** Progress point at which this node is "reached". */
const pointAt = (i: number) => i / (STOPS.length - 1);

function RouteNode({
  index,
  progress,
  reduced,
}: {
  index: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const at = pointAt(index);
  const from = Math.max(0, at - 0.12);

  const backgroundColor = useTransform(
    progress,
    [from, at],
    ["var(--color-ink)", "var(--color-signal)"]
  );
  const borderColor = useTransform(
    progress,
    [from, at],
    ["var(--color-steel-hi)", "var(--color-signal)"]
  );

  return (
    <motion.span
      style={{
        left: `${at * 100}%`,
        ...(reduced
          ? { backgroundColor: "var(--color-signal)", borderColor: "var(--color-signal)" }
          : { backgroundColor, borderColor }),
      }}
      className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 border-2"
    />
  );
}

/** A container riding the lane. Pure translate — no layout, no paint. */
function Marker({ progress }: { progress: MotionValue<number> }) {
  const x = useTransform(progress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(progress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  // `w-full` is load-bearing: a percentage translate resolves against the
  // element's OWN width, so the marker must span the full track for x: "100%"
  // to carry it from the first node to the last.
  return (
    <motion.span style={{ x, opacity }} className="absolute left-0 top-0 block w-full">
      <span className="absolute -top-4 left-0 -translate-x-1/2">
        <ShipGlyph className="h-3.5 w-6" />
      </span>
    </motion.span>
  );
}

/** The marker riding the lane — bow forward, same direction as the route. */
function ShipGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 14"
      className={className}
      fill="var(--color-signal)"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 12 2 9 9 9 9 5 16 5 16 9 18 9 23 10.5 18 12Z" />
    </svg>
  );
}

function RouteLabel({
  stop,
  index,
  progress,
  reduced,
}: {
  stop: (typeof STOPS)[number];
  index: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const at = pointAt(index);
  const from = Math.max(0, at - 0.12);
  const opacity = useTransform(progress, [from, at], [0.4, 1]);

  return (
    <motion.li style={reduced ? undefined : { opacity }} className="px-3 text-center">
      <span className="block font-mono text-[10px] tracking-[0.24em] text-signal">
        {stop.code}
      </span>
      <span className="mt-2 block font-display text-[15px] font-bold tracking-[-0.015em] text-paper">
        {stop.label}
      </span>
      <span className="mt-1.5 block text-[12px] leading-snug text-mist">{stop.detail}</span>
    </motion.li>
  );
}

/* ----------------------------------------------------------------- mobile */

function MobileRoute() {
  const group = useRevealGroup(0.08);

  return (
    <motion.ol {...group} className="relative sm:hidden">
      <span
        aria-hidden="true"
        className="absolute bottom-6 left-[5px] top-6 w-px bg-gradient-to-b from-signal via-signal/50 to-steel"
      />

      {STOPS.map((s) => (
        <motion.li key={s.code} variants={fieldIn} className="relative py-4 pl-7">
          <span
            aria-hidden="true"
            className="absolute left-0 top-[23px] size-[11px] border-2 border-signal bg-ink"
          />
          <span className="font-mono text-[10px] tracking-[0.24em] text-signal">{s.code}</span>
          <span className="mt-1 block font-display text-[17px] font-bold tracking-[-0.015em] text-paper">
            {s.label}
          </span>
          <span className="mt-1 block text-[13px] leading-snug text-mist">{s.detail}</span>
        </motion.li>
      ))}
    </motion.ol>
  );
}
