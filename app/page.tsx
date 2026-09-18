import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { home, primaryCta, site } from "@/lib/content";
import { howToSchema } from "@/lib/schema";
import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { Services } from "@/components/home/Services";
import { RouteJourney } from "@/components/home/RouteJourney";
import { WhoItsFor } from "@/components/home/WhoItsFor";
import { ShipmentStatus } from "@/components/home/ShipmentStatus";
import { Section, SectionHead, Container } from "@/components/system/Section";
import { Button } from "@/components/system/Button";
import { JsonLd } from "@/components/system/JsonLd";

const pageDescription =
  "TorqueShip handles freight forwarding for DTC brands, from factory pickup and international freight to customs clearance and delivery to your 3PL.";

export const metadata: Metadata = {
  title: {
    absolute: "TorqueShip|Freight Forwarding for DTC Brands",
  },
  description: pageDescription,
  openGraph: {
    title: "TorqueShip|Freight Forwarding for DTC Brands",
    description: "Freight forwarding for DTC brands, from factory to 3PL.",
    url: `${site.url}/`,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "TorqueShip|Freight Forwarding for DTC Brands",
    description: pageDescription,
  },
  alternates: { canonical: `${site.url}/` },
  robots: { index: true, follow: true },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={howToSchema(home.route.stops)} />

      <Hero />

      {/* 01 — three value props, full bleed strip -------------------------- */}
      <Section bleed>
        <ValueProps />
      </Section>

      {/* 02 — services overview ------------------------------------------- */}
      <Section className="py-16 sm:py-24">
        <SectionHead title={home.services.title} body={home.services.body} />
        
        <div className="mt-12 sm:mt-16">
          <Services />
        </div>
      </Section>

      {/* 03 — route of carriage ------------------------------------------- */}
      <Section id="how-it-works" className="scroll-mt-20 py-16 sm:py-24">
        <SectionHead title={home.route.title} body={home.route.body} />

        <div className="mt-14 sm:mt-20">
          <RouteJourney />
        </div>

        {/*
          Link into Services page - positioned after the route journey to encourage exploration
        */}
        <div className="mt-14 border-t border-steel pt-6 sm:mt-20">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-mist transition-colors hover:text-signal"
          >
            See all freight forwarding services
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </Section>

      {/* 04 — sample shipment record -------------------------------------- */}
      <Section className="py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          <SectionHead title={home.status.title} body={home.status.body} />
          <ShipmentStatus />
        </div>
      </Section>

      {/* 05 — who it's for ------------------------------------------------ */}
      <Section className="py-16 sm:py-24">
        <SectionHead title={home.whoItsFor.title} body={home.whoItsFor.body} />
        <div className="mt-10">
          <WhoItsFor />
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
