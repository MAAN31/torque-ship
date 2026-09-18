import { home } from "@/lib/content";
import { Field, FieldRow } from "@/components/system/Field";

/**
 * Global Reach section — emphasizes TorqueShip's worldwide capability.
 * FieldRow supports up to 4 cols; we render a 3+2 layout across two rows.
 */
export function GlobalReach() {
  const { capabilities } = home.globalReach;

  return (
    <div className="mt-10 flex flex-col gap-px">
      {/* First row — 3 capabilities */}
      <FieldRow cols={3}>
        {capabilities.slice(0, 3).map((cap, i) => (
          <Field key={cap.label} box={String(i + 1).padStart(2, "0")} label={cap.label}>
            {cap.detail}
          </Field>
        ))}
      </FieldRow>
      {/* Second row — remaining capabilities */}
      <FieldRow cols={2}>
        {capabilities.slice(3).map((cap, i) => (
          <Field key={cap.label} box={String(i + 4).padStart(2, "0")} label={cap.label}>
            {cap.detail}
          </Field>
        ))}
      </FieldRow>
    </div>
  );
}
