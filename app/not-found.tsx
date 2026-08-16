import { ArrowRight } from "lucide-react";
import { primaryCta } from "@/lib/content";
import { Container } from "@/components/system/Section";
import { Button } from "@/components/system/Button";
import { Stamp } from "@/components/system/Stamp";

/** No dead ends — the 404 gets the same single closing action as every page. */
export default function NotFound() {
  return (
    <Container className="py-24 sm:py-36">
      <Stamp tone="flag" rotate={-3}>
        Not on manifest
      </Stamp>

      <h1 className="mt-8 max-w-[16ch] font-display text-[clamp(2.25rem,8vw,4.5rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-paper text-balance">
        This container isn&rsquo;t in the yard.
      </h1>

      <p className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-mist sm:text-[18px]">
        The page you asked for doesn&rsquo;t exist. Since you&rsquo;re here, you may as well get
        a number on your lane.
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
  );
}
