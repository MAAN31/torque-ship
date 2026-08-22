/* ============================================================================
   LANDED COST ESTIMATOR — pure calculation layer
   ----------------------------------------------------------------------------
   No React in this file. The UI renders whatever `estimate()` returns, so the
   numbers can be tuned, unit-tested, or swapped for a live rate API without
   touching a component.

   >>> ALL RATES BELOW ARE ILLUSTRATIVE PLACEHOLDERS <<<
   They are in a plausible 2026 band for Asia→US so the tool feels honest, but
   they are not a quote and the UI says so. Replace `LANE`, `FREIGHT` and
   `FEES` with real desk numbers before launch.

   Deliberate scope decision: this returns FREIGHT + CLEARANCE + DELIVERY only
   — a DDU-style figure (delivered, duty unpaid). Duty and tariffs are not
   quoted anywhere in this tool: they need a declared commercial value the
   brief's four-question input set doesn't collect, and the buyer's broker is
   the right party to price them, not an invented cargo value here.
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

/* -------------------------------------------------------------- rate tables */

type Range = [low: number, high: number];

/** Billable volume used for LCL maths / air volumetric weight. */
const CBM: Record<VolumeId, number> = {
  "lcl-s": 3,
  "lcl-l": 12,
  fcl20: 28,
  fcl40: 58,
};

const IS_FCL: Record<VolumeId, boolean> = {
  "lcl-s": false,
  "lcl-l": false,
  fcl20: true,
  fcl40: true,
};

/** Lane cost factor and added transit days, relative to China baseline. */
const LANE: Record<OriginId, { factor: number; addDays: number }> = {
  CN: { factor: 1.0, addDays: 0 },
  VN: { factor: 1.06, addDays: 3 },
  IN: { factor: 1.18, addDays: 6 },
  ID: { factor: 1.12, addDays: 4 },
  OTHER: { factor: 1.15, addDays: 5 },
};

const FREIGHT = {
  /** Ocean LCL, USD per CBM, China baseline. */
  lclPerCbm: [90, 135] as Range,
  /** Ocean FCL, USD flat, China baseline. */
  fcl20: [2400, 3600] as Range,
  fcl40: [3200, 4800] as Range,
  /** Air, USD per chargeable kg, China baseline. */
  airPerKg: [4.2, 6.6] as Range,
  /** IATA volumetric factor: 1 CBM ≈ 167 kg chargeable. */
  kgPerCbm: 167,
};

/** Multiplier applied to the main leg for expedited ocean service. */
const EXPEDITE_FACTOR = 1.22;

const FEES = {
  originLcl: [180, 320] as Range,
  originFcl: [450, 700] as Range,
  /** Entry filing + ISF + single-entry bond. */
  clearance: [225, 385] as Range,
  deliveryLcl: [140, 260] as Range,
  delivery20: [550, 900] as Range,
  delivery40: [650, 1100] as Range,
};

/** Ocean transit, port pair to 3PL door, China baseline. */
const TRANSIT: Record<UrgencyId, Range> = {
  standard: [32, 42],
  expedited: [24, 30],
  air: [6, 9],
};

/* ------------------------------------------------------------------ output */

export type LineItem = {
  label: string;
  /** Mono note under the label. */
  note: string;
  low: number;
  high: number;
};

export type Estimate = {
  lines: LineItem[];
  totalLow: number;
  totalHigh: number;
  transitLow: number;
  transitHigh: number;
  mode: string;
  /** Non-empty when the chosen combination deserves a blunt warning. */
  flags: string[];
};

const scale = (r: Range, f: number): Range => [r[0] * f, r[1] * f];
const add = (a: Range, b: Range): Range => [a[0] + b[0], a[1] + b[1]];

/** Round to the nearest $25 — false precision reads as a lie. */
const round25 = (n: number) => Math.round(n / 25) * 25;

export function estimate(input: EstimatorInput): Estimate {
  const { origin, volume, urgency } = input;
  const lane = LANE[origin];
  const cbm = CBM[volume];
  const fcl = IS_FCL[volume];
  const flags: string[] = [];

  /* --- main leg -------------------------------------------------------- */
  let mainLeg: Range;
  let mainNote: string;
  let mode: string;

  if (urgency === "air") {
    const kg = cbm * FREIGHT.kgPerCbm;
    mainLeg = scale(FREIGHT.airPerKg, kg * lane.factor);
    mainNote = `${kg.toLocaleString()} kg chargeable · volumetric`;
    mode = "AIR";
    if (fcl) {
      flags.push(
        "Air freight at container volume is rarely the right call — this number is real, and it is why I would talk you out of it. Ask me about a partial air split instead."
      );
    }
  } else {
    const base: Range = fcl
      ? volume === "fcl20"
        ? FREIGHT.fcl20
        : FREIGHT.fcl40
      : scale(FREIGHT.lclPerCbm, cbm);
    const urgencyFactor = urgency === "expedited" ? EXPEDITE_FACTOR : 1;
    mainLeg = scale(base, lane.factor * urgencyFactor);
    mainNote = fcl
      ? `${volume === "fcl20" ? "20ft" : "40ft"} · port to port`
      : `${cbm} CBM billable · port to port`;
    mode = fcl ? "FCL" : "LCL";
  }

  /* --- fixed legs ------------------------------------------------------ */
  const originFees = fcl ? FEES.originFcl : FEES.originLcl;
  const delivery = fcl
    ? volume === "fcl20"
      ? FEES.delivery20
      : FEES.delivery40
    : FEES.deliveryLcl;

  const lines: LineItem[] = [
    {
      label: urgency === "air" ? "Air freight" : "Ocean freight",
      note: mainNote,
      low: round25(mainLeg[0]),
      high: round25(mainLeg[1]),
    },
    {
      label: "Origin handling & export clearance",
      note: "Pickup, docs, VGM, terminal",
      low: round25(originFees[0] * lane.factor),
      high: round25(originFees[1] * lane.factor),
    },
    {
      label: "US customs entry",
      note: "Entry filing, ISF 10+2, single-entry bond",
      low: round25(FEES.clearance[0]),
      high: round25(FEES.clearance[1]),
    },
    {
      label: "Delivery to your 3PL",
      note: fcl ? "Drayage, unload, container return" : "Deconsolidation, LTL to door",
      low: round25(delivery[0]),
      high: round25(delivery[1]),
    },
  ];

  const total = lines.reduce<Range>((acc, l) => add(acc, [l.low, l.high]), [0, 0]);

  /* --- transit --------------------------------------------------------- */
  const t = TRANSIT[urgency];
  const transitLow = t[0] + lane.addDays;
  const transitHigh = t[1] + lane.addDays;

  /* --- contextual bluntness ------------------------------------------- */
  if (!fcl && cbm >= 12 && urgency !== "air") {
    flags.push(
      "At 12+ CBM you are close to the point where a 20ft container is cheaper per unit than LCL. Worth a two-minute conversation before you book."
    );
  }

  return {
    lines,
    totalLow: total[0],
    totalHigh: total[1],
    transitLow,
    transitHigh,
    mode,
    flags,
  };
}

export const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

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
