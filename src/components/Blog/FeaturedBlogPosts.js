"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../assets/Blog.css";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { Skeleton } from "@mui/material";
import { usePostContext } from "@/context/PostContext";
const FeaturedBlogPosts = () => {
  const { featuredProducts } = usePostContext();
  // useEffect(() => {
  //   const swiper = new Swiper(".mySwiper", {
  //     slidesPerView: 2,
  //     spaceBetween: 28,
  //     centeredSlides: false,
  //     loop: true,
  //     pagination: {
  //       el: ".swiper-pagination",
  //       clickable: true,
  //     },
  //     navigation: {
  //       nextEl: ".swiper-button-next",
  //       prevEl: ".swiper-button-prev",
  //     },
  //     breakpoints: {
  //       0: {
  //         slidesPerView: 1,
  //         spaceBetween: 20,
  //         centeredSlides: false,
  //       },
  //       568: {
  //         slidesPerView: 2,
  //         spaceBetween: 28,
  //         centeredSlides: false,
  //       },
  //       768: {
  //         slidesPerView: 2,
  //         spaceBetween: 28,
  //         centeredSlides: false,
  //       },
  //       1024: {
  //         slidesPerView: 2,
  //         spaceBetween: 32,
  //       },
  //     },
  //     modules: [Navigation, Pagination],
  //   });

  //   return () => {
  //     swiper.destroy();
  //   };
  // }, []);
  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-5 py-10 md:px-14 md:py-14 lg:py-12">
        {/* Main Article */}
        {featuredProducts && (
          <h2 className="text-2xl pb-5 dark:text-white">
            Popular <span className="text-indigo-600 font-bold ">posts</span>
          </h2>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3 flex flex-col overflow-hidden rounded-md">
            <div className="flex-shrink-0 mb-8 relative">
              <Link
                href={`/blog/${
                  featuredProducts[featuredProducts.length - 1]?.slug
                }`}
              >
                {featuredProducts[featuredProducts.length - 1]?.imageUrl ? (
                  <div>
                    <Image
                      src={
                        featuredProducts[featuredProducts.length - 1]?.imageUrl
                      } // İlk ürünün resmini büyük olarak gösteriyoruz
                      alt={featuredProducts[featuredProducts.length - 1]?.title}
                      className="rounded-lg w-full"
                      width={400}
                      height={200}
                      objectFit="fil"
                      loading="lazy"
                    />
                    <div className="absolute h-full inset-0 bg-black opacity-50 rounded-md"></div>
                  </div>
                ) : (
                  <Skeleton
                    variant="rectangular"
                    className="bg-gray-200 dark:bg-zinc-400"
                    width={600}
                    height={400}
                  />
                )}
              </Link>

              <div className="absolute bottom-1 p-7 lg:bottom-5 lg:p-10">
                <h2 className="mb-4 text-[16px] text-white font-bold lg:text-2xl">
                  {featuredProducts[featuredProducts.length - 1]?.title}
                </h2>
                {featuredProducts[featuredProducts.length - 1]?.slug ? (
                  <Link
                    href={`/blog/${
                      featuredProducts[featuredProducts.length - 1]?.slug
                    }`}
                    className="mr-5 items-center rounded-md bg-black px-6 py-3 font-semibold text-white lg:mr-8"
                  >
                    Read More
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          {/* Featured Articles */}
          <div className="lg:col-span-2 grid grid-cols-1">
            <div className="grid grid-cols-2 gap-3">
              {/* Loop through the rest of the latest products starting from index 1 */}
              {featuredProducts
                ?.slice(0, -1)
                ?.slice(-4)
                ?.map((product, index) => (
                  <div
                    className="flex flex-col rounded-lg featured-article"
                    key={index}
                  >
                    <div className="img">
                      <Link href={`/blog/${product?.slug}`}>
                        <Image
                          className="rounded-lg w-full h-28 sm:h-32 object-cover cursor-pointer"
                          src={product?.imageUrl}
                          alt={product?.title}
                          width={350}
                          height={200}
                          loading="lazy"
                          objectFit="contain"
                        />
                      </Link>
                    </div>
                    {/* <span className="mb-2 rounded-md bg-[#f2f2f7] my-5 px-2 py-1.5">
                      <Link
                        href={`/categories/${product?.categories[0]?.slug?.current}`}
                        className="text-sm font-semibold text-[#6574f8]"
                      >
                        {product?.categories[0]?.title}
                      </Link>
                    </span> */}
                    <Link href={`/blog/${product?.slug}`} key={index}>
                      <h2 className="text-[13px] mt-3 font-bold">
                        {product?.title?.length > 50
                          ? product?.title?.slice(0, 50) + "..."
                          : product?.title}
                      </h2>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedBlogPosts;
