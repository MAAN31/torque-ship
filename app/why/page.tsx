import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { contact, why } from "@/lib/content";
import { Section, SectionHead } from "@/components/system/Section";
import { TrustPoints } from "@/components/why/TrustPoints";
import { TestimonialPlaceholder } from "@/components/why/TestimonialPlaceholder";
import { QuoteEstimator } from "@/components/quote/QuoteEstimator";

export const metadata: Metadata = {
  title: "Why Me",
  description:
    "One operator, direct line, landed cost before you commit. Price your lane with the estimator, then decide whether to call.",
};

export default function WhyPage() {
  return (
    <>
      <Section divided={false} className="py-14 sm:py-20">
        <SectionHead
          as="h1"
          box={why.intro.box}
          kicker={why.intro.kicker}
          title={why.intro.title}
          body={why.intro.subhead}
        />
      </Section>

      {/* Trust points ------------------------------------------------------ */}
      <Section className="pb-16 sm:pb-24">
        <TrustPoints />
      </Section>

      {/* Testimonial slot -------------------------------------------------- */}
      <Section className="py-14 sm:py-20">
        <TestimonialPlaceholder />
      </Section>

      {/* Closing conversion moment — exactly one action --------------------- */}
      <Section id="estimator" className="scroll-mt-20 py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              box={why.estimator.box}
              kicker={why.estimator.kicker}
              title={why.estimator.title}
              body={why.estimator.subhead}
            />

            {/* Direct lines, for the founder who would rather just ask. The
                estimator is the primary path; these are the escape hatch, and
                they are styled quietly so they do not compete with it. */}
            <div className="mt-8 flex flex-col gap-3 border-t border-steel pt-6">
              <a
                href={`mailto:${contact.email}`}
                className="group inline-flex items-center gap-3 font-mono text-[13px] text-mist transition-colors hover:text-signal"
              >
                <Mail aria-hidden="true" className="size-4 shrink-0" />
                {contact.email}
              </a>
              {/* No public number yet — restore once contact.phone is real.
              <a
                href={contact.phoneHref}
                className="group inline-flex items-center gap-3 font-mono text-[13px] text-mist transition-colors hover:text-signal"
              >
                <Phone aria-hidden="true" className="size-4 shrink-0" />
                {contact.phone}
              </a>
              */}
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-steel-hi">
                {contact.responseWindow}
              </p>
            </div>
          </div>

          <QuoteEstimator />
        </div>
      </Section>
    </>
  );
}
