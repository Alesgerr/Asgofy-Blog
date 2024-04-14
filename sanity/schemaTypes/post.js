export const post = {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
    {
      name: "table",
      title: "Table",
      type: "array",
      of: [{ type: "reference", to: {type: "table"} }], // Tablo şemasına referans verin
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    },

    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
    {
      name: "lastModifiedDate",
      title: "Last Modified Date",
      type: "datetime",
    },

    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tags" }] }], // Tags alanı bir referans olarak tanımlanıyor
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
    },
    {
      name: "likes",
      title: "Likes",
      type: "number",
      initialValue: 0, // Varsayılan değer olarak 0
      readOnly: true,
    },
    {
      name: "dislikes",
      title: "Dislikes",
      type: "number",
      initialValue: 0, // Varsayılan değer olarak 0
    },
    {
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "SEO için meta başlığı",
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      description: "SEO için meta açıklaması",
    },
    //  {
    //     name: 'metaTags',
    //     title: 'Meta Tags',
    //     type: 'array',
    //     of: [{ type: 'reference', to: [{ type: 'metaTags' }] }],
    //     description: 'SEO için meta etiketleri',
    //   },
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
};
