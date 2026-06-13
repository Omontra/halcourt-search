"use client";

import { useState, type FormEvent } from "react";

/**
 * Newsletter sign-up — deliberately SEPARATE from the enquiry flow.
 * Mock submit only; wire to an email provider (e.g. Resend audiences) later.
 */
export function NewsletterForm() {
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <p className="mt-[22px] text-[14px] text-gold-soft">
        Thank you — you’re on the list.
      </p>
    );
  }

  return (
    <form className="mt-[22px]" aria-label="Newsletter sign-up" onSubmit={handleSubmit}>
      <label
        htmlFor="news-email"
        className="block font-sans text-[13px] tracking-[0.04em] text-cream"
      >
        Join the list
      </label>
      <p className="mb-3 mt-1 text-[13px] text-sea-dim">
        New homes &amp; quiet news, a few times a year.
      </p>
      <div className="flex gap-2">
        <input
          id="news-email"
          type="email"
          name="email"
          placeholder="Your email"
          autoComplete="email"
          required
          className="min-w-0 flex-1 rounded border border-[color:var(--line)] bg-slate px-[14px] py-[11px] font-sans text-[14px] text-cream placeholder:text-sea-dim focus:border-gold focus:outline-none"
        />
        <button type="submit" className="btn btn--gold" style={{ padding: "11px 18px" }}>
          Sign up
        </button>
      </div>
    </form>
  );
}
