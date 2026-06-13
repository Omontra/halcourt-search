import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[70svh] place-items-center px-[var(--gut)] pt-[120px] text-center">
      <div>
        <p className="eyebrow mb-[18px] text-center">Lost the path</p>
        <h1 className="font-serif" style={{ fontSize: "clamp(40px,7vw,80px)" }}>
          We couldn’t find that page
        </h1>
        <p className="mx-auto mt-4 max-w-[44ch] text-[16px] text-sea">
          The page may have moved, or the link may be out of date.
        </p>
        <Link href="/" className="btn btn--gold mt-7">
          Back to home
        </Link>
      </div>
    </div>
  );
}
