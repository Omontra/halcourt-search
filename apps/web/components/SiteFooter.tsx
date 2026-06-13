import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[#0a0f12] px-[var(--gut)] pb-[30px] pt-[clamp(56px,7vw,88px)]">
      <div className="mx-auto grid max-w-site grid-cols-1 gap-[clamp(28px,4vw,56px)] md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.6fr]">
        <div>
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
          <p className="mt-[18px] max-w-[34ch] text-[14.5px] text-sea-dim">
            A curated collection of luxury holiday homes in Salcombe &amp; the
            South Hams, with a complimentary personal concierge and private
            in-home catering.
          </p>
        </div>

        <nav className="flex flex-col" aria-label="Explore">
          <h4 className="mb-[18px] font-sans text-[12px] font-medium uppercase tracking-[0.2em] text-gold">
            Explore
          </h4>
          <FooterLink href="/stays">Stays</FooterLink>
          <FooterLink href="/concierge">Concierge</FooterLink>
          <FooterLink href="/private-catering">Private Catering</FooterLink>
          <FooterLink href="/stays?location=Salcombe">Locations</FooterLink>
          <FooterLink href="/#journal">Journal</FooterLink>
        </nav>

        <nav className="flex flex-col" aria-label="Company">
          <h4 className="mb-[18px] font-sans text-[12px] font-medium uppercase tracking-[0.2em] text-gold">
            Company
          </h4>
          <FooterLink href="/concierge">About Harriet</FooterLink>
          <FooterLink href="/stays">List Your Property</FooterLink>
          <FooterLink href="/concierge">Press</FooterLink>
          <FooterLink href="/enquiry">Contact</FooterLink>
        </nav>

        <div className="flex flex-col">
          <h4 className="mb-[18px] font-sans text-[12px] font-medium uppercase tracking-[0.2em] text-gold">
            Get in touch
          </h4>
          <FooterLink href="mailto:hello@taylormadesalcombe.co.uk">
            hello@taylormadesalcombe.co.uk
          </FooterLink>
          <FooterLink href="tel:+441548000000">+44 (0)1548 000 000</FooterLink>
          <p className="mt-[6px] text-[14px] text-sea-dim">
            Salcombe, South Hams, Devon
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="mx-auto mt-[clamp(40px,6vw,60px)] flex max-w-site flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-6">
        <p className="text-[13px] text-sea-dim">
          © 2026 Taylor Made Salcombe. All rights reserved.
        </p>
        <nav className="flex gap-[22px]" aria-label="Social">
          <FooterLink href="#">Instagram</FooterLink>
          <FooterLink href="#">Pinterest</FooterLink>
          <FooterLink href="#">Privacy</FooterLink>
        </nav>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="py-1.5 text-[14.5px] text-sea transition-colors hover:text-gold-soft"
    >
      {children}
    </Link>
  );
}
