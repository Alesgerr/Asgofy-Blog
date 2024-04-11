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
  getPostById,
  getRelatedPostByCategory,
} from "../../../sanity/lib/client";
import { urlForImage } from "../../../sanity/lib/image";
import Script from "next/script";
import React from "react";
import ShareGroup from "@/components/ShareGroup";
import CommentForm from "@/components/CommentForm";

export default function BlogDetailsPage({ post, currentUrl, relatedProducts }) {
  if (!post) {
    return <LoadingCard />;
  }
  
  // const { metaTitle, metaDescription } = post;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const postUrl = `${baseUrl}/blog/${post?.slug}`;
  const postImage = post?.postImage;
  return (
    <>
      <Head>
        <title>{post?.title || post?.metaTitle}</title>
        <meta
          name="description"
          content={post?.metaDescription || post?.description}
        />
        <meta
          property="og:url"
          content={`https://asgoshop.com/blog/${post?.slug}`}
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
      <div className="justify-between relative mx-auto max-w-7xl overflow-hidden py-5 px-5 md:px-14">
        {/* <!-- Blog Article --> */}
        <div className="blog-article">
          <div className="pb-12 lg:flex">
            <div className="hidden">
              <button
                className="py-3 bg-black dark:bg-white my-5 px-5 rounded-md dark:text-black text-white"
                // onClick={toggleMenu}
              >
                Categories
              </button>
            </div>
            <div className="lg:w-6/12 md:order-2">
              <div className="md:mx-5 rounded-md">
                {/* <!-- Avatar Media --> */}
                <div className="flex justify-between items-center mb-6 overflow-hidden">
                  <div className="flex w-full sm:items-center gap-x-5 sm:gap-x-3">
                    <div className="flex-shrink-0">
                      <Image
                        className="size-12 rounded-full"
                        src={post?.imageUrl}
                        alt={post?.title}
                        width={100}
                        height={100}
                        quality={60}
                        priority
                      />
                    </div>
                    <div className="grow">
                      <div className="flex justify-between items-center gap-x-2">
                        <div>
                          {/* <!-- Tooltip --> */}
                          <div className="hs-tooltip inline-block [--trigger:hover] [--placement:bottom]">
                            <div className="hs-tooltip-toggle sm:mb-1 block text-start cursor-pointer">
                              <span className="font-semibold text-purple-700 ">
                                {post?.author.name}
                              </span>

                              {/* <!-- Dropdown Card --> */}
                              <div
                                className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 max-w-xs cursor-default bg-gray-900 divide-y divide-gray-700 shadow-lg rounded-xl dark:bg-black"
                                role="tooltip"
                              >
                                {/* <!-- Body --> */}
                                {/* <div className="p-4 sm:p-5">
                                  <div className="mb-2 flex w-full sm:items-center gap-x-5 sm:gap-x-3">
                                    <div className="flex-shrink-0">
                                      <Image
                                        className="size-8 rounded-full"
                                        src={post?.imageUrl}
                                        alt="Image Description"
                                        width={100}
                                        height={100}
                                        loading="lazy"
                                      />
                                    </div>

                                    <div className="grow">
                                      <p className="text-lg font-semibold text-gray-200">
                                        Leyla Ludic
                                      </p>
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-400">
                                    Leyla is a Customer Success Specialist at
                                    Preline and spends her time speaking to
                                    in-house recruiters all over the world.
                                  </p>
                                </div> */}
                                {/* 
                                <div className="flex justify-between items-center px-4 py-3 sm:px-5">
                                  <ul className="text-xs space-x-3">
                                    <li className="inline-block">
                                      <span className="font-semibold text-gray-200">
                                        56
                                      </span>
                                      <span className="text-gray-400">
                                        articles
                                      </span>
                                    </li>
                                    <li className="inline-block">
                                      <span className="font-semibold text-gray-200">
                                        1k+
                                      </span>
                                      <span className="text-gray-400">
                                        followers
                                      </span>
                                    </li>
                                  </ul>

                                  <div>
                                    <button
                                      type="button"
                                      className="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                    >
                                      <svg
                                        className="flex-shrink-0 size-3.5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                        <path
                                          fillRule="evenodd"
                                          d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                                        />
                                      </svg>
                                      Follow
                                    </button>
                                  </div>
                                </div> */}
                              </div>
                              {/* <!-- End Dropdown Card --> */}
                            </div>
                          </div>
                          {/* <!-- End Tooltip --> */}

                          <ul className="text-xs text-gray-500">
                            <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                              <PostPublishedDate
                                publishedAt={post?.publishedAt}
                              />
                            </li>
                            <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                              {post?.timeAgo}
                            </li>
                          </ul>
                        </div>

                        {/* <!-- Button Group --> */}
                        <div>
                          {/* <div class="sharethis-inline-share-buttons"></div> */}
                          <div className="social-buttons flex">
                            <PinterestShareButton
                              title={post?.title || post?.metaTitle}
                              url={postUrl}
                              media={
                                "next-share is a social share buttons for your next React apps."
                              }
                            >
                              <span className="mr-2 py-1.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                <PinterestIcon size={32} round />
                                <span className="hidden sm:block">Pin</span>
                              </span>
                            </PinterestShareButton>

                            <TwitterShareButton
                              className="flex"
                              title={post?.title || post?.metaTitle}
                              url={postUrl}
                              image={post?.postImage}
                            >
                              <span className="py-1.5 px-2.5 flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                <TwitterIcon size={32} round />
                                <span className="hidden sm:block">Tweet</span>
                              </span>
                            </TwitterShareButton>
                          </div>
                          {/* <TwitterShareButton
                            title={metaTitle}
                            image={post?.postImage}
                            url={currentUrl ? currentUrl : "asgoshop.com"}
                          >
                            <button
                              type="button"
                              className="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                            >
                              <TwitterIcon size={32} round />
                              <svg
                                className="size-3.5"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                              </svg>
                              Tweet
                            </button>
                          </TwitterShareButton> */}
                        </div>
                        {/* <!-- End Button Group --> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- Content --> */}
                <div className="space-y-5 md:space-y-8">
                  <h1 className="text-lg mt-5 sm:text-3xl font-extrabold">
                    {post?.title}
                  </h1>
                  <div className="flex justify-center">
                    <Image
                      src={post?.postImage}
                      alt={post?.title}
                      width={1000}
                      height={500}
                      priority
                      quality={70}
                      className="rounded-md h-[250px] sm:h-[350px] object-cover"
                    />
                  </div>

                  <p className="text-md font-normal">{post?.description}</p>
                  <BodyDescription body={post?.body} title={post?.title} />
                </div>
              </div>
              <div>
                <CommentForm postId={post && post?._id} />
              </div>
              {/* <!-- End Content --> */}
            </div>
            <div className="lg:w-3/12 md:order-1">
              <div className="mb-3 md:mr-4 shadow-sm rounded-md">
                <h3 className="font-bold">Categories</h3>
                {/* <div className="border border-b-2 border-y-red-900 dark:border-red-900 my-5"></div> */}
                <div className="border dark:border-gray-800 mt-3 p-2">
                  {post?.categories?.map((category) => (
                    <Link
                      href={`/categories/${category?.slug?.current}`}
                      key={category._id}
                      className="flex justify-between leading-4 my-4 items-center hover:text-purple-700"
                    >
                      <span className="mr-2">{category?.title}</span>
                      <LiaArrowRightSolid />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:w-3/12 md:order-3">
              <div className="shadow-sm md:ml-2 rounded-md">
                <div className="tags">
                  <h3 className="font-bold">Tags</h3>
                  <div className="flex flex-wrap my-3 gap-1">
                    {post?.tags?.map((item) => (
                      <Link
                        href={`/tag/${item?.slug?.current}`}
                        key={item._id}
                        className="px-1 py-1 text-sm border border-gray-200 rounded-md transition hover:text-purple-700"
                      >
                        {item?.tag}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="related">
                  <div className="my-5 mb-3">
                    <h2 className="font-bold mb-5">Related Posts</h2>
                    <div className="grid grid-cols-1 mx-auto">
                      {relatedProducts?.slice(0, 5)?.map((post) => (
                        <Link href={`/blog/${post?.slug}`}>
                          <div className="flex items-center mb-5 md:mb-7 lg:mb-2">
                            <div className="img-box">
                              <Image
                                src={post?.imageUrl}
                                alt={post?.title}
                                width={150}
                                height={150}
                                priority
                                quality={50}
                                className="rounded-md h-[80px] object-cover"
                              />
                            </div>
                            <div className="body-box p-2">
                              <h2 className="text-sm md:text-[13px] font-bold">
                                {post?.title?.length > 50
                                  ? post?.title.slice(0, 40) + "..."
                                  : post?.title}
                              </h2>
                              <div className="flex flex-wrap items-center">
                                <span className="mr-1 text-xs">
                                  <CiClock1 />
                                </span>
                                <span className="text-sm md:text-[13px]">
                                  {post?.timeAgo}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* !-- Related Posts */}
        {/* <div className="space-y-5 mb-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4 gap-1">
            {relatedProducts?.map((post) => (
              <div className="p-4 rounded-md shadow-md">
                <div>
                  <Link href={`/blog/blog-detail/${post?.slug}`}>
                    <img
                      src={post?.imageUrl}
                      alt={post?.title}
                      className="rounded-md"
                    />
                  </Link>
                  <div className="mt-3">
                    <Link href={`/blog/blog-detail/${post?.slug}`}>
                      <h2 className="text-sm font-semibold hover:text-indigo-500">
                        {post?.title.length > 50
                          ? post?.title.slice(0, 50) + "..."
                          : post?.title}
                      </h2>
                      <div className="flex flex-wrap justify-between mt-2">
                        <div className="flex items-center text-sm">
                          <span className="mr-1 text-xs">
                            <CiUser />
                          </span>
                          {post?.author?.name}
                        </div>
                        <div className="flex items-center text-sm ml-0">
                          <span className="mr-1 text-xs">
                            <CiClock1 />
                          </span>
                          {post?.timeAgo}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        {/* <!-- Sticky Share Group --> */}
        <ShareGroup post={post} slug={post?.slug} />
      </div>
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
