import Link from "next/link";

const ADD_ONS = [
  {
    title: "Add a private chef",
    body: "From a first-night supper to a tasting menu, cooked and served in your kitchen.",
  },
  {
    title: "Pre-stock the fridge",
    body: "Arrive to breakfast, local wine and the essentials already waiting.",
  },
  {
    title: "Book a boat day",
    body: "A private charter out across the estuary, skippered and stocked.",
  },
];

export function ConciergeAddOns({ propertyName }: { propertyName: string }) {
  return (
    <section
      aria-labelledby="addons-heading"
      className="rounded border border-[color:var(--line)] bg-gradient-to-b from-ink to-charcoal p-7"
    >
      <p className="eyebrow mb-3">Make it effortless</p>
      <h2 id="addons-heading" className="font-serif text-[30px]">
        Add the finishing touches
      </h2>
      <p className="mt-2 max-w-[52ch] text-[15px] text-sea">
        Your complimentary concierge can arrange these for your stay at{" "}
        {propertyName}.
      </p>

      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {ADD_ONS.map((item) => (
          <li
            key={item.title}
            className="rounded border border-white/[0.08] bg-slate p-5"
          >
            <h3 className="font-serif text-[21px] text-cream">{item.title}</h3>
            <p className="mt-2 text-[14px] text-sea-dim">{item.body}</p>
          </li>
        ))}
      </ul>

      <Link href="/concierge" className="btn btn--outline mt-6">
        Explore the concierge
      </Link>
    </section>
  );
}
