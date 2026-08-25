"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle, ArrowLeft, ArrowRight, Calendar, Check, Loader2 } from "lucide-react";
import {
  CARGOS,
  ORIGINS,
  URGENCIES,
  VOLUMES,
  describe,
  type CargoId,
  type Option,
  type OriginId,
  type UrgencyId,
  type VolumeId,
} from "@/lib/estimator";
import { contact, web3formsKey } from "@/lib/content";
import { Button } from "@/components/system/Button";
import { Stamp } from "@/components/system/Stamp";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */

type Answers = {
  origin?: OriginId;
  cargo?: CargoId;
  volume?: VolumeId;
  urgency?: UrgencyId;
};

type StepKey = keyof Answers;

type Step = {
  key: StepKey;
  box: string;
  question: string;
  helper: string;
  options: Option<string>[];
};

const STEPS: Step[] = [
  {
    key: "origin",
    box: "01",
    question: "Where does it ship from?",
    helper: "Country of origin. Close enough is fine — I'll pin the port later.",
    options: ORIGINS,
  },
  {
    key: "cargo",
    box: "02",
    question: "What are you shipping?",
    helper: "Pick the nearest category — helps me flag customs quirks before you book.",
    options: CARGOS,
  },
  {
    key: "volume",
    box: "03",
    question: "Roughly how much of it?",
    helper: "If you're not sure, guess high. Under-declaring volume is the expensive mistake.",
    options: VOLUMES,
  },
  {
    key: "urgency",
    box: "04",
    question: "When do you need it landed?",
    helper: "Honest answer gets an honest number.",
    options: URGENCIES,
  },
];

const RESULT = STEPS.length;

/* -------------------------------------------------------------------------- */

/**
 * THE PRIMARY CONVERSION PATH.
 *
 * This replaces the contact form entirely. Deliberate decisions:
 *
 * - The email ask comes last, not first. All four questions are answered and
 *   the summary is visible before an email is ever requested — it's needed to
 *   send the request, not to unlock the answer, which is the distinction that
 *   keeps this from being the usual "give us your email to see the number"
 *   pattern this tool otherwise avoids.
 * - No computed number. An earlier version priced the shipment from
 *   placeholder rate tables; the figures didn't track real desk rates
 *   closely enough to show with a straight face, so this hands the four
 *   answers to a person instead of a formula. See lib/estimator.ts.
 * - Submits directly (Web3Forms), no mailto handoff. A visitor without a
 *   configured email client would otherwise hit a dead click.
 * - Selecting an option advances the step. No "Next" button, because a Next
 *   button on a single-select question is a guaranteed extra tap, four times.
 * - Native radio inputs under the hood, visually hidden. Arrow-key navigation,
 *   group semantics and label association come free and correct; a div-based
 *   custom control would have to reimplement all three and usually gets it wrong.
 * - Answers stay editable from the result screen, same as before.
 * - Fixed min-height on the option area, so stepping never shifts layout.
 */
export function QuoteEstimator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const reduced = useReducedMotion();

  const complete =
    !!answers.origin && !!answers.cargo && !!answers.volume && !!answers.urgency;

  function select(key: StepKey, id: string, index: number) {
    // Written out per key rather than `{ ...answers, [key]: id }`. A computed
    // key over a union of literals widens the result to a string index
    // signature, which then needs a cast back to Answers that TS can't verify.
    // The narrowing here is sound: `id` always comes from that step's own
    // option list, so it is always a member of that key's union.
    const next: Answers = { ...answers };
    if (key === "origin") next.origin = id as OriginId;
    else if (key === "cargo") next.cargo = id as CargoId;
    else if (key === "volume") next.volume = id as VolumeId;
    else next.urgency = id as UrgencyId;

    setAnswers(next);

    const filled =
      !!next.origin && !!next.cargo && !!next.volume && !!next.urgency;

    // If every answer is already in, a change means "recalculate", not "restart".
    setStep(filled ? RESULT : index + 1);
  }

  const current = STEPS[step];

  return (
    <div className="border border-steel bg-graphite">
      <Header step={step} answers={answers} onJump={setStep} />

      <div className="p-5 sm:p-8">
        {step < RESULT && current ? (
          <motion.div
            key={step}
            initial={reduced ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <QuestionStep
              step={current}
              index={step}
              value={answers[current.key]}
              onSelect={select}
            />
          </motion.div>
        ) : complete ? (
          <Result
            answers={answers}
            onEdit={(i) => setStep(i)}
            onReset={() => {
              setAnswers({});
              setStep(0);
            }}
          />
        ) : null}
      </div>

      <Controls step={step} onBack={() => setStep((s) => Math.max(0, s - 1))} />
    </div>
  );
}

