import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { home } from "@/lib/content";
import { Card } from "@/components/system/Card";

/**
 * Homepage services overview — shows the 6 core services TorqueShip provides
 * with links to relevant sections on the Services page.
 */
export function Services() {
  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {home.services.items.map((service) => (
          <Link
            key={service.name}
            href={service.href}
            className="group block"
          >
            <Card className="h-full p-7 transition-colors hover:border-signal/40 sm:p-8">
              <h3 className="font-display text-xl font-bold leading-tight tracking-[-0.02em] text-paper transition-colors group-hover:text-signal">
                {service.name}
                <ArrowUpRight
                  aria-hidden="true"
                  className="ml-2 inline-block size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-mist">
                {service.description}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
