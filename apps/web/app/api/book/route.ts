import { NextResponse } from "next/server";

/**
 * Instant-book handler (mock).
 *
 * Returns a fake booking reference. No payment is taken.
 *
 * TODO: Replace with a real Stripe flow on the operator's connected account:
 *   - Create a PaymentIntent on the operator's Stripe Connect account
 *   - Set application_fee_amount = 2% of GBV, on_behalf_of the operator
 *   - Confirm availability against the PMS, then persist the booking
 * See docs/concierge-platform-technical-design.md §6 "Payments (Stripe Connect)".
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const data = body as Record<string, unknown>;
  const slug = typeof data.slug === "string" ? data.slug : "";

  if (!slug) {
    return NextResponse.json(
      { ok: false, error: "slug is required" },
      { status: 422 },
    );
  }

  // Generate a mock, human-readable reference, e.g. "TM-7QX2K".
  const ref = `TM-${randomRef(5)}`;

  console.log("[book] mock instant-book", {
    slug,
    arrive: data.arrive ?? null,
    depart: data.depart ?? null,
    ref,
  });

  return NextResponse.json({ ok: true, ref });
}

function randomRef(length: number): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}
