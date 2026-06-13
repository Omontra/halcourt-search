# Concierge OS — Build Plan

> Working name: **"Valet"** (placeholder). An AI-native operating system for boutique
> luxury holiday-let operators. Lets **one person** run marketing, sales and client
> experience to a standard that feels *more* personal than today's white-glove
> operators — by giving them a team of autonomous AI agents with a shared memory of
> every guest, property and supplier.
>
> Decisions locked with stakeholder:
> - **Commercial model:** SaaS product (multi-tenant). Taylor Made-style operator is the design archetype & first customer.
> - **Build approach:** Hybrid — we build the booking/CRM/guest-experience core; we integrate channel managers, payments, smart locks, accounting.
> - **Automation style:** Autonomous agents (act end-to-end, escalate edge cases) — with a hard guardrail/oversight layer so it stays on-brand and safe.
> - **MVP focus:** Client experience first (the concierge journey).

---

## 1. Thesis & positioning

The market splits into two camps, with a gap between them:

| Camp | Examples | Strength | Weakness |
|---|---|---|---|
| **Commodity automation** | Guesty, Hostaway, Lodgify | Scales operations; cheap | Generic, templated, transactional. Automation feels robotic. Built for *volume hosts*, not *personal service*. |
| **Manual luxury** | Taylor Made Salcombe, Boutique Retreats | Genuinely personal; high trust | Doesn't scale. Value trapped in the founder's head. Runs on Wix + spreadsheets. Ceiling ~15 properties per person. |

**The gap = "personal at scale."** No one delivers *anticipatory, hyper-personal*
concierge service with the leverage of automation. That's the wedge.

**Why now:** frontier LLMs can hold a coherent, on-brand, multi-turn relationship
with a guest, remember everything across years, reason over a supplier network, and
*take actions* (book the chef, charge the card, dispatch the cleaner) — not just draft
text. The "automated but personal" contradiction is now technically solvable.

**One-line positioning:** *"Give every guest a concierge who never forgets them — and
give the owner their life back."*

---

## 2. Product vision

A solo operator + Valet performs like a 10-person luxury hospitality team:

- Guests experience a single, attentive concierge available 24/7 on WhatsApp who
  **remembers their last visit, anticipates needs, and quietly makes things happen**.
- The operator works an **exception feed**, not an inbox — approving the rare
  high-stakes call, adding human warmth at key moments, and watching the business run.
- The business compounds: every interaction enriches a **Guest Memory Graph** that
  makes the next stay more personal — a moat that deepens with use and can't be copied.

The differentiator is not "AI replies to messages." It is **memory + anticipation +
autonomous fulfilment**, wrapped in the operator's own brand voice.

---

## 3. How "personal at scale" actually works (the core mechanism)

Four pillars, all riding on shared memory:

1. **Guest Memory Graph** — a longitudinal, structured profile per guest: party
   composition, kids' ages, dietary/wine/activity preferences, accessibility, pets,
   special dates, past stays, spend, sentiment history, do/don't list, and *how they
   like to be spoken to*. This is the asset.
2. **Brand-voice engine** — every guest-facing word is generated in the operator's
   tuned voice (tone, phrases, signature), so 1,000 personal messages still sound like
   *them*, not a bot.
3. **Proactive anticipation** — agents act on triggers, not just requests: *"Last July
   you loved the seafood at the Crab Shed — I've held a table for Friday at 7:30, want
   me to confirm?"* Calendar-aware (anniversaries, weather, tides, local events).
4. **Human-in-the-loop at the right moments** — autonomy with a policy engine: routine
   and low-risk actions run end-to-end; high-stakes ones (big spend, complaints, VIPs,
   novel requests) escalate to the operator with full context and a one-tap decision.

---

## 4. System architecture

