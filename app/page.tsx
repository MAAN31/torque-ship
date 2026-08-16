import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { home, primaryCta, services } from "@/lib/content";
import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { RouteJourney } from "@/components/home/RouteJourney";
import { ShipmentStatus } from "@/components/home/ShipmentStatus";
import { Section, SectionHead, Container } from "@/components/system/Section";
import { Button } from "@/components/system/Button";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* 01 — three value props, full bleed strip -------------------------- */}
      <Section bleed>
        <ValueProps />
      </Section>

      {/* 04 — route of carriage ------------------------------------------- */}
      <Section className="py-16 sm:py-24">
        <SectionHead
          box={home.route.box}
          kicker={home.route.kicker}
          title={home.route.title}
          body={home.route.body}
        />

        <div className="mt-14 sm:mt-20">
          <RouteJourney />
        </div>

        {/*
          The brief's secondary CTA into Services. It sits mid-page, quiet, as a
          lateral move — not at the page end, where it would compete with the
          single closing action below.
        */}
        <div className="mt-14 border-t border-steel pt-6 sm:mt-20">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-mist transition-colors hover:text-signal"
          >
            All {services.categories.length} things I handle
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </Section>

      {/* 05 — sample shipment record -------------------------------------- */}
      <Section className="py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          <SectionHead
            box={home.status.box}
            kicker={home.status.kicker}
            title={home.status.title}
            body={home.status.body}
          />
          <ShipmentStatus />
        </div>
      </Section>

      {/* Closing action — exactly one --------------------------------------- */}
      <Section className="relative overflow-hidden py-20 sm:py-28" bleed>
        <div aria-hidden="true" className="manifest-grid absolute inset-0 opacity-40" />

        <Container className="relative">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
            {home.outro.kicker}
          </span>

          <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(2.25rem,7.5vw,5rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-paper text-balance">
            {home.outro.title}
          </h2>

          <p className="mt-6 max-w-[50ch] text-[16px] leading-relaxed text-mist sm:text-[18px]">
            {home.outro.body}
          </p>

          <div className="mt-10">
            <Button
              href={primaryCta.href}
              size="lg"
              trailing={<ArrowRight aria-hidden="true" className="size-4" />}
            >
              {primaryCta.label}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
