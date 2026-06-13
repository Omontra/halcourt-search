import Link from "next/link";

export const metadata = {
  title: "Booking — Taylor Made Salcombe",
  description: "Mock instant-book confirmation stub.",
};

/**
 * Booking stub page. The real instant-book flow happens inline on the property
 * page via the BookingPanel + /api/book. This page is a simple landing target.
 *
 * TODO: Replace with a real Stripe Checkout / PaymentIntent flow on the
 * operator's Stripe Connect account (application_fee_amount = 2% of GBV).
 * See docs/concierge-platform-technical-design.md §6 "Payments (Stripe Connect)".
 */
export default function BookPage() {
  return (
    <div className="px-[var(--gut)] pb-24 pt-[clamp(110px,14vw,160px)]">
      <div className="mx-auto max-w-[680px] text-center">
        <p className="eyebrow mb-[18px] text-center">Booking</p>
        <h1 className="font-serif" style={{ fontSize: "clamp(36px,5vw,60px)" }}>
          Instant booking
        </h1>
        <p className="mx-auto mt-4 max-w-[46ch] text-[16px] text-sea">
          Instant-bookable homes can be reserved in seconds from the property
          page. This is a mock flow — no payment is taken yet.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/stays" className="btn btn--gold">
            Browse the collection
          </Link>
          <Link href="/enquiry" className="btn btn--outline">
            Talk to the concierge
          </Link>
        </div>
      </div>
    </div>
  );
}
