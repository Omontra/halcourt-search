"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { LOCATIONS, type SortOption } from "@/lib/data";

export function StaysFilters() {
  const router = useRouter();
  const params = useSearchParams();

  const [location, setLocation] = useState(params.get("location") ?? "");
  const [guests, setGuests] = useState(params.get("guests") ?? "");
  const [arrive, setArrive] = useState(params.get("arrive") ?? "");
  const [depart, setDepart] = useState(params.get("depart") ?? "");
  const [dogFriendly, setDogFriendly] = useState(
    params.get("dogFriendly") === "true",
  );
  const [seaView, setSeaView] = useState(params.get("seaView") === "true");
  const [hotTub, setHotTub] = useState(params.get("hotTub") === "true");
  const [sort, setSort] = useState<SortOption | "">(
    (params.get("sort") as SortOption | null) ?? "",
  );

  function apply(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = new URLSearchParams();
    if (location) next.set("location", location);
    if (guests) next.set("guests", guests);
    if (arrive) next.set("arrive", arrive);
    if (depart) next.set("depart", depart);
    if (dogFriendly) next.set("dogFriendly", "true");
    if (seaView) next.set("seaView", "true");
    if (hotTub) next.set("hotTub", "true");
    if (sort) next.set("sort", sort);
    router.push(`/stays?${next.toString()}`);
  }

  return (
    <form
      onSubmit={apply}
      aria-label="Filter stays"
      className="rounded border border-white/[0.08] bg-charcoal p-5"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex flex-col gap-1.5">
          <span className="field-label">Location</span>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="control [&>option]:bg-charcoal"
          >
            <option value="">All locations</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="field-label">Guests</span>
          <input
            type="number"
            min={1}
            max={16}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            placeholder="Any"
            className="control"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="field-label">Arrive</span>
          <input
            type="date"
            value={arrive}
            onChange={(e) => setArrive(e.target.value)}
            className="control [color-scheme:dark]"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="field-label">Depart</span>
          <input
            type="date"
            value={depart}
            onChange={(e) => setDepart(e.target.value)}
            className="control [color-scheme:dark]"
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Toggle label="Dog-friendly" checked={dogFriendly} onChange={setDogFriendly} />
        <Toggle label="Sea view" checked={seaView} onChange={setSeaView} />
        <Toggle label="Hot tub" checked={hotTub} onChange={setHotTub} />

        <label className="ml-auto flex items-center gap-2">
          <span className="field-label !mb-0">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption | "")}
            className="control [&>option]:bg-charcoal"
          >
            <option value="">Featured</option>
            <option value="price-asc">Price (low to high)</option>
            <option value="price-desc">Price (high to low)</option>
            <option value="review-desc">Review score</option>
          </select>
        </label>
      </div>

      <div className="mt-5">
        <button type="submit" className="btn btn--gold">
          Apply filters
        </button>
      </div>

      <style>{`
        .control {
          background: var(--slate);
          border: 1px solid var(--line);
          color: var(--text);
          font-family: var(--font-sans), system-ui, sans-serif;
          font-size: 15px;
          padding: 10px 12px;
          border-radius: var(--radius);
        }
        .control:focus { outline: none; border-color: var(--gold); }
      `}</style>
    </form>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 font-sans text-[14px] text-sea">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-[color:var(--gold)]"
      />
      {label}
    </label>
  );
}
