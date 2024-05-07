export const post = {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: "table",
      title: "Table",
      type: "array",
      of: [{ type: "reference", to: { type: "table" } }], // Tablo şemasına referans verin
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
        maxWidth: 800, // Maksimum genişlik
        maxHeight: 600, // Maksimum yükseklik
        fit: "crop", // Görüntü boyutu ayarları (örneğin, crop, fill, scale, vb.)
        quality: 80, // Görüntü kalitesi (0 ile 100 arasında bir değer)
      },
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: "lastModifiedDate",
      title: "Last Modified Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tags" }] }], // Tags alanı bir referans olarak tanımlanıyor
      validation: (Rule) => Rule.required(),
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
      name: "faq",
      title: "FAQs",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
    },
    // {
    //   name: "faq",
    //   title: "Frequently Asked Questions",
    //   type: "array",
    //   of: [{ type: "faqItem" }],
    // },
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
      validation: (Rule) => Rule.required(),
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
