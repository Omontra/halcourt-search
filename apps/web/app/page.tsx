import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { PropertyCard } from "@/components/PropertyCard";
import { getProperties } from "@/lib/data";

const JOURNAL_POSTS = [
  {
    category: "Slow Days",
    title: "A perfect unhurried day on the estuary",
    excerpt:
      "Where to swim, where to drift, and the long lunch worth lingering over.",
    image: "https://loremflickr.com/640/440/salcombe,sea,boat",
    alt: "Wooden boats moored on a calm Salcombe estuary at first light",
  },
  {
    category: "The Table",
    title: "Eating well in Salcombe, the local way",
    excerpt:
      "Our chefs share the catch, the producers and the tables worth booking.",
    image: "https://loremflickr.com/640/440/devon,seafood,dining",
    alt: "A platter of South Devon seafood served on a coastal table",
  },
  {
    category: "Out & About",
    title: "Five coast-path walks for clear-headed mornings",
    excerpt:
      "From gentle estuary loops to the wilder stretches beyond Bolt Head.",
    image: "https://loremflickr.com/640/440/devon,coast,path,walk",
    alt: "A coastal footpath winding above the cliffs of the South Hams",
  },
];

const GUEST_STORIES = [
  {
    quote:
      "The chef evenings were the highlight — we never wanted to leave the table, and we never had to lift a finger.",
    name: "Eleanor",
    when: "September 2025",
  },
  {
    quote:
      "Harriet thought of everything before we did. The whole week simply flowed.",
    name: "James",
    when: "July 2025",
  },
  {
    quote:
      "The most beautiful house, the calmest holiday. We’ve already booked again for next summer.",
    name: "Priya",
    when: "May 2025",
  },
];

