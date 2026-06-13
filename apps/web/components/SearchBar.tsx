"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { LOCATIONS } from "@/lib/data";

interface SearchBarProps {
  /** Visual style: glassy "hero" (over imagery) or solid "panel" (on /stays). */
  variant?: "hero" | "panel";
  defaultLocation?: string;
  defaultArrive?: string;
  defaultDepart?: string;
  defaultGuests?: number;
}

export function SearchBar({
  variant = "hero",
  defaultLocation = "",
  defaultArrive = "",
  defaultDepart = "",
  defaultGuests = 2,
}: SearchBarProps) {
  const router = useRouter();
  const [location, setLocation] = useState(defaultLocation);
  const [arrive, setArrive] = useState(defaultArrive);
  const [depart, setDepart] = useState(defaultDepart);
  const [guests, setGuests] = useState(defaultGuests);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (arrive) params.set("arrive", arrive);
    if (depart) params.set("depart", depart);
    if (guests) params.set("guests", String(guests));
    router.push(`/stays?${params.toString()}`);
  }

  const shell =
    variant === "hero"
      ? "bg-ink/55 backdrop-blur-lg backdrop-saturate-150 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
      : "bg-charcoal";

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Search availability"
      className={`mx-auto grid w-full max-w-[820px] grid-cols-1 overflow-hidden rounded border border-[color:var(--line)] text-left sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.8fr_auto] ${shell}`}
    >
      <div className="relative flex flex-col border-b border-white/[0.08] px-4 py-3 focus-within:bg-white/[0.04] sm:border-r lg:border-b-0">
        <label htmlFor="search-loc" className="field-label">
          Location
        </label>
        <select
          id="search-loc"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="field-input [&>option]:bg-charcoal [&>option]:text-cream"
        >
          <option value="">All locations</option>
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="relative flex flex-col border-b border-white/[0.08] px-4 py-3 focus-within:bg-white/[0.04] sm:border-r-0 lg:border-b-0 lg:border-r">
        <label htmlFor="search-arrive" className="field-label">
          Arrive
        </label>
        <input
          id="search-arrive"
          type="date"
          name="arrive"
          value={arrive}
          onChange={(e) => setArrive(e.target.value)}
          className="field-input [color-scheme:dark]"
        />
      </div>

      <div className="relative flex flex-col border-b border-white/[0.08] px-4 py-3 focus-within:bg-white/[0.04] sm:border-r lg:border-b-0">
        <label htmlFor="search-depart" className="field-label">
          Depart
        </label>
        <input
          id="search-depart"
          type="date"
          name="depart"
          value={depart}
          onChange={(e) => setDepart(e.target.value)}
          className="field-input [color-scheme:dark]"
        />
      </div>

      <div className="relative flex flex-col border-b border-white/[0.08] px-4 py-3 focus-within:bg-white/[0.04] lg:border-b-0 lg:border-r">
        <label htmlFor="search-guests" className="field-label">
          Guests
        </label>
        <input
          id="search-guests"
          type="number"
          name="guests"
          min={1}
          max={16}
          value={guests}
          inputMode="numeric"
          onChange={(e) => setGuests(Number(e.target.value))}
          className="field-input"
        />
      </div>

      <button
        type="submit"
        className="btn btn--gold min-h-[54px] rounded-none px-7 sm:col-span-2 lg:col-span-1"
      >
        Search stays
      </button>
    </form>
  );
}
