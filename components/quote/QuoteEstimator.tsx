"use client";

import { useId, useState, type ReactNode } from "react";
import { AlertCircle, ArrowRight, Calendar, Loader2 } from "lucide-react";
import { contact, web3formsKey } from "@/lib/content";
import { Button } from "@/components/system/Button";
import { Stamp } from "@/components/system/Stamp";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */

type PalletType = "palletized" | "floor-loaded";
type ShipMode = "air" | "sea" | "split";
type Incoterm = "ddu" | "ddp" | "fob";

type FormState = {
  address: string;
  packageCount: string;
  dimensions: string;
  grossWeight: string;
  palletType: PalletType | "";
  htsCode: string;
  cargoValue: string;
  productDescription: string;
  shipMode: ShipMode | "";
  incoterm: Incoterm | "";
  targetDate: string;
  email: string;
};

const EMPTY_FORM: FormState = {
  address: "",
  packageCount: "",
  dimensions: "",
  grossWeight: "",
  palletType: "",
  htsCode: "",
  cargoValue: "",
  productDescription: "",
  shipMode: "",
  incoterm: "",
  targetDate: "",
  email: "",
};

const PALLET_OPTIONS: { id: PalletType; label: string }[] = [
  { id: "palletized", label: "Palletized" },
  { id: "floor-loaded", label: "Floor-loaded / loose cartons" },
];

const SHIP_MODE_OPTIONS: { id: ShipMode; label: string }[] = [
  { id: "air", label: "Air" },
  { id: "sea", label: "Sea" },
  { id: "split", label: "Split" },
];

const INCOTERM_OPTIONS: { id: Incoterm; label: string }[] = [
  { id: "ddu", label: "DDU" },
  { id: "ddp", label: "DDP" },
  { id: "fob", label: "FOB" },
];

/* -------------------------------------------------------------------------- */

type SubmitStatus = "idle" | "sending" | "sent" | "error";

/**
 * THE PRIMARY CONVERSION PATH.
 *
 * Replaces the contact form entirely. Deliberate decisions:
 *
 * - Everything is optional except email. A visitor who doesn't have a cargo
 *   value or an HTS code on hand yet shouldn't be blocked from reaching out —
 *   the point is to collect as much real detail as they happen to have, not
 *   to gate on completeness.
 * - One flat form, not a step wizard. The old version stepped through four
 *   single-select questions that auto-advanced on click; that pattern doesn't
 *   fit a page of mostly free-text fields, where you want to see and revise
 *   several answers at once rather than one at a time.
 * - No computed number. This hands whatever detail is provided straight to a
 *   person, not a formula — see git history for why an earlier version's
 *   invented rate tables got dropped.
 * - Submits directly (Web3Forms), no mailto handoff, with a mailto fallback
 *   only if the request actually fails to send.
 */
