# Guest Website — Research, Design & Build Plan

> A new guest-facing website for the Taylor Made Salcombe archetype that **beats the
> current Wix site** and **competes with the strongest Salcombe operators** — built so it
> doubles as the **themeable guest front-end of the Concierge OS platform**
> (see `concierge-platform-plan.md` and `concierge-platform-technical-design.md`).
>
> Companion to the platform docs. This one is about the *guest website*: what to build,
> how it should look, how it converts, and how it wires into the platform's
> booking/concierge/payments layer.

---

## 1. The opportunity (one paragraph)

Taylor Made has the **best brand voice and the only true concierge + private-catering
offer** in its set — but the **weakest conversion machinery**. The site is enquiry-only
with no availability search, a listing grid with no prices or key facts, a "contact" form
that's really a newsletter sign-up, a generic Wix shell, and stale footer/slug hygiene.
Competitors have already moved the UX bar well past this. **The plan: keep and elevate the
brand and the concierge differentiator; rebuild everything around search, trust and a real
enquiry/booking flow.**

---

## 2. Current site — keep vs fix (from the audit)

**Keep / elevate**
- The **"quiet luxury" brand voice** — *"chosen for the way they feel as much as how they
  look… homes made for slow mornings, sea swims, long lunches."* This is the asset.
- The **three-pillar offer**: Concierge (complimentary) · Private Catering / "The Salcombe
  Kitchen" · Holiday-home rental + management.
- **Strong individual property pages**: rich copy, abundant pro photography, dated 2025
  testimonials, transparent weekly pricing.
- **SEO foundations**: unique titles/meta, OG tags, seasonal + party-size landing pages,
  a journal, a well-pitched owner-acquisition page.

**Fix (the gaps)**
1. **No availability search / online booking / payment** — the biggest commercial gap.
2. **"Contact" form is a newsletter capture** — no name/dates/property/party fields.
3. **Listing grid is thin** — no price, bed/bath, dog-friendly badge, or filtering at the
   point of comparison.
4. **Wix performance/payload** (~1 MB HTML + 2500px heroes) → poor mobile CWV.
5. **Trust signals underused** — testimonials hidden on detail pages; no aggregated
   rating, press, awards, or memberships near the conversion point.
6. **Polish** — `/copy-of-availability-search` slug, inconsistent property URLs, two
   conflicting price ranges on one property, stale "©2023."
7. **Generic Wix aesthetic** and **passive CTAs** ("Take a look") with no "Check dates."

---

## 3. The competitive bar (Salcombe / South Hams)

| Operator | Search & booking | Filtering | Prices on grid | Trust | Concierge | Design |
|---|---|---|---|---|---|---|
| **Coast & Country** (168 props, volume) | **Live date+guests search, instant book + payment, "Book now"** | Deep (type, bed/bath, distance to sea, amenities, rating) + sort + **map** | **Yes** ("7 nights from £X") + savings | **Star ratings** ("5.0★"), **"last booked" urgency** | Some (spa/pool access) | Functional, not premium |
| **Salcombe Finest / Finest Stays** (luxury, enquiry) | Date+guests search → enquiry | Rich (sleeps, type, hot tub, sea view, pool, moorings, EV; super-luxe/dog collections) | Partial | **Badges** (Visit Devon, FSB, PASC), **Condé Nast "as seen in"**, Instagram | Property mgmt focus | Clean, modern, curated |
| **Taylor Made (today)** | **None — enquiry-only, newsletter form** | None on grid (separate nav pages only) | **No** | Testimonials buried on detail pages | **Strongest offer** (concierge + chefs) | Generic Wix |

**Read:** even the luxury *enquiry-model* competitor has proper search + filtering + trust
badges. The volume player has the full instant-book stack. Taylor Made must **at minimum
match search/filter/trust**, and can **win on brand + concierge** if those are made the
hero rather than an afterthought.

---

## 4. Strategy & positioning

- **Lead with feeling, close with ease.** Keep the editorial "restorative luxury" voice as
  the emotional hook; remove every friction point between desire and booking.
