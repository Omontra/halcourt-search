import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BookingPanel } from "@/components/BookingPanel";
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import { ConciergeAddOns } from "@/components/ConciergeAddOns";
import { PropertyCard } from "@/components/PropertyCard";
import { getProperties, getProperty, getSimilarProperties } from "@/lib/data";

const PROPERTY_REVIEWS = [
  {
    quote:
      "The house was even more beautiful than the photographs. Spotless, calm and effortlessly stylish.",
    name: "Charlotte",
    when: "August 2025",
  },
  {
    quote:
      "Our concierge arranged a chef for two nights and a boat day. The children still talk about it.",
    name: "Mark",
    when: "June 2025",
  },
];

export async function generateStaticParams() {
  const all = await getProperties();
  return all.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) return { title: "Stay not found — Taylor Made Salcombe" };
  return {
    title: `${property.name} — ${property.location} | Taylor Made Salcombe`,
    description: property.shortDescription,
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) notFound();

  const similar = await getSimilarProperties(slug, 3);

  return (
    <div className="px-[var(--gut)] pb-24 pt-[clamp(110px,14vw,160px)]">
      <div className="mx-auto max-w-site">
        {/* Breadcrumb + heading */}
        <nav aria-label="Breadcrumb" className="mb-4 font-sans text-[13px] text-sea-dim">
          <Link href="/stays" className="hover:text-gold-soft">
            The Collection
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-sea">{property.name}</span>
        </nav>

        <header className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-serif" style={{ fontSize: "clamp(40px,6vw,68px)" }}>
              {property.name}
            </h1>
            <p className="mt-2 font-sans text-[15px] tracking-[0.04em] text-sea">
              {property.location}, Devon
            </p>
          </div>
          <span className="rounded-full border border-[color:var(--line)] bg-[rgba(200,168,107,0.08)] px-4 py-2 font-sans text-[13px] text-gold-soft">
            {property.reviewScore.toFixed(1)} ★ {property.reviewLabel}
          </span>
        </header>

        {/* Gallery */}
        <section aria-label="Photo gallery" className="mb-12">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {property.images.map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden rounded bg-[#0d161b] ${
                  i === 0 ? "aspect-[16/10] sm:col-span-2 sm:row-span-2 lg:col-span-2" : "aspect-[4/3]"
                }`}
              >
                {/* placeholder — replace with Taylor Made photography */}
                <Image
                  src={src}
                  alt={`${property.name} — view ${i + 1}`}
                  fill
                  sizes="(max-width: 600px) 100vw, 25vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr]">
          {/* Main content */}
          <div className="flex flex-col gap-12">
            {/* Key facts */}
            <section aria-label="Key facts">
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  ["Sleeps", property.sleeps],
                  ["Bedrooms", property.bedrooms],
                  ["Bathrooms", property.bathrooms],
                  ["Dogs", property.dogFriendly ? "Welcome" : "Not suitable"],
                ].map(([label, value]) => (
                  <li
                    key={label}
                    className="rounded border border-white/[0.08] bg-charcoal p-4 text-center"
                  >
                    <span className="block font-serif text-[28px] text-cream">
                      {value}
                    </span>
                    <span className="font-sans text-[12px] uppercase tracking-[0.16em] text-sea-dim">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Description */}
            <section aria-labelledby="about-heading">
              <h2 id="about-heading" className="section-title mb-4 !text-[clamp(28px,4vw,42px)]">
                About this home
              </h2>
              <p className="text-[17px] leading-[1.7] text-sea">
                {property.longDescription}
              </p>
            </section>

            {/* Amenities */}
            <section aria-labelledby="amenities-heading">
              <h2
                id="amenities-heading"
                className="section-title mb-4 !text-[clamp(28px,4vw,42px)]"
              >
                What’s here
              </h2>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                {property.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="flex items-center gap-3 border-b border-white/[0.06] py-2.5 text-[15px] text-sea"
                  >
                    <span className="text-gold" aria-hidden="true">
                      ✦
                    </span>
                    {amenity}
                  </li>
                ))}
              </ul>
            </section>

            {/* Availability */}
            <section aria-labelledby="availability-heading">
              <h2
                id="availability-heading"
                className="section-title mb-4 !text-[clamp(28px,4vw,42px)]"
              >
                Check dates
              </h2>
              <AvailabilityCalendar slug={property.slug} />
            </section>

            {/* Concierge add-ons */}
            <ConciergeAddOns propertyName={property.name} />

            {/* Reviews */}
            <section aria-labelledby="reviews-heading">
              <h2
                id="reviews-heading"
                className="section-title mb-4 !text-[clamp(28px,4vw,42px)]"
              >
                Guest reviews
              </h2>
              <p className="mb-6 font-sans text-[15px] text-sea-dim">
                {property.reviewScore.toFixed(1)} / 5 · {property.reviewLabel}
              </p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {PROPERTY_REVIEWS.map((review) => (
                  <figure
                    key={review.name}
                    className="rounded border border-white/[0.06] bg-slate p-6"
                  >
                    <blockquote className="font-serif text-[19px] italic leading-[1.45] text-cream">
                      “{review.quote}”
                    </blockquote>
                    <figcaption className="mt-3 font-sans text-[12px] uppercase tracking-[0.14em] text-gold">
                      {review.name} · {review.when}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky booking panel */}
          <div>
            <BookingPanel
              slug={property.slug}
              name={property.name}
              pricePerWeekFrom={property.pricePerWeekFrom}
              instantBook={property.instantBook}
            />
          </div>
        </div>

        {/* Similar stays */}
        <section aria-labelledby="similar-heading" className="mt-20">
          <h2 id="similar-heading" className="section-title mb-8 !text-[clamp(28px,4vw,46px)]">
            Similar stays
          </h2>
          <div className="grid grid-cols-1 gap-[clamp(16px,1.8vw,26px)] sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