export function QuoteEstimator() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [botcheck, setBotcheck] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const filledLines = [
    form.address && `Pickup/delivery address: ${form.address}`,
    form.packageCount && `Pallets/cartons: ${form.packageCount}`,
    form.dimensions && `Pallet dimensions (L×W×H): ${form.dimensions}`,
    form.grossWeight && `Gross weight per pallet: ${form.grossWeight}`,
    form.palletType &&
      `Loading: ${PALLET_OPTIONS.find((o) => o.id === form.palletType)?.label}`,
    form.htsCode && `HTS/tariff code: ${form.htsCode}`,
    form.cargoValue && `Total cargo value: ${form.cargoValue}`,
    form.productDescription && `Product: ${form.productDescription}`,
    form.shipMode && `Mode: ${SHIP_MODE_OPTIONS.find((o) => o.id === form.shipMode)?.label}`,
    form.incoterm && `Incoterm: ${form.incoterm.toUpperCase()}`,
    form.targetDate && `Target date / urgency: ${form.targetDate}`,
  ].filter(Boolean);

  const mailtoFallback = `mailto:${contact.email}?subject=${encodeURIComponent(
    "Rate request"
  )}&body=${encodeURIComponent(
    [
      "Hi — I filled out the rate request form and I'm looking for a real number.",
      "",
      ...(filledLines.length ? filledLines : ["(No details filled in yet.)"]),
      "",
    ].join("\n")
  )}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: "New rate request",
          from_name: "Torque Ship rate request",
          email: form.email,
          "Pickup/delivery address": form.address,
          "Pallets or cartons": form.packageCount,
          "Pallet dimensions (L×W×H)": form.dimensions,
          "Gross weight per pallet": form.grossWeight,
          "Palletized or floor-loaded": form.palletType,
          "HTS/tariff code": form.htsCode,
          "Total cargo value": form.cargoValue,
          "Product description": form.productDescription,
          "Shipping mode": form.shipMode,
          Incoterm: form.incoterm,
          "Target delivery date / urgency": form.targetDate,
          botcheck,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div aria-live="polite" className="border border-steel bg-graphite p-5 sm:p-8">
        <Stamp tone="signal" rotate={-3} live>
          Request sent
        </Stamp>
        <p className="mt-5 font-display text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-paper text-balance">
          Got it. I&apos;ll reply to {form.email}.
        </p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
          {contact.responseWindow}
        </p>
        <div className="mt-8">
          <Button
            href={contact.calendly}
            variant="ghost"
            size="lg"
            trailing={<Calendar aria-hidden="true" className="size-4" />}
          >
            Or book 15 minutes now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 border border-steel bg-graphite p-5 sm:p-8"
    >
      <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-faint">
        Fill in what you know — nothing here is required except your email.
      </p>

      <FieldGroup title="Shipment basics">
        <TextField
          label="Pickup / delivery address"
          hint="City, province, and a contact name/phone at the factory"
          value={form.address}
          onChange={(v) => set("address", v)}
          multiline
        />
        <FieldRow>
          <TextField
            label="Number of pallets or cartons"
            value={form.packageCount}
            onChange={(v) => set("packageCount", v)}
          />
          <TextField
            label="Pallet dimensions (L × W × H)"
            value={form.dimensions}
            onChange={(v) => set("dimensions", v)}
            placeholder="e.g. 120 × 100 × 150 cm"
          />
        </FieldRow>
        <TextField
          label="Gross weight per pallet"
          value={form.grossWeight}
          onChange={(v) => set("grossWeight", v)}
          placeholder="e.g. 450 kg"
        />
        <ChoiceField
          name="palletType"
          label="Palletized, or floor-loaded / non-palletized cartons?"
          options={PALLET_OPTIONS}
          value={form.palletType}
          onChange={(v) => set("palletType", v)}
        />
      </FieldGroup>

      <FieldGroup title="Product details">
        <FieldRow>
          <TextField
            label="HTS / tariff code"
            value={form.htsCode}
            onChange={(v) => set("htsCode", v)}
          />
          <TextField
            label="Total cargo value"
            value={form.cargoValue}
            onChange={(v) => set("cargoValue", v)}
            placeholder="e.g. $8,500"
          />
        </FieldRow>
        <TextField
          label="What is it?"
          value={form.productDescription}
          onChange={(v) => set("productDescription", v)}
          multiline
        />
      </FieldGroup>

      <FieldGroup title="Shipping preferences">
        <ChoiceField
          name="shipMode"
          label="Air, sea, or split shipment?"
          options={SHIP_MODE_OPTIONS}
          value={form.shipMode}
          onChange={(v) => set("shipMode", v)}
        />
        <ChoiceField
          name="incoterm"
          label="DDU, DDP, or FOB?"
          options={INCOTERM_OPTIONS}
          value={form.incoterm}
          onChange={(v) => set("incoterm", v)}
        />
        <TextField
          label="Target delivery date or urgency"
          value={form.targetDate}
          onChange={(v) => set("targetDate", v)}
          placeholder="e.g. Oct 15, or ASAP"
        />
      </FieldGroup>

      <FieldGroup title="Where should I send this?">
        <TextField
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(v) => set("email", v)}
          placeholder="you@company.com"
        />
      </FieldGroup>

      {/* Honeypot — hidden from sighted and screen-reader users, bots check it anyway. */}
      <input
        type="checkbox"
        name="botcheck"
        checked={botcheck}
        onChange={(e) => setBotcheck(e.target.checked)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto"
          disabled={status === "sending"}
          trailing={
            status === "sending" ? (
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            ) : (
              <ArrowRight aria-hidden="true" className="size-4" />
            )
          }
        >
          {status === "sending" ? "Sending…" : "Send my rate request"}
        </Button>

        <Button
          href={contact.calendly}
          variant="ghost"
          size="lg"
          className="w-full sm:w-auto"
          trailing={<Calendar aria-hidden="true" className="size-4" />}
        >
          Book 15 minutes
        </Button>
      </div>

      {status === "error" ? (
        <div role="alert" className="flex gap-2.5 border-l-2 border-flag bg-flag/10 p-3">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-flag" />
          <p className="text-[12px] leading-relaxed text-mist">
            <span className="font-semibold text-paper">That didn&apos;t send.</span>{" "}
            Try again, or{" "}
            <a href={mailtoFallback} className="text-signal underline-offset-4 hover:underline">
              email me directly
            </a>
            .
          </p>
        </div>
      ) : null}

      <p className="border-t border-steel pt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-steel-hi">
        No instant number — real rates come from a real rate sheet, not a guess.
      </p>
    </form>
  );
}

/* --------------------------------------------------------------- fields --- */

function FieldGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-5 border-t border-steel pt-6 first:border-t-0 first:pt-0">
      <legend className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

/** Lays two fields side by side on wide screens, stacked on narrow ones. */
function FieldRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-5 sm:flex-row">{children}</div>;
}

function TextField({
  label,
  hint,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  multiline = false,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
}) {
  const id = useId();
  const inputClasses =
    "mt-2 w-full border border-steel bg-ink px-4 py-3 font-mono text-[14px] text-paper placeholder:text-steel-hi focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-signal";

  return (
    <div className="min-w-0 flex-1">
      <label htmlFor={id} className="block font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
        {label}
        {required ? <span className="ml-1 text-signal">*</span> : null}
      </label>
      {hint ? <p className="mt-1 text-[12px] leading-snug text-mist">{hint}</p> : null}
      {multiline ? (
        <textarea
          id={id}
          name={id}
          required={required}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(inputClasses, "resize-none")}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          autoComplete={type === "email" ? "email" : "off"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
    </div>
  );
}

function ChoiceField<T extends string>({
  name,
  label,
  options,
  value,
  onChange,
}: {
  name: string;
  label: string;
  options: { id: T; label: string }[];
  value: T | "";
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
        {label}
      </span>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => {
          const id = `${name}-${o.id}`;
          const checked = value === o.id;
          return (
            <div key={o.id}>
              <input
                type="radio"
                id={id}
                name={name}
                value={o.id}
                checked={checked}
                onChange={() => onChange(o.id)}
                className="peer sr-only"
              />
              <label
                htmlFor={id}
                className={cn(
                  "flex min-h-[44px] cursor-pointer select-none items-center border px-4 font-mono text-[13px] uppercase tracking-[0.08em] transition-colors",
                  checked
                    ? "border-signal bg-signal-wash text-signal"
                    : "border-steel text-mist hover:border-steel-hi hover:text-paper",
                  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal"
                )}
              >
                {o.label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
