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
  description: "Global freight forwarding and logistics for DTC and e-commerce brands",
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
    name: "How International Freight Forwarding Works with TorqueShip",
    description: "Complete process for moving freight from origin pickup through final delivery for DTC and e-commerce brands",
    step: stops.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.label,
      text: s.detail,
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Freight Forwarding",
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    description: "International freight forwarding, customs clearance, and logistics coordination for DTC and e-commerce brands",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
    },
  };
}

/** Homepage — WebSite schema with SearchAction potential and sitelinks hint. */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  description:
    "Global freight forwarding for DTC and e-commerce brands. TorqueShip coordinates international ocean, air, ground, customs and logistics with one direct point of contact.",
  publisher: {
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/torqueship-logo.svg`,
  },
};
