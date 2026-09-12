import { home } from "@/lib/content";
import { Card } from "@/components/system/Card";

/**
 * The three value props, as a strip of manifest boxes.
 * Uses CSS animations for entrance effects - no client-side JavaScript needed.
 */
export function ValueProps() {
  return (
    <ul className="grid grid-cols-1 gap-px bg-steel md:grid-cols-3">
      {home.valueProps.map((v, i) => (
        <li 
          key={v.box} 
          className="bg-ink animate-fade-in-up"
          style={{ 
            opacity: 0,
            animationDelay: `${i * 90}ms`,
            animationFillMode: 'forwards'
          }}
        >
          <Card interactive bordered={false} className="h-full p-6 sm:p-8">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[11px] tracking-[0.2em] text-signal tabular">
                {v.box}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                {v.kicker}
              </span>
            </div>

            <h3 className="mt-6 font-display text-[clamp(1.35rem,3.2vw,1.75rem)] font-bold leading-[1.1] tracking-[-0.025em] text-paper text-balance">
              {v.title}
            </h3>

            <p className="mt-4 text-[15px] leading-relaxed text-mist">{v.body}</p>
          </Card>
        </li>
      ))}
    </ul>
  );
}
