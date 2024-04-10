// schemas/user.js

export default {
  name: "user",
  title: "Users",
  type: "document",
  fields: [
    {
      name: "userId",
      title: "User ID",
      type: "string",
      description: "The unique ID of the user from Firebase authentication.",
      readOnly: true,
    },
    {
      name: "displayName",
      title: "Display Name",
      type: "string",
      description: "The display name of the user.",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      description: "The email address of the user.",
    },
    {
      name: "avatar",
      title: "Avatar",
      type: "image",
      description: "The avatar image of the user.",
      options: {
        hotspot: true, // Resmin kırpılması veya odaklanması gerekiyorsa, bu seçeneği true olarak ayarlayabiliriz.
      },
    },
    // İhtiyaca göre diğer alanları ekleyebilirsiniz: rol, bio, vb.
  ],
  preview: {
    select: {
      title: "displayName",
      subtitle: "email",
      media: "avatar",
    },
  },
};
