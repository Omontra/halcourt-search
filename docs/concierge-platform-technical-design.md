# Concierge OS — Technical Design Document

> Working name: **Valet**. Companion to `concierge-platform-plan.md` (vision, pricing,
> unit economics). This document is the **engineering plan**: architecture, data model,
> agent design, integrations, payment flow, security, and phased delivery.
>
> Status: draft for review. Decisions locked with stakeholder:
> multi-tenant SaaS · hybrid build (own concierge/CRM/memory core, integrate PMS /
> payments / locks / accounting) · autonomous agents with a guardrail layer ·
> client-experience-first MVP · **channels: email + messaging only, no voice** ·
> pricing: **2% of GBV collected as a Stripe Connect application fee**, card processing
> is operator pass-through, integrated-payments spread is a Phase-2 revenue line.

---

## 1. Goals & non-goals

**Goals**
- A multi-tenant platform where one operator runs marketing, sales and (primarily)
  client experience for a boutique luxury holiday-let business at a quality that feels
  *more* personal than today's manual operators.
- Autonomous AI agents that act end-to-end (draft, decide, fulfil, bill) within a
  policy/guardrail envelope, escalating edge cases to the operator.
- A compounding **Guest Memory Graph** as the core IP.
- Layer onto an operator's existing PMS rather than replace it (low adoption friction).

