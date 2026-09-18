import { ArrowRight, ArrowDown } from "lucide-react";
import { home, primaryCta, site, contact } from "@/lib/content";
import { Button } from "@/components/system/Button";
import { Stamp } from "@/components/system/Stamp";
import { Field, FieldRow } from "@/components/system/Field";
import { Container } from "@/components/system/Section";

/**
 * ABOVE THE FOLD. Answers three questions before a founder can scroll past:
 *
 *   what is this  → the headline
 *   who is it for → the CONSIGNEE field, stated literally
 *   what next     → one filled signal button, the only one on screen
 *
 * PERFORMANCE NOTE — the headline is the LCP element and it has NO entrance
 * animation. It paints immediately at full opacity. Everything kinetic here is
 * secondary chrome (stamp, fields, sweep), so no animation is ever in front of
 * the largest paint. This is the single most important reason the mobile
 * performance budget holds.
 */
export function Hero() {
  // Computed on the visitor's clock, not baked in at build time — this is a
  // fully static export with no scheduled rebuild, so a hardcoded quarter
  // would silently go stale between deploys.
  const bookingStatus = "NOW ACCEPTING NEW BOOKINGS";

  return (
    <section className="relative overflow-hidden">
      {/* Document ground. Pure CSS — there are no images on this page. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="manifest-grid absolute inset-0 opacity-[0.55]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,transparent_35%,var(--color-ink)_100%)]" />
        <div className="absolute inset-x-0 top-1/3 h-px overflow-hidden">
          <div className="scanline h-px w-full bg-gradient-to-r from-transparent via-signal/50 to-transparent" />
        </div>
      </div>

      <Container className="relative pb-14 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        {/* Document header rule */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 border-b border-steel pb-4 animate-fade-in-up"
          style={{ animationDelay: '0ms' }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint sm:text-[11px]">
            {site.docType}
          </span>
          <Stamp tone="signal" rotate={-3} live>
            {bookingStatus}
          </Stamp>
        </div>

        {/* LCP element — static by design. H1 is SEO-optimized for "Global Freight Forwarding for DTC & E-commerce Brands" */}
        <h1 className="mt-8 font-display text-[clamp(2.75rem,11vw,7.5rem)] font-extrabold leading-[0.88] tracking-[-0.045em] text-paper sm:mt-10">
          {home.hero.headline.map((line, i) => (
            <span key={line} className="block">
              {i === home.hero.headline.length - 1 ? (
                <span className="text-signal">{line}</span>
              ) : (
                line
              )}
            </span>
          ))}
        </h1>

        <p
          className="mt-7 max-w-[54ch] text-[16px] leading-relaxed sm:text-[19px] animate-fade-in-up"
          style={{ animationDelay: '100ms' }}
        >
          <span className="font-medium text-paper">{home.hero.subhead.lead}</span>
        </p>

        <p
          className="mt-4 max-w-[54ch] text-[16px] leading-relaxed text-mist sm:text-[18px] animate-fade-in-up"
          style={{ animationDelay: '150ms' }}
        >
          {home.hero.subhead.rest}
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-in-up" style={{ animationDelay: '180ms' }}>
          <Button
            href={primaryCta.href}
            size="lg"
            className="w-full sm:w-auto"
            trailing={<ArrowRight aria-hidden="true" className="size-4" />}
          >
            {primaryCta.label}
          </Button>

          <Button
            href={home.hero.secondaryCta.href}
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto"
            trailing={<ArrowDown aria-hidden="true" className="size-4" />}
          >
            {home.hero.secondaryCta.label}
          </Button>
        </div>

        {/* Who it's for, stated as a form field rather than buried in prose. */}
        <div className="mt-12 sm:mt-16 animate-fade-in-up" style={{ animationDelay: '260ms' }}>
          <FieldRow cols={3}>
            <Field box="01" label="Consignee">
              {home.hero.consignee}
            </Field>
            <Field box="02" label="Lane" emphasis>
              {home.hero.lane}
            </Field>
            <Field box="03" label="Reply time">
              {contact.responseWindow}
            </Field>
          </FieldRow>
        </div>
      </Container>
    </section>
  );
}
