import type { Metadata } from "next";
import { site } from "@/lib/content";
import { Section, Container } from "@/components/system/Section";

const description =
  "TorqueShip Privacy Policy. Learn how we collect, use, and protect your information when you use our freight forwarding services.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  openGraph: {
    title: `Privacy Policy | ${site.name}`,
    description,
    url: `${site.url}/privacy-policy/`,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Privacy Policy | ${site.name}`,
    description,
  },
  alternates: { canonical: `${site.url}/privacy-policy/` },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <Section className="py-14 sm:py-20">
      <Container className="prose prose-invert prose-sm sm:prose-base max-w-[800px]">
        <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-0.04em] text-paper">
          Privacy Policy
        </h1>
        
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel-hi">
          Last Updated: September 12, 2026
        </p>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-mist">
          <p>
            <strong className="text-paper">
              PLACEHOLDER CONTENT — Client must provide approved Privacy Policy.
            </strong>
          </p>

          <p>
            This page is intentionally left with placeholder content. The client must provide 
            their approved Privacy Policy document that complies with applicable data protection 
            regulations (GDPR, CCPA, etc.).
          </p>

          <p>
            The Privacy Policy should cover:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>What information TorqueShip collects</li>
            <li>How that information is used</li>
            <li>How information is stored and protected</li>
            <li>Third-party services and data sharing</li>
            <li>User rights regarding their data</li>
            <li>Cookie usage and tracking</li>
            <li>Contact information for privacy inquiries</li>
            <li>Policy update procedures</li>
          </ul>

          <p>
            Once the approved Privacy Policy is provided, replace this entire content section 
            with the actual legal document.
          </p>
        </div>
      </Container>
    </Section>
  );
}
