# CLAUDE.md

Project memory & working agreement for Claude Code (and any sub-agents) in this repo.
Read this first; keep it accurate as the project evolves.

---

## ⚙️ Use the skills (this section exists because we were skipping them)

**These are not optional. Apply them by default, and tell sub-agents to do the same.**

| When | Skill | Why |
|---|---|---|
| After writing/generating any non-trivial code | **`/code-review`** | Catch bugs + reuse/simplification issues before building further |
| Code touching payments, auth, external/user input, secrets | **`/security-review`** | This project handles guest PII + payments — review it |
| Confirming a change actually works (run the app, observe behaviour) | **`/verify`** | Don't claim "done" without observing it |
| Quality cleanup of changed code (reuse/efficiency/altitude) | **`/simplify`** | Keep the codebase clean |
| ANY work involving Claude/Anthropic models, the API, agents, MCP, pricing, model IDs, tool-use, caching | **`claude-api`** | **Never answer LLM/model questions from memory** — model IDs and pricing change |
| Multi-source, fact-checked research | **`deep-research`** | Fan-out + adversarial verification + citations |
| Recurring/scheduled tasks | **`/loop`** | Don't hand-roll polling with `sleep` |

**Sub-agents:** when you spawn an agent to build or change code, instruct it to run
`/code-review` (and `/security-review` where relevant) on its own output and to report the
result **before** handing back. Agents that only "do the task" and skip review are the bug
this section fixes.

**Design work:** actively avoid "AI slop" — no centred-hero + icon-grid + generic-carousel
clichés, no Inter/system default fonts; use characterful type, editorial/asymmetric layout,
real photography, restraint. For design-tool artifacts use the **Figma** skills
(`figma-generate-design` / `figma-use`) via the Figma MCP. (Note: "AI slop" is a *principle*
from our research, not a named skill.)

---

## What this repo is

Two distinct things live here:

1. **Halcourt Search marketing site** — the original repo: a static HTML/CSS/vanilla-JS site
   for an executive-search firm (root `*.html`, `css/`, `js/`, `api/contact.js`, deployed on
   Vercel). See `docs/PROJECT-REFERENCE.md`. Unrelated to the venture below.
2. **Taylor Made Salcombe / "Concierge OS" venture** — the active work on branch
   `claude/holiday-booking-concierge-le40o3`:
   - **Planning docs** in `docs/` (see index below).
   - **Design concepts** in `concepts/` (3 art-directed static homepage concepts).
     **Concept B — Cinematic Dark is the chosen direction.**
   - **Guest website app** in `apps/web/` (Next.js — the real build).

> Treat these as separate projects. Don't bleed Halcourt content into the venture or vice
> versa. Don't add venture docs/app changes to the Halcourt static site.

---

## docs/ index (read before working on the venture)

- `docs/concierge-platform-plan.md` — business vision, pricing & unit economics.
- `docs/concierge-platform-technical-design.md` — engineering design (architecture, data
  model, agents, payments, security, phased delivery).
- `docs/guest-website-plan.md` — website research, design & build plan + **locked scope
  decisions** (§17).
- `docs/PROJECT-REFERENCE.md` — the *Halcourt* static site reference (different project).

---

## Locked decisions (quick reference — details in the docs)

- **Product:** multi-tenant SaaS ("Concierge OS"); Taylor Made is the design archetype /
  first customer. The website build, however, is **bespoke Taylor Made first** (kept clean
  enough to generalise later).
- **Build approach:** hybrid — build the concierge/CRM/memory/guest core; integrate PMS,
  payments, smart locks, accounting.
- **Automation:** autonomous agents with a policy/guardrail layer (shadow → supervised →
  autonomous ramp).
- **Channels:** **email + messaging only — no voice.**
- **Pricing:** **2% of GBV collected as a Stripe Connect application fee**; card processing
  is operator pass-through; integrated-payments spread is a later revenue line.
- **Website:** website-first with a light backend; **hybrid booking** (instant-book on
  select properties + enquiry on the rest); brand = refresh & elevate keeping equity
  (Concept B); reuse existing photography; **reviews are first-party via the concierge
  post-stay flow** (seed launch with existing testimonials as unscored "guest stories").

---

## The guest website app — `apps/web/`

Next.js (App Router) + TypeScript (strict) + Tailwind v3. Cormorant Garamond + Jost fonts.

```bash
cd apps/web
npm install
npm run dev      # http://localhost:3000
npm run build    # must stay green
```

- **Pages:** `/`, `/stays` (search/filter), `/stays/[slug]` (detail + hybrid booking panel +
  inline concierge add-ons), `/concierge`, `/private-catering`, `/enquiry`, `/book`.
- **Data seam:** all data flows through `lib/data.ts` (currently mock from
  `lib/properties.ts`). Swap its bodies for Sanity GROQ later **without touching pages**.
  Sanity schema files live in `apps/web/sanity/schemas/`.
- **Mock vs real (TODOs):**
  1. **Payments** — `/api/book` is a stub → wire **Stripe Connect** (PaymentIntent on the
     operator's connected account, **2% `application_fee_amount`**) per the technical-design
     doc §6. Run `/security-review` when you do.
  2. **Content/images** — Sanity + real Taylor Made photography (currently LoremFlickr
     placeholders that degrade to dark fallbacks).
  3. **Availability** — `getAvailability` → real PMS feed.
  4. **Enquiry/newsletter** — `/api/enquiry` → Resend + a leads store.

---

## Conventions

- **Branch:** develop on `claude/holiday-booking-concierge-le40o3`. Never push elsewhere
  without explicit permission.
- **Commits:** clear, descriptive messages; commit + push when work is complete (the env is
  ephemeral — uncommitted work is lost). Keep the session-link footer already in use.
- **Never commit** `node_modules/`, `.next/`, build output, or `.env*` (already git-ignored
  in `apps/web`). Verify with `git status` before committing; don't `git add -A` blindly.
- **Money** is stored/handled in **minor units** (pence) + currency code; default **GBP**.
- **Don't leave servers running** after screenshots/verification — kill them and confirm a
  clean working tree.
- Prefer the dedicated file/search tools over shell `cat`/`grep`/`find`.