```
                         ┌─────────────────────────────────────────────┐
   GUEST  ◄── WhatsApp ──►│              CHANNEL LAYER                   │
           SMS / email    │   (Twilio/360dialog WhatsApp, Resend email,  │
           web portal     │    guest PWA, web concierge widget)          │
                         └───────────────────────┬─────────────────────┘
                                                 │  events
                         ┌───────────────────────▼─────────────────────┐
                         │           ORCHESTRATOR / ROUTER              │
                         │  classifies events → dispatches to an agent  │
                         │        (Claude Agent SDK, event-driven)      │
                         └───┬───────┬────────┬────────┬────────┬──────┘
                             │       │        │        │        │
                      ┌──────▼─┐ ┌──▼───┐ ┌──▼────┐ ┌─▼────┐ ┌─▼─────┐
        SPECIALIST    │CONCIERGE│ │SALES │ │MARKET-│ │ OPS  │ │ OWNER │
        AGENTS        │ (MVP)   │ │      │ │ ING   │ │      │ │+REVENUE│
                      └────┬────┘ └──┬───┘ └───┬───┘ └──┬───┘ └───┬───┘
                           └─────────┴────┬────┴────────┴─────────┘
                                          │ read/write
                  ┌───────────────────────▼──────────────────────────┐
                  │             SHARED MEMORY / DATA CORE             │
                  │  Guest Memory Graph · Property KB · Supplier      │
                  │  Network · Brand Voice · Bookings · Audit log     │
                  │       (Postgres + pgvector on Supabase)          │
                  └───────────────────────┬──────────────────────────┘
                                          │ tools (MCP servers)
                  ┌───────────────────────▼──────────────────────────┐
                  │                ACTION / INTEGRATION LAYER         │
                  │ PMS (Hostaway/Guesty) · Stripe + damage waiver   │
                  │ (Truvi/Waivo) · smart locks (Operto/RemoteLock)  │
                  │ · Xero · e-sign · supplier booking · calendars   │
                  └──────────────────────────────────────────────────┘

      ┌──────────────────────────────────────────────────────────────┐
      │   POLICY & GUARDRAIL ENGINE  (autonomy boundaries, spend caps,│
      │   escalation rules, prompt-injection defense, eval harness)   │
      │                              ▲                                 │
      │            OPERATOR CONSOLE  │  (mobile-first PWA):            │
      │   live guest feed · approval/escalation inbox · memory editor │
      │   · brand-voice settings · supplier directory · audit/undo    │
      └──────────────────────────────────────────────────────────────┘
```

**What we BUILD (our IP):** the orchestrator + agent mesh, the Guest Memory Graph,
the brand-voice engine, the policy/guardrail layer, the guest channels, and the
operator console. **What we INTEGRATE (commodity):** PMS/channel distribution,
payments, smart locks, accounting, e-sign. This is the "hybrid" decision in practice.

---

## 5. The agent team

| Agent | Owns | Autonomy default |
|---|---|---|
| **Concierge** *(MVP)* | Guest relationship end-to-end: pre-arrival profiling & itinerary, in-stay 24/7 support, supplier booking, upsells, departure, review, rebooking, memory enrichment | High — acts within spend caps; escalates complaints/VIP/novel/large spend |
| **Sales** | Enquiry triage, qualification, personalised proposals & quotes, booking, deposits, contracts | Med — auto-quotes; human confirms bespoke/high-value |
| **Marketing** | On-brand social/content, SEO landing pages, lead capture & nurture, referral/loyalty, attribution | Med — drafts publish on schedule; human approves campaigns |
| **Ops** | Changeover scheduling, maintenance dispatch, compliance-certificate tracking, access codes | High for routine; human for spend/contractors |
| **Owner** | Owner statements/reports, payout summaries, owner comms, owner-stay blocking | Med — auto-reports; human approves anomalies |
| **Revenue** | Dynamic pricing recommendations, occupancy/yield optimisation | Low — recommends; human/operator policy sets rates |

All agents share one memory and one brand voice, so the guest never feels handed
between departments.

---

## 6. Technology stack (concrete)

Chosen to match the stakeholder's existing tooling (Vercel, Supabase, Resend, Sentry)
and to maximise one-person velocity.

