export const tableSchema = {
  name: "table",
  title: "Table",
  type: "document", // "document" olarak tanımlayın
  fields: [
    {
      name: "mainTitle",
      title: "Main Title",
      type: "string",
    },
    {
      name: "subtitles",
      title: "Subtitles",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "subtitle",
              title: "Subtitle",
              type: "string",
            },
            {
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "post" }],
            },
          ],
        },
      ],
    },
  ],
};
