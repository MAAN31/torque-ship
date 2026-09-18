import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { home } from "@/lib/content";
import { Card } from "@/components/system/Card";

/**
 * Why TorqueShip preview — 5 differentiators shown as padded panels.
 * The section title is intentionally a quiet kicker, not a large H2, so it
 * doesn't read as a duplicate of the /why-torqueship page heading.
 */
export function WhyPreview() {
  return (
    <div>
      {/* Quiet kicker — enough context without dominating the page */}
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
        Why TorqueShip
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {home.whyPreview.points.map((point, i) => (
          <Card
            key={point.title}
            className={[
              "p-7 sm:p-8",
              // Last item in a 5-card 3-col grid spans 2 cols on lg to avoid a
              // lone card leaving an orphaned grey cell beside it
              i === home.whyPreview.points.length - 1 && home.whyPreview.points.length % 3 === 2
                ? "lg:col-span-2"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <h3 className="font-display text-lg font-bold leading-tight tracking-[-0.02em] text-paper">
              {point.title}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-mist">
              {point.body}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-10 border-t border-steel pt-6">
        <Link
          href={home.whyPreview.cta.href}
          className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-mist transition-colors hover:text-signal"
        >
          {home.whyPreview.cta.label}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}
