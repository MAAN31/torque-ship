"use client";

import { useEffect, useState } from "react";
import { home } from "@/lib/content";
import { Field } from "@/components/system/Field";
import { Stamp } from "@/components/system/Stamp";
import { cn } from "@/lib/cn";

/**
 * The "shipment record" widget — the data-alive moment on the home page.
 *
 * Every value here is illustrative and the card says so, out loud, in the
 * footer. A mock widget that pretends to be live data is the kind of thing that
 * undermines a brand built on not lying about numbers.
 *
 * The ping counter starts at zero on both server and client and only advances
 * after mount, so there is no hydration mismatch and no need for a date on the
 * server. Under reduced motion it simply doesn't start.
 */

const STAGES = ["Booked", "Departed", "On water", "Cleared", "Delivered"] as const;
const CURRENT = 2; // "On water"

export function ShipmentStatus() {
  const [ping, setPing] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setPing((p) => (p + 1) % 60), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="border border-steel bg-graphite">
      {/* Record header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-steel px-4 py-3 sm:px-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper">
          BKG / TS-2419-CN
        </span>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint tabular">
            ping {String(ping).padStart(2, "0")}s
          </span>
          <Stamp tone="signal" rotate={0} live>
            In transit
          </Stamp>
        </div>
      </div>

      {/* Stage rail */}
      <div className="px-4 pt-5 sm:px-5" aria-label="Shipment progress">
        <ol className="flex gap-1.5">
          {STAGES.map((s, i) => (
            <li key={s} className="flex-1">
              <span
                className={cn(
                  "block h-1.5",
                  i < CURRENT && "bg-signal",
                  i === CURRENT && "bg-signal/60",
                  i > CURRENT && "bg-steel"
                )}
              />
              <span
                className={cn(
                  "mt-2 block font-mono text-[9px] uppercase leading-tight tracking-[0.1em] sm:text-[10px]",
                  i <= CURRENT ? "text-mist" : "text-steel-hi"
                )}
              >
                {s}
              </span>
            </li>
          ))}
        </ol>
        <p className="sr-only">
          Currently at stage {CURRENT + 1} of {STAGES.length}: {STAGES[CURRENT]}.
        </p>
      </div>

      {/* Record body */}
      <div className="mt-5 grid grid-cols-2 gap-px border-t border-steel bg-steel sm:grid-cols-3 [&>*]:bg-graphite">
        <Field box="01" label="Vessel">
          EVER FORWARD
        </Field>
        <Field box="02" label="Voyage">
          084E
        </Field>
        <Field box="03" label="Lane">
          NGB → LAX
        </Field>
        <Field box="04" label="Load">
          1 × 40HQ · 412 ctn
        </Field>
        <Field box="05" label="HS code">
          6109.10.00
        </Field>
        <Field box="06" label="ETA 3PL" emphasis>
          14 DAYS
        </Field>
      </div>

      <p className="border-t border-steel px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-steel-hi sm:px-5">
        ◆ {home.status.disclaimer}
      </p>
    </div>
  );
}
