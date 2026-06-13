import Link from "next/link";

/** Sticky thumb-zone "Check dates" CTA — mobile only (Concept B). */
export function ThumbBar() {
  return (
    <Link
      href="/stays"
      className="fixed inset-x-[14px] bottom-[14px] z-[90] flex items-center justify-center rounded bg-gold px-4 py-4 font-sans text-[14px] uppercase tracking-[0.14em] text-[#221b0c] shadow-[0_12px_30px_rgba(0,0,0,0.5)] sm:hidden"
    >
      Check dates
    </Link>
  );
}
