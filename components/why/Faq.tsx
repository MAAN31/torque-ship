import { why } from "@/lib/content";

/**
 * Native `<details>` disclosure — no JS, correct keyboard and AT semantics
 * for free, consistent with the rest of the site's native-control-first bar.
 */
export function Faq() {
  return (
    <div className="divide-y divide-steel border-y border-steel">
      {why.faq.items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[17px] font-semibold leading-snug text-paper marker:content-none sm:text-[19px]">
            {item.question}
            <span
              aria-hidden="true"
              className="shrink-0 font-mono text-xl leading-none text-signal transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-[65ch] text-[15px] leading-relaxed text-mist">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
