"use client";

import { useEffect, useState } from "react";
import { services } from "@/lib/content";
import { cn } from "@/lib/cn";

const CATEGORIES = services.categories;

/**
 * Sticky category index — the scroll-pinned switcher.
 *
 * It tracks the panels by DOM id instead of by ref, which lets the panels stay
 * server components. This file is the only JavaScript the Services page ships.
 *
 * The links are plain anchors. Smooth scrolling and the sticky-header offset
 * both come from CSS (`scroll-behavior` + `scroll-padding-top` in globals.css),
 * so the index works with JS still loading, works on back/forward, and gives
 * every category a real URL a founder can send to their ops person.
 */
export function ServiceIndex() {
  const [active, setActive] = useState(CATEGORIES[0].id);

  useEffect(() => {
    const panels = CATEGORIES.map((c) => document.getElementById(`svc-${c.id}`)).filter(
      (el): el is HTMLElement => !!el
    );
    if (!panels.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Choose the entry nearest the top of the reading area rather than the
        // largest one — with tall panels, "most visible" lags behind where the
        // reader actually is.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(visible[0].target.id.replace("svc-", ""));
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: 0 }
    );

    panels.forEach((p) => io.observe(p));
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Service categories" className="lg:sticky lg:top-28">
      <p className="border-b border-steel pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-steel-hi">
        Index
      </p>

      <ol className="mt-4 space-y-px">
        {CATEGORIES.map((c) => {
          const isActive = active === c.id;
          return (
            <li key={c.id}>
              <a
                href={`#svc-${c.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group flex items-baseline gap-3 py-2.5 transition-colors",
                  isActive ? "text-signal" : "text-mist hover:text-paper"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[10px] tracking-[0.16em] tabular",
                    isActive ? "text-signal" : "text-steel-hi"
                  )}
                >
                  {c.box}
                </span>

                <span className="min-w-0 flex-1 font-mono text-[12px] uppercase leading-snug tracking-[0.08em]">
                  {c.name}
                </span>

                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1 h-px w-4 shrink-0 origin-right transition-transform duration-300",
                    isActive ? "scale-x-100 bg-signal" : "scale-x-0 bg-steel-hi group-hover:scale-x-100"
                  )}
                />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
