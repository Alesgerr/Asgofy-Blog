import { createClient, groq } from "next-sanity";

import { apiVersion, dataset, projectId, token, useCdn } from "../env";
export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  token,
  useCdn,
});
export async function getPosts() {
  try {
    return client.fetch(
      groq`
        *[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          description,
          "slug": slug.current,
          author->{name},
          mainImage,
          categories[]->,
          tags[]->,
          publishedAt,
          lastModifiedDate,
          body,
          "reviews": *[_type == "review" && references(^._id)] {
            user->{
              name,
            },
            comment,
            rating
          },
        }
      `
    );
  } catch (error) {
    console.log("Error fetching latestProducts");
    return null;
  }
}
export async function getFeaturedProducts() {
  try {
    return client.fetch(
      groq`
        *[_type == "post" && featured == true] | order(publishedAt desc) {
         _id,
          title,
          description,
          "slug": slug.current,
          author->{name},
          mainImage,
          categories[]->,
          tags[]->,
          publishedAt,
          lastModifiedDate,
          body
        }
      `
    );
  } catch (error) {
    console.log("Error fetching featuredProducts");
    return null;
  }
}
export async function getPostById(slug) {
  try {
    const product = await client.fetch(
      groq`
        *[_type == "post" && slug.current == $slug][0] {
          _id,
          title,
          description,
          "slug": slug.current,
          author->{name, image},
          mainImage,
          categories[]->,
          tags[]->,
          faq[]->,
          publishedAt,
          lastModifiedDate,
          metaTitle,
          metaDescription,
            table[]->{
              mainTitle,
              subtitles[]{
                subtitle,
                product->{title, slug} // Product alanını referans olarak alırken, hangi alanları almak istediğinizi belirtin
              }
            },
         "reviews": *[_type == "review" && references(^._id)] {
            user->{
              name,
            },
            comment,
            rating
          },
          body
        }
      `,
      { slug }
    );
    // likes ve dislikes alanlarını kontrol et ve null ise 0 olarak ayarla
    // product.likes = product.likes === null ? 0 : product.likes;
    // product.dislikes = product.dislikes === null ? 0 : product.dislikes;
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
}

export async function getCategories() {
  try {
    return client.fetch(
      groq`
        *[_type == "category"] {
         _id,
          title,
          description,
          "slug": slug.current,
        }
      `
    );
  } catch (error) {
    console.log("Error fetching featuredProducts");
    return null;
  }
}
export async function getProductsByCategory(slug) {
  try {
    const products = await client.fetch(
      groq`
        *[_type == "post" && references(*[_type == "category" && slug.current == $slug]._id)] {
          _id,
          title,
          description,
          "slug": slug.current,
          author->{name, image},
          mainImage,
          categories[]->,
          publishedAt,
          lastModifiedDate,
          body
        }
      `,
      { slug }
    );

    return products;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return null;
  }
}
export const getCatWithPostCount = async () => {
  try {
    const query = `*[_type == 'category'] {
    ...,
    "postCount": count(*[_type == 'post' && references(^._id)]),
    author->{name, image},
  } | order(postCount desc)`;
    const tags = await client.fetch(query);
    return tags;
  } catch (error) {
    console.error("getCatWithPostCount Error:", error);
    return [];
  }
};
export const getAllTags = async () => {
  try {
    const tags = await client.fetch('*[_type == "tags"]');
    return tags;
  } catch (error) {
    console.error("Error fetching all tags:", error);
    throw error;
  }
};
export const getProductsByTag = async (tagSlug) => {
  try {
    // Etiketin slug'ına göre ilişkilendirilmiş ürünleri getiren sorgu
    const products = await client.fetch(
      `*[_type == "post" && references(*[_type == "tags" && slug.current == $tagSlug]._id)]`,
      { tagSlug }
    );
    return products;
  } catch (error) {
    console.error("Error fetching products by tag:", error);
    throw error;
  }
};
export const getTags = async () => {
  const query = `*[_type == 'tags']`;
  const tags = await client.fetch(query);
  return tags;
};
export const getTagsWithPostCount = async () => {
  const query = `*[_type == 'tags'] {
    ...,
    "postCount": count(*[_type == 'post' && references(^._id)])
  } | order(postCount desc)`;
  const tags = await client.fetch(query);
  return tags;
};
export const getRelatedTagsPost = async (postId) => {
  const relatedPosts = await client.fetch(
    `
    *[_type == "post" && _id != $postId && count(tags) > 0]{
      title,
      mainImage,
      _id,
      "slug": slug.current,
      author->{name},
    }`,
    { postId }
  );

  return relatedPosts;
};
export const getTagsFromProduct = async (postId) => {
  const product = await client.fetch(
    `*[_type == "post" && _id == $postId][0]`,
    { postId }
  );
  return product.tags || [];
};
export const getRelatedCategoryProducts = async (categoryId) => {
  try {
    // Belirli kategorideki ürünleri getir
    const relatedProducts = await client.fetch(
      `
      *[_type == "post" && references($categoryId)]{
        _id,
        title,
        description,
        price,
        mainImage {
          asset-> {
            url
          }
        }
      }
      `,
      { categoryId }
    );

    return relatedProducts;
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
};

// ! Blog Detail Related Posts
export async function getRelatedPostByCategory(categoryId) {
  try {
    const products = await client.fetch(
      groq`
        *[_type == "post" && references($categoryId)] {
          _id,
          author->{name, image},
          title,
          "slug": slug.current,
          description,
          mainImage,
          categories[]->,
          publishedAt,
          lastModifiedDate,
          body
        }
      `,
      { categoryId }
    );

    return products;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return null;
  }
}
// ! Post Comment
export const createComment = async (postId, commentData) => {
  try {
    const result = await client.create({
      _type: "postComment", // Koleksiyon türü
      post: {
        _type: "reference",
        _ref: postId, // Hangi ürüne ait olduğunu belirtmek için ürün referansı
      },
      ...commentData, // Yorum verileri
    });
    console.log("Comment created:", result);
    return result._id; // Oluşturulan yorumun kimliğini döndürür
  } catch (error) {
    console.error("Error creating comment:", error);
    return null;
  }
};
export const deleteComment = async (commentId) => {
  try {
    await client.delete(commentId);
    console.log("Comment deleted successfully.");
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw new Error("Error deleting comment");
  }
};
const fetchComments = async (postId) => {
  try {
    const commentsWithUser = await client.fetch(
      `
      *[_type == "postComment" && post._ref == $postId] {
        _id,
        user {
          fullName,
          imageUrl,
          id,
        },
        text,
        rating,
        date
      }
    `,
      { postId }
    );

    const comments = commentsWithUser.map((comment) => ({
      _id: comment._id,
      user: comment.user,
      text: comment.text,
      rating: comment.rating,
      date: comment.date,
      imageUrl: comment.user.imageUrl, // Kullanıcı profili resmi URL'si
    }));

    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};
// ! Post Views counter
export async function incrementArticleViews(articleId) {
  // Makaleyi al
  const article = await client.getDocument(articleId);
  // Görüntüleme sayısını bir artır
  const newViews = article.views ? article.views + 1 : 1;
  // Görüntüleme sayısını güncelle
  await client.patch(articleId).set({ views: newViews }).commit();
}
// ! Faq
// export async function getArticleIdFromSlug(slug) {
//   const query = `*[_type == "post" && slug.current == $slug][0]._id`;

//   const params = { slug };

//   const result = await client.fetch(query, params);

//   // Eğer sonuç dizi şeklinde değilse veya boşsa hata fırlat
//   if (!Array.isArray(result) || result.length === 0) {
//     throw new Error("Makale bulunamadı");
//   }

//   return result[0];
// }

// export async function getFAQsForArticle(articleId) {
//   const query = `*[_type == "post" && _id == $articleId][0].faq[]{
//     _id,
//     question,
//     answer
//   }`;

//   const params = { articleId };

//   const results = await client.fetch(query, params);
//   return results;
// }

// export async function getFAQsForPost(postId) {
//   try {
//     const faqs = await client.fetch(
//       `*[_type == "faq" && relatedPost._ref == $postId] {
//         _id,
//         question,
//         answer
//       }`,
//       { postId }
//     );

//     return faqs;
//   } catch (error) {
//     console.error("Error fetching FAQs for post:", error);
//     return null;
//   }
// }

export default fetchComments;
