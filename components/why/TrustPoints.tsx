"use client";

import { motion } from "framer-motion";
import { why } from "@/lib/content";
import { fieldIn, useRevealGroup } from "@/lib/motion";

/**
 * Trust points as ruled ledger rows that populate in sequence — a claim, then
 * the thing that makes the claim checkable. Fixed structure, one sentence each,
 * nothing hidden behind an interaction.
 */
export function TrustPoints() {
  const group = useRevealGroup(0.08);

  return (
    <motion.ol {...group} className="grid grid-cols-1 gap-px bg-steel sm:grid-cols-2">
      {why.trustPoints.map((p) => (
        <motion.li
          key={p.box}
          variants={fieldIn}
          className="group relative bg-graphite p-6 transition-colors hover:bg-panel sm:p-8"
        >
          <span
            aria-hidden="true"
            className="absolute right-5 top-5 font-display text-[3.5rem] font-extrabold leading-none tracking-[-0.05em] text-steel/70 tabular transition-colors duration-300 group-hover:text-steel-hi/60"
          >
            {p.box}
          </span>

          <h3 className="relative max-w-[22ch] font-display text-[clamp(1.2rem,2.8vw,1.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-paper text-balance">
            {p.title}
          </h3>

          <p className="relative mt-4 max-w-[42ch] text-[15px] leading-relaxed text-mist">
            {p.body}
          </p>
        </motion.li>
      ))}
    </motion.ol>
  );
}
