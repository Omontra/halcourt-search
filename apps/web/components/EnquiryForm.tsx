"use client";

import { useState, type FormEvent } from "react";

interface EnquiryFormProps {
  /** Pre-select a property name (e.g. on a property detail page). */
  property?: string;
  /** All property names, for the select. */
  propertyOptions: string[];
}

type Status = "idle" | "submitting" | "success" | "error";

export function EnquiryForm({ property, propertyOptions }: EnquiryFormProps) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded border border-[color:var(--line)] bg-[rgba(200,168,107,0.06)] p-6"
      >
        <h3 className="font-serif text-[26px] text-gold-soft">Thank you</h3>
        <p className="mt-2 text-[15px] text-sea">
          Your enquiry is on its way to our team. We’ll be in touch shortly to
          start planning your stay.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label="Name" htmlFor="enq-name" required>
        <input
          id="enq-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="form-control"
        />
      </Field>

      <Field label="Email" htmlFor="enq-email" required>
        <input
          id="enq-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="form-control"
        />
      </Field>

      <Field label="Arrive" htmlFor="enq-arrive">
        <input
          id="enq-arrive"
          name="arrive"
          type="date"
          className="form-control [color-scheme:dark]"
        />
      </Field>

      <Field label="Depart" htmlFor="enq-depart">
        <input
          id="enq-depart"
          name="depart"
          type="date"
          className="form-control [color-scheme:dark]"
        />
      </Field>

      <Field label="Property" htmlFor="enq-property">
        <select
          id="enq-property"
          name="property"
          defaultValue={property ?? ""}
          className="form-control [&>option]:bg-charcoal"
        >
          <option value="">No preference yet</option>
          {propertyOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Guests" htmlFor="enq-guests">
        <input
          id="enq-guests"
          name="guests"
          type="number"
          min={1}
          max={16}
          defaultValue={2}
          className="form-control"
        />
      </Field>

      <Field label="Occasion" htmlFor="enq-occasion" className="sm:col-span-2">
        <input
          id="enq-occasion"
          name="occasion"
          type="text"
          placeholder="e.g. milestone birthday, family reunion, quiet escape"
          className="form-control"
        />
      </Field>

      <Field
        label="Dietary requirements & notes"
        htmlFor="enq-notes"
        className="sm:col-span-2"
      >
        <textarea
          id="enq-notes"
          name="notes"
          rows={4}
          placeholder="Tell us about dietary needs, a private chef, dogs, or anything else."
          className="form-control resize-y"
        />
      </Field>

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          className="btn btn--gold"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </button>
        {status === "error" && (
          <p role="alert" className="text-[14px] text-gold-soft">
            Something went wrong — please try again or email us directly.
          </p>
        )}
      </div>

      <style>{`
        .form-control {
          width: 100%;
          background: var(--slate);
          border: 1px solid var(--line);
          color: var(--text);
          font-family: var(--font-sans), system-ui, sans-serif;
          font-size: 15px;
          padding: 12px 14px;
          border-radius: var(--radius);
        }
        .form-control::placeholder { color: var(--sea-dim); }
        .form-control:focus { outline: none; border-color: var(--gold); }
      `}</style>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <label
        htmlFor={htmlFor}
        className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold"
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
    </div>
  );
}