- **Make the concierge the wedge, not a footnote.** It's the one thing no local competitor
  matches at this level — surface it on the homepage, in the search results, on property
  pages, and as **inline bookable add-ons** (private chef first — the highest-margin
  upsell).
- **Drive direct booking.** Better margin, owns the guest relationship the concierge needs,
  and feeds the Guest Memory Graph. Frame "book direct" perks vs OTAs.
- **Design so the site IS the platform's guest surface** — the booking engine, availability,
  enquiry-to-booking, payments (Stripe Connect, the 2% model), and concierge add-ons all
  come from the Concierge OS platform, not a throwaway marketing site.

---

## 5. Design direction

**Mood: "restorative coastal luxury" — cinematic, calm, editorial.** The 2026 luxury web
mood is *quieter and more intentional*; lean into space, real photography, and craft.

- **Avoid the AI-slop defaults**: no full-width-hero-with-centered-text + icon-grid +
  generic testimonial carousel; no Inter/system fonts; no cream+terracotta "house style."
  Use **editorial, slightly asymmetric** layouts (pull quotes, inline figures, long-form
  columns) that read as *designed*.
- **Photography-led**: full-bleed cinematic hero (image or short muted video), generous
  galleries, authentic Salcombe lifestyle imagery (sea swims, long lunches, the homes).
