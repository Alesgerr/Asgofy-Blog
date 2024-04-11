export default {
  name: "postComment",
  title: "Post Comment",
  type: "document",
  fields: [
    {
      name: "user",
      title: "User",
      type: "object",
      fields: [
        {
          name: "id",
          title: "ID",
          type: "string",
          description: "The unique identifier of the user.",
        },
        {
          name: "fullName",
          title: "Full Name",
          type: "string",
          description: "The full name of the user who made the comment.",
        },
        {
          name: "imageUrl",
          title: "Image URL",
          type: "url",
          description: "The image URL of the user's profile picture.",
        },
      ],
      description: "The user who made the comment.",
    },
    {
      name: "text",
      title: "Text",
      type: "text",
      description: "The content of the comment.",
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      description: "The rating given by the user.",
    },
    {
      name: "date",
      title: "Date",
      type: "datetime",
      description: "The date when the comment was posted.",
    },
    {
      name: "post",
      title: "Post",
      type: "reference",
      to: [{ type: "post" }],
      description: "The product this comment is related to.",
    },
  ],
  preview: {
    select: {
      userFullName: "user.fullName",
      userImageUrl: "user.imageUrl",
      productTitle: "post.title",
      subtitle: "date",
    },
    prepare(selection) {
      const { userFullName, email, userImageUrl, productTitle, subtitle } =
        selection;
      return {
        title: userFullName,
        imageUrl: userImageUrl,
        subtitle: `${productTitle} - ${subtitle}`,
      };
    },
  },
};
