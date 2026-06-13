/**
 * Sanity schema: journalPost
 * Reference schema only — see sanity/README.md.
 */

const journalPost = {
  name: "journalPost",
  title: "Journal Post",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Slow Days", value: "Slow Days" },
          { title: "The Table", value: "The Table" },
          { title: "Out & About", value: "Out & About" },
        ],
      },
    },
    { name: "excerpt", title: "Excerpt", type: "text", rows: 2 },
    { name: "coverImage", title: "Cover image", type: "image", options: { hotspot: true } },
    { name: "body", title: "Body", type: "array", of: [{ type: "block" }] },
    { name: "publishedAt", title: "Published at", type: "datetime" },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
};

export default journalPost;
