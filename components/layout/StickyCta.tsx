"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";
import { contact, primaryCta } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Persistent mobile conversion bar.
 *
 * UX rules encoded here:
 * - Always within thumb reach, on every page, at every scroll position.
 * - It hides itself while the estimator is actually on screen. Showing a
 *   "Get a Rate Quote" button on top of the rate quote tool is noise, and it
 *   would cover the tool's own submit control.
 * - Mobile only. Desktop already has a sticky header CTA one eye-movement away;
 *   duplicating it into a floating bar would be decoration.
 * - `body` gets bottom padding from this component's spacer so the bar can
 *   never occlude the end of a page.
 */
export function StickyCta() {
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // This component lives in the root layout, so it does NOT remount on
    // navigation. Without re-running per route, a visitor who scrolled to the
    // estimator (bar hidden) and then navigated away would lose the CTA for the
    // rest of the session. Re-keying on pathname resets and re-observes.
    setHidden(false);

    const target = document.getElementById("estimator");
    if (!target) return;

    const io = new IntersectionObserver(
      (entries) => setHidden(entries[0]?.isIntersecting ?? false),
      { threshold: 0.08 }
    );

    io.observe(target);
    return () => io.disconnect();
  }, [pathname]);

  return (
    <>
      {/* Reserves the space the fixed bar occupies. */}
      <div aria-hidden="true" className="h-[68px] md:hidden" />

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 border-t border-steel bg-ink/95 backdrop-blur-md md:hidden",
          "transition-transform duration-300 ease-out",
          hidden ? "translate-y-full" : "translate-y-0"
        )}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-stretch gap-px bg-steel">
          <Link
            href={primaryCta.href}
            className="flex h-14 flex-1 items-center justify-center gap-2 bg-signal font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-ink active:bg-signal-deep"
          >
            {primaryCta.label}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>

          <a
            href={contact.phoneHref}
            aria-label={`Call Torque Ship on ${contact.phone}`}
            className="flex h-14 w-16 items-center justify-center bg-graphite text-paper active:bg-panel"
          >
            <Phone aria-hidden="true" className="size-5" />
          </a>
        </div>
      </div>
    </>
  );
}