- **Typography (propose 2-3 directions, don't lock blind):** a characterful **serif
  display** (e.g. Fraunces or a refined Playfair) paired with a clean, high-legibility
  **grotesque/sans body**. One display voice + one body voice; restrained weights.
- **Palette — Salcombe-specific, not generic:** a warm sand/off-white base, deep
  **marine/ink navy**, a **brass/bronze** accent, soft **sea-glass** tones. (Confirm against
  the existing logo/brand; the current palette couldn't be extracted from Wix.)
- **Motion**: subtle, tasteful micro-interactions (image reveals, sticky search) — never
  distracting.
- **Process note:** present **2-3 art-directed homepage concepts** before full build, so the
  look is chosen, not defaulted.

---

## 6. Information architecture

```
/
├── /stays                      Collection + live search/filter (the new core)
│   └── /stays/[property]        Property detail (book/enquire, gallery, add-ons)
├── /concierge                  The concierge offer (hero feature) + inline requests
│   └── /private-catering        The Salcombe Kitchen — chefs, menus, booking
├── /experiences                Bookable experiences/add-ons (chef, boat, spa, activities)
├── /salcombe                   Area + guides hub (things to do, beaches, food, shopping)
│   └── /salcombe/[guide]
├── /thurlestone, /south-hams   Location landing pages (SEO)
├── /list-your-property         Owner acquisition funnel (keep & strengthen)
├── /about                      Founder story, ethos, credibility
├── /journal                    Editorial/blog (SEO + brand)
├── /book / enquiry flow         Smart enquiry → booking (not a newsletter form)
└── /contact, /faq, /terms, /privacy
```

Clean, consistent slugs (fix `/copy-of-…` etc.); 301-redirect every existing URL to
preserve SEO equity.

---

## 7. Key pages & components

- **Homepage:** cinematic hero with an **embedded date + guests + area search** above the
  fold; a curated "featured stays" rail (with price + key facts); a **concierge teaser**;
  private-catering teaser; trust strip (rating, press, memberships); journal preview;
  newsletter (separate from enquiry).
- **Collection / search (`/stays`):** the new commercial core — results grid with **price
  ("7 nights from £X"), sleeps, beds/baths, dog-friendly, key amenities, rating**; filters
  (dates, guests, location, sleeps, sea view, hot tub, dog-friendly, parking, EV, moorings);
  sort; **map view**; save-to-wishlist.
- **Property detail:** big gallery (+ optional virtual tour/video); availability calendar
  with min-stay shown and "next available" suggestions; transparent pricing; amenities;
  location map with walking times; **dated reviews**; **inline concierge add-ons** ("Add a
  private chef," "Pre-stock the fridge," "Book a boat day"); sticky **Check dates / Enquire**
  bar; similar stays.
- **Concierge page:** the differentiator — what's included, how it works, real examples,
  and a request flow; lead with **private chef**. Tie experiences to the guest's actual
  dates where possible.
- **Private catering / Salcombe Kitchen:** chefs, sample menus (consider adding from/price
  guidance), booking/enquire.
- **Location & guides:** SEO + brand; internal-link to relevant stays.
- **Owner acquisition (`/list-your-property`):** keep the strong founder-led pitch; add a
  rental-estimate capture and social proof.

---

## 8. Booking / search & enquiry UX (the heart of the rebuild)

- **One search system end-to-end.** The homepage search, the collection filters, and each
  property's calendar/enquiry must share one availability source (the platform's PMS-synced
  data) so a date the calendar offers is never rejected later. Grey out unavailable dates,
  show **why** (min-stay/changeover), suggest next available.
- **Match the local search bar:** every serious competitor offers a **±1-3 day flexibility
  toggle, distance radius, deep amenity filters and a map view** — these are table stakes,
  not differentiators. Build them in.
- **Low-friction commitment:** consider a low-deposit "hold your dates" capture (the Awaze
  platform's "secure for £10" mechanic) as a softer step than full payment, feeding straight
  into the concierge follow-up.
- **Smart enquiry form (replaces the newsletter form):** pre-filled with property + dates +
  guests from context; captures name, dates, party, occasion, dietary/needs (seeds the
  Guest Memory Graph). Short, mobile-first, guest-checkout (no forced account).
- **Booking & deposits:** flow into the platform's **Stripe Connect** payments — deposit +
  balance, **2% application fee** on GBV, card processing as operator pass-through, damage
  hold via pre-auth/waiver. PCI handled by Stripe Elements/Checkout; white-labelled to the
  site's CSS so the handoff feels seamless.
- **Model (locked):** **hybrid at launch** — **instant-book + online payment on select
  properties**, **enquiry-to-booking on the rest**; both feed the concierge. The instant
  path needs real-time availability + Stripe checkout + confirmation from launch (heavier
  than pure enquiry); the enquiry path stays concierge-led.
- **Mobile:** sticky thumb-zone "Check dates / Enquire" bar; one-tap WhatsApp; calendars
  that prevent invalid selection.

---

## 9. Concierge & ancillary revenue on the site

- **Lead with the private chef** (highest-margin, most aspirational); then experiences
  (boat days, spa, activities), pre-arrival grocery, early check-in.
- **Make add-ons requestable inline** on the property page and during/after enquiry, so
  guests self-select — this is the ancillary revenue the platform's pricing model
  (rev-share / payfac) monetises.
- **Dynamic experience blocks** keyed to the guest's dates/party where feasible.

---

## 10. Conversion & trust

- **Aggregate rating + recent dated reviews** near every booking point (pull from
  Google/our reviews); **press** ("as seen in…"), **memberships** (PASC, Visit Devon),
  awards.
- **Tasteful, truthful urgency** only ("booked twice this week," "2 summer weeks left") —
  never fabricated scarcity.
- **Persistent CTA** ("Check dates") in nav and on cards; context CTAs in galleries.
- **Abandoned-enquiry recovery** (the platform's concierge agent follows up — a built-in
  advantage competitors don't have).

---

## 11. SEO

- **Per-location & per-collection landing pages** (Salcombe, Thurlestone, South Hams,
  dog-friendly, sleeps-N, sea view) with internal linking.
- **`VacationRental` + `LodgingBusiness` JSON-LD** structured data per property (name,
  images, location, rating, reviews) for rich results.
- **Google Business Profile** per location; consistent NAP; fast embedded maps.
- **Migrate the journal/guides**; keep the seasonal landing-page strategy that already works.
- **Preserve equity:** 301 every old Wix URL to its new clean slug.

---

## 12. Performance & accessibility

- Targets: **LCP < 2.5s, CLS < 0.1, INP < 200ms, mobile PageSpeed > 90** (vs the current
  ~1 MB Wix HTML). Next-gen images + lazy-load, CDN, minimal third-party bloat.
- **WCAG 2.2 AA**: contrast, keyboard operability, alt text, labelled forms, captions.

---

## 13. Tech stack & how it plugs into the platform

- **Frontend:** **Next.js** (App Router, RSC) on **Vercel** — fast, SEO-strong, great CWV.
- **Content:** a **headless CMS** (Sanity recommended) for properties, guides, journal,
  menus — so non-devs edit content and we control schema/metadata/URLs.
- **Booking/availability/payments/concierge:** consumed from the **Concierge OS platform**
  (this doc's whole point): availability + enquiry → `booking`; payments via Stripe Connect;
  add-ons → `service_request`; reviews + memory from core data. The website is the **guest
  surface (`apps/guest`)** in the platform monorepo, **themeable per operator** so it's the
  reusable SaaS front-end, not a one-off.
- **Analytics/quality:** privacy-friendly analytics, Sentry, CWV monitoring, a11y checks in
  CI.

> Net: this is *not* a standalone marketing site — it's the operator-themeable guest
> front-end of the platform. Taylor Made is the first theme.

---

## 14. Migration from Wix

- Export content (copy, property data, ~25 photos/property) into the CMS.
- Re-shoot/upscale where needed; standardise image sizes for performance.
- **Map every old URL → new slug with 301s**; fix the conflicting price ranges and stale
  ©year; submit a new sitemap.
- Run old and new in parallel; cut over DNS once parity + redirects verified.

---

## 15. Phased delivery

- **Phase A — Design & foundations (wks 1-3):** 2-3 art-directed concepts → chosen
  direction; design system/tokens; Next.js + Sanity scaffold; content model; migrate
  property data.
- **Phase B — Core site (wks 3-7):** homepage, collection + **search/filter/map**, property
  detail, concierge & private-catering pages, location/guides, owner funnel; SEO + schema +
  redirects; performance/a11y pass.
- **Phase C — Booking & concierge wiring (wks 6-10, overlaps platform):** availability
  search → smart enquiry → Stripe Connect deposits; inline concierge add-ons →
  `service_request`; reviews; abandoned-enquiry recovery.
- **Phase D — Launch & iterate:** cut over from Wix; monitor CWV + conversion; A/B CTAs,
  hero, and add-on placement.

---

## 16. Success metrics

- Enquiry/booking **conversion rate** (target 4-6%+), enquiry **quality** (complete data),
  **ancillary attach rate** (chef/experiences), mobile CWV all green, organic traffic to
  location pages, direct-vs-OTA mix, abandoned-enquiry recovery rate.

---

## 17. Locked scope (decisions — 2026-06-13)

| # | Decision | Choice | Implication |
|---|---|---|---|
| 1 | **Scope** | **Taylor Made bespoke** | Build a first-class standalone TM site. Keep code cleanly structured so it *could* be generalised to the SaaS guest surface later, but no multi-tenant overhead now. |
| 2 | **Build sequence** | **Website first, light backend** | Launch ahead of the full platform with a minimal availability + enquiry + Stripe-deposit backend; wire to Concierge OS later. |
| 3 | **Booking model** | **Instant-book on select properties + enquiry on the rest** | Hybrid: real-time availability + Stripe checkout + confirmation for instant homes from launch; concierge-led enquiry for the rest. |
| 4 | **Brand** | **Refresh & elevate, keep equity** | Keep the name + "quiet luxury" voice; design a proper luxury system (typography, palette, components) to replace the generic Wix look. |
| 5 | **Photography** | **Use existing, optimise** | Reuse current pro photos (rights-cleared), re-export at modern sizes/formats; upgrade hero homes later. |
| 6 | **Reviews** | **In-house via the concierge post-stay flow** | First-party, owned reviews shown per-property (a gap no local rival fills). |

**Implementation notes from these choices:**
- **Reviews at launch will be thin** (the in-house flow needs stays to accrue). To avoid an
  empty trust section, **seed launch with the existing dated testimonials as "guest stories"**
  (unscored quotes) until first-party scored reviews build up — then switch the per-property
  cards to live scores.
- **Instant-book raises the "light backend" bar:** it must do real-time availability, a
  Stripe payment + booking confirmation, and double-booking protection — not just capture an
  enquiry. Plan the backend accordingly (this is effectively a slim slice of the platform's
  booking + payments layer brought forward).
- **Bespoke ≠ messy:** keep content in a CMS and booking/payments behind clean interfaces so
  a future move to the themeable SaaS surface is a lift, not a rewrite.

---

## 18. National best-in-class benchmarks & how to beat them

The two UK luxury leaders — **Boutique Retreats** and **Unique Homestays** — set the
design/UX ceiling. Both confirm and sharpen the strategy:

**What they prove works (adopt):**
- **Magazine-grade editorial**, not a booking engine — poetic captions, owner stories,
  big atmospheric photography, curation framed as the product ("hand-picked / visited by
  our team"). This is the single biggest premium signal.
- **Both are enquiry/phone-led, NOT instant-book** — deliberate, to preserve the high-touch
  feel. This *validates our enquiry-to-booking model*; instant-book is optional, not the bar.
- **Rich filtering + map view are table stakes** (sleeps, beds, hot tub, pool, waterside,
  pet-granularity, EV, even helipad). Live online payment is *not* expected at this tier.
- **Heavy trust stack:** independent awards (Telegraph "Best Cottage Operator"), **B Corp**,
  press logos (Condé Nast, Vogue, The Times), Trustpilot at scale.
- **Productised extras & loyalty:** Unique Homestays has a dedicated **private-chef
  collection** and the **"Unique Folk Circle" rewards** programme (repeat-booking driver);
  both run **gift vouchers**, **wishlists**, and strong **owner-recruitment funnels**
  (interior design + property-finding bundled in).

**Gaps to exploit (where Taylor Made can win):**
1. **Productise the concierge harder than either.** Unique Homestays only productises a
   chef collection; Boutique Retreats leaves concierge in copy. Taylor Made has a *real,
   complimentary, agent-powered concierge + The Salcombe Kitchen* — make it a first-class,
   bookable, inline part of every stay. This is the moat neither matches.
2. **Show per-property guest review scores on listing cards.** *Neither leader does this* —
   a clear conversion/trust gap we can own (the volume player Coast & Country already does).
3. **Loyalty/rewards from day one** (a Taylor Made "Circle") — rare in the local set.
4. **Gift vouchers + wishlists** — cheap, expected at the top tier, currently absent.
5. **Faster, modern stack** — both are polished but not headless; our Next.js + CWV edge is
   a real SEO/mobile advantage.

**Net:** match their editorial polish, trust stack, filtering/map, vouchers/wishlist/loyalty
and enquiry-led model — then **beat them on the productised, AI-powered concierge** (the one
thing they can't easily replicate) and on **per-property reviews + performance**.

**The closest local rival — Finest Stays (ex-Salcombe Finest):** same boutique-luxury,
hyper-local, founder-led, concierge positioning, with a genuinely strong offer (private
chef, champagne cruises, helicopter, boat charter), gift vouchers, rich search with a
flexibility toggle, 4.9/5 reviews and press/membership badges. **This is the brand to beat.**
Our edge cannot be merely "we have a concierge" — Finest Stays already does. It must be the
**AI-powered, productised, inline, always-on concierge** from the platform (anticipatory,
remembers every guest, books and bills extras in the flow) plus a **slicker, faster booking
experience and per-property reviews**. Position: *Finest Stays-level luxury and concierge,
with a smarter, more seamless booking and a concierge that actually scales.*

**Common gaps across the whole local set (quick wins):** virtually no one runs **loyalty/
rewards**, **virtual tours/video**, or shows **per-property review scores on listing cards**;
gift vouchers are inconsistent. These are cheap, expected-at-tier features we can lead on.
