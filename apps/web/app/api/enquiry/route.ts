import { NextResponse } from "next/server";

/**
 * Enquiry handler (mock).
 *
 * Validates the core fields and logs the enquiry. Replace the console.log with
 * a real transactional email / CRM write (e.g. Resend + a leads table) later.
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
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";

  if (!name) {
    return NextResponse.json(
      { ok: false, error: "Name is required" },
      { status: 422 },
    );
  }
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid email is required" },
      { status: 422 },
    );
  }

  // TODO: send to Resend + persist to a leads store (see platform docs).
  console.log("[enquiry] received", {
    name,
    email,
    property: data.property ?? null,
    arrive: data.arrive ?? null,
    depart: data.depart ?? null,
    guests: data.guests ?? null,
    occasion: data.occasion ?? null,
    notes: data.notes ?? null,
  });

  return NextResponse.json({ ok: true });
}
