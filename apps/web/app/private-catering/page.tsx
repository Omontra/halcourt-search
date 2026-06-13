import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "The Salcombe Kitchen — Private In-Home Catering",
  description:
    "Local chefs cooking in your kitchen — from beach picnics and slow Sunday lunches to eight-course tasting menus. Dining, brought home.",
};

const MENUS = [
  {
    title: "First-night supper",
    body: "Arrive to a relaxed, beautifully cooked meal — no shopping, no cooking, no clearing away.",
  },
  {
    title: "Slow Sunday lunch",
    body: "The long, lingering kind, with local produce and a table no one wants to leave.",
  },
  {
    title: "Beach picnic",
    body: "A hamper laid out on linen above the coast, timed perfectly to the light.",
  },
  {
    title: "Tasting menu",
    body: "Up to eight courses of South Devon’s finest, plated and served in your home.",
  },
];

export default function PrivateCateringPage() {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative flex min-h-[60svh] items-end overflow-hidden px-[var(--gut)] pb-16 pt-[clamp(120px,16vw,200px)]">
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
              "linear-gradient(180deg, rgba(14,20,24,.7), rgba(14,20,24,.55) 40%, rgba(14,20,24,.9))",
          }}
        />
        <div className="relative z-[2] mx-auto w-full max-w-site">
          <p className="eyebrow mb-[18px]">The Salcombe Kitchen</p>
          <h1 className="font-serif" style={{ fontSize: "clamp(40px,7vw,80px)" }}>
            Dining, brought home
          </h1>
          <p className="mt-5 max-w-[52ch] text-[18px] leading-[1.6] text-cream/90">
            Our in-home catering brings local chefs to your table — from beach
            picnics and slow Sunday lunches to eight-course tasting menus.
            Nothing to plan, nothing to clear away.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-site px-[var(--gut)]">
        <section aria-labelledby="menus-heading" className="mt-16">
          <h2 id="menus-heading" className="section-title mb-10 !text-[clamp(30px,4vw,48px)]">
            A few ways to dine
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {MENUS.map((menu) => (
              <article
                key={menu.title}
                className="rounded border border-white/[0.08] bg-charcoal p-7"
              >
                <h3 className="font-serif text-[28px] text-cream">{menu.title}</h3>
                <p className="mt-3 text-[16px] leading-[1.6] text-sea">
                  {menu.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid grid-cols-1 items-center gap-[clamp(36px,6vw,84px)] lg:grid-cols-2">
          <div className="relative aspect-[4/3.2] overflow-hidden rounded bg-[#0d161b]">
            {/* placeholder — replace with Taylor Made photography */}
            <Image
              src="https://loremflickr.com/900/720/devon,seafood,fine,dining"
              alt="A plated course of South Devon seafood"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <p className="eyebrow mb-[18px]">How it works</p>
            <h2 className="section-title !text-[clamp(28px,4vw,44px)]">
              We bring the kitchen to you
            </h2>
            <p className="mt-4 text-[16px] leading-[1.7] text-sea">
              Tell us the occasion and any dietary needs, and we’ll match you with
              the right chef and a menu built around the catch and the season.
              Everything is shopped for, cooked and cleared away — all you do is
              sit down. Private catering is arranged through your complimentary
              concierge as part of your stay.
            </p>
            <Link href="/enquiry?occasion=Private+catering" className="btn btn--gold mt-7">
              Enquire about catering
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
