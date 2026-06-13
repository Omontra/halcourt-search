import { NextResponse } from "next/server";
import { getAvailability } from "@/lib/data";

/**
 * Availability handler (mock).
 *
 * GET /api/availability?slug=hytti&from=2026-07-01&to=2026-07-31
 *
 * Returns deterministic mock availability. Replace getAvailability with a real
 * PMS (e.g. Hostaway) feed later — see docs/concierge-platform-technical-design.md.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!slug) {
    return NextResponse.json(
      { ok: false, error: "slug is required" },
      { status: 400 },
    );
  }

  const today = new Date().toISOString().slice(0, 10);
  const defaultTo = new Date(Date.now() + 30 * 86_400_000)
    .toISOString()
    .slice(0, 10);

  const result = await getAvailability(slug, {
    from: from ?? today,
    to: to ?? defaultTo,
  });

  return NextResponse.json(result);
}
