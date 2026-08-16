"use client";

import { useReducedMotion, type Transition, type Variants } from "framer-motion";

/**
 * House easing. Mechanical, slightly overshoot-free — this brand is a machine,
 * not a bouncy castle.
 */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const swift: Transition = { duration: 0.45, ease: EASE };
export const settle: Transition = { duration: 0.7, ease: EASE };

/** Fields populating into a form. Y-only, no scale — documents don't zoom. */
export const fieldIn: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: settle },
};

/** Container that staggers its children as if the form is filling itself out. */
export const stagger = (gap = 0.07): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: 0.04 } },
});

/** A rule drawing itself left-to-right. */
export const ruleIn: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease: EASE } },
};

/**
 * Single source of truth for "should this animate at all".
 *
 * Returns props you spread onto a motion element. When the user has asked for
 * reduced motion we don't just shorten the animation — we hand back the
 * finished state directly, so nothing ever moves and nothing is ever missing.
 */
export function useReveal(delay = 0) {
  const reduced = useReducedMotion();

  if (reduced) {
    return {
      initial: false as const,
      animate: { opacity: 1, y: 0 },
      variants: undefined,
      transition: { duration: 0 },
    };
  }

  return {
    initial: "hidden" as const,
    whileInView: "show" as const,
    viewport: { once: true, margin: "-12% 0px -12% 0px" },
    variants: fieldIn,
    transition: { ...settle, delay },
  };
}

/** Same contract, for a staggering parent. */
export function useRevealGroup(gap = 0.07) {
  const reduced = useReducedMotion();

  if (reduced) {
    return { initial: false as const, animate: "show" as const, variants: stagger(0) };
  }

  return {
    initial: "hidden" as const,
    whileInView: "show" as const,
    viewport: { once: true, margin: "-10% 0px -10% 0px" },
    variants: stagger(gap),
  };
}
