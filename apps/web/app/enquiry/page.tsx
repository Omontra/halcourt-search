import { EnquiryForm } from "@/components/EnquiryForm";
import { getProperties } from "@/lib/data";

export const metadata = {
  title: "Enquire — Taylor Made Salcombe",
  description:
    "Tell us about your stay and our concierge will be in touch to start planning.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function EnquiryPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const propertyParam = sp.property;
  const preselected = Array.isArray(propertyParam)
    ? propertyParam[0]
    : propertyParam;

  const all = await getProperties();
  const propertyOptions = all.map((p) => p.name);

  return (
    <div className="px-[var(--gut)] pb-24 pt-[clamp(110px,14vw,160px)]">
      <div className="mx-auto max-w-[820px]">
        <p className="eyebrow mb-[18px]">Start the conversation</p>
        <h1 className="font-serif" style={{ fontSize: "clamp(40px,6vw,68px)" }}>
          Plan your stay
        </h1>
        <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-sea">
          Share a few details and our concierge will be in touch to shape the
          perfect week — including a private chef, if you’d like one.
        </p>

        <div className="mt-10">
          <EnquiryForm property={preselected} propertyOptions={propertyOptions} />
        </div>
      </div>
    </div>
  );
}
