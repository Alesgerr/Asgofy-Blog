"use client";
import React, { useState, useEffect } from "react";
import { getPosts } from "../../../sanity/lib/client";
import { urlForImage } from "../../../sanity/lib/image";
import Link from "next/link";
import Image from "next/image";
import { calculateTimeAgo } from "../calculateTimeAgo";
import { usePostContext } from "@/context/PostContext";
import { Skeleton } from "@mui/material";
import PostPublishedDate from "../PostPublishedDate";
import Slider from "react-slick";

const LatestBlogPosts = () => {
  const { latestProducts, loading } = usePostContext();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };
  return (
    <>
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-5 md:px-14 overflow-hidden">
          {loading ? (
            <div className="rounded-md">
              <Skeleton
                width={300}
                height={50}
                variant="rectangular"
                className="rounded-md dark:bg-zinc-900 mx-auto sm:mx-0"
              />
            </div>
          ) : (
            <h2 className="text-2xl font-bold mb-6">
              The latest and greatest news
            </h2>
          )}
          {loading ? (
            <div className="mt-3 flex">
              <div className="sm:hidden">
                <Skeleton
                  width={320}
                  height={300}
                  style={{ minWidth: "400px", maxWidth: "calc(100% - 10px)" }} // 32px, padding değerleri için tahmini bir değer
                  variant="rectangular"
                  className="rounded-md dark:bg-zinc-900"
                />
              </div>
              <div className="hidden sm:block mx-auto">
                <Skeleton
                  width={230}
                  height={300}
                  variant="rectangular"
                  className="rounded-md dark:bg-zinc-900"
                />
              </div>
              <div className="hidden sm:block mx-auto">
                <Skeleton
                  width={230}
                  height={300}
                  variant="rectangular"
                  className="rounded-md dark:bg-zinc-900 "
                />
              </div>
              <div className="hidden sm:block mx-auto">
                <Skeleton
                  width={230}
                  height={300}
                  variant="rectangular"
                  className="rounded-md dark:bg-zinc-900 "
                />
              </div>
              <div className="hidden md:block mx-auto">
                <Skeleton
                  width={230}
                  height={300}
                  variant="rectangular"
                  className="rounded-md mx-auto dark:bg-zinc-900 "
                />
              </div>
            </div>
          ) : (
            <Slider arrows={false} {...settings}>
              {/* Her bir slide için içerik doğrudan burada tanımlanıyor */}
              {latestProducts?.map((post, index) => (
                <div key={index}>
                  {loading ? (
                    <div className="rounded-md bg-gray-100 dark:bg-zinc-900">
                      <Skeleton
                        width={300}
                        height={300}
                        variant="rectangular"
                        className="rounded-md"
                      />
                    </div>
                  ) : (
                    <div className="rounded-md mx-1">
                      <div>
                        <Link href={`/blog/${post?.slug}`}>
                          <Image
                            className="rounded-md mb-3 h-52 object-cover"
                            src={post?.imageUrl}
                            alt={post?.title}
                            width={400}
                            height={100}
                            priority={true}
                          />
                          <div className="flex items-center mb-2">
                            <span className="text-gray-500 text-sm">
                              <PostPublishedDate
                                publishedAt={post?.publishedAt}
                              />
                            </span>
                            <span className="px-1">|</span>
                            <p className="text-gray-500 text-sm">
                              {post?.timeAgo}
                            </p>
                          </div>
                          <Link href={`/categories/${post?.categories[0]?.slug.current}/`}>
                            <h3 className="mb-2 text-purple-700 font-bold">
                              {post?.categories[0]?.title}
                            </h3>
                          </Link>
                          <h2 className="text-sm md:text-base font-semibold dark:text-white mb-2">
                            {post?.title.length > 50
                              ? post?.title.slice(0, 60) + "..."
                              : post?.title}
                          </h2>
                          {/* <div className="text-purple-700 font-semibold hover:underline">
                            Read More
                          </div> */}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6953220018369928"
        crossOrigin="anonymous"
      ></script>
      {/* <section class="py-10">
       <h1 class="mb-12 text-center font-sans text-5xl font-bold">Our Blog</h1>
       <div class="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-4 sm:px-8 md:grid-cols-3">
         <article class="mx-auto my-4 flex w-full flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg">
           <a href="#">
             <img
               src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhcnRuZXJzaGlwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
               class="h-56 w-full object-cover"
               alt=""
             />
             <div class="flex-auto px-6 py-5">
               <span class="mb-2 flex items-center text-sm font-semibold">
                 <svg
                   class="mr-1"
                   xmlns="http://www.w3.org/2000/svg"
                   aria-hidden="true"
                   role="img"
                   width="1em"
                   height="1em"
                   preserveAspectRatio="xMidYMid meet"
                   viewBox="0 0 24 24"
                 >
                   <path
                     fill="none"
                     stroke="currentColor"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     stroke-width="1.5"
                     d="M14.272 10.445L18 2m-8.684 8.632L5 2m7.761 8.048L8.835 2m5.525 0l-1.04 2.5M6 16a6 6 0 1 0 12 0a6 6 0 0 0-12 0Z"
                   />
                 </svg>
                 Awards
               </span>
               <h3 class="mt-4 dark:text-red-500 mb-3 text-xl font-semibold xl:text-2xl">
                 We came first in Awwwards ceremony 2021
               </h3>
               <p class="mb-4 text-base font-light">
                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
                 tempore officiis. Lorem, ipsum dolor.
               </p>
               <span class="inline-block cursor-pointer select-none rounded-full border border-gray-800 bg-gray-800 px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">
                 Learn More
               </span>
             </div>
           </a>
         </article>

         <article class="mx-auto my-4 flex w-full flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg">
           <a href="#">
             <img
               src="https://images.unsplash.com/photo-1594122230689-45899d9e6f69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXdhcmRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
               class="h-56 w-full object-cover"
               alt=""
             />
             <div class="flex-auto px-6 py-5">
               <span class="mb-2 flex items-center text-sm font-semibold">
                 <svg
                   class="mr-1"
                   xmlns="http://www.w3.org/2000/svg"
                   aria-hidden="true"
                   role="img"
                   width="1em"
                   height="1em"
                   preserveAspectRatio="xMidYMid meet"
                   viewBox="0 0 24 24"
                 >
                   <path
                     fill="none"
                     stroke="currentColor"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     stroke-width="1.5"
                     d="M14.272 10.445L18 2m-8.684 8.632L5 2m7.761 8.048L8.835 2m5.525 0l-1.04 2.5M6 16a6 6 0 1 0 12 0a6 6 0 0 0-12 0Z"
                   />
                 </svg>
                 Awards
               </span>
               <h3 class="mt-4 mb-3 text-xl font-semibold xl:text-2xl">
                 We came first in Awwwards ceremony 2021
               </h3>
               <p class="mb-4 text-base font-light">
                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
                 tempore officiis. Lorem, ipsum dolor.
               </p>
               <span class="inline-block cursor-pointer select-none rounded-full border border-gray-800 bg-gray-800 px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">
                 Learn More
               </span>
             </div>
           </a>
         </article>

         <article class="mx-auto my-4 flex w-full flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg">
           <a href="#">
             <img
               src="https://images.unsplash.com/photo-1569705460033-cfaa4bf9f822?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YXdhcmRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
               class="h-56 w-full object-cover"
               alt=""
             />
             <div class="flex-auto px-6 py-5">
               <span class="mb-2 flex items-center text-sm font-semibold">
                 <svg
                   class="mr-1"
                   xmlns="http://www.w3.org/2000/svg"
                   aria-hidden="true"
                   role="img"
                   width="1em"
                   height="1em"
                   preserveAspectRatio="xMidYMid meet"
                   viewBox="0 0 24 24"
                 >
                   <path
                     fill="none"
                     stroke="currentColor"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     stroke-width="1.5"
                     d="M14.272 10.445L18 2m-8.684 8.632L5 2m7.761 8.048L8.835 2m5.525 0l-1.04 2.5M6 16a6 6 0 1 0 12 0a6 6 0 0 0-12 0Z"
                   />
                 </svg>
                 Awards
               </span>
               <h3 class="mt-4 mb-3 text-xl font-semibold xl:text-2xl">
                 We came first in Awwwards ceremony 2021
               </h3>
               <p class="mb-4 text-base font-light">
                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
                 tempore officiis. Lorem, ipsum dolor.
               </p>
               <span class="inline-block cursor-pointer select-none rounded-full border border-gray-800 bg-gray-800 px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">
                 Learn More
               </span>
             </div>
           </a>
         </article>
       </div>
     </section> */}
    </>
  );
};
export default LatestBlogPosts;

const LoadingCard = () => (
  <>
    {/* Main Article */}
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Left Section */}
      <div className="lg:col-span-2 flex flex-col overflow-hidden rounded-md cursor-pointer">
        <div className="flex-shrink-0 mb-8 relative">
          <div className="skeleton-image rounded-lg">
            <Skeleton
              className="dark:bg-gray-500 w-full rounded-md my-1"
              variant="rectangular"
              width={800}
              style={{ minWidth: "200px", maxWidth: "calc(100% - 5px)" }} // 32px, padding değerleri için tahmini bir değer
              height={400}
            />
          </div>
        </div>
      </div>
      {/* Right Section */}
      <div className="lg:col-span-2 flex flex-col overflow-hidden rounded-md cursor-pointer">
        <div className="flex-shrink-0 mb-8 relative">
          <div className="skeleton-image rounded-lg">
            <Skeleton
              className="dark:bg-gray-500 w-full rounded-md my-1"
              variant="rectangular"
              width={800}
              style={{ minWidth: "200px", maxWidth: "calc(100% - 5px)" }} // 32px, padding değerleri için tahmini bir değer
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  </>
);
