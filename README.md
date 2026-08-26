# Torque Ship

Marketing site for a solo freight forwarder moving DTC inventory from Asia to the US.

**Design concept — "The Manifest".** The whole site is a live customs declaration: numbered
form boxes, monospace field values, hairline document rules, rubber stamps for status. The
metaphor is the brand argument — big forwarders hide behind paperwork the client never sees,
so this site hands you the document, filled in and legible. Signal amber is the ink reserved
for CTAs, stamps and live data. It is never used decoratively.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build
```

Requires Node 18.18+. Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v4 ·
Framer Motion · Lucide.

## Structure

```
app/
  layout.tsx          fonts, metadata, skip link, Nav / Footer / StickyCta
  page.tsx            HOME     — hero · 3 value props · route · record · CTA
  services/page.tsx   SERVICES — 5 category modules · commercials · CTA
  why/page.tsx        WHY ME   — trust points · testimonial · FAQ · rate request
  not-found.tsx
lib/
  content.ts          ← every string on the site
  motion.ts           shared variants + the reduced-motion gate
components/system/    Button · Section · Field · Card · Stamp · StatBlock · Ticker · JsonLd
components/layout/    Nav · Footer · StickyCta
components/home/      Hero · ValueProps · RouteJourney · ShipmentStatus
components/services/  ServiceIndex (client) · ServicePanel (server) · Glyph
components/why/       TrustPoints · TestimonialPlaceholder · Faq
components/quote/     QuoteEstimator
```

`Field` is the atom. Value props and the shipment widget are compositions of one numbered
manifest box, which is what keeps the metaphor structural rather than applied.

## Swapping the placeholders

The copy deck did not arrive with the brief, so **every string is written-to-voice
placeholder** and lives in `lib/content.ts`. No component hard-codes prose — replace the
strings there and touch nothing else.

Items that are visibly marked as provisional on-screen (hatching, dashed rules, a ◆ tag),
so they cannot ship by accident:

| What | Where | Note |
| --- | --- | --- |
| Phone number | `contact.phone` / `phoneHref` in `lib/content.ts` | UI is commented out (not deleted) in the footer, the Why-page escape hatch and the mobile sticky bar, until there's a real number to show |
| Testimonial | `why.testimonial` | Section is hidden entirely while `placeholder: true` — not shown as an unsigned/dev-facing block on the live site. Set `placeholder: false` and add a real quote to bring it back |

## The decisions worth knowing about

**The rate request tool replaces the contact form.** One flat form grouped into Shipment
Basics, Product Details and Shipping Preferences — a direct line to me instead of a generic
"tell us about your project" form. Nothing is required except email: a visitor who doesn't
have a cargo value or HTS code on hand yet shouldn't be blocked from reaching out. The
finite-choice fields (palletized/floor-loaded, air/sea/split, DDU/DDP/FOB) are native radio
inputs under the hood, so arrow-key navigation and group semantics are correct rather than
reimplemented.

**It doesn't compute a number.** An earlier version priced the shipment from placeholder
rate tables and stepped through four single-select questions; the figures didn't track real
desk rates closely enough to show with a straight face — some ran wildly high, some wildly
low, depending on the combination. Rather than keep showing invented numbers, the tool hands
whatever detail is provided straight to me (via Web3Forms) and I reply with a real rate,
same business day.

**The hero headline has no entrance animation.** It is the LCP element, so it paints
immediately at full opacity. Everything kinetic above the fold is secondary chrome. No
animation is ever in front of the largest paint.

**There are zero raster assets.** Every graphic is CSS or inline SVG, including the five
service glyphs. This is the main reason the mobile performance budget is comfortable.

**Reduced motion is a real fallback, not a shortened animation.** `lib/motion.ts` returns
finished states rather than fast ones, `globals.css` carries a blanket kill switch, and the
scroll-linked route renders fully drawn. Nothing is missing when motion is off.

**The mobile route is not the desktop animation shrunk.** Scroll-linked drawing on a phone
is per-frame work for a graphic that is mostly off-screen, so mobile gets a static spine
with plain reveals.

**No hamburger.** Three destinations fit on a 360px viewport at mono 11px. A menu button
would add a tap and hide the IA behind an icon for nothing. Mobile carries navigation in
the header and the CTA in the persistent bottom bar, which hides itself while the estimator
is on screen so it never covers the tool's own controls.

## Accessibility

Skip link; semantic landmarks; `aria-current` on nav;
`aria-live` on the submission result so success/failure is announced; native radios for the quote flow's choice fields;
one global `:focus-visible` treatment that is never removed; 44px+ touch targets throughout;
`sr-only` truths behind every animated number.

Contrast against `--color-ink` (#08090b): paper 17.2:1 · mist 7.8:1 · signal 12.4:1 ·
flag 5.1:1. `--color-faint` is 4.6:1 and is used only for non-essential mono labels at
large-text weight.

## Not built

Analytics, sitemap/robots, and an OG image.

## Form submission

The rate-request tool (`components/quote/QuoteEstimator.tsx`) submits directly to
[Web3Forms](https://web3forms.com) via a JSON POST — no page reload, no mailto handoff.
The access key in `lib/content.ts` (`web3formsKey`) is a public routing key by Web3Forms'
own design, not a secret; submissions are restricted by the allowed-domains setting on the
key itself (configured on web3forms.com), not by hiding this value. On failure, the form
falls back to a `mailto:` link so a visitor is never stuck.

## Structured data

`lib/schema.ts` builds JSON-LD from data that already lives in `lib/content.ts`, so
structured data can't drift from what's actually on the page. `components/system/JsonLd.tsx`
renders it via Next's documented pattern (a `<script type="application/ld+json">` from a
server component).

- **Organization** — rendered once in `app/layout.tsx`, present on every page. `logo` points
  at `public/torqueship-logo.svg`.
- **FAQPage** — Why page, built from `why.faq.items`.
- **HowTo** — home page, built from `home.route.stops` (the same five stages the
  scroll-drawn route renders).

No Person schema and no phone/address in Organization — there's no public operator bio and
no phone/address to publish yet (see `contact.phone`'s placeholder note above).
