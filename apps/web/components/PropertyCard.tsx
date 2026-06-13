import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/data";
import { SaveButton } from "./SaveButton";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="group overflow-hidden rounded border border-white/[0.06] bg-charcoal transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-[color:var(--line)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.5)]">
      <Link
        href={`/stays/${property.slug}`}
        className="block"
        aria-label={`View ${property.name}`}
      >
        <div className="relative aspect-[4/3.05] overflow-hidden bg-[#0d161b]">
          {/* placeholder — replace with Taylor Made photography */}
          <Image
            src={property.images[0]}
            alt={`${property.name} — ${property.shortDescription}`}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1080px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            unoptimized
          />
          <span className="absolute left-3 top-3 z-[2] rounded-full border border-[color:var(--line)] bg-ink/[0.66] px-[11px] py-1.5 font-sans text-[11px] tracking-[0.05em] text-gold-soft backdrop-blur-sm">
            {property.reviewScore.toFixed(1)} ★ {property.reviewLabel}
          </span>
          {property.dogFriendly && (
            <span
              className="absolute left-3 top-[46px] z-[2] rounded-full border border-white/[0.14] bg-ink/[0.66] px-[11px] py-1.5 font-sans text-[11px] tracking-[0.05em] text-sea backdrop-blur-sm"
              title="Dog-friendly"
            >
              🐾 Dog-friendly
            </span>
          )}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/[0.15] via-transparent to-ink/[0.55]" />
        </div>
      </Link>
      <SaveButton name={property.name} />

      <div className="px-[18px] pb-[22px] pt-[18px]">
        <div className="flex items-baseline justify-between gap-2.5">
          <h3 className="font-serif text-[26px]">
            <Link href={`/stays/${property.slug}`} className="hover:text-gold-soft">
              {property.name}
            </Link>
          </h3>
          <span className="whitespace-nowrap font-sans text-[14px] tracking-[0.03em] text-gold-soft">
            from £{property.pricePerWeekFrom.toLocaleString("en-GB")}
            <span className="text-[11px] opacity-70">/wk</span>
          </span>
        </div>
        <p className="mb-[14px] mt-[3px] text-[13px] tracking-[0.04em] text-sea-dim">
          {property.location}, Devon
        </p>
        <ul className="flex list-none gap-4 p-0 text-[13px] text-sea">
          <li>Sleeps {property.sleeps}</li>
          <li className="relative before:absolute before:-left-2.5 before:text-gold before:content-['·']">
            {property.bedrooms} bed
          </li>
          <li className="relative before:absolute before:-left-2.5 before:text-gold before:content-['·']">
            {property.bathrooms} bath
          </li>
        </ul>
      </div>
    </article>
  );
}
