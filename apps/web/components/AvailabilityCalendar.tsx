"use client";

import { useEffect, useMemo, useState } from "react";
import type { AvailabilityResult } from "@/lib/data";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

/**
 * Simple mock month view. Fetches availability from /api/availability for the
 * displayed month. Replace the API with a real PMS feed later.
 */
export function AvailabilityCalendar({ slug }: { slug: string }) {
  const [monthOffset, setMonthOffset] = useState(0);
  const [data, setData] = useState<AvailabilityResult | null>(null);
  const [loading, setLoading] = useState(true);

  const { year, month, label, gridStart, daysInMonth } = useMemo(() => {
    const base = new Date();
    base.setDate(1);
    base.setMonth(base.getMonth() + monthOffset);
    const y = base.getFullYear();
    const m = base.getMonth();
    const firstDay = new Date(y, m, 1);
    // Monday-first offset
    const jsDay = firstDay.getDay(); // 0 = Sun
    const start = jsDay === 0 ? 6 : jsDay - 1;
    return {
      year: y,
      month: m,
      label: base.toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      }),
      gridStart: start,
      daysInMonth: new Date(y, m + 1, 0).getDate(),
    };
  }, [monthOffset]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const from = `${year}-${String(month + 1).padStart(2, "0")}-01`;
    const to = `${year}-${String(month + 1).padStart(2, "0")}-${String(daysInMonth).padStart(2, "0")}`;
    fetch(`/api/availability?slug=${encodeURIComponent(slug)}&from=${from}&to=${to}`)
      .then((r) => r.json())
      .then((d: AvailabilityResult) => {
        if (!cancelled) setData(d);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug, year, month, daysInMonth]);

  function availabilityFor(day: number): boolean {
    if (!data) return true;
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const match = data.days.find((d) => d.date === iso);
    return match ? match.available : true;
  }

  return (
    <div className="rounded border border-white/[0.08] bg-charcoal p-5">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMonthOffset((o) => Math.max(0, o - 1))}
          disabled={monthOffset === 0}
          className="rounded border border-[color:var(--line)] px-3 py-1.5 font-sans text-[13px] text-sea disabled:opacity-30"
          aria-label="Previous month"
        >
          ←
        </button>
        <span className="font-serif text-[22px]" aria-live="polite">
          {label}
        </span>
        <button
          type="button"
          onClick={() => setMonthOffset((o) => o + 1)}
          className="rounded border border-[color:var(--line)] px-3 py-1.5 font-sans text-[13px] text-sea"
          aria-label="Next month"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center" aria-hidden="true">
        {WEEKDAYS.map((w) => (
          <span key={w} className="font-sans text-[11px] uppercase tracking-[0.1em] text-sea-dim">
            {w}
          </span>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1.5">
        {Array.from({ length: gridStart }).map((_, i) => (
          <span key={`pad-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const available = availabilityFor(day);
          return (
            <div
              key={day}
              className={`grid aspect-square place-items-center rounded font-sans text-[13px] ${
                available
                  ? "bg-slate text-cream"
                  : "bg-transparent text-sea-dim line-through opacity-50"
              }`}
              title={available ? "Available" : "Booked"}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-5 font-sans text-[12px] text-sea-dim">
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-sm bg-slate" /> Available
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-sm border border-white/20" /> Booked
        </span>
        {loading && <span className="ml-auto">Checking dates…</span>}
      </div>
      <p className="mt-3 font-sans text-[12px] text-sea-dim">
        Mock availability — replace with a live PMS feed before launch.
      </p>
    </div>
  );
}
