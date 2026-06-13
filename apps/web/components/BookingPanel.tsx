"use client";

import Link from "next/link";
import { useState } from "react";

interface BookingPanelProps {
  slug: string;
  name: string;
  pricePerWeekFrom: number;
  instantBook: boolean;
}

type BookState =
  | { status: "idle" }
  | { status: "booking" }
  | { status: "booked"; ref: string }
  | { status: "error" };

export function BookingPanel({
  slug,
  name,
  pricePerWeekFrom,
  instantBook,
}: BookingPanelProps) {
  const [arrive, setArrive] = useState("");
  const [depart, setDepart] = useState("");
  const [book, setBook] = useState<BookState>({ status: "idle" });

  async function handleBook() {
    setBook({ status: "booking" });
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, arrive, depart }),
      });
      if (!res.ok) throw new Error("failed");
      const data: { ok: boolean; ref: string } = await res.json();
      setBook({ status: "booked", ref: data.ref });
    } catch {
      setBook({ status: "error" });
    }
  }

  return (
    <aside className="sticky top-[96px] rounded border border-[color:var(--line)] bg-charcoal p-6">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-serif text-[30px] text-cream">
          £{pricePerWeekFrom.toLocaleString("en-GB")}
        </span>
        <span className="font-sans text-[13px] text-sea-dim">per week, from</span>
      </div>

      {instantBook && (
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[color:var(--line)] bg-[rgba(200,168,107,0.08)] px-3 py-1 font-sans text-[11px] uppercase tracking-[0.14em] text-gold-soft">
          ⚡ Instant book
        </span>
      )}

      <div className="mt-5 grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="field-label">Arrive</span>
          <input
            type="date"
            value={arrive}
            onChange={(e) => setArrive(e.target.value)}
            className="rounded border border-[color:var(--line)] bg-slate px-3 py-2 font-sans text-[14px] text-cream [color-scheme:dark] focus:border-gold focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="field-label">Depart</span>
          <input
            type="date"
            value={depart}
            onChange={(e) => setDepart(e.target.value)}
            className="rounded border border-[color:var(--line)] bg-slate px-3 py-2 font-sans text-[14px] text-cream [color-scheme:dark] focus:border-gold focus:outline-none"
          />
        </label>
      </div>

      {book.status === "booked" ? (
        <div
          role="status"
          className="mt-5 rounded border border-[color:var(--line)] bg-[rgba(200,168,107,0.06)] p-4 text-center"
        >
          <p className="font-serif text-[22px] text-gold-soft">Booking confirmed</p>
          <p className="mt-1 font-sans text-[14px] text-sea">
            Reference <span className="text-cream">{book.ref}</span>
          </p>
        </div>
      ) : instantBook ? (
        <>
          <button
            type="button"
            onClick={handleBook}
            disabled={book.status === "booking"}
            className="btn btn--gold mt-5 w-full"
          >
            {book.status === "booking" ? "Booking…" : "Book now"}
          </button>
          {book.status === "error" && (
            <p role="alert" className="mt-2 text-center text-[13px] text-gold-soft">
              Something went wrong — please try again.
            </p>
          )}
        </>
      ) : (
        <Link
          href={`/enquiry?property=${encodeURIComponent(name)}`}
          className="btn btn--gold mt-5 w-full"
        >
          Enquire
        </Link>
      )}

      <p className="mt-4 text-center font-sans text-[12px] text-sea-dim">
        Every stay includes a complimentary personal concierge.
      </p>
    </aside>
  );
}
