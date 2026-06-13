import Link from "next/link";
import { SearchBar } from "./SearchBar";

export function Hero() {
  return (
    <section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-[var(--gut)] pb-20 pt-[120px] text-center"
      id="top"
    >
      {/* placeholder — replace with Taylor Made photography */}
      <div
        role="img"
        aria-label="A whitewashed coastal home above the estuary at Salcombe at golden hour"
        className="absolute inset-[-4%] z-0 animate-kenburns bg-[#0a1014] bg-cover bg-center motion-reduce:animate-none motion-reduce:scale-105"
        style={{
          backgroundImage:
            'url("https://loremflickr.com/1600/1100/salcombe,devon,coast,sea")',
        }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 18%, rgba(14,20,24,0) 0%, rgba(14,20,24,.35) 55%, rgba(14,20,24,.8) 100%), linear-gradient(180deg, rgba(14,20,24,.62) 0%, rgba(14,20,24,.28) 35%, rgba(14,20,24,.72) 100%)",
        }}
      />

      <div className="relative z-[2] w-full max-w-[880px]">
        <p className="eyebrow mb-[18px] text-center">
          Salcombe &amp; The South Hams, Devon
        </p>
        <h1
          className="font-serif font-medium"
          style={{
            fontSize: "clamp(44px, 8vw, 92px)",
            lineHeight: 1.02,
            textShadow: "0 2px 30px rgba(0,0,0,.4)",
          }}
        >
          A Curated Collection of
          <br />
          Luxury Holiday Homes
        </h1>
        <p
          className="mx-auto mt-6 max-w-[54ch] text-cream/90"
          style={{
            fontSize: "clamp(16px, 1.5vw, 19px)",
            textShadow: "0 1px 14px rgba(0,0,0,.45)",
          }}
        >
          Homes chosen for the way they feel as much as how they look — made for
          slow mornings, sea swims, long lunches and unhurried time together.
        </p>

        <div className="mt-[42px]">
          <SearchBar variant="hero" />
        </div>
      </div>

      <Link
        href="#stays"
        className="absolute bottom-[26px] left-1/2 z-[2] hidden -translate-x-1/2 flex-col items-center gap-2.5 font-sans text-[11px] uppercase tracking-[0.26em] text-sea sm:flex"
        aria-label="Scroll to featured stays"
      >
        <span>Discover</span>
        <span className="h-[38px] w-px animate-scrollpulse bg-gradient-to-b from-gold to-transparent" />
      </Link>
    </section>
  );
}
