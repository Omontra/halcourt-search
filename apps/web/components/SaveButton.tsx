"use client";

import { useState } from "react";

export function SaveButton({ name }: { name: string }) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={
        saved
          ? `Remove ${name} from your shortlist`
          : `Save ${name} to your shortlist`
      }
      onClick={(e) => {
        e.preventDefault();
        setSaved((s) => !s);
      }}
      className="absolute right-3 top-3 z-[2] grid h-[38px] w-[38px] place-items-center rounded-full border border-white/[0.16] bg-ink/60 backdrop-blur-sm transition-colors hover:border-gold"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`h-[18px] w-[18px] ${
          saved ? "fill-gold stroke-gold" : "fill-none stroke-cream"
        }`}
        strokeWidth={1.6}
      >
        <path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 1.9 4.9 5.2 4.4 7.3 4.1 9 5.3 12 8c3-2.7 4.7-3.9 6.8-3.6 3.3.5 4.8 4 3.2 7.3C19.5 16.4 12 21 12 21z" />
      </svg>
    </button>
  );
}
