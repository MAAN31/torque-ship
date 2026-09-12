import { why } from "@/lib/content";

/**
 * Trust points as ruled ledger rows that populate in sequence — a claim, then
 * the thing that makes the claim checkable. Fixed structure, one sentence each,
 * nothing hidden behind an interaction.
 */
export function TrustPoints() {
  return (
    <ol className="grid grid-cols-1 gap-px bg-steel sm:grid-cols-2">
      {why.trustPoints.map((p, i) => (
        <li
          key={p.box}
          className={[
            "group relative bg-graphite p-6 transition-colors hover:bg-panel sm:p-8 animate-fade-in-up",
            // If this is the last item AND there's an odd total, span both columns
            // so it fills the row rather than leaving an empty grey sibling cell.
            i === why.trustPoints.length - 1 && why.trustPoints.length % 2 !== 0
              ? "sm:col-span-2"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <span
            aria-hidden="true"
            className="absolute right-5 top-5 font-display text-[3.5rem] font-extrabold leading-none tracking-[-0.05em] tabular text-steel/70 transition-colors duration-300 group-hover:text-signal/80"
          >
            {p.box}
          </span>

          <h3 className="relative max-w-[22ch] font-display text-[clamp(1.2rem,2.8vw,1.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-paper text-balance">
            {p.title}
          </h3>

          <p className="relative mt-4 max-w-[42ch] text-[15px] leading-relaxed text-mist">
            {p.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
