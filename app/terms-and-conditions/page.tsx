import type { Metadata } from "next";
import { site } from "@/lib/content";
import { Section, Container } from "@/components/system/Section";

const description =
  "TorqueShip Terms & Conditions. Review the terms of service for using TorqueShip's freight forwarding and logistics services.";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description,
  openGraph: {
    title: `Terms & Conditions | ${site.name}`,
    description,
    url: `${site.url}/terms-and-conditions/`,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Terms & Conditions | ${site.name}`,
    description,
  },
  alternates: { canonical: `${site.url}/terms-and-conditions/` },
  robots: { index: true, follow: true },
};

export default function TermsAndConditionsPage() {
  return (
    <Section className="py-14 sm:py-20">
      <Container className="prose prose-invert prose-sm sm:prose-base max-w-[800px]">
        <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-0.04em] text-paper">
          Terms & Conditions
        </h1>
        
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel-hi">
          Last Updated: September 12, 2026
        </p>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-mist">
          <p>
            <strong className="text-paper">
              PLACEHOLDER CONTENT — Client must provide approved Terms & Conditions.
            </strong>
          </p>

          <p>
            This page is intentionally left with placeholder content. The client must provide 
            their approved Terms & Conditions document that governs the use of TorqueShip's 
            freight forwarding and logistics services.
          </p>

          <p>
            The Terms & Conditions should cover:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Service scope and limitations</li>
            <li>Client and service provider responsibilities</li>
            <li>Payment terms and pricing structure</li>
            <li>Liability limitations and insurance</li>
            <li>Force majeure and exceptional circumstances</li>
            <li>Dispute resolution procedures</li>
            <li>Termination conditions</li>
            <li>Governing law and jurisdiction</li>
            <li>Confidentiality obligations</li>
            <li>Intellectual property rights</li>
          </ul>

          <p>
            Once the approved Terms & Conditions are provided, replace this entire content 
            section with the actual legal document.
          </p>
        </div>
      </Container>
    </Section>
  );
}
