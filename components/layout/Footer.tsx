import Link from "next/link";
import { contact, footer, nav, site } from "@/lib/content";
import { Container } from "@/components/system/Section";

/**
 * Utility footer, deliberately quiet. Each page carries its own single closing
 * CTA above this; a loud footer would compete with it and give the page two
 * "next actions" instead of one.
 */
export function Footer() {
  return (
    <footer className="border-t border-steel bg-graphite">
      <Container className="py-12 sm:py-16">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-[34ch]">
            <p className="font-display text-lg font-bold leading-snug tracking-[-0.02em] text-paper">
              {footer.note}
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
              {site.docType}
            </p>
          </div>

          <div className="flex gap-12 sm:gap-16">
            <nav aria-label="Footer">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel-hi">
                Pages
              </h2>
              <ul className="mt-4 space-y-2.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-mono text-[12px] uppercase tracking-[0.12em] text-mist transition-colors hover:text-signal"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel-hi">
                Direct
              </h2>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-mono text-[12px] text-mist transition-colors hover:text-signal"
                  >
                    {contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={contact.phoneHref}
                    className="font-mono text-[12px] text-mist transition-colors hover:text-signal"
                  >
                    {contact.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-steel pt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-steel-hi">
          {footer.legal}
        </p>
      </Container>
    </footer>
  );
}
