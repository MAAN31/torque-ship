/* ============================================================================
   TORQUE SHIP — SINGLE SOURCE OF COPY
   ----------------------------------------------------------------------------
   Every headline, subhead, label and body string on the site is read from this
   file. No component hard-codes prose. To ship the real copy, replace the
   strings here and touch nothing else.

   >>> PLACEHOLDER POLICY <<<
   The copy deck referenced in the brief did not come through with the request,
   so every string below is WRITTEN-TO-VOICE PLACEHOLDER unless noted. Anything
   requiring a fact I cannot invent responsibly (volumes cleared, years in the
   trade, client names, testimonial, phone number, Calendly URL) is marked with
   the `PLACEHOLDER` token and is rendered on-screen in a visibly provisional
   style so it can never be mistaken for shipped copy.

   The five SERVICE CATEGORY NAMES are verbatim from the brief.
============================================================================ */

export const PLACEHOLDER = "PLACEHOLDER" as const;

/* ---------------------------------------------------------------- identity */

export const site = {
  name: "Torque Ship",
  /** Shown in the manifest header rule across every page. */
  docType: "FREIGHT FORWARDING / DECLARATION OF SERVICE",
  tagline: "Asia → US freight, run by one person.",
  description:
    "Torque Ship moves DTC and e-commerce inventory from Asian factories to US warehouses. One operator, direct line, landed cost before you commit.",
  url: "https://torqueship.com",
};

/**
 * Contact endpoints. Phone is real but not yet public — its UI is commented
 * out (not deleted) at each call site until there is a number to show.
 */
export const contact = {
  email: "Info@torqueship.com",
  phone: "+1 (555) 012-8840", // PLACEHOLDER — UI hidden until this is real
  phoneHref: "tel:+15550128840", // PLACEHOLDER — UI hidden until this is real
  calendly: "https://calendar.app.google/H1tfdN1s3jbNDYLM8",
  responseWindow: "Same business day, usually under 2 hours.",
};

/**
 * Web3Forms access key for the rate-request submission (components/quote/QuoteEstimator.tsx).
 * This is a public routing key, not a secret — Web3Forms' model expects it to
 * ship in client-side code, and delivery is restricted by the allowed-domains
 * setting on the key itself, not by hiding this value.
 */
export const web3formsKey = "d444bedd-1bdb-4250-b893-1e9ba9601258";

/* -------------------------------------------------------------------- nav */

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Why Me", href: "/why" },
];

export const primaryCta = {
  label: "Get a Rate Quote",
  href: "/why#estimator",
};

/* -------------------------------------------------------------------- home */

export const home = {
  hero: {
    /** Answers "what is this" in one line. Keep it short — it is set huge. */
    headline: ["Your freight,", "handled by the", "person who", "answers."],
    /**
     * Answers "who is it for" + "why care". Split so the lead clause — the
     * actual "what is this" claim — can be styled heavier than the rest.
     */
    subhead: {
      lead: "I move DTC inventory from Asian factories to US warehouses.",
      rest: "One operator, direct messages, landed cost on the table before you wire a deposit.",
    },
    /** Answers "who is it for" explicitly, as a manifest field. */
    consignee: "DTC & e-commerce brands importing from Asia",
    lane: "CN · VN · IN → US",
    secondaryCta: { label: "See what I actually do", href: "/services" },
  },

  /** THREE value props — the skimmable strip. Structure is fixed at 3. */
  valueProps: [
    {
      box: "01",
      kicker: "DIRECT LINE",
      title: "You text me. I answer.",
      body: "Not a ticket queue. Not an account manager who started last month. The person moving your freight is the person in your messages.",
    },
    {
      box: "02",
      kicker: "PRICED UP FRONT",
      title: "Landed cost before you commit.",
      body: "Freight, duty, clearance, delivery — real numbers, itemised. If a lane kills your margin, I say so before you pay the factory.",
    },
    {
      box: "03",
      kicker: "DATES YOU CAN PLAN ON",
      title: "Inventory dates, not vibes.",
      body: "You get an arrival window you can build a launch calendar around, and you hear from me the day it slips — not the week after you missed it.",
    },
  ],

  /** Scroll-drawn route. One timeline, sea and air merged into it. */
  route: {
    title: "Factory floor to your 3PL door.",
    body: "Five handoffs. Every one of them is where a big forwarder loses your container in a queue. I own all five.",
    stops: [
      { code: "ORG", label: "Factory", detail: "Pickup, inspection, cartonisation" },
      {
        code: "POL",
        label: "Port or airport of loading",
        detail: "Booking, VGM or AWB, export clearance",
      },
      {
        code: "SEA · AIR",
        label: "Ocean or air leg",
        detail: "Vessel or flight — tracked and chased daily",
      },
      {
        code: "POD",
        label: "Port or airport of discharge",
        detail: "Entry, duty, CBP release",
      },
      { code: "DST", label: "Your warehouse", detail: "Drayage, unload, ASN to your 3PL" },
    ],
  },

  /** Mock live widget. Illustrative data — clearly framed as a sample. */
  status: {
    title: "This is what you see, all the time.",
    body: "Every client gets the same record. No login, no portal, no chasing. It is a message with these fields in it.",
    disclaimer: "Illustrative record. Not live data.",
  },

  outro: {
    kicker: "NEXT ACTION",
    title: "Tell me what you're shipping.",
    body: "Four questions, no email gate, no call required. I reply with a real rate, same business day.",
  },
};

