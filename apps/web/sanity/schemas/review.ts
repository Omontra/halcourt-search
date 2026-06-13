/**
 * Sanity schema: review
 * Reference schema only — see sanity/README.md.
 */

const review = {
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    { name: "guestName", title: "Guest name", type: "string" },
    { name: "quote", title: "Quote", type: "text", rows: 3 },
    { name: "score", title: "Score (out of 5)", type: "number" },
    { name: "stayedOn", title: "Stayed on", type: "date" },
    {
      name: "property",
      title: "Property",
      type: "reference",
      to: [{ type: "property" }],
    },
  ],
  preview: {
    select: { title: "guestName", subtitle: "quote" },
  },
};

export default review;
