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
  name: "TorqueShip",
  /** Shown in the manifest header rule across every page. */
  docType: "FREIGHT FORWARDING / DECLARATION OF SERVICE",
  tagline: "Global freight forwarding for DTC Brands.",
  description:
    "Global freight forwarding for DTC and e-commerce brands. TorqueShip coordinates international ocean, air, ground, customs and logistics with one direct point of contact.",
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
  { label: "Why TorqueShip", href: "/why-torqueship" },
];

export const primaryCta = {
  label: "Get a Quote",
  href: "/get-a-quote",
};

/* -------------------------------------------------------------------- home */

export const home = {
  hero: {
    /** Answers "what is this" in one line. Keep it short — it is set huge. */
    headline: ["Global Freight", "Forwarding for", " E-commerce", "Brands"],
    /**
     * Answers "who is it for" + "why care". Split so the lead clause — the
     * actual "what is this" claim — can be styled heavier than the rest.
     */
    subhead: {
      lead: "Your freight, handled by the person who answers.",
      rest: "TorqueShip helps DTC and e-commerce brands move inventory across borders with freight forwarding and logistics managed through one direct point of contact from origin to destination.",
    },
    /** Answers "who is it for" explicitly, as a manifest field. */
    consignee: "DTC & e-commerce brands shipping internationally",
    lane: "Global origins → Global destinations",
    secondaryCta: { label: "See How It Works", href: "#how-it-works" },
  },

  /** THREE value props — the skimmable strip. Structure is fixed at 3. */
  valueProps: [
    {
      box: "01",
      kicker: "DIRECT COMMUNICATION",
      title: "One person to talk to.",
      body: "No passing customers between departments just to get an answer. The person coordinating your freight is the person in your messages every time.",
    },
    {
      box: "02",
      kicker: "BUILT FOR DTC",
      title: "Freight decisions made with your brand in mind.",
      body: "Timing, launches, replenishment cycles, and growth. TorqueShip understands DTC operations and makes logistics decisions that support your inventory strategy.",
    },
    {
      box: "03",
      kicker: "GLOBAL COORDINATION",
      title: "Move freight worldwide.",
      body: "International ocean, air, and ground freight coordinated across global origins and destinations without managing multiple disconnected providers.",
    },
  ],

  /** Scroll-drawn route. One timeline, sea and air merged into it. */
  route: {
    title: "From pickup to delivery, handled.",
    body: "One shipment. One point of contact. Full visibility across the moving pieces — from origin pickup through customs to final delivery.",
    stops: [
      { code: "ORG", label: "Origin Pickup", detail: "Coordination with your supplier, cargo inspection, and documentation prep" },
      {
        code: "FRT",
        label: "Freight & Transportation",
        detail: "Ocean, air, or ground freight booked and tracked with regular status updates",
      },
      {
        code: "CUS",
        label: "Customs / Import",
        detail: "Import clearance, duty calculation, and regulatory compliance handled",
      },
      {
        code: "DST",
        label: "Destination Handling",
        detail: "Drayage coordination, delivery scheduling, and communication with your warehouse",
      },
      { code: "DEL", label: "Final Delivery", detail: "Delivered to your 3PL, warehouse, or fulfillment center with proper documentation" },
    ],
  },

  /** Mock live widget. Illustrative data — clearly framed as a sample. */
  status: {
    title: "This is what you see, all the time.",
    body: "Every client gets the same record. No login, no portal, no chasing. It is a message with these fields in it.",
    disclaimer: "Illustrative record. Not live data.",
  },

  services: {
    title: "Freight forwarding without the runaround.",
    body: "From the first pickup to final delivery, TorqueShip coordinates the moving pieces of your shipment so you can focus on your brand.",
    items: [
      {
        name: "Ocean Freight",
        description: "FCL and LCL shipments coordinated across major trade lanes with transparent pricing and regular tracking updates.",
        href: "/services#sourcing-freight",
      },
      {
        name: "Air Freight",
        description: "Fast international air cargo for time-sensitive inventory, product launches, or urgent replenishment.",
        href: "/services#sourcing-freight",
      },
      {
        name: "Ground Transportation",
        description: "Road freight and drayage coordination from port to warehouse, scheduled around your receiving windows.",
        href: "/services#last-mile",
      },
      {
        name: "Customs & Import Support",
        description: "Import clearance, duty calculation, HS classification, and regulatory compliance for international shipments.",
        href: "/services#customs-compliance",
      },
      {
        name: "Warehousing Coordination",
        description: "3PL coordination, receiving appointments, and delivery scheduling to keep your inventory flowing.",
        href: "/services#last-mile",
      },
      {
        name: "Door-to-Door Logistics",
        description: "Complete end-to-end freight management from supplier pickup through final delivery to your warehouse.",
        href: "/services",
      },
    ],
  },

  whoItsFor: {
    title: "Built around the businesses moving inventory.",
    body: "Whether you're a DTC brand, an Amazon seller, or a 3PL managing inventory for multiple brands, TorqueShip coordinates the freight that keeps products moving.",
    audiences: [
      {
        title: "DTC Brands",
        body: "Coordinate freight from supplier to destination without managing every moving piece yourself.",
      },
      {
        title: "Amazon Sellers",
        body: "Move inventory to Amazon and other fulfillment destinations with freight coordinated around your replenishment needs.",
      },
      {
        title: "3PLs & Warehouses",
        body: "Use TorqueShip to coordinate inbound and outbound freight for your own operation or for the brands you serve.",
      },
      {
        title: "E-commerce Businesses",
        body: "For growing brands moving inventory internationally, TorqueShip coordinates the freight behind the shipment.",
      },
    ],
  },

  globalReach: {
    title: "One logistics partner. Worldwide reach.",
    body: "TorqueShip coordinates international freight for DTC and e-commerce brands across global origin and destination markets.",
    capabilities: [
      { label: "Global Origins", detail: "Coordinate pickups from suppliers worldwide" },
      { label: "Global Destinations", detail: "Deliver to warehouses and fulfillment centers internationally" },
      { label: "Ocean & Air", detail: "Choose the right freight mode for your timeline and budget" },
      { label: "Customs Expertise", detail: "Navigate import regulations across different countries" },
      { label: "End-to-End", detail: "One point of contact from origin through final delivery" },
    ],
  },

  whyPreview: {
    title: "Why brands work with TorqueShip",
    points: [
      {
        title: "One direct point of contact",
        body: "No passing customers between departments just to get an answer. You know who is handling your freight.",
      },
      {
        title: "Built around DTC operations",
        body: "Freight decisions are made with inventory timing, launches, replenishment, and growth in mind.",
      },
      {
        title: "Clear communication",
        body: "Know what's happening with your shipment and who is handling it. No chasing for status updates.",
      },
      {
        title: "Global coordination",
        body: "Move freight across international origins and destinations without managing multiple disconnected providers.",
      },
      {
        title: "Human accountability",
        body: "A real person owns the conversation and follows the shipment from start to finish.",
      },
    ],
    cta: { label: "Learn more", href: "/why-torqueship" },
  },

  outro: {
    kicker: "NEXT ACTION",
    title: "Have freight to move?",
    body: "Tell us where it's coming from, where it's going, and what you're shipping. We'll help you figure out the right way to move it.",
  },
};