/* ---------------------------------------------------------------- services */

export const services = {
  intro: {
    title: "Freight forwarding services, done by one person.",
    subhead:
      "Five things. I do all of them myself, which is why there are five and not thirty.",
  },

  /** Category names VERBATIM from the brief. Body copy is placeholder. */
  categories: [
    {
      id: "sourcing-freight",
      box: "01",
      name: "Sourcing & Freight",
      summary: "Getting it booked, on the water, and moving on schedule.",
      body: "I book the space, negotiate the rate, and pick the lane that fits your margin and your launch date — not the one with the best kickback. FCL, LCL, and air when the calendar has already gone wrong.",
      items: [
        "Carrier booking and rate negotiation",
        "FCL, LCL and air freight",
        "Factory pickup and cartonisation review",
        "Consolidation across multiple suppliers",
        "Cargo insurance placement",
      ],
    },
    {
      id: "customs-compliance",
      box: "02",
      name: "Customs & Compliance",
      summary: "The part that seizes your container if it is done casually.",
      body: "HS classification that survives an audit, duty and tariff exposure calculated before you commit, and a customs broker relationship that picks up the phone. I keep you out of the exam line, and I get you out fast when you land in it.",
      items: [
        "HS code classification and duty exposure",
        "ISF / 10+2 filing inside the window",
        "Entry filing and CBP release",
        "FDA, CPSC and FCC touchpoints where they apply",
        "Section 301 and tariff-change monitoring",
      ],
    },
    {
      id: "documentation",
      box: "03",
      name: "Documentation",
      summary: "Paperwork correct the first time, because the second time costs money.",
      body: "Commercial invoice, packing list, bill of lading, certificate of origin. I check what the factory sends you before it becomes a demurrage bill, because a factory typing your invoice for you is how most first-time importers get burned.",
      items: [
        "Commercial invoice and packing list review",
        "Bill of lading issue and telex release",
        "Certificate of origin and free-trade paperwork",
        "Supplier document chasing (so you do not do it)",
        "Full document pack archived per shipment",
      ],
    },
    {
      id: "last-mile",
      box: "04",
      name: "Last-Mile",
      summary: "Port to pallet position, with your 3PL actually expecting it.",
      body: "Drayage booked against your warehouse's receiving window, not against whatever the trucker felt like. Your 3PL gets an ASN with real carton counts, so the receiving team is not opening a mystery container on a Friday.",
      items: [
        "Drayage and container return",
        "Transload and palletisation",
        "3PL appointment booking and ASN",
        "Amazon FBA / AWD routing and prep rules",
        "Overflow storage when receiving is backed up",
      ],
    },
    {
      id: "when-things-go-sideways",
      box: "05",
      name: "When Things Go Sideways",
      summary: "The category nobody advertises, and the only one that matters.",
      body: "Rolled bookings, customs exams, port strikes, a factory that shipped 40 cartons short. It happens on every lane eventually. You get told the same day, with the options and what each one costs — not a status page and an apology two weeks later.",
      items: [
        "Same-day exception notification",
        "Rolled booking recovery and re-routing",
        "Customs exam handling and cost containment",
        "Damage and shortage claims",
        "Contingency air-freight splits to protect a launch",
      ],
    },
  ],

  pricing: {
    title: "How I charge.",
    body: "Flat fee per shipment plus pass-through cost at cost. I show you the carrier invoice. There is no margin buried in your freight rate, which is the entire reason people leave their last forwarder.",
    points: [
      { term: "Per-shipment fee", value: "Flat, quoted up front" },
      { term: "Freight & duty", value: "Pass-through at cost, invoice shown" },
      { term: "Minimum commitment", value: "None. Ship one container." },
      { term: "Contract", value: "None. Leave whenever." },
    ],
    cta: { label: "Book a 15-minute call", href: contact.calendly },
  },
};

