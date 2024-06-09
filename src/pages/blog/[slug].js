import { calculateTimeAgo } from "@/components/calculateTimeAgo";
import PostPublishedDate from "@/components/PostPublishedDate";
import BodyDescription from "@/components/BodyDescriptions";
import Image from "next/image";
import { Skeleton } from "@mui/material";
import { LiaArrowRightSolid } from "react-icons/lia";
import { CiUser, CiClock1 } from "react-icons/ci";
import Link from "next/link";

import {
  PinterestShareButton,
  PinterestIcon,
  TwitterShareButton,
  TwitterIcon,
} from "next-share";

import Head from "next/head";
import {
  getArticleIdFromSlug,
  getFAQsForArticle,
  getFAQsForPost,
  getPostById,
  getRelatedPostByCategory,
} from "../../../sanity/lib/client";
import { urlForImage } from "../../../sanity/lib/image";
import Script from "next/script";
import React, { Suspense } from "react";
import ShareGroup from "@/components/ShareGroup";
import CommentForm from "@/components/CommentForm";
import AnimationWrapper from "@/components/AnimationWrapper";
import Faq from "@/components/Faq";
import Breadcrumb from "@/components/Breadcrumbs";
import PostDetail from "@/components/Blog/PostDetail";
import PageLoader from "@/components/PageLoader";

export default function BlogDetailsPage({ post, relatedProducts }) {
  // if (!post) {
  //   return <LoadingCard />;
  // }
  // const { metaTitle, metaDescription } = post;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const postUrl = `${baseUrl}/blog/${post?.slug}`;
  const postImage = post?.postImage;
  return (
    <>
      <Head>
        <title>{post?.title || post?.metaTitle}</title>
        <meta name="description" content={post?.metaDescription} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post?.slug}`}
        />{" "}
        {/* Canonical URL */}
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post?.slug}`}
        />
        <meta property="og:title" content={post?.title} />
        <meta property="og:description" content={post?.description} />
        <meta property="og:image" content={postImage} />
        <meta property="og:type" content="article" />
        {/* Twitter Cards meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post?.title || post?.metaTitle} />
        <meta name="twitter:description" content={post?.metaDescription} />
        <meta name="twitter:image" content={postImage} />
      </Head>
      <PostDetail post={post} relatedProducts={relatedProducts} />
    </>
  );
}
export async function getServerSideProps(context) {
  const { params, req } = context;
  const slug = params.slug;
  const currentUrl = req.url;
  try {
    const processedPost = await getPostById(slug); // Post verisini getirme işlevi
    if (!processedPost) {
      return {
        notFound: true, // Eğer post bulunamazsa 404 sayfasına yönlendirilir
      };
    }
    const post = {
      ...processedPost,
      imageUrl: urlForImage(processedPost?.author?.image?.asset?._ref),
      postImage: urlForImage(processedPost?.mainImage?.asset?._ref),
      timeAgo: calculateTimeAgo(processedPost?.publishedAt),
    };
    // Mevcut ürünün kategorilerinden gelen ürünleri saklayacak bir dizi oluşturun
    let relatedProductsArray = [];
    const postProductCategoriesId = Array.isArray(post?.categories)
      ? post?.categories.map((item) => item._id)
      : [];
    // Mevcut ürünün kategorilerini döngüye alın
    for (const categoryId of postProductCategoriesId) {
      // Her bir kategori için ilgili ürünleri getirin
      const products = await getRelatedPostByCategory(categoryId);
      const processedData = products?.map((product) => ({
        ...product,
        imageUrl: urlForImage(product?.mainImage.asset._ref),
        timeAgo: calculateTimeAgo(product?.publishedAt),
      }));

      const currentProductId = post._id;

      // Mevcut ürün ile aynı ID'ye sahip olan ürünleri filtreleyin
      const filteredProducts = processedData.filter(
        (product) => product._id !== currentProductId
      );
      // Gelen ürünleri relatedProductsArray dizisine ekleyin
      relatedProductsArray = [...relatedProductsArray, ...filteredProducts];
    }

    // Dizideki tekrarlanan ürünleri kaldırın
    const uniqueRelatedProducts = Array.from(
      new Set(relatedProductsArray.map((product) => product._id))
    ).map((id) => relatedProductsArray.find((product) => product._id === id));

    return {
      props: {
        post,
        currentUrl,
        relatedProducts: uniqueRelatedProducts,
      },
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return {
      notFound: true,
    };
  }
}

// const LoadingCard = () => (
//   <>
//     <div className="overflow-hidden">
//       <div className="mx-auto flex flex-wrap justify-center px-5 md:px-14">
//         <div className="lg:w-3/12 md:order-1 hidden md:block">
//           <Skeleton
//             className="dark:bg-gray-500 w-full rounded-md my-1 mx-auto"
//             variant="rectangular"
//             width={200}
//             height={200}
//           />
//         </div>
//         <div className="lg:w-6/12 md:order-2">
//           <Skeleton
//             className="dark:bg-gray-500 w-full rounded-md my-1 mx-auto"
//             variant="rectangular"
//             width={400}
//             style={{ minWidth: "200px", maxWidth: "calc(100% - 32px)" }} // 32px, padding değerleri için tahmini bir değer
//             height={80}
//           />
//           <Skeleton
//             className="dark:bg-gray-500 w-full rounded-md my-1 mx-auto"
//             variant="rectangular"
//             width={400}
//             style={{ minWidth: "200px", maxWidth: "calc(100% - 32px)" }} // 32px, padding değerleri için tahmini bir değer
//             height={500}
//           />
//           <Skeleton
//             className="dark:bg-gray-500 w-full rounded-md my-1 mx-auto"
//             variant="rectangular"
//             width={400}
//             style={{ minWidth: "200px", maxWidth: "calc(100% - 32px)" }} // 32px, padding değerleri için tahmini bir değer
//             height={1000}
//           />
//         </div>
//         <div className="lg:w-3/12 md:order-3">
//           <Skeleton
//             className="dark:bg-gray-500 w-full rounded-md my-1 mx-auto"
//             variant="rectangular"
//             width={200}
//             height={200}
//           />
//         </div>
//       </div>
//     </div>
//   </>
// );
