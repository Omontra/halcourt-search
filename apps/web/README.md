# Taylor Made Salcombe — Guest Website

A luxury holiday-let + concierge website for **Taylor Made Salcombe** (Salcombe
& the South Hams, Devon). Built with the Next.js App Router, TypeScript (strict)
and Tailwind CSS v3.

The design is a faithful port of the committed **Concept B — "Cinematic Dark"**
design (`concepts/concept-b-cinematic-dark/`) rebuilt as a proper React
component system.

## Run it

```bash
cd apps/web
npm install
npm run dev      # http://localhost:3000
```

## Build it

```bash
cd apps/web
npm run build
npm run start    # serve the production build
```

No environment variables are required to build or run.

## Stack

- **Next.js (App Router)** + **TypeScript** (`strict: true`)
- **Tailwind CSS v3** — the Concept B palette and type scale live in
  `tailwind.config.ts`; shared component classes (`.btn`, `.eyebrow`, etc.) in
  `app/globals.css`.
- **Fonts** — Cormorant Garamond (serif display) + Jost (sans body) via
  `next/font/google`, exposed as `--font-serif` / `--font-sans`.

## Pages

| Route             | Description                                                        |
| ----------------- | ----------------------------------------------------------------- |
| `/`               | Homepage — Concept B port (hero + search, featured stays, concierge, catering, trust, journal) |
| `/stays`          | Collection / search — server component reading query-param filters |
| `/stays/[slug]`   | Property detail — gallery, facts, availability, reviews, booking panel, concierge add-ons |
| `/concierge`      | Concierge content page (leads with private chef)                  |
| `/private-catering` | The Salcombe Kitchen content page                                |
| `/enquiry`        | Enquiry form (also embedded via "Enquire" CTAs)                   |
| `/book`           | Instant-book landing stub                                         |

### API routes (mock, real handlers)

| Route                | Method | Behaviour                                          |
| -------------------- | ------ | -------------------------------------------------- |
| `/api/enquiry`       | POST   | Validates name/email, logs, returns `{ ok: true }` |
| `/api/availability`  | GET    | Returns deterministic mock availability for a slug+range |
| `/api/book`          | POST   | Mock instant-book → `{ ok: true, ref: "TM-XXXXX" }` |

## What's mock vs real

| Area        | Today (mock)                                  | Real (later)                                        |
| ----------- | --------------------------------------------- | --------------------------------------------------- |
| **Data**    | `lib/properties.ts` array, read via `lib/data.ts` | Sanity CMS — swap `lib/data.ts` bodies for GROQ. See `sanity/README.md`. |
| **Availability** | Deterministic pseudo-random in `getAvailability` | PMS feed (e.g. Hostaway)                        |
| **Payments / booking** | `/api/book` returns a fake ref, no charge | Stripe Connect — PaymentIntent on the operator's connected account, `application_fee_amount = 2% × GBV`. See `docs/concierge-platform-technical-design.md` §6. |
| **Reviews** | Hard-coded sample quotes                       | Sanity `review` documents referenced by property    |
| **Enquiries / newsletter** | console.log / no-op                | Resend (transactional email) + leads store / audience |
| **Imagery** | Keyworded LoremFlickr placeholders with a solid dark fallback | Taylor Made's genuine photography (likely via the Sanity image CDN) |

### Imagery note

All images are **placeholders** sourced from keyworded LoremFlickr URLs
(`https://loremflickr.com/<w>/<h>/<keywords>`), each over a solid dark
background so the page reads well if photography fails to load. `loremflickr.com`
is allow-listed in `next.config.ts` and `next/image` is used with `unoptimized`
(no remote optimization for the placeholders). **Replace every image with
Taylor Made's real photography before launch.**

## Mapping to the platform docs

This is the **guest-facing website** described in `docs/guest-website-plan.md`.
The data-access seam (`lib/data.ts`), Sanity schemas (`sanity/`) and the
Stripe-Connect TODO in `app/api/book/route.ts` align with
`docs/concierge-platform-technical-design.md` (content, PMS, payments,
messaging) so this front end can be promoted to the full platform without a
rewrite.

## Accessibility

Semantic landmarks, a skip link, labelled controls, alt text, visible focus
rings, ARIA states on toggles/menus, and `prefers-reduced-motion` support
(Ken-Burns hero and other motion are disabled).