/* ---------------------------------------------------------------- services */

export const services = {
  intro: {
    title: "Freight Forwarding Services for DTC & E-commerce Brands",
    subhead:
      "TorqueShip coordinates international freight and logistics for growing DTC and e-commerce brands from origin pickup through final delivery.",
  },

  /** Category names VERBATIM from the brief. Body copy is placeholder. */
  categories: [
    {
      id: "sourcing-freight",
      box: "01",
      name: "Sourcing & Freight",
      summary: "Ocean, air, and ground freight coordinated for your shipment timeline and budget.",
      body: "TorqueShip books international freight across ocean (FCL/LCL), air, and ground transportation. We work with established carrier relationships to secure competitive rates and reliable service, then coordinate pickup, documentation, and tracking throughout the journey. Whether it's a full container from an overseas factory or consolidated LCL freight, we match the freight mode to your timeline and cost requirements.",
      items: [
        "Ocean freight (FCL and LCL)",
        "Air freight for time-sensitive shipments",
        "Ground transportation and drayage",
        "Carrier selection and rate negotiation",
        "Origin pickup coordination",
        "Cargo insurance placement",
      ],
    },
    {
      id: "customs-compliance",
      box: "02",
      name: "Customs & Compliance",
      summary: "Import clearance and regulatory compliance handled correctly.",
      body: "Customs clearance can stop your shipment in its tracks if documentation isn't right. TorqueShip handles HS classification, duty calculation, ISF filing, and entry documentation to keep your freight moving through customs. We coordinate with customs brokers, monitor regulatory changes that affect your products, and handle the compliance work so your inventory clears without delays or unexpected fees.",
      items: [
        "HS code classification and duty calculation",
        "ISF (Importer Security Filing) / 10+2 compliance",
        "Customs entry filing and clearance",
        "Coordination with licensed customs brokers",
        "Regulatory compliance (FDA, CPSC, FCC where applicable)",
        "Tariff monitoring and landed cost analysis",
      ],
    },
    {
      id: "documentation",
      box: "03",
      name: "Documentation",
      summary: "Commercial documentation prepared correctly the first time.",
      body: "Every international shipment requires accurate commercial documentation invoice, packing list, bill of lading, and certificates of origin. TorqueShip reviews supplier documentation before it becomes a problem, ensures all required paperwork is complete and correct, and maintains organized records for each shipment. Proper documentation prevents customs delays, reduces examination risk, and keeps your freight moving on schedule.",
      items: [
        "Commercial invoice and packing list review",
        "Bill of lading coordination and telex release",
        "Certificate of origin and trade agreement documentation",
        "Document verification and error prevention",
        "Supplier document coordination",
        "Complete documentation archive per shipment",
      ],
    },
    {
      id: "last-mile",
      box: "04",
      name: "Last-Mile Delivery",
      summary: "Port to warehouse delivery coordinated with your receiving schedule.",
      body: "Getting freight from the port to your warehouse requires coordination with trucking companies, warehouses, and sometimes multiple handoffs. TorqueShip schedules drayage around your warehouse receiving windows, coordinates with your 3PL or fulfillment center, and provides advance shipping notices so receiving teams know what's arriving. Whether it's Amazon FBA, a 3PL warehouse, or your own facility, we handle the delivery coordination.",
      items: [
        "Drayage scheduling and coordination",
        "Warehouse appointment booking",
        "3PL coordination and advance shipping notices",
        "Amazon FBA and AWD delivery coordination",
        "Transload and palletization when needed",
        "Final delivery confirmation and documentation",
      ],
    },
    {
      id: "when-things-go-sideways",
      box: "05",
      name: "When Things Go Sideways",
      summary: "Exception handling and problem resolution when shipments don't go as planned.",
      body: "Not every shipment goes perfectly. Carriers roll bookings, customs flags containers for inspection, weather delays vessels, suppliers ship incorrect quantities. When problems happen, TorqueShip provides same-day notification with clear options and cost implications. We handle recovery rebooking rolled shipments, managing customs examinations, coordinating shortage claims, and finding alternative solutions to keep your business moving.",
      items: [
        "Same-day exception notification",
        "Rolled booking recovery and alternative routing",
        "Customs examination coordination",
        "Damage and shortage documentation and claims",
        "Expedited air freight for urgent situations",
        "Contingency planning for supply chain disruptions",
      ],
    },
  ],

  pricing: {
    title: "Transparent pricing structure.",
    body: "TorqueShip charges a flat coordination fee per shipment, plus actual freight and duty costs passed through at cost. You see the carrier invoices no hidden margins in your freight rates.",
    points: [
      { term: "Coordination fee", value: "Flat fee per shipment, quoted upfront" },
      { term: "Freight & duty", value: "Pass-through at cost with invoice transparency" },
      { term: "Minimum commitment", value: "None no contracts or volume requirements" },
      { term: "Getting started", value: "Request a quote to discuss your shipping needs" },
    ],
    cta: { label: "Get a Quote", href: "/get-a-quote" },
  },

  howServicesWork: {
    title: "How our services work together",
    body: "Most DTC shipments need multiple services working in coordination. A typical international shipment involves origin pickup, ocean or air freight, customs clearance, and final delivery to your warehouse. TorqueShip coordinates all of these pieces as one continuous process with a single point of contact, rather than separate vendors you manage independently.",
  },
};

