import { calculateTimeAgo } from "@/components/calculateTimeAgo";
import Head from "next/head";
import {
  getPostById,
  getRelatedPostByCategory,
} from "../../../sanity/lib/client";
import { urlForImage } from "../../../sanity/lib/image";
import React, { Suspense, useEffect } from "react";
import { useRouter } from "next/router";
import { logPageView } from "@/utils/analytics";
import PostDetail from "@/components/Blog/PostDetail";
import NotifyOnPublish from "@/components/Google/NotifyOnPublish";

export default function BlogDetailsPage({ post, relatedProducts }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => logPageView(url);

    if (router.isReady) {
      logPageView(router.asPath);
      router.events.on("routeChangeComplete", handleRouteChange);
    }

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.isReady, router.asPath, router.events]);

  const postUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post?.slug}`;
  const postImage = post?.postImage;

  // JSON-LD Schema Markup verisi
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post?.title,
    description: post?.metaDescription?.substring(0, 160),
    image: postImage,
    author: {
      "@type": "Person",
      name: post?.author?.name,
      image: post?.imageUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Asgofy",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
      },
    },
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: post?.lastModifiedDate
      ? new Date(post.lastModifiedDate).toISOString()
      : new Date(post.publishedAt).toISOString(),

    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`,
  };
  return (
    <>
      <Head>
        <title>{post?.title || post?.metaTitle}</title>
        <meta
          name="description"
          content={
            post?.metaDescription?.substring(0, 160) ||
            post?.description?.substring(0, 160) ||
            `Read about ${post?.title} on Asgofy Blog!`
          }
        />
        <link rel="canonical" href={postUrl} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:title" content={post?.title} />
        <meta property="og:description" content={post?.metaDescription} />
        <meta property="og:image" content={postImage || "/default_image.jpg"} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post?.title || post?.metaTitle} />
        <meta name="twitter:description" content={post?.metaDescription} />
        <meta
          name="twitter:image"
          content={postImage || "/default_image.jpg"}
        />
        <meta name="robots" content="index, follow" />
        {/* JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaMarkup).replace(/</g, "\\u003c"),
          }}
        />
      </Head>
      <PostDetail post={post} relatedProducts={relatedProducts} />

      {/* Google'a bildirim göndermek için NotifyOnPublish component'ini kullanıyoruz */}
      <NotifyOnPublish
        url={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`}
        type="URL_UPDATED" // İçerik güncelleniyorsa
      />
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const processedPost = await getPostById(params.slug);
    if (!processedPost) return { notFound: true };

    const post = {
      ...processedPost,
      imageUrl: processedPost?.author?.image?.asset?._ref
        ? urlForImage(processedPost.author.image.asset._ref)
        : null,
      postImage: processedPost?.mainImage?.asset?._ref
        ? urlForImage(processedPost.mainImage.asset._ref)
        : null,
      timeAgo: calculateTimeAgo(processedPost?.publishedAt),
    };

    const relatedProducts = await getRelatedPosts(post);

    return { props: { post, relatedProducts } };
  } catch (error) {
    console.error("Error fetching post:", error);
    return { notFound: true };
  }
}

async function getRelatedPosts(post) {
  const postCategories = post?.categories?.map((cat) => cat._id) || [];

  const relatedProductsMap = new Map();
  for (const categoryId of postCategories) {
    const products = await getRelatedPostByCategory(categoryId);
    products.forEach((product) => {
      if (product._id !== post._id && !relatedProductsMap.has(product._id)) {
        relatedProductsMap.set(product._id, {
          ...product,
          imageUrl: urlForImage(product?.mainImage?.asset?._ref),
          timeAgo: calculateTimeAgo(product?.publishedAt),
        });
      }
    });
  }
  return Array.from(relatedProductsMap.values());
}
