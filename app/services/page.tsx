import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { services, site } from "@/lib/content";
import { serviceSchema } from "@/lib/schema";
import { Section, SectionHead, Container } from "@/components/system/Section";
import { JsonLd } from "@/components/system/JsonLd";
import { ServiceIndex } from "@/components/services/ServiceIndex";
import { ServicePanel } from "@/components/services/ServicePanel";
import { Button } from "@/components/system/Button";
import { Field, FieldRow } from "@/components/system/Field";

const description =
  "Explore TorqueShip freight forwarding and logistics services for DTC and e-commerce brands, from international transportation to shipment coordination.";

export const metadata: Metadata = {
  title: {
    absolute: "Freight Forwarding Services for DTC & E-commerce Brands | TorqueShip",
  },
  description,
  openGraph: {
    title: "Freight Forwarding Services for DTC & E-commerce Brands | TorqueShip",
    description,
    url: `${site.url}/services/`,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Freight Forwarding Services for DTC & E-commerce Brands | TorqueShip",
    description,
  },
  alternates: { canonical: `${site.url}/services/` },
  robots: { index: true, follow: true },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={serviceSchema()} />
      
      <Section divided={false} className="py-14 sm:py-20">
        <SectionHead as="h1" title={services.intro.title} body={services.intro.subhead} />
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
        <SectionHead title={services.pricing.title} body={services.pricing.body} />

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

          <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(2.25rem,7.5vw,5rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-paper text-balance">
            Need help choosing the right freight option?
          </h2>

          <p className="mt-6 max-w-[50ch] text-[16px] leading-relaxed text-mist sm:text-[18px]">
            Tell us about your shipment and we'll help you determine the right freight solution 
            for your timeline and budget.
          </p>

          <div className="mt-10">
            <Button
              href={services.pricing.cta.href}
              size="lg"
              className="w-full sm:w-auto"
              trailing={<ArrowRight aria-hidden="true" className="size-4" />}
            >
              {services.pricing.cta.label}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
