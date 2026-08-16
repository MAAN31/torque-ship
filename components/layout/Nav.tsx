"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { nav, primaryCta, site } from "@/lib/content";
import { Button } from "@/components/system/Button";
import { cn } from "@/lib/cn";

/**
 * Sticky document header.
 *
 * There is no hamburger. With exactly three destinations, a menu button would
 * add a tap and hide the IA behind an icon for zero gain — the links fit on a
 * 360px viewport at mono 11px. On mobile the header carries navigation only;
 * the CTA lives in the persistent bottom bar where a thumb already is.
 */
export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-steel bg-ink/85 backdrop-blur-md supports-[backdrop-filter]:bg-ink/70">
      <div className="mx-auto flex h-14 w-full max-w-[1240px] items-center justify-between gap-4 px-5 sm:h-16 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label={`${site.name} — home`}
        >
          <Mark />
          <span className="font-display text-[15px] font-extrabold uppercase leading-none tracking-[-0.02em] text-paper sm:text-base">
            Torque<span className="text-signal">Ship</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-7">
          {nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors sm:text-[12px]",
                  active ? "text-signal" : "text-mist hover:text-paper"
                )}
              >
                <span className="mr-1.5 hidden text-steel-hi sm:inline">{item.box}</span>
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-px left-0 h-px w-full origin-left bg-signal transition-transform duration-300 ease-out",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA. Mobile gets the bottom bar instead. */}
        <Button
          href={primaryCta.href}
          size="sm"
          className="hidden md:inline-flex"
          trailing={<ArrowUpRight aria-hidden="true" className="size-3.5" />}
        >
          {primaryCta.label}
        </Button>
      </div>
    </header>
  );
}

/** Custom mark: a torque arrow inside a container cross-section. No icon pack. */
function Mark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-6 shrink-0"
      aria-hidden="true"
      fill="none"
      strokeLinecap="square"
    >
      <rect x="1.5" y="4.5" width="21" height="15" stroke="var(--color-steel-hi)" strokeWidth="1.5" />
      <path d="M6 4.5v15M10 4.5v15M14 4.5v15M18 4.5v15" stroke="var(--color-steel)" strokeWidth="1" />
      <path
        d="M4 12h13m0 0-4-4m4 4-4 4"
        stroke="var(--color-signal)"
        strokeWidth="2"
        className="transition-transform duration-300 ease-out group-hover:translate-x-[2px]"
      />
    </svg>
  );
}
