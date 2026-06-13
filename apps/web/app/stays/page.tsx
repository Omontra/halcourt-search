import Link from "next/link";
import { Suspense } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import { StaysFilters } from "@/components/StaysFilters";
import { MapViewToggle } from "@/components/MapViewToggle";
import { searchProperties, type SearchFilters, type SortOption } from "@/lib/data";

export const metadata = {
  title: "The Collection — Luxury Stays in Salcombe & the South Hams",
  description:
    "Browse the full collection of luxury holiday homes in Salcombe, Thurlestone and the wider South Hams.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function StaysPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;

  const guestsRaw = first(sp.guests);
  const sortRaw = first(sp.sort);

  const filters: SearchFilters = {
    location: first(sp.location),
    guests: guestsRaw ? Number(guestsRaw) : undefined,
    arrive: first(sp.arrive),
    depart: first(sp.depart),
    dogFriendly: first(sp.dogFriendly) === "true",
    seaView: first(sp.seaView) === "true",
    hotTub: first(sp.hotTub) === "true",
    sort: (sortRaw as SortOption | undefined) ?? undefined,
  };

  const results = await searchProperties(filters);

  return (
    <div className="section-shell pt-[clamp(120px,16vw,180px)]">
      <header className="mb-10">
        <p className="eyebrow mb-[18px]">The Collection</p>
        <h1 className="section-title">Find your stay</h1>
        <p className="mt-4 max-w-[52ch] text-sea">
          Every home is chosen by hand and comes with a complimentary personal
          concierge. Refine by location, dates and the details that matter.
        </p>
      </header>

      <Suspense fallback={<div className="h-40" aria-hidden="true" />}>
        <StaysFilters />
      </Suspense>

      <div className="mt-10">
        {results.length === 0 ? (
          <div className="grid min-h-[280px] place-items-center rounded border border-dashed border-[color:var(--line)] bg-charcoal p-10 text-center">
            <div>
              <h2 className="font-serif text-[30px]">No homes match just yet</h2>
              <p className="mx-auto mt-3 max-w-[44ch] text-[15px] text-sea-dim">
                Try widening your dates or guest count — or let our concierge
                find the perfect fit for your party.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/stays" className="btn btn--outline">
                  Clear filters
                </Link>
                <Link href="/enquiry" className="btn btn--gold">
                  Ask the concierge
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <MapViewToggle resultCount={results.length}>
            <div className="grid grid-cols-1 gap-[clamp(16px,1.8vw,26px)] sm:grid-cols-2 lg:grid-cols-3">
              {results.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </MapViewToggle>
        )}
      </div>
    </div>
  );
}
