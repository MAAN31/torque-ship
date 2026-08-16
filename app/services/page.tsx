import type { Metadata } from "next";
import { ArrowRight, Calendar } from "lucide-react";
import { services } from "@/lib/content";
import { Section, SectionHead, Container } from "@/components/system/Section";
import { ServiceIndex } from "@/components/services/ServiceIndex";
import { ServicePanel } from "@/components/services/ServicePanel";
import { Button } from "@/components/system/Button";
import { Field, FieldRow } from "@/components/system/Field";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Sourcing & freight, customs & compliance, documentation, last-mile, and what happens when things go sideways.",
};

export default function ServicesPage() {
  return (
    <>
      <Section divided={false} className="py-14 sm:py-20">
        <SectionHead
          as="h1"
          box={services.intro.box}
          kicker={services.intro.kicker}
          title={services.intro.title}
          body={services.intro.subhead}
        />
      </Section>

      {/* Scroll-pinned switcher: sticky index left, panels right ----------- */}
      <Section className="pb-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:gap-16">
          <div className="hidden lg:block">
            <ServiceIndex />
          </div>

          <div>
            {services.categories.map((c, i) => (
              <ServicePanel key={c.id} category={c} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* Commercials ------------------------------------------------------- */}
      <Section className="py-16 sm:py-24">
        <SectionHead
          box={services.pricing.box}
          kicker={services.pricing.kicker}
          title={services.pricing.title}
          body={services.pricing.body}
        />

        <div className="mt-10">
          <FieldRow cols={4}>
            {services.pricing.points.map((p) => (
              <Field key={p.term} label={p.term}>
                {p.value}
              </Field>
            ))}
          </FieldRow>
        </div>
      </Section>

      {/* Closing action — exactly one -------------------------------------- */}
      <Section className="relative overflow-hidden py-20 sm:py-28" bleed>
        <div aria-hidden="true" className="manifest-grid absolute inset-0 opacity-40" />

        <Container className="relative">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
            Next action
          </span>

          <h2 className="mt-5 max-w-[15ch] font-display text-[clamp(2.25rem,7.5vw,5rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-paper text-balance">
            Fifteen minutes, no pitch deck.
          </h2>

          <p className="mt-6 max-w-[50ch] text-[16px] leading-relaxed text-mist sm:text-[18px]">
            Bring a lane and a launch date. You will leave knowing whether the freight math
            works, whether or not you book anything.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              href={services.pricing.cta.href}
              size="lg"
              className="w-full sm:w-auto"
              trailing={<Calendar aria-hidden="true" className="size-4" />}
            >
              {services.pricing.cta.label}
            </Button>

            <Button
              href="/why#estimator"
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto"
              trailing={<ArrowRight aria-hidden="true" className="size-4" />}
            >
              Or price it yourself first
            </Button>
          </div>

          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-signal/70">
            ◆ Calendar link is a placeholder — see `contact.calendly` in lib/content.ts
          </p>
        </Container>
      </Section>
    </>
  );
}
