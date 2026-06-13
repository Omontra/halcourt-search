# Sanity schemas (reference only)

These schema files describe the content model for Taylor Made Salcombe:

- `schemas/property.ts` — mirrors the `Property` type in `lib/properties.ts`
- `schemas/review.ts` — guest reviews, referenced by a property
- `schemas/journalPost.ts` — the Journal

## Important: not yet wired

The app **currently runs entirely on the mock data** in `lib/properties.ts`,
read through `lib/data.ts`. **No Sanity project or environment variables are
required to build or run.** These files are here so the content backend can be
added later without re-architecting the front end.

## How to wire it up later

1. Create a Sanity project (`npm create sanity@latest`) and add a Studio
   (either in this repo under `apps/studio` or a separate package).
2. Register the schemas above in the Studio's `schema.types` array. They are
   plain objects with light typings so they're easy to drop in; tighten the
   `validation` callback types to `Rule` from `sanity` once the dependency is
   present.
3. Add `@sanity/client` to this app and create a small `lib/sanity.ts` client.
4. Replace the function bodies in `lib/data.ts` (`getProperties`,
   `getProperty`, `searchProperties`, `getAvailability`, `getSimilarProperties`)
   with GROQ queries. **Pages and components import only from `lib/data.ts`, so
   nothing else needs to change.**
5. Swap the LoremFlickr placeholder image URLs for Sanity image assets
   (`@sanity/image-url`) and update `next.config.ts` `images.remotePatterns`.

See `docs/concierge-platform-technical-design.md` for how content, the PMS,
payments (Stripe Connect) and messaging fit together in the wider platform.
