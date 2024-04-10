import { createClient, groq } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "../env";
import axios, { Axios } from "axios";
export const client = createClient({
  apiVersion,
  dataset,
  projectId,
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
          publishedAt,
          lastModifiedDate,
          metaTitle,
          metaDescription,
        
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
