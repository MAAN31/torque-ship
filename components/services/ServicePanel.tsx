import { services } from "@/lib/content";
import { GLYPHS } from "./Glyph";
import { Ticker } from "@/components/system/Ticker";

type Category = (typeof services.categories)[number];

/**
 * One service module. Server-rendered — the sticky index that tracks these is
 * the only client code on the page, and it finds these panels by DOM id rather
 * than by ref, so none of this copy ships as a hydration payload.
 *
 * Nothing is collapsed. An accordion would hide four fifths of the scope behind
 * taps; a founder scanning on a phone should be able to thumb past all five in
 * one continuous read.
 */
export function ServicePanel({ category, index }: { category: Category; index: number }) {
  const Glyph = GLYPHS[category.id];
  const statNumber = Number(category.stat.value);

  return (
    <article
      id={`svc-${category.id}`}
      aria-labelledby={`svc-${category.id}-title`}
      className="scroll-mt-28 border-t border-steel py-14 first:border-t-0 first:pt-0 sm:py-20"
    >
      <div className="flex items-start justify-between gap-8">
        <div className="min-w-0">
          <span className="font-mono text-[11px] tracking-[0.24em] text-signal tabular">
            {category.box}
          </span>

          <h2
            id={`svc-${category.id}-title`}
            className="mt-4 font-display text-[clamp(1.9rem,5.5vw,3.5rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-paper text-balance"
          >
            {category.name}
          </h2>

          <p className="mt-4 max-w-[44ch] font-display text-[17px] font-semibold leading-snug tracking-[-0.01em] text-signal sm:text-[19px]">
            {category.summary}
          </p>
        </div>

        {Glyph ? (
          <Glyph className="hidden size-24 shrink-0 sm:block lg:size-32" />
        ) : null}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <p className="text-[15px] leading-relaxed text-mist sm:text-[16px]">{category.body}</p>

        <ul className="space-y-px bg-steel">
          {category.items.map((item) => (
            <li
              key={item}
              className="flex items-baseline gap-3 bg-graphite px-4 py-3 text-[14px] leading-snug text-paper"
            >
              <span aria-hidden="true" className="font-mono text-[10px] text-signal">
                ▸
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Stat plate — the mono/data accent that keeps each module feeling
          measured rather than described. */}
      <div className="mt-10 inline-flex items-baseline gap-4 border border-steel px-5 py-4">
        <span className="font-display text-[2.5rem] font-extrabold leading-none tracking-[-0.04em] text-signal tabular">
          {Number.isFinite(statNumber) ? (
            <Ticker value={statNumber} suffix={category.stat.suffix} />
          ) : (
            `${category.stat.value}${category.stat.suffix}`
          )}
        </span>
        <span className="max-w-[22ch] font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-mist">
          {category.stat.label}
        </span>
      </div>

      <span className="sr-only">
        Module {index + 1} of {services.categories.length}.
      </span>
    </article>
  );
}
