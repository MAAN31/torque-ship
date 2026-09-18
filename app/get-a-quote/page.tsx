import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/content";
import { Section, SectionHead, Container } from "@/components/system/Section";
import { QuoteEstimator } from "@/components/quote/QuoteEstimator";

const description =
  "Request a freight quote from TorqueShip. Tell us your origin, destination, cargo and shipment requirements.";

export const metadata: Metadata = {
  title: { absolute: "Get a Freight Quote | TorqueShip" },
  description,
  openGraph: {
    title: "Get a Freight Quote | TorqueShip",
    description,
    url: `${site.url}/get-a-quote/`,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Get a Freight Quote | TorqueShip",
    description,
  },
  alternates: { canonical: `${site.url}/get-a-quote/` },
  robots: { index: true, follow: true },
};

export default function GetAQuotePage() {
  return (
    <>
      <Section divided={false} className="py-14 sm:py-20">
        <div className="mx-auto max-w-[720px]">
          <SectionHead
            as="h1"
            title="Get a Freight Quote"
            body="Tell us about your shipment and we'll help you determine the right freight solution."
          />
        </div>
      </Section>

      <Section className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-[840px]">
          <QuoteEstimator />

          {/* Privacy notice */}
          <div className="mt-6 border-t border-steel pt-6">
            <p className="text-[13px] leading-relaxed text-steel-hi">
              By submitting this form, you agree that TorqueShip may use the information
              provided to respond to your request and provide its services. See our{" "}
              <Link
                href="/privacy-policy"
                className="text-mist underline-offset-4 hover:text-signal hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