/* ------------------------------------------------------------------ header */

function Header({
  step,
  answers,
  onJump,
}: {
  step: number;
  answers: Answers;
  onJump: (i: number) => void;
}) {
  const done = step === RESULT;

  return (
    <div className="border-b border-steel">
      <div className="flex items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          {done ? "Request" : `Step ${step + 1} of ${STEPS.length}`}
        </span>

        {done ? (
          <Stamp tone="signal" rotate={0} live>
            Logged
          </Stamp>
        ) : (
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
            No email required
          </span>
        )}
      </div>

      {/* Segmented progress. Completed segments are jump targets. */}
      <div className="grid grid-cols-4 gap-px bg-steel">
        {STEPS.map((s, i) => {
          const filled = !!answers[s.key];
          const active = i === step;
          const label = `Step ${i + 1}: ${s.question}`;

          return (
            <button
              key={s.key}
              type="button"
              onClick={() => onJump(i)}
              disabled={!filled && i > step}
              aria-label={label}
              aria-current={active ? "step" : undefined}
              className={cn(
                "group flex items-center gap-2 bg-graphite px-3 py-2.5 text-left transition-colors",
                filled || i <= step ? "hover:bg-panel" : "cursor-default opacity-40"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "h-1 flex-1 transition-colors duration-300",
                  active ? "bg-signal" : filled ? "bg-signal/40" : "bg-steel-hi"
                )}
              />
              <span
                className={cn(
                  "hidden font-mono text-[10px] tracking-[0.16em] sm:inline",
                  active ? "text-signal" : filled ? "text-mist" : "text-steel-hi"
                )}
              >
                {s.box}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- step */

function QuestionStep({
  step,
  index,
  value,
  onSelect,
}: {
  step: Step;
  index: number;
  value?: string;
  onSelect: (key: StepKey, id: string, index: number) => void;
}) {
  return (
    <fieldset className="min-h-[382px]">
      <legend className="font-display text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-paper text-balance">
        {step.question}
      </legend>

      <p className="mt-3 max-w-[46ch] text-[14px] leading-relaxed text-mist">{step.helper}</p>

      <div className="mt-6 flex flex-col gap-px bg-steel">
        {step.options.map((o) => {
          const id = `${step.key}-${o.id}`;
          const checked = value === o.id;

          return (
            <div key={o.id} className="relative">
              <input
                type="radio"
                id={id}
                name={step.key}
                value={o.id}
                checked={checked}
                onChange={() => onSelect(step.key, o.id, index)}
                className="peer sr-only"
              />
              <label
                htmlFor={id}
                className={cn(
                  // 60px min height — comfortably above the 44px touch target floor.
                  "flex min-h-[60px] cursor-pointer select-none items-center justify-between gap-4 bg-graphite px-4 py-3",
                  "transition-colors duration-150 hover:bg-panel",
                  "peer-checked:bg-signal-wash",
                  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[-2px] peer-focus-visible:outline-signal"
                )}
              >
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block text-[15px] font-medium leading-snug sm:text-[16px]",
                      checked ? "text-signal" : "text-paper"
                    )}
                  >
                    {o.label}
                  </span>
                  <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                    {o.detail}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center border transition-colors",
                    checked ? "border-signal bg-signal text-ink" : "border-steel-hi text-transparent"
                  )}
                >
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ------------------------------------------------------------------ result */

type SubmitStatus = "idle" | "sending" | "sent" | "error";

function Result({
  answers,
  onEdit,
  onReset,
}: {
  answers: Answers;
  onEdit: (i: number) => void;
  onReset: () => void;
}) {
  const spec = describe({
    origin: answers.origin!,
    cargo: answers.cargo!,
    volume: answers.volume!,
    urgency: answers.urgency!,
  });

  const [email, setEmail] = useState("");
  const [botcheck, setBotcheck] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const mailtoFallback = `mailto:${contact.email}?subject=${encodeURIComponent(
    `Rate request — ${spec}`
  )}&body=${encodeURIComponent(
    [
      "Hi — I filled out the rate request tool and I'm looking for a real number.",
      "",
      `Shipment:  ${spec}`,
      "",
      "Cargo value / target landing date:",
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
          subject: `Rate request — ${spec}`,
          from_name: "Torque Ship rate request",
          email,
          shipment: spec,
          origin: answers.origin,
          cargo: answers.cargo,
          volume: answers.volume,
          urgency: answers.urgency,
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
      <div aria-live="polite">
        <Stamp tone="signal" rotate={-3} live>
          Request sent
        </Stamp>
        <p className="mt-5 font-display text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-paper text-balance">
          Got it. I&apos;ll reply to {email}.
        </p>
        <p className="mt-3 max-w-[52ch] text-[14px] leading-relaxed text-mist">
          {spec}
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
    <form onSubmit={handleSubmit}>
      {/* Answer chips — every input stays one tap from editable. */}
      <div className="flex flex-wrap gap-2">
        {STEPS.map((s, i) => {
          const val = s.options.find((o) => o.id === answers[s.key])?.label;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => onEdit(i)}
              className="group inline-flex items-center gap-2 border border-steel px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-mist transition-colors hover:border-signal hover:text-signal"
            >
              {val}
              <span aria-hidden="true" className="text-steel-hi group-hover:text-signal">
                edit
              </span>
              <span className="sr-only">— change answer for: {s.question}</span>
            </button>
          );
        })}
      </div>

      {/* No computed number — a person, not a formula, prices this. */}
      <div className="mt-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          What you&apos;re shipping
        </p>

        <p className="mt-3 font-display text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-paper text-balance">
          {spec}
        </p>

        <p className="mt-4 max-w-[52ch] text-[14px] leading-relaxed text-mist">
          I don&apos;t publish a number I haven&apos;t checked against a real rate sheet. Send
          this over and you&apos;ll have an actual quote back from me directly.
        </p>
      </div>

      <div className="mt-6">
        <label
          htmlFor="quote-email"
          className="block font-mono text-[11px] uppercase tracking-[0.2em] text-faint"
        >
          Where should I send it?
        </label>
        <input
          id="quote-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="mt-2 w-full border border-steel bg-graphite px-4 py-3 font-mono text-[14px] text-paper placeholder:text-steel-hi focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-signal"
        />
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
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
          {contact.responseWindow}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
        <div role="alert" className="mt-5 flex gap-2.5 border-l-2 border-flag bg-flag/10 p-3">
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

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-steel pt-4">
        <p className="max-w-[52ch] font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-steel-hi">
          No instant number — real rates come from a real rate sheet, not a guess.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-mist underline-offset-4 transition-colors hover:text-signal hover:underline"
        >
          Start over
        </button>
      </div>
    </form>
  );
}

/* ---------------------------------------------------------------- controls */

function Controls({ step, onBack }: { step: number; onBack: () => void }) {
  if (step === 0) return null;

  return (
    <div className="border-t border-steel px-5 py-3.5 sm:px-8">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-mist transition-colors hover:text-signal"
      >
        <ArrowLeft aria-hidden="true" className="size-3.5" />
        Back
      </button>
    </div>
  );
}