/* -------------------------------------------------------------------- why */

export const why = {
  intro: {
    title: "Freight forwarding with a person behind it.",
    subhead:
      "TorqueShip's approach to freight forwarding is built around direct communication and personal accountability. Here's what that means in practice.",
  },

  /** Trust points — skimmable, fixed structure. */
  trustPoints: [
    {
      box: "01",
      title: "One person to talk to",
      body: "Direct communication with the person coordinating your freight. No ticket systems, no account manager handoffs, no department transfers. You know who is handling your shipment.",
    },
    {
      box: "02",
      title: "Built for DTC brands",
      body: "TorqueShip understands DTC operations inventory timing, product launches, replenishment cycles, and seasonal planning. Logistics decisions are made with your brand's needs in mind.",
    },
    {
      box: "03",
      title: "Clear communication",
      body: "Regular status updates and same-day notification when exceptions occur. Know what's happening with your freight without having to chase for information.",
    },
    {
      box: "04",
      title: "Accountability from origin to destination",
      body: "One point of contact owns the entire shipment from supplier pickup through warehouse delivery. When something needs attention, you know exactly who to reach.",
    },
    {
      box: "05",
      title: "Global coordination",
      body: "Coordinate international freight across origins and destinations worldwide without managing multiple freight forwarders in different regions.",
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
    title: "Get a Freight Quote",
    subhead:
      "Tell us about your shipment and we'll help you determine the right freight solution. Fill in what you know the more details you provide, the more accurate the quote.",
  },

  faq: {
    title: "Frequently asked questions.",
    items: [
      {
        question: "What types of freight does TorqueShip handle?",
        answer:
          "TorqueShip coordinates ocean freight (FCL and LCL), air freight, and ground transportation for international shipments. We work with DTC and e-commerce brands moving inventory from suppliers to warehouses or fulfillment centers.",
      },
      {
        question: "Do you only handle shipments from Asia to the US?",
        answer:
          "TorqueShip coordinates international freight across global origins and destinations. We work with brands shipping from and to various countries worldwide.",
      },
      {
        question: "What's the difference between FCL and LCL?",
        answer:
          "FCL (Full Container Load) means you're shipping enough cargo to fill an entire container typically more cost-effective per unit for larger shipments. LCL (Less than Container Load) means your cargo shares container space with other shippers better for smaller volumes that don't fill a full container.",
      },
      {
        question: "Is there a minimum shipment size?",
        answer:
          "No minimum shipment size. Whether you're shipping a few pallets via LCL or multiple full containers, TorqueShip can coordinate your freight.",
      },
      {
        question: "Do I need a customs broker?",
        answer:
          "TorqueShip coordinates with licensed customs brokers to handle import clearance, ISF filing, duty calculation, and customs documentation. This is included in our coordination services.",
      },
      {
        question: "What happens if something goes wrong with my shipment?",
        answer:
          "You get same-day notification when exceptions occur rolled bookings, customs holds, delays, or damage. We explain what happened, provide options for resolution, and handle the coordination to get your freight back on track.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ footer */

export const footer = {
  note: "TorqueShip helps DTC and e-commerce brands move inventory around the world with freight forwarding and logistics handled through one direct point of contact.",
  // Static, not `new Date()` — this module is imported by client components and
  // a server/client year boundary would produce a hydration mismatch.
  legal: "© 2026 TorqueShip",
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
};
