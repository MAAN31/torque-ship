import { home } from "@/lib/content";

/**
 * Who It's For — 2×2 grid of audience types.
 * Each card features a concise audience title and a one-line explanation.
 * The background number turns signal on hover.
 */
export function WhoItsFor() {
  return (
    <div className="mt-10 grid gap-px bg-steel sm:grid-cols-2">
      {home.whoItsFor.audiences.map((audience, i) => (
        <div
          key={audience.title}
          className="group relative flex flex-col justify-end bg-graphite px-7 py-9 transition-colors hover:bg-panel sm:px-8 sm:py-11"
        >
          {/* Large decorative number — turns signal on hover */}
          <span
            aria-hidden="true"
            className="absolute right-6 top-5 font-display text-[5rem] font-extrabold leading-none tracking-[-0.05em] tabular text-steel/40 transition-colors duration-300 group-hover:text-signal/70"
          >
            0{i + 1}
          </span>

          {/* Audience title — primary focus */}
          <h3 className="relative font-display text-[clamp(1.5rem,3.5vw,2rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-paper">
            {audience.title}
          </h3>

          {/* One-line explanation — secondary, smaller */}
          <p className="relative mt-3 text-[14px] leading-relaxed text-mist sm:text-[15px]">
            {audience.body}
          </p>
        </div>
      ))}
    </div>
  );
}
