/**
 * Data access layer.
 *
 * Pages and components ONLY import from here — never directly from
 * lib/properties.ts. This is the seam where a Sanity (or any) backend slots in
 * later: swap the bodies of these functions for Sanity GROQ queries and the
 * pages keep working unchanged.
 *
 * All functions are async to model the future remote backend, even though the
 * current mock implementation is synchronous under the hood.
 */

import { properties, type Property, type PropertyLocation } from "./properties";

export type { Property, PropertyLocation };

export interface SearchFilters {
  location?: string;
  guests?: number;
  arrive?: string;
  depart?: string;
  dogFriendly?: boolean;
  seaView?: boolean;
  hotTub?: boolean;
  sort?: SortOption;
}

export type SortOption = "price-asc" | "price-desc" | "review-desc";

export async function getProperties(): Promise<Property[]> {
  return properties;
}

export async function getProperty(slug: string): Promise<Property | null> {
  return properties.find((p) => p.slug === slug) ?? null;
}

export async function searchProperties(
  filters: SearchFilters = {},
): Promise<Property[]> {
  let results = properties.slice();

  if (filters.location) {
    results = results.filter((p) => p.location === filters.location);
  }
  if (typeof filters.guests === "number" && !Number.isNaN(filters.guests)) {
    results = results.filter((p) => p.sleeps >= filters.guests!);
  }
  if (filters.dogFriendly) {
    results = results.filter((p) => p.dogFriendly);
  }
  if (filters.seaView) {
    results = results.filter((p) => p.seaView);
  }
  if (filters.hotTub) {
    results = results.filter((p) => p.hotTub);
  }

  switch (filters.sort) {
    case "price-asc":
      results.sort((a, b) => a.pricePerWeekFrom - b.pricePerWeekFrom);
      break;
    case "price-desc":
      results.sort((a, b) => b.pricePerWeekFrom - a.pricePerWeekFrom);
      break;
    case "review-desc":
      results.sort((a, b) => b.reviewScore - a.reviewScore);
      break;
    default:
      break;
  }

  return results;
}

export async function getSimilarProperties(
  slug: string,
  limit = 3,
): Promise<Property[]> {
  const current = await getProperty(slug);
  if (!current) return properties.slice(0, limit);
  return properties
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aScore = a.location === current.location ? 0 : 1;
      const bScore = b.location === current.location ? 0 : 1;
      return aScore - bScore;
    })
    .slice(0, limit);
}

export interface AvailabilityDay {
  date: string; // ISO yyyy-mm-dd
  available: boolean;
}

export interface AvailabilityResult {
  slug: string;
  range: { from: string; to: string };
  days: AvailabilityDay[];
  allAvailable: boolean;
}

/**
 * Mock availability. Deterministic pseudo-random pattern so the same slug+range
 * always returns the same result (useful for tests/snapshots). Replace with a
 * PMS/Hostaway-backed availability check later.
 */
export async function getAvailability(
  slug: string,
  range: { from: string; to: string },
): Promise<AvailabilityResult> {
  const from = new Date(range.from);
  const to = new Date(range.to);
  const days: AvailabilityDay[] = [];

  const seed = hashString(slug);
  const safeFrom = isValidDate(from) ? from : new Date();
  const safeTo =
    isValidDate(to) && to > safeFrom
      ? to
      : new Date(safeFrom.getTime() + 7 * 86_400_000);

  for (
    let d = new Date(safeFrom);
    d <= safeTo;
    d.setDate(d.getDate() + 1)
  ) {
    const dayNum = Math.floor(d.getTime() / 86_400_000);
    // Mostly available; a sparse, deterministic set of "booked" days.
    const available = (dayNum + seed) % 11 !== 0;
    days.push({ date: toISODate(d), available });
  }

  return {
    slug,
    range: { from: toISODate(safeFrom), to: toISODate(safeTo) },
    days,
    allAvailable: days.every((day) => day.available),
  };
}

function isValidDate(d: Date): boolean {
  return d instanceof Date && !Number.isNaN(d.getTime());
}

function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export const LOCATIONS: PropertyLocation[] = [
  "Salcombe",
  "Thurlestone",
  "South Hams",
];
