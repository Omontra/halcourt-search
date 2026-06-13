"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/stays", label: "Stays" },
  { href: "/concierge", label: "Concierge" },
  { href: "/private-catering", label: "Private Catering" },
  { href: "/stays?location=Salcombe", label: "Locations" },
  { href: "/concierge", label: "About" },
  { href: "/#journal", label: "Journal" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] border-b transition-[background,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "border-[color:var(--line)] bg-ink/[0.86] backdrop-blur-md backdrop-saturate-150"
          : "border-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-site items-center justify-between gap-5 px-[var(--gut)] transition-[padding] duration-300 ${
          scrolled ? "py-3" : "py-[18px]"
        }`}
      >
        <Link
          href="/"
          className="flex flex-col leading-none"
          aria-label="Taylor Made Salcombe — home"
        >
          <span className="font-sans text-[11px] uppercase tracking-[0.42em] text-gold">
            Taylor Made
          </span>
          <span className="mt-[3px] font-serif text-[24px] font-medium tracking-[0.04em]">
            Salcombe
          </span>
        </Link>

        <nav
          className="hidden items-center gap-[clamp(14px,1.6vw,26px)] lg:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group relative font-sans text-[13px] tracking-[0.08em] text-cream/80 transition-opacity hover:text-gold-soft hover:opacity-100"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-[width] duration-200 group-hover:w-full" />
            </Link>
          ))}
          <Link
            href="/stays"
            className="font-sans text-[13px] italic tracking-[0.08em] text-cream/55"
          >
            List Your Property
          </Link>
        </nav>

        <div className="flex items-center gap-[14px]">
          <Link
            href="/stays"
            className="btn btn--gold hidden lg:inline-flex"
            style={{ padding: "11px 22px" }}
          >
            Check dates
          </Link>
          <button
            type="button"
            className="flex flex-col gap-[5px] p-2 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span
              className={`h-[1.5px] w-6 bg-cream transition-transform duration-300 ${
                menuOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-6 bg-cream transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-6 bg-cream transition-transform duration-300 ${
                menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-[color:var(--line)] bg-ink/[0.97] px-[var(--gut)] pb-[26px] pt-3 backdrop-blur-lg lg:hidden"
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="border-b border-white/[0.06] py-[14px] font-sans text-[16px] tracking-[0.05em]"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/stays"
              className="btn btn--gold mt-5"
              onClick={() => setMenuOpen(false)}
            >
              Check dates
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
