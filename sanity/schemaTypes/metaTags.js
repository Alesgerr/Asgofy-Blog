// metaTags.js
export const metaTags = {
  name: "metaTags",
  title: "Meta Tags",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "Meta tag name (örn: keywords, description, vs.)",
    },
    {
      name: "content",
      title: "Content",
      type: "text",
      description:
        "Meta tag content (örn: belirli anahtar kelimeler, açıklama, vs.)",
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "content",
    },
  },
};
