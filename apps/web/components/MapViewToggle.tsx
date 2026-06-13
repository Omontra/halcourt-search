"use client";

import { useState } from "react";

/**
 * Styled placeholder for a future map view (e.g. Mapbox / Google Maps).
 * Toggles between the results grid (passed as children) and a placeholder.
 */
export function MapViewToggle({
  resultCount,
  children,
}: {
  resultCount: number;
  children: React.ReactNode;
}) {
  const [showMap, setShowMap] = useState(false);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="font-sans text-[14px] text-sea-dim">
          {resultCount} {resultCount === 1 ? "home" : "homes"}
        </p>
        <div
          role="group"
          aria-label="View mode"
          className="inline-flex overflow-hidden rounded border border-[color:var(--line)]"
        >
          <button
            type="button"
            aria-pressed={!showMap}
            onClick={() => setShowMap(false)}
            className={`px-4 py-2 font-sans text-[13px] uppercase tracking-[0.08em] ${
              !showMap ? "bg-gold text-[#221b0c]" : "text-sea"
            }`}
          >
            List
          </button>
          <button
            type="button"
            aria-pressed={showMap}
            onClick={() => setShowMap(true)}
            className={`px-4 py-2 font-sans text-[13px] uppercase tracking-[0.08em] ${
              showMap ? "bg-gold text-[#221b0c]" : "text-sea"
            }`}
          >
            Map view
          </button>
        </div>
      </div>

      {showMap ? (
        <div className="grid min-h-[360px] place-items-center rounded border border-dashed border-[color:var(--line)] bg-charcoal p-10 text-center">
          <div>
            <p className="font-serif text-[28px] text-gold-soft">Map view</p>
            <p className="mx-auto mt-2 max-w-[40ch] text-[15px] text-sea-dim">
              A live, pin-dropped map of the collection across Salcombe &amp; the
              South Hams will live here. Placeholder pending Mapbox integration.
            </p>
            <button
              type="button"
              onClick={() => setShowMap(false)}
              className="btn btn--outline mt-6"
            >
              Back to list
            </button>
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