/* -------------------------------------------------------------------- why */

export const why = {
  intro: {
    title: "One-person freight forwarding. That is the pitch.",
    subhead:
      "Big forwarders sell you a platform and hand you a queue. Here is what you get instead, stated plainly enough that you can hold me to it.",
  },

  /** Trust points — skimmable, fixed structure. */
  trustPoints: [
    {
      box: "01",
      title: "You always know who is accountable.",
      body: "There is one name on every shipment and it does not change. No handoff between the sales rep who closed you and the ops team who resents you.",
    },
    {
      box: "02",
      title: "I show you the carrier invoice.",
      body: "Freight and duty pass through at cost. My fee is the fee. You can audit every shipment against the underlying documents.",
    },
    {
      box: "03",
      title: "I tell you the bad news first.",
      body: "Exceptions get reported the day I know, with the options and what each one costs. Nobody has ever been happy to find out late.",
    },
    {
      box: "04",
      title: "I say no to lanes that do not work.",
      body: "If the freight math kills your unit economics, I would rather tell you than book it and let you discover it at landing.",
    },
  ],

  testimonial: {
    box: "04",
    kicker: "CONSIGNEE STATEMENT",
    /** Rendered in an explicitly unfilled "awaiting signature" state. */
    placeholder: true,
    quote: "Awaiting client statement.",
    attribution: "Name, Title — Brand",
    note: "This block is intentionally unfilled. Drop a real quote into `why.testimonial` in lib/content.ts and the provisional styling clears itself.",
  },

  estimator: {
    title: "Tell me what you're shipping.",
    subhead:
      "Fill in what you know — nothing here is required except your email. The more you can give me, the more accurate the number I send back.",
  },

  faq: {
    title: "Questions people actually ask.",
    items: [
      {
        question: "What's the difference between FOB, DDP, and DDU?",
        answer:
          "FOB (Free On Board) means your responsibility starts once cargo is loaded at the origin port — you own freight, insurance, and destination costs from there. DDP (Delivered Duty Paid) means the forwarder handles everything, duty included, all the way to your door. DDU (Delivered Duty Unpaid, often called DAP today) means delivery is handled end to end, but you pay duty and taxes separately at destination.",
      },
      {
        question: "How long does ocean freight from Asia to the US typically take?",
        answer:
          "Roughly 3–6 weeks port to port, depending on the origin port, destination coast, and season. Add a few more days on each end for origin pickup and destination drayage.",
      },
      {
        question: "Is there a minimum shipment size?",
        answer:
          "No minimum. I'll move a few pallets by LCL or a full container by FCL — whatever fits your order.",
      },
      {
        question: "What does \"flat fee plus pass-through\" mean?",
        answer:
          "You pay one flat fee for my work. The actual freight, duty, and carrier costs pass through to you at cost, and I show you the carrier invoice — there's no margin hidden inside the freight rate.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ footer */

export const footer = {
  note: "Torque Ship is one person. That is the point.",
  // Static, not `new Date()` — this module is imported by client components and
  // a server/client year boundary would produce a hydration mismatch.
  legal: "© 2026 Torque Ship. Rates illustrative until confirmed in writing.",
};
