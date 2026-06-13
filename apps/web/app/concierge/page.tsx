import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Your Personal Concierge — Taylor Made Salcombe",
  description:
    "Every stay comes with a complimentary personal concierge — beginning with a private chef in your kitchen.",
};

const SERVICES = [
  {
    title: "A private chef in your kitchen",
    body: "The heart of our service. Local chefs cook and serve in your home — from a relaxed first-night supper to an eight-course tasting menu. Nothing to plan, nothing to clear away.",
    lead: true,
  },
  {
    title: "Bespoke itineraries",
    body: "A week shaped around your party and the tides — where to be, and when, with nothing left to chance.",
  },
  {
    title: "Restaurant reservations",
    body: "Tables at the places that are hard to come by, booked before you arrive.",
  },
  {
    title: "Boat days & private charters",
    body: "Skippered days out across the estuary and along the coast, stocked and ready.",
  },
  {
    title: "Curated experiences",
    body: "Sea swims, foraging, wild walks, spa treatments and more — arranged at your pace.",
  },
  {
    title: "The small things",
    body: "A pre-stocked fridge, fresh flowers, a cot, a dog bed — the details that make a house feel like yours.",
  },
];

export default function ConciergePage() {
  return (
    <div className="px-[var(--gut)] pb-24 pt-[clamp(110px,14vw,160px)]">
      <div className="mx-auto max-w-site">
        <header className="grid grid-cols-1 items-center gap-[clamp(36px,6vw,84px)] lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-[18px]">
              Complimentary, &amp; quietly indispensable
            </p>
            <h1 className="font-serif" style={{ fontSize: "clamp(40px,6vw,72px)" }}>
              Your personal concierge
            </h1>
            <p className="mt-5 max-w-[48ch] text-[18px] leading-[1.6] text-sea">
              Every Taylor Made stay comes with a dedicated concierge — there to
              take care of the details so your days unfold exactly as they
              should. It begins, always, with a private chef in your kitchen.
            </p>
            <Link href="/enquiry" className="btn btn--gold mt-7">
              Start planning your stay
            </Link>
          </div>
          <div className="relative aspect-[4/3.4] overflow-hidden rounded bg-[#0d161b]">
            {/* placeholder — replace with Taylor Made photography */}
            <Image
              src="https://loremflickr.com/900/760/chef,kitchen,fine,dining"
              alt="A private chef preparing a course in a Salcombe holiday home"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              unoptimized
            />
          </div>
        </header>

        <section aria-labelledby="services-heading" className="mt-20">
          <h2 id="services-heading" className="section-title mb-10 !text-[clamp(30px,4vw,48px)]">
            How we look after you
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <article
                key={service.title}
                className={`rounded border p-6 ${
                  service.lead
                    ? "border-gold bg-[rgba(200,168,107,0.05)] sm:col-span-2 lg:col-span-1 lg:row-span-2"
                    : "border-white/[0.08] bg-charcoal"
                }`}
              >
                {service.lead && (
                  <span className="font-sans text-[11px] uppercase tracking-[0.26em] text-gold">
                    Begins with
                  </span>
                )}
                <h3 className="mt-2 font-serif text-[26px] text-cream">
                  {service.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-sea">
                  {service.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded border border-[color:var(--line)] bg-gradient-to-b from-ink to-charcoal p-10 text-center">
          <h2 className="font-serif" style={{ fontSize: "clamp(30px,4vw,46px)" }}>
            Tell us what your perfect week looks like
          </h2>
          <p className="mx-auto mt-3 max-w-[46ch] text-[16px] text-sea">
            From a quiet escape for two to a milestone celebration, your
            concierge is ready when you are.
          </p>
          <Link href="/enquiry" className="btn btn--gold mt-7">
            Enquire now
          </Link>
        </section>
      </div>
    </div>
  );
}