**Non-goals (v1)**
- No voice/telephony channel.
- No own booking engine / channel manager (integrate, don't rebuild) until Phase 2.
- No native mobile apps (operator console is a PWA; guest surface is web + email + chat).
- Not a general-purpose PMS; we are the concierge/experience + automation layer.

**Success criteria (MVP):** with one design-partner operator, the Concierge agent
handles the majority of guest interactions autonomously at/above the operator's own
quality bar — measured by operator **override rate**, **guest CSAT**, and
**ancillary revenue per booking**.

---

## 2. System architecture

### 2.1 Context

```
  Guest ──email / WhatsApp / SMS / web portal──┐
                                               ▼
                                   ┌────────────────────────┐
                                   │   Channel Gateway       │  inbound normalise,
                                   │   (webhooks: Twilio,    │  outbound send,
                                   │    Resend, web)         │  idempotency
                                   └───────────┬────────────┘
                                               │ normalised MessageEvent
                                   ┌───────────▼────────────┐
                                   │   Orchestrator          │  classify → route
                                   │   (Claude Agent SDK)    │  (Haiku triage first)
                                   └───────────┬────────────┘
            ┌──────────────┬──────────────┬────┴────────┬──────────────┐
            ▼              ▼              ▼             ▼              ▼
        Concierge      Sales         Marketing       Ops           Owner
         agent         agent          agent         agent          agent
            └──────────────┴───────┬──────┴─────────────┴──────────────┘
                                   │ tools (MCP) + reads/writes
                ┌──────────────────▼───────────────────┐
                │            Core data (Supabase)        │
                │  Postgres + pgvector + RLS, storage    │
                └──────────────────┬───────────────────┘
                                   │ integration adapters
   ┌──────────┬──────────┬─────────┴────────┬───────────┬───────────┐
   ▼          ▼          ▼                   ▼           ▼           ▼
  PMS       Stripe    Smart locks         Accounting   Suppliers   Email/
 (Hostaway) Connect   (Operto/RemoteLock) (Xero)       (booking)   WhatsApp

  Cross-cutting: Policy/Guardrail engine · Inngest (events+schedules) ·
                 Sentry + LLM tracing · Audit log · Operator console (Next.js PWA)
```

### 2.2 Component responsibilities

| Component | Responsibility |
|---|---|
| **Channel Gateway** | Verify provider webhooks, normalise inbound to a `MessageEvent`, dedupe, persist, emit `message.received`. Send outbound via the right provider. Stateless. |
| **Orchestrator** | Classify each event (Haiku), load context, route to the specialist agent, enforce the autonomy policy on proposed actions. |
| **Specialist agents** | Concierge (MVP), Sales, Marketing, Ops, Owner — each a Claude Agent SDK agent with a scoped toolset and system prompt, sharing memory + brand voice. |
| **Core data** | Source of truth: tenants, properties, bookings, guests, memory, suppliers, messages, actions, policies, audit. Postgres + pgvector, RLS per tenant. |
| **Integration adapters** | Uniform interfaces over PMS, payments, locks, accounting, suppliers. Each provider is one adapter implementation. |
| **Policy/Guardrail engine** | Evaluates every agent-proposed action against tenant policy (spend caps, escalation triggers, autonomy stage); approves, auto-executes, or escalates. |
| **Inngest** | Event bus + durable workflows + cron (pre-arrival T-minus, mid-stay check-in, post-stay review, nightly enrichment, batch jobs). |
| **Operator console** | Next.js PWA: live guest feed, approval/escalation inbox, memory editor, brand-voice settings, supplier directory, audit log, billing. |

### 2.3 Why this shape

- **Event-driven + durable workflows** (Inngest) because the domain is full of *time-based*
  triggers (T-7 days pre-arrival, mid-stay, post-checkout) and *long-running* multi-step
  fulfilment that must survive restarts and retries.
- **Adapter pattern** isolates third-party churn (PMS APIs vary; we start with one).
- **Policy engine as a separate layer** keeps autonomy auditable and tunable per tenant
  without touching agent code — essential for the shadow→autonomous trust ramp.

---

## 3. Tenancy & data model

### 3.1 Multi-tenancy

- Single Postgres, **row-level security** keyed on `tenant_id` (the operator). Every
  table carries `tenant_id`; RLS policies gate all access to the authenticated tenant.
- App connects through Supabase with the tenant context set per request
  (`set_config('app.tenant_id', ...)`); service-role used only by trusted backend jobs
  with explicit tenant scoping.
- Storage buckets namespaced by `tenant_id/`.

### 3.2 Core schema (first cut, Postgres)

```sql
-- Tenant = operator (the SaaS customer)
create table tenant (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  brand_voice   jsonb not null default '{}',     -- tone, phrases, signature, examples
  autonomy_stage text not null default 'shadow', -- shadow | supervised | autonomous
  stripe_account_id text,                        -- connected account (Stripe Connect)
  settings      jsonb not null default '{}',
  created_at    timestamptz not null default now()
);

create table app_user (                          -- operator-side users
  id         uuid primary key default gen_random_uuid(),
  tenant_id  uuid not null references tenant(id),
  email      text not null,
  role       text not null default 'owner',      -- owner | staff | viewer
  created_at timestamptz not null default now()
);

create table property (
  id          uuid primary key default gen_random_uuid(),
  tenant_id   uuid not null references tenant(id),
  pms_ref     text,                              -- external PMS id
  name        text not null,
  address     jsonb,
  knowledge   jsonb not null default '{}',       -- quirks, manuals, local recs
  access      jsonb not null default '{}',       -- lock provider, codes policy
  created_at  timestamptz not null default now(),
  unique (tenant_id, pms_ref)
);

create table guest (
  id          uuid primary key default gen_random_uuid(),
  tenant_id   uuid not null references tenant(id),
  full_name   text,
  emails      text[] not null default '{}',
  phones      text[] not null default '{}',      -- E.164; WhatsApp/SMS routing
  created_at  timestamptz not null default now()
);

-- The moat: structured, evolving memory per guest
create table guest_profile (
  guest_id    uuid primary key references guest(id),
  tenant_id   uuid not null references tenant(id),
  preferences jsonb not null default '{}',       -- diet, wine, activities, accessibility, pets
  party       jsonb not null default '{}',       -- members, kids' ages
  facts       jsonb not null default '[]',       -- atomic memory facts w/ source + confidence
  do_not      jsonb not null default '[]',
  comms_style text,
  sentiment   numeric,                           -- rolling
  updated_at  timestamptz not null default now()
);

-- Semantic recall over memory facts / past messages
create table memory_embedding (
  id         uuid primary key default gen_random_uuid(),
  tenant_id  uuid not null references tenant(id),
  guest_id   uuid references guest(id),
  kind       text not null,                      -- fact | message | itinerary
  content    text not null,
  embedding  vector(1536) not null,
  created_at timestamptz not null default now()
);
create index on memory_embedding using hnsw (embedding vector_cosine_ops);

create table booking (
  id           uuid primary key default gen_random_uuid(),
  tenant_id    uuid not null references tenant(id),
  property_id  uuid not null references property(id),
  guest_id     uuid not null references guest(id),
  pms_ref      text,
  status       text not null,                    -- enquiry|confirmed|in_stay|departed|cancelled
  check_in     date not null,
  check_out    date not null,
  gbv_minor    bigint not null default 0,        -- room revenue, minor units (pence)
  currency     text not null default 'GBP',
  created_at   timestamptz not null default now(),
  unique (tenant_id, pms_ref)
);

create table supplier (
  id          uuid primary key default gen_random_uuid(),
  tenant_id   uuid not null references tenant(id),
  category    text not null,                     -- chef|boat|spa|childcare|transfer|grocery
  name        text not null,
  capabilities jsonb not null default '{}',      -- lead time, capacity, pricing, area
  contact     jsonb not null default '{}',       -- booking method (email/whatsapp/api)
  reliability numeric default 1.0,
  created_at  timestamptz not null default now()
);

-- Concierge extras / upsells (the billable value-add)
create table service_request (
  id           uuid primary key default gen_random_uuid(),
  tenant_id    uuid not null references tenant(id),
  booking_id   uuid not null references booking(id),
  supplier_id  uuid references supplier(id),
  type         text not null,                    -- chef|experience|midstay_clean|early_checkin...
  status       text not null default 'proposed', -- proposed|approved|booked|fulfilled|cancelled
  price_minor  bigint not null default 0,        -- charged to guest
  cost_minor   bigint not null default 0,        -- paid to supplier
  is_ancillary boolean not null default true,    -- counts toward rev-share / payfac
  meta         jsonb not null default '{}',
  created_at   timestamptz not null default now()
);

create table message (
  id           uuid primary key default gen_random_uuid(),
  tenant_id    uuid not null references tenant(id),
  booking_id   uuid references booking(id),
  guest_id     uuid references guest(id),
  channel      text not null,                    -- email|whatsapp|sms|web
  direction    text not null,                    -- inbound|outbound
  provider_id  text,                             -- external id for idempotency/dedupe
  agent        text,                             -- which agent authored (outbound)
  state        text not null default 'sent',     -- draft|pending_approval|sent|failed
  body         text not null,
  created_at   timestamptz not null default now(),
  unique (tenant_id, channel, provider_id)
);

-- Every autonomous (or proposed) action, for audit + undo
create table agent_action (
  id           uuid primary key default gen_random_uuid(),
  tenant_id    uuid not null references tenant(id),
  booking_id   uuid references booking(id),
  agent        text not null,
  tool         text not null,                    -- send_message|book_supplier|charge_extra...
  input        jsonb not null,
  autonomy     text not null,                    -- auto|approved|escalated
  reasoning    text,
  status       text not null,                    -- proposed|executed|reverted|rejected
  result       jsonb,
  created_at   timestamptz not null default now()
);

create table policy (                            -- per-tenant autonomy boundaries
  tenant_id      uuid primary key references tenant(id),
  spend_cap_minor bigint not null default 15000, -- auto-book suppliers under this (£150)
  refund_cap_minor bigint not null default 0,
  escalate_on    text[] not null default '{complaint,vip,novel,refund}',
  rules          jsonb not null default '{}'
);

create table payment (                           -- mirror of Stripe activity
  id              uuid primary key default gen_random_uuid(),
  tenant_id       uuid not null references tenant(id),
  booking_id      uuid references booking(id),
  service_request_id uuid references service_request(id),
  stripe_pi       text,                          -- PaymentIntent id
  amount_minor    bigint not null,
  app_fee_minor   bigint not null default 0,     -- our 2% application fee
  kind            text not null,                 -- deposit|balance|extra|damage_hold
  status          text not null,                 -- requires_action|succeeded|refunded
  created_at      timestamptz not null default now()
);

create table audit_log (
  id          bigint generated always as identity primary key,
  tenant_id   uuid not null references tenant(id),
  actor       text not null,                     -- user:<id> | agent:<name> | system
  action      text not null,
  entity      text,
  entity_id   uuid,
  data        jsonb,
  created_at  timestamptz not null default now()
);
```

> `gbv_minor` and the `payment`/`service_request` amounts are the source for billing
> (2% of GBV) and ancillary metrics. All money stored in **minor units** + currency.

---

## 4. Agent architecture

### 4.1 Orchestration

- **Framework:** Claude Agent SDK (TypeScript). Each specialist agent is an SDK agent
  with a scoped system prompt + tool set; the **Orchestrator** is a thin router, not an
  LLM mega-prompt.
- **Routing:** on `message.received`, a **Haiku 4.5** classifier tags intent
  (concierge request / enquiry / complaint / admin / spam) and urgency, then dispatches
  to the right agent. Cheap, fast, high-volume.
- **Model tiering:**
  - **Haiku 4.5** — triage, classification, extraction, routing.
  - **Sonnet 4.6** — general concierge dialogue (the workhorse).
  - **Opus 4.8** — itinerary planning, sensitive/complex comms, escalation reasoning.
  - Use **adaptive thinking** + tuned `effort` per agent; `effort: high` for planning,
    lower for routine dialogue.
- **Context strategy:** the guest's memory graph + property knowledge + brand voice form
  a **cached prefix** (`cache_control`) re-used across turns — the dominant cost lever
  (≈10× saving on the repeated context). Per-turn volatile content (the new message)
  goes after the last breakpoint. Use **context editing/compaction** for long stays.
- **Batch API (50% off)** for non-realtime agent work: marketing content, owner reports,
  nightly memory enrichment.

### 4.2 Tools (exposed to agents as MCP tools / SDK tools)

| Tool | Agent(s) | Side-effect? | Gated by policy? |
|---|---|---|---|
| `recall_memory(guest, query)` | all | no | no |
| `update_memory(guest, facts)` | all | yes (write) | no |
| `send_message(channel, body)` | concierge, sales | yes (external) | yes (autonomy stage) |
| `propose_itinerary(booking)` | concierge | no | no |
| `book_supplier(service_request)` | concierge, ops | yes (external + £) | yes (spend cap) |
| `charge_extra(service_request)` | concierge | yes (£) | yes |
| `schedule_task(type, when)` | ops | yes | partial |
| `set_access_code(booking)` | ops | yes (lock) | partial |
| `create_quote(enquiry)` | sales | no | no |
| `generate_content(brief)` | marketing | no (draft) | yes (publish) |
| `owner_report(period)` | owner | no (draft) | partial |

- **Bash/code execution is not exposed to guest-facing agents.** All side-effects go
  through typed, gateable tools (so the policy engine can intercept, the console can
  render, and the audit log can capture). This is deliberate: untrusted guest input must
  never reach an arbitrary-execution surface.

### 4.3 Autonomy & guardrails

Every side-effecting tool call becomes a **proposed `agent_action`**. The policy engine
decides:

1. **auto** — within caps and the tenant's autonomy stage → execute, log, surface in feed.
2. **escalate** — trips an `escalate_on` trigger (complaint/VIP/novel/refund) or exceeds
   a cap → create an approval item; operator one-taps allow/deny in the console.
3. **shadow** — in `shadow` stage, *nothing* executes; agents only produce drafts for
   operator review (used to earn trust before going live per tenant).

**Prompt-injection defence:** guest/supplier message content is untrusted. Agents receive
it as data, never as instructions; tool permissions are fixed per agent; no tool can
escalate autonomy or move money without passing the policy check. Operator instructions
ride the **system role** (mid-conversation system messages), not user-channel text.

**No hallucinated commitments:** `book_supplier`/`charge_extra` only *confirm* to the
guest after the adapter returns success (real availability/booking), not on intent.

### 4.4 Eval harness

- Golden-transcript regression set per agent (graded by an LLM judge + spot human review).
- Offline simulation of full booking lifecycles before any tenant goes autonomous.
- Per-tenant rollout gate: shadow → supervised (operator approves) → autonomous-with-caps,
  promoted only when override rate < threshold on real traffic.

---

## 5. Channels (email + messaging only)

### 5.1 Inbound pipeline

```
provider webhook → verify signature → Channel Gateway
  → dedupe on (tenant, channel, provider_id)
  → resolve/create guest + booking (match phone/email)
  → persist message(direction=inbound)
  → emit Inngest event `message.received`
```

- **WhatsApp/SMS:** Twilio (or 360dialog) Business Platform. E.164 phone is the routing
  key to `guest`.
- **Email:** Resend inbound (or a forwarding/parse webhook). Thread via message-id headers.
- **Web portal:** authenticated guest session posts to our API → same `MessageEvent`.

### 5.2 Outbound

- Agent emits `send_message` → policy check → on approve/auto, Channel Gateway sends via
  the originating channel (reply on the channel the guest used), persists `direction=outbound`.
- **WhatsApp constraints handled:** outside the 24-hour service window, use approved
  message templates; inside it, free-form. Service conversations are largely free; utility/
  marketing templates carry per-conversation fees (a cost line, not blocking).
- **Idempotency:** outbound sends keyed by `agent_action.id` to avoid double-send on retry.

### 5.3 Explicitly no voice

No telephony/transcription. Urgent in-stay issues are handled by a **human-escalation
phone number that rings the operator directly** — outside the AI; the agents stay
text-only. This keeps transcripts clean (memory-graph quality), the brand voice
consistent, and the build simpler.

---

## 6. Payments (Stripe Connect)

### 6.1 Model

- Each operator (tenant) is a **Stripe connected account** (Standard/Express).
- The guest pays; Stripe deducts its **processing fee from the operator's settlement**
  (operator pass-through, as today). We take our **2% of GBV as an `application_fee_amount`**
  on the PaymentIntent → routed to the platform account. Clean separation: card fees are
  never absorbed by our 2%.
- **Why Connect is required for the 2% model:** it makes the fee **auto-collected** on every
  transaction (no invoicing off self-reported bookings) and makes the processing fee
  transparently the operator's. %-of-GBV pricing and owning the rail are the same decision.

### 6.2 Flows

| Flow | Mechanism |
|---|---|
| Booking deposit / balance | PaymentIntent on connected account, `application_fee_amount = 2% × gbv`, `on_behalf_of` operator |
| Concierge extras (ancillary) | Separate PaymentIntent per `service_request`; `is_ancillary=true` for metrics; payfac upside later applies here |
| Damage deposit | Manual-capture PaymentIntent (pre-auth) or a waiver product (Truvi/Waivo) — not GBV, no app fee |
| Supplier payout | Out of scope for v1 rail (operator pays suppliers); later: Connect transfers |
| Reconciliation | Stripe webhooks → `payment` table; nightly reconcile against `booking`/`service_request` |

### 6.3 Where the 2% is computed

- On **room GBV only** (`booking.gbv_minor`). Extras have their own PaymentIntents and
  are tracked for ancillary metrics / the optional rev-share or payfac spread — they are
  **not** double-charged the 2% unless product decides otherwise.
- App-fee amounts mirrored into `payment.app_fee_minor` for our own revenue reporting.

### 6.4 Phase-2 revenue line (payfac spread)

Once volume justifies it and the regulatory position is confirmed, present operators a
blended processing rate and keep the spread over Stripe wholesale as a second revenue
stream (the Toast/Mindbody model). Pure pass-through first; spread later.

### 6.5 Webhooks & compliance

- Verify Stripe webhook signatures; idempotent handlers keyed on event id.
- **PCI:** no raw card data touches our servers (Stripe Elements / Checkout).
- Connect onboarding handles operator KYC; platform-account obligations reviewed before
  any payfac spread (FCA/PSD2 implications of facilitation vs pure platform).

---

## 7. Integrations (adapter pattern)

Each external system implements a narrow interface; one adapter per provider.

```ts
interface PmsAdapter {
  listBookings(since: Date): Promise<ExternalBooking[]>;
  getBooking(ref: string): Promise<ExternalBooking>;
  subscribe(webhookUrl: string): Promise<void>;   // if supported
}

interface LockAdapter {
  issueCode(propertyRef: string, window: DateRange): Promise<{ code: string }>;
  revokeCode(codeId: string): Promise<void>;
}

interface AccountingAdapter {
  pushOwnerStatement(stmt: OwnerStatement): Promise<void>;
}

interface SupplierChannel {            // how we actually book a supplier
  request(req: ServiceRequest): Promise<BookingResult>;  // email/whatsapp/api
}
```

- **PMS first:** Hostaway (best API) — ingest confirmed bookings → upsert `booking` +
  create/merge `guest`/`guest_profile`. Poll + webhooks where available.
- **Locks:** Operto / RemoteLock — issue per-booking codes, auto-revoke at checkout.
- **Accounting:** Xero — push owner statements (Owner agent, Phase 4).
- **Suppliers:** most are email/WhatsApp, not API — the `SupplierChannel` for those is the
  Concierge agent composing and sending a structured request and parsing the reply
  (human-confirmed until trusted).

---

## 8. API & eventing

### 8.1 Surfaces

- **Operator console ↔ backend:** typed RPC (tRPC) over the Next.js API — feed, approvals,
  memory edits, settings, billing.
- **Inbound webhooks:** `/webhooks/{twilio,resend,stripe,hostaway}` — signature-verified,
  fast-ack, enqueue to Inngest.
- **Guest web portal:** authenticated session endpoints (guidebook, extras, messaging).

### 8.2 Inngest events & schedules

| Event / schedule | Triggers |
|---|---|
| `booking.ingested` | create guest profile, plan pre-arrival timeline |
| `message.received` | orchestrator → agent turn |
| `agent.action.proposed` | policy evaluation → auto/escalate |
| cron `pre_arrival` (T-7/T-2 days) | concierge outreach, preference capture, itinerary, access codes |
| cron `mid_stay` | proactive check-in |
| cron `post_stay` (T+1 day) | review request, rebooking nudge, memory enrichment |
| cron `nightly` | batch enrichment, pricing hooks, compliance-cert expiry checks |

Durable Inngest functions give automatic retries, backoff, and step-level idempotency for
multi-step fulfilment (e.g. propose itinerary → book chef → charge extra → confirm).

---

## 9. Security, privacy, compliance

- **Tenant isolation:** Postgres RLS on `tenant_id`; storage namespaced; secrets per
  integration stored in a secrets manager, never in prompts or the DB in plaintext.
- **GDPR:** guests are EU/UK PII. Support right-to-erasure (cascade delete + embedding
  purge), data export, retention policy, DPA with operators (we are processor, operator is
  controller). Lawful basis = contract performance for the booking.
- **PII in LLM calls:** minimise; pass structured profile, not raw dumps. Use a
  data-retention-compliant model configuration.
- **Prompt injection:** see §4.3 — untrusted content as data, fixed tool perms, policy gate
  on money/external actions, operator instructions on the system channel.
- **PCI:** delegated to Stripe (no card data on our servers).
- **Auditability:** every agent action and money movement logged with reasoning; operator
  one-tap undo where reversible.
- **Least privilege:** integration credentials scoped to the minimum; service-role DB
  access only in trusted jobs with explicit tenant scoping.

---

## 10. Observability & quality

- **Sentry** for app errors; structured logs with `tenant_id`/`booking_id` correlation.
- **LLM tracing** (Langfuse/Braintrust): every agent run — prompt, tools, tokens, cost,
  latency — tagged by tenant/agent/model for cost attribution and eval.
- **Product metrics:** override rate, escalation rate, CSAT, ancillary revenue/booking,
  rebooking rate, response latency — per tenant, surfaced in the console.
- **Cost guardrails:** per-tenant token budgets and alerts; batch where non-realtime.

---

## 11. Tech stack & infra

| Layer | Choice |
|---|---|
| Language | TypeScript end-to-end (shared types across console, agents, core) |
| Agents | Claude Agent SDK; Opus 4.8 / Sonnet 4.6 / Haiku 4.5; prompt caching; MCP tools; adaptive thinking + effort |
| Data | Supabase Postgres + pgvector + RLS; Supabase Storage |
| Web | Next.js (operator console PWA + guest portal) on Vercel |
| Eventing/jobs | Inngest (or Trigger.dev) — events, durable workflows, cron |
| Channels | Twilio / 360dialog (WhatsApp + SMS); Resend (email) |
| Payments | Stripe Connect (+ Truvi/Waivo for damage) |
| Integrations | Hostaway (PMS), Operto/RemoteLock (locks), Xero (accounting) |
| Observability | Sentry + Langfuse/Braintrust |
| Repo | TS monorepo: `apps/console`, `apps/guest`, `services/agents`, `services/gateway`, `packages/core`, `packages/adapters` |

Environments: `dev` / `staging` / `prod`, separate Supabase + Stripe (test) projects; CI on
PRs (typecheck, test, eval smoke); preview deploys via Vercel.

---

## 12. Phased delivery

**Phase 0 — Foundations (wks 1-3)**
- Monorepo scaffold; Supabase schema (§3) + RLS; auth (operator console).
- Channel Gateway (Twilio + Resend inbound/outbound, dedupe).
- Hostaway adapter → `booking.ingested` → guest profile creation.
- Concierge agent v0 in **shadow mode** (drafts to console only).
- Inngest wiring; Sentry + tracing.

**Phase 1 — Concierge MVP (wks 4-10)**
- Full pre-arrival → in-stay → post-stay concierge flows (§8.2 crons).
- Memory graph read/write + pgvector recall; brand-voice prefix + caching.
- Policy/guardrail engine + audit + operator approval inbox; autonomy ramp.
- Stripe Connect: deposits/balance with 2% app fee; extras billing; damage holds.
- Operator console: feed, approvals, memory editor, supplier directory, billing.
- Eval harness; design-partner pilot.

**Phase 2 — Sales + payments upside**
- Enquiry triage, instant personalised quotes/proposals; own direct-booking hooks.
- Integrated-payments spread (payfac) evaluation + rollout.

**Phase 3 — Marketing**
- Content/social agent, SEO pages, lead nurture, referral/loyalty.

**Phase 4 — Owner/Revenue/Ops depth + scale**
- Owner reporting agent (Xero), dynamic pricing hooks, compliance tracking, smart-lock
  automation, multi-operator onboarding, supplier marketplace.

---

## 13. Open technical questions

1. **PMS of record for the pilot** — Hostaway vs the partner's actual PMS (drives the first adapter).
2. **WhatsApp provider** — Twilio vs 360dialog (template approval, pricing, BSP terms).
3. **Stripe Connect type** — Standard vs Express (onboarding UX vs control over the fee/branding).
4. **Eventing** — Inngest vs Trigger.dev vs Supabase queues (DX vs lock-in).
5. **Vector store** — pgvector now; revisit a dedicated store only if recall volume demands.
6. **Payfac timing** — when (and whether) to take the processing spread, given FCA/PSD2 facilitation rules.
7. **Data residency** — UK/EU region pinning for guest PII.