- **Language:** TypeScript end-to-end (shared types across backend, agents, console).
- **Agents:** **Claude Agent SDK**, with tiered models —
  - **Opus 4.8** (`claude-opus-4-8`) for itinerary planning & sensitive/complex guest comms,
  - **Sonnet 4.6** (`claude-sonnet-4-6`) for general concierge dialogue & most agent work,
  - **Haiku 4.5** (`claude-haiku-4-5`) for triage, classification, extraction, high-volume.
  - **Prompt caching** for static property/brand context; **MCP servers** wrap each
    integration so agents call them as tools; context-management for long guest histories.
- **Data:** Postgres on **Supabase** (relational + Row-Level Security for multi-tenancy)
  + **pgvector** for semantic memory recall; Supabase Storage for docs/photos.
- **Channels (text-only — no voice):** **email** (Resend) + **messaging** (WhatsApp Business Platform via **Twilio**/**360dialog**, with SMS fallback) + the web guest portal. Voice/phone concierge is explicitly out of scope — every guest interaction is written, which keeps the brand voice consistent, gives the agents a clean text transcript to learn from, and is cheaper and simpler to build.
- **Frontend:** **Next.js** operator console (PWA, mobile-first) + guest web portal, on **Vercel**.
- **Eventing/scheduling:** **Inngest** or **Trigger.dev** for event-driven agent jobs and
  time-based triggers (T-minus pre-arrival, mid-stay check-in, post-stay review).
- **Observability:** **Sentry** + LLM tracing (e.g. Langfuse/Braintrust) for agent runs & evals.
- **Integrations:** Hostaway/Guesty API (PMS), Stripe + Truvi/Waivo (deposits/damage),
  Operto/RemoteLock (access), Xero (accounting), an e-sign provider.

---

## 7. Core data model (first cut)

`Operator` (tenant) · `Property` · `Booking` · `Guest` · `GuestProfile` (preferences,
memory facts, embeddings) · `Party` (members, ages) · `Supplier` (capabilities, lead
time, pricing, reliability) · `ServiceRequest`/`Upsell` (status, price, margin) ·
`Message` (channel, direction, agent, draft/sent) · `AgentAction` (what, why, autonomy
level, outcome) · `Policy` (autonomy boundaries) · `BrandVoice` · `AuditLog`.

Multi-tenant from day one (RLS keyed on `operator_id`).

---

## 8. MVP scope — Phase 1: the Concierge (client experience first)

**Design principle: layer on, don't rip out.** The operator keeps their existing PMS;
Valet ingests bookings and adds the concierge layer. Removes adoption friction →
faster pilots.

In scope:
1. **Booking ingestion** — pull confirmed bookings from PMS (Hostaway sandbox first) or
   manual entry → auto-create/update Guest Profile.
2. **Pre-arrival concierge** — autonomous personalised outreach; preference-capture
   conversation; itinerary proposal; relevant upsells; supplier pre-booking within caps;
   access codes + digital guidebook delivery.
3. **In-stay concierge** — 24/7 WhatsApp; proactive mid-stay check-in; real-time recs &
   bookings; issue triage → Ops/operator.
4. **Departure & post-stay** — checkout instructions; deposit handling; automated review
   request; rebooking nudge; **profile enrichment** (the memory compounds).
5. **Extras billing** — Stripe charge for paid services, pushed back to PMS/invoice.
6. **Operator console** — live guest feed; approval/escalation inbox; memory viewer/editor;
   brand-voice settings; supplier directory; full audit log + one-tap undo.
7. **Guardrails** — policy engine (spend caps, escalation triggers), prompt-injection
   defense on guest input, autonomy ramp (shadow → supervised → autonomous).

Out of scope for MVP: our own direct-booking engine, marketing agent, owner reporting,
dynamic pricing (these are later phases).

**MVP success criteria:** with one design-partner operator, the Concierge agent handles
the majority of guest interactions autonomously at or above the operator's own quality
bar (measured by operator override rate, guest CSAT, and upsell revenue per booking).

---

## 9. Phased roadmap

- **Phase 0 (weeks 1–3):** repo scaffold, data model, PMS ingestion, WhatsApp pipeline,
  Concierge agent in **shadow mode** (drafts to console only).
- **Phase 1 (weeks 4–10):** full Concierge MVP (§8); ramp shadow → supervised →
  autonomous-with-caps; pilot with one design-partner operator.
- **Phase 2 (Sales):** enquiry triage, instant personalised proposals, our hybrid
  direct-booking core, deposits & contracts.
- **Phase 3 (Marketing):** content/social agent, SEO pages, lead nurture, referral/loyalty.
- **Phase 4 (Owner + Revenue + Ops depth + scale):** owner reporting agent, dynamic
  pricing, deep ops/compliance automation, multi-operator onboarding, supplier marketplace.

---

## 10. Guardrails, trust & compliance (non-negotiable for autonomy)

- **Policy engine:** per-action autonomy by risk — spend caps for auto-booking suppliers,
  refund/comp limits, sentiment-triggered escalation (detected complaint/VIP), novel
  requests escalate.
- **No hallucinated commitments:** agents only confirm services after real supplier
  availability is checked via API/confirmation; promises are grounded in data.
- **Prompt-injection defense:** guest/supplier messages are untrusted input — sandbox
  tool permissions, never let message content escalate autonomy or trigger payments
  without policy checks.
- **Autonomy ramp:** every operator starts in shadow (drafts), graduates to supervised,
  then autonomous — earning trust per operator.
- **Auditability:** every autonomous action logged with its reasoning; operator feed +
  one-tap undo.
- **Data/payments:** GDPR (guest PII, right-to-erasure), PCI handled via Stripe (no raw
  card data), per-tenant isolation via RLS.
- **Sector compliance surfacing:** track per-property certs (gas/EICR/FRA/EPC/insurance)
  and flag expiries — a trust signal and a real operator pain.

---

## 11. Differentiation vs current industry

| Capability | Guesty/Hostaway | Manual luxury (Taylor Made) | **Valet** |
|---|---|---|---|
| Personalisation | Templated merge-fields | Real, human, unscalable | **Compounding memory graph, real + scalable** |
| Proactivity | Scheduled triggers | Depends on operator effort | **Anticipatory, context-aware** |
| Fulfilment | Suggests / notifies | Human does it all | **Agent books the chef, charges the card, dispatches the clean** |
| Operator load | Inbox management | Founder is the bottleneck | **Exception feed only** |
| Voice | Generic | The founder's | **The founder's voice, on every message, at scale** |
| Scale ceiling | High but impersonal | ~15 properties/person | **Personal *and* high-volume** |

---

## 12. Risks & open questions

- **Trust to go autonomous** with a luxury brand's guest relationships — mitigated by the
  shadow→supervised→autonomous ramp and tight guardrails.
- **Quality bar:** luxury guests are unforgiving; eval harness + human escalation essential.
- **Integration breadth:** PMS APIs vary; start with one (Hostaway) and expand.
- **Open questions for stakeholder:**
  1. Do we have a **design-partner operator** lined up (ideally Taylor Made-style)?
  2. First PMS to integrate — **Hostaway** (best API) vs whatever the partner uses?
  3. WhatsApp provider — **Twilio** vs 360dialog (cost/approval trade-offs)?
  4. Pilot budget & timeline, and the product **name/brand**?
  5. GDPR/data-residency stance for guest PII?

---

## 13. First implementation steps (Phase 0)

1. Create new repo; scaffold TS monorepo: `apps/console`, `apps/guest`,
   `services/agents`, `packages/core` (shared types/data access).
2. Supabase project + schema (§7) with RLS multi-tenancy.
3. Hostaway sandbox integration → booking ingestion → Guest Profile creation.
4. WhatsApp channel (Twilio) + inbound/outbound message pipeline.
5. Concierge Agent v0 (Claude Agent SDK) in **shadow mode** — drafts only.
6. Operator console v0: guest feed + approval inbox + memory viewer.
7. Policy/guardrail engine + audit log.
8. Stripe "extras" charge + a first supplier-booking tool.
9. Eval harness; ramp shadow → autonomous-with-caps.
10. Onboard design-partner operator for pilot.
```
