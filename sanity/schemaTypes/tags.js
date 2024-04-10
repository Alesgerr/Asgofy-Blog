// tags.js

export default {
  name: "tags",
  title: "Tags",
  type: "document",
  fields: [
    {
      name: "tag",
      title: "Tag",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "tag",
        maxLength: 96,
      },
    },
  ],
};
