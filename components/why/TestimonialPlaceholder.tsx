import { why } from "@/lib/content";
import { Stamp, PlaceholderTag } from "@/components/system/Stamp";

/**
 * Testimonial slot.
 *
 * When `why.testimonial.placeholder` is true this renders as an UNSIGNED
 * consignee statement — hazard hatching, dashed rule, an "awaiting signature"
 * stamp and a visible note. The point is that it reads as a deliberate empty
 * field on a form rather than as a broken component or, worse, as a fabricated
 * quote. Set `placeholder: false` and drop in a real quote and the provisional
 * styling clears itself with no code change.
 */
export function TestimonialPlaceholder() {
  const t = why.testimonial;

  if (!t.placeholder) {
    return (
      <figure className="border border-steel bg-graphite p-8 sm:p-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
          {t.kicker}
        </span>
        <blockquote className="mt-6 max-w-[38ch] font-display text-[clamp(1.4rem,3.5vw,2rem)] font-bold leading-[1.2] tracking-[-0.025em] text-paper text-balance">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-mist">
          {t.attribution}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="hatch relative border border-dashed border-steel-hi bg-graphite p-8 sm:p-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
          {t.kicker}
        </span>
        <Stamp tone="neutral" rotate={-3}>
          Awaiting signature
        </Stamp>
      </div>

      <blockquote className="mt-8 max-w-[38ch] font-display text-[clamp(1.4rem,3.5vw,2rem)] font-bold leading-[1.2] tracking-[-0.025em] text-steel-hi text-balance">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      {/* Signature rule — an empty line on a form, not a broken avatar. */}
      <div className="mt-10 flex items-end gap-6">
        <div className="w-full max-w-[16rem]">
          <div className="h-px w-full bg-steel-hi" />
          <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-steel-hi">
            {t.attribution}
          </span>
        </div>
        <PlaceholderTag />
      </div>

      <figcaption className="mt-8 max-w-[62ch] border-t border-steel pt-5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-steel-hi">
        {t.note}
      </figcaption>
    </figure>
  );
}
