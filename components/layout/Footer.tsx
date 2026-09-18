import Link from "next/link";
import { contact, footer, nav, site } from "@/lib/content";
import { Container } from "@/components/system/Section";

/**
 * Utility footer with legal page links. Privacy Policy and Terms & Conditions
 * are footer-only and NOT in the main navigation per the brief.
 */
export function Footer() {
  return (
    <footer className="border-t border-steel bg-graphite">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-[2fr_1fr_1fr] lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="max-w-[42ch]">
            <h2 className="font-display text-xl font-bold leading-snug tracking-[-0.02em] text-paper">
              {site.name}
            </h2>
            <p className="mt-2 font-display text-base font-semibold leading-snug text-mist">
              Global Freight Forwarding for DTC & E-commerce Brands
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-steel-hi">
              {footer.note}
            </p>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel-hi">
              Pages
            </h3>
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
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel-hi">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-mono text-[12px] text-mist transition-colors hover:text-signal"
                >
                  {contact.email}
                </a>
              </li>
              {/* No public number yet — restore once contact.phone is real.
              <li>
                <a
                  href={contact.phoneHref}
                  className="font-mono text-[12px] text-mist transition-colors hover:text-signal"
                >
                  {contact.phone}
                </a>
              </li>
              */}
            </ul>
          </div>

          <div className="sm:col-span-3 lg:col-span-1">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel-hi">
              Legal
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footer.legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-mono text-[12px] uppercase tracking-[0.12em] text-mist transition-colors hover:text-signal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-steel pt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-steel-hi">
          {footer.legal}
        </p>
      </Container>
    </footer>
  );
}