export default async function HomePage() {
  const all = await getProperties();
  const featured = all.slice(0, 4);

  return (
    <>
      <Hero />

      {/* ===== FEATURED STAYS ===== */}
      <section className="section-shell" id="stays">
        <div className="mb-[clamp(34px,5vw,56px)] flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-[18px]">The Collection</p>
            <h2 className="section-title">Featured stays</h2>
          </div>
          <Link href="/stays" className="link-gold self-start sm:self-end">
            View all homes →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-[clamp(16px,1.8vw,26px)] sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* ===== CONCIERGE (leads with private chef) ===== */}
      <section
        className="bg-gradient-to-b from-ink to-charcoal"
        id="concierge"
      >
        <div className="section-shell">
          <div className="grid grid-cols-1 items-center gap-[clamp(36px,6vw,84px)] lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative aspect-[4/4.6] max-h-[460px] overflow-hidden rounded bg-[#0d161b] lg:max-h-none">
              {/* placeholder — replace with Taylor Made photography */}
              <Image
                src="https://loremflickr.com/900/1100/chef,kitchen,fine,dining"
                alt="A private chef plating a course in the kitchen of a Salcombe holiday home"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                unoptimized
              />
            </div>

            <div>
              <p className="eyebrow mb-[18px]">
                Complimentary, &amp; quietly indispensable
              </p>
              <h2 className="section-title">Your personal concierge</h2>
              <p className="mt-5 max-w-[46ch] text-sea" style={{ fontSize: "clamp(17px,1.4vw,19px)" }}>
                Every stay comes with a dedicated concierge — there to take care
                of the details so your days unfold exactly as they should.
              </p>

              <div className="my-7 rounded-r border-l-2 border-gold bg-[rgba(200,168,107,0.05)] px-[26px] py-6">
                <span className="font-sans text-[11px] uppercase tracking-[0.26em] text-gold">
                  Begins with
                </span>
                <h3 className="mb-2.5 mt-2 font-serif" style={{ fontSize: "clamp(26px,3vw,34px)" }}>
                  A private chef in your kitchen
                </h3>
                <p className="m-0 text-[16px] text-sea">
                  Our in-home catering,{" "}
                  <em className="italic text-gold-soft">The Salcombe Kitchen</em>,
                  brings local chefs to your table — from a relaxed first-night
                  supper to an eight-course tasting menu, prepared and served in
                  the comfort of your home.
                </p>
              </div>

              <ul className="mb-[30px] list-none p-0">
                {[
                  ["Bespoke itineraries", "tailored to your party and the tides."],
                  [
                    "Restaurant reservations",
                    "at the tables that are hard to come by.",
                  ],
                  [
                    "Boat days & private charters",
                    "out across the estuary.",
                  ],
                  [
                    "Curated experiences",
                    "— sea swims, foraging, wild walks, spa.",
                  ],
                ].map(([title, rest]) => (
                  <li
                    key={title}
                    className="border-b border-white/[0.07] py-[13px] text-[15.5px] text-sea"
                  >
                    <span className="text-cream">{title}</span> {rest}
                  </li>
                ))}
              </ul>

              <Link href="/concierge" className="btn btn--outline">
                Explore the concierge
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRIVATE CATERING TEASER ===== */}
      <section
        className="relative flex justify-center overflow-hidden px-[var(--gut)] py-[clamp(90px,14vw,180px)] text-center"
        id="catering"
      >
        {/* placeholder — replace with Taylor Made photography */}
        <div
          role="img"
          aria-label="A beach picnic laid out on linen at dusk above the South Hams coast"
          className="absolute inset-0 z-0 bg-[#0a1014] bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://loremflickr.com/1600/900/devon,beach,picnic,dining")',
          }}
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(14,20,24,.78), rgba(14,20,24,.6) 50%, rgba(14,20,24,.85))",
          }}
        />
        <div className="relative z-[2] max-w-[640px]">
          <p className="eyebrow mb-[18px] text-center">The Salcombe Kitchen</p>
          <h2 className="font-serif" style={{ fontSize: "clamp(40px,6vw,70px)" }}>
            Dining, brought home
          </h2>
          <p className="mx-auto mb-8 mt-5 max-w-[50ch] text-cream/90">
            Local chefs cooking in your kitchen — from beach picnics and slow
            Sunday lunches to eight-course tasting menus. Nothing to plan,
            nothing to clear away.
          </p>
          <Link href="/private-catering" className="btn btn--gold">
            Discover private catering
          </Link>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section className="section-shell" id="about">
        <p className="eyebrow mb-[18px] text-center">In their words</p>
        <h2 className="section-title text-center">Stories from our guests</h2>

        <div className="mt-[18px] grid grid-cols-1 gap-[clamp(20px,3vw,40px)] lg:grid-cols-3">
          {GUEST_STORIES.map((story) => (
            <figure
              key={story.name}
              className="relative rounded border border-white/[0.06] bg-slate px-7 py-[30px]"
            >
              <span
                aria-hidden="true"
                className="absolute left-5 top-9 font-serif text-[80px] leading-[0] text-gold opacity-35"
              >
                &ldquo;
              </span>
              <blockquote className="my-4 font-serif text-[21px] italic leading-[1.4] text-cream">
                “{story.quote}”
              </blockquote>
              <figcaption className="font-sans text-[12px] uppercase tracking-[0.14em] text-gold">
                {story.name} · {story.when}
              </figcaption>
            </figure>
          ))}
        </div>

        <div
          className="mt-[clamp(40px,6vw,64px)] flex flex-wrap items-center justify-center gap-x-[30px] gap-y-3.5 border-t border-[color:var(--line)] pt-[34px]"
          aria-label="Press and memberships"
        >
          <span className="font-sans text-[11px] uppercase tracking-[0.26em] text-sea-dim">
            As featured in
          </span>
          {["Mr & Mrs Smith", "PASC Member", "Visit Devon", "8+ years in luxury rentals"].map(
            (cue) => (
              <span
                key={cue}
                className="font-serif text-[19px] italic text-sea opacity-85"
              >
                {cue}
              </span>
            ),
          )}
        </div>
      </section>

      {/* ===== JOURNAL ===== */}
      <section className="section-shell" id="journal">
        <div className="mb-[clamp(34px,5vw,56px)] flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-[18px]">The Journal</p>
            <h2 className="section-title">Notes from the South Hams</h2>
          </div>
          <Link href="/#journal" className="link-gold self-start sm:self-end">
            Read the journal →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-[clamp(20px,3vw,38px)] lg:grid-cols-3">
          {JOURNAL_POSTS.map((post) => (
            <Link key={post.title} href="/#journal" className="group block">
              <div className="mb-[18px] aspect-[16/11] overflow-hidden rounded bg-[#0d161b]">
                {/* placeholder — replace with Taylor Made photography */}
                <Image
                  src={post.image}
                  alt={post.alt}
                  width={640}
                  height={440}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <p className="mb-2 font-sans text-[11px] uppercase tracking-[0.22em] text-gold">
                {post.category}
              </p>
              <h3 className="mb-2 font-serif text-[25px] transition-colors group-hover:text-gold-soft">
                {post.title}
              </h3>
              <p className="m-0 text-[15px] text-sea-dim">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
