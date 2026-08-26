/* ============================================================================
   STRUCTURED DATA — JSON-LD builders
   ----------------------------------------------------------------------------
   Each function derives schema.org markup from data that already exists in
   lib/content.ts, so the structured data can never drift out of sync with
   what's actually on the page.
============================================================================ */

import { contact, site } from "./content";

const LINKEDIN_URL = "https://www.linkedin.com/company/torqueship/";

/** Site-wide — rendered once in the root layout, present on every page. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/torqueship-logo.svg`,
  email: contact.email,
  sameAs: [LINKEDIN_URL],
};

export function faqSchema(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function howToSchema(stops: { label: string; detail: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How a shipment moves from the factory floor to your 3PL door",
    step: stops.map((s) => ({
      "@type": "HowToStep",
      name: s.label,
      text: s.detail,
    })),
  };
}
