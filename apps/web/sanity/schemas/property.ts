/**
 * Sanity schema: property
 *
 * Mirrors the `Property` type in apps/web/lib/properties.ts. NOT yet wired to a
 * live Sanity project — the app currently runs on the mock array. To go live,
 * create a Sanity project, register these schemas, and swap the function bodies
 * in lib/data.ts for GROQ queries. See sanity/README.md.
 *
 * Typed loosely (the @sanity/types package is not a dependency yet) so this file
 * is a portable reference rather than a build-time dependency.
 */

const property = {
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (r: { required: () => unknown }) => r.required() },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r: { required: () => unknown }) => r.required(),
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      options: {
        list: [
          { title: "Salcombe", value: "Salcombe" },
          { title: "Thurlestone", value: "Thurlestone" },
          { title: "South Hams", value: "South Hams" },
        ],
      },
    },
    { name: "sleeps", title: "Sleeps", type: "number" },
    { name: "bedrooms", title: "Bedrooms", type: "number" },
    { name: "bathrooms", title: "Bathrooms", type: "number" },
    { name: "dogFriendly", title: "Dog-friendly", type: "boolean" },
    { name: "seaView", title: "Sea view", type: "boolean" },
    { name: "hotTub", title: "Hot tub", type: "boolean" },
    { name: "pricePerWeekFrom", title: "Price per week (from, GBP)", type: "number" },
    { name: "reviewScore", title: "Review score", type: "number" },
    { name: "reviewLabel", title: "Review label", type: "string" },
    { name: "instantBook", title: "Instant book", type: "boolean" },
    { name: "shortDescription", title: "Short description", type: "text", rows: 2 },
    { name: "longDescription", title: "Long description", type: "text", rows: 6 },
    {
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    {
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [{ type: "reference", to: [{ type: "review" }] }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "location", media: "images.0" },
  },
};

export default property;
