/* ============================================================================
   RATE REQUEST — the four-question catalogue
   ----------------------------------------------------------------------------
   No calculation lives here. Earlier versions of this tool computed a dollar
   range from invented placeholder rate tables — the numbers didn't track
   reality closely enough to show with confidence, so the tool now collects
   the same four answers and hands them to a person instead of a formula.
   Real rates come from a real rate sheet, not a guess.
============================================================================ */

/* ------------------------------------------------------------------ inputs */

export type OriginId = "CN" | "VN" | "IN" | "ID" | "OTHER";
export type CargoId = "apparel" | "electronics" | "home" | "beauty" | "furniture";
export type VolumeId = "lcl-s" | "lcl-l" | "fcl20" | "fcl40";
export type UrgencyId = "standard" | "expedited" | "air";

export type EstimatorInput = {
  origin: OriginId;
  cargo: CargoId;
  volume: VolumeId;
  urgency: UrgencyId;
};

export type Option<T extends string> = {
  id: T;
  label: string;
  /** Mono sub-label — the technical detail that makes the choice obvious. */
  detail: string;
};

export const ORIGINS: Option<OriginId>[] = [
  { id: "CN", label: "China", detail: "SHA · NGB · YTN · SZX" },
  { id: "VN", label: "Vietnam", detail: "HPH · SGN · DAD" },
  { id: "IN", label: "India", detail: "NSA · MAA · MUN" },
  { id: "ID", label: "Indonesia", detail: "JKT · SUB" },
  { id: "OTHER", label: "Elsewhere in Asia", detail: "THA · KHM · BGD · KOR" },
];

export const CARGOS: Option<CargoId>[] = [
  { id: "apparel", label: "Apparel & textiles", detail: "HS 61 / 62" },
  { id: "electronics", label: "Electronics & accessories", detail: "HS 85" },
  { id: "home", label: "Home & kitchen", detail: "HS 39 / 73 / 69" },
  { id: "beauty", label: "Beauty & personal care", detail: "HS 33" },
  { id: "furniture", label: "Furniture & bulky goods", detail: "HS 94" },
];

export const VOLUMES: Option<VolumeId>[] = [
  { id: "lcl-s", label: "A few pallets", detail: "1–3 CBM · LCL" },
  { id: "lcl-l", label: "Part container", detail: "4–15 CBM · LCL" },
  { id: "fcl20", label: "Full 20ft container", detail: "~28 CBM · FCL" },
  { id: "fcl40", label: "Full 40ft container", detail: "~58 CBM · FCL" },
];

export const URGENCIES: Option<UrgencyId>[] = [
  { id: "standard", label: "Standard ocean", detail: "Cheapest. Plan around it." },
  { id: "expedited", label: "Expedited ocean", detail: "Premium service, faster port pairs." },
  { id: "air", label: "Air freight", detail: "You already missed the date." },
];

/** Human-readable summary of the four answers, for the CTA payload. */
export function describe(input: EstimatorInput): string {
  const f = <T extends string>(opts: Option<T>[], id: T) =>
    opts.find((o) => o.id === id)?.label ?? id;
  return [
    f(ORIGINS, input.origin),
    f(CARGOS, input.cargo),
    f(VOLUMES, input.volume),
    f(URGENCIES, input.urgency),
  ].join(" · ");
}
