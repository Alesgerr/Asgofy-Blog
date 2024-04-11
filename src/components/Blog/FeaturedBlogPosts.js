"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@mui/material";
import { usePostContext } from "@/context/PostContext";
import PostPublishedDate from "../PostPublishedDate";
import Slider from "react-slick";
import Script from "next/script";
import "../../assets/Blog.css";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
const FeaturedBlogPosts = () => {
  const { featuredProducts, loading } = usePostContext();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 3,
    // appendDots: (dots) => (
    //   <div
    //     style={{
    //       backgroundColor: "#ddd",
    //       borderRadius: "10px",
    //       padding: "10px",
    //     }}
    //   >
    //     <ul style={{ margin: "0px" }}> {dots} </ul>
    //   </div>
    // ),
    // customPaging: (i) => (
    //   <div
    //     style={{
    //       width: "30px",
    //       color: "blue",
    //       border: "1px blue solid",
    //     }}
    //   >
    //     {i + 1}
    //   </div>
    // ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
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
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
    ],
  };
  useEffect(() => {
    const swiper = new Swiper(".mySwiper", {
      slidesPerView: 2,
      spaceBetween: 28,
      centeredSlides: false,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
          centeredSlides: false,
        },
        568: {
          slidesPerView: 2,
          spaceBetween: 28,
          centeredSlides: false,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 28,
          centeredSlides: false,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
      },
      modules: [Navigation, Pagination],
    });

    return () => {
      swiper.destroy();
    };
  }, []);
  return (
    <>
      <section class="py-24 ">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex justify-center flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between gap-8">
            <div class="w-full flex justify-between flex-col lg:w-2/5">
              <div class="block lg:text-left text-center">
                <h2 class="text-3xl font-bold text-gray-900 leading-[3.25rem] mb-5">
                  Our featured <span class=" text-indigo-600">blogs</span>
                </h2>
                <p class="text-gray-500 mb-10  max-lg:max-w-xl max-lg:mx-auto">
                  Welcome to our blog section, where knowledge meets
                  inspiration. Explore insightful articles, expert tips, and the
                  latest trends in our field.
                </p>
                <Link
                  href="/blog"
                  class="cursor-pointer border border-gray-300 shadow-sm rounded-full py-3.5 px-7 w-52 lg:mx-0 mx-auto flex justify-center text-gray-900 font-semibold transition-all duration-300 hover:bg-gray-100"
                >
                  View All
                </Link>
              </div>
              {/* <!-- Slider controls --> */}
              <div class="flex items-center lg:justify-start justify-center lg:mt-0 mt-8 gap-8 mb-4">
                <button
                  id="slider-button-left"
                  class="swiper-button-prev group flex justify-center items-center border border-solid border-indigo-600 w-11 h-11 transition-all duration-500 rounded-full hover:bg-indigo-600"
                  data-carousel-prev
                >
                  <svg
                    class="h-6 w-6 text-indigo-600 group-hover:text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.9999 12L4.99992 12M9.99992 6L4.70703 11.2929C4.3737 11.6262 4.20703 11.7929 4.20703 12C4.20703 12.2071 4.3737 12.3738 4.70703 12.7071L9.99992 18"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <button
                  id="slider-button-right"
                  class="swiper-button-next group flex justify-center items-center border border-solid border-indigo-600 w-11 h-11 transition-all duration-500 rounded-full hover:bg-indigo-600"
                  data-carousel-next
                >
                  <svg
                    class="h-6 w-6 text-indigo-600 group-hover:text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 12L19 12M14 18L19.2929 12.7071C19.6262 12.3738 19.7929 12.2071 19.7929 12C19.7929 11.7929 19.6262 11.6262 19.2929 11.2929L14 6"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="w-full lg:w-3/5">
              {/* <!--Slider wrapper--> */}
              <div class="swiper mySwiper">
                <div class="swiper-wrapper">
                  {featuredProducts?.map((post, index) => (
                    <div
                      key={index}
                      class="swiper-slide w-full max-lg:max-w-xl lg:w-1/2 group"
                    >
                      <Link href={`/blog/${post?.slug}`}>
                        <div class="flex items-center mb-9">
                          <Image
                            class="rounded-2xl w-full"
                            src={post?.imageUrl}
                            alt={post?.title}
                            width={400}
                            height={100}
                            priority
                          />
                        </div>
                        <h3 class="text-xl text-gray-900 font-medium leading-8 mb-4 group-hover:text-indigo-600">
                          {post?.title}
                        </h3>
                        <p class="text-gray-500 leading-6 transition-all duration-500 mb-8">
                          {post?.description.length > 100
                            ? post?.description?.slice(0, 100) + "..."
                            : post?.description}
                        </p>
                        <div
                          class="cursor-pointer flex items-center gap-2 text-lg text-indigo-700 font-semibold"
                        >
                          Read more
                          <svg
                            width="15"
                            height="12"
                            viewBox="0 0 15 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.25 6L13.25 6M9.5 10.5L13.4697 6.53033C13.7197 6.28033 13.8447 6.15533 13.8447 6C13.8447 5.84467 13.7197 5.71967 13.4697 5.46967L9.5 1.5"
                              stroke="#4338CA"
                              stroke-width="1.8"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="py-12">
        <div className="max-w-7xl mx-auto px-5 md:px-14 overflow-hidden">
          {loading ? (
            <div className="rounded-md">
              <Skeleton
                width={230}
                height={50}
                variant="rectangular"
                className="rounded-md dark:bg-zinc-900"
              />
            </div>
          ) : (
            <h2 className="text-2xl font-bold mb-6">Most Popular Content</h2>
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
              Her bir slide için içerik doğrudan burada tanımlanıyor
              {featuredProducts?.map((post, index) => (
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
                            className="rounded-md mb-3 h-28 sm:h-52 object-cover"
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
                          <Link
                            href={`/categories/${post?.categories[0]?.slug.current}/`}
                          >
                            <h3 className="mb-2 text-purple-700 font-bold">
                              {post?.categories[0]?.title}
                            </h3>
                          </Link>
                          <h2 className="text-sm md:text-base font-semibold dark:text-white mb-2 h-20">
                            {post?.title.length > 50
                              ? post?.title.slice(0, 60) + "..."
                              : post?.title}
                          </h2>
                          <Link
                          href={`/blog/blog-detail/${post?.slug}`}
                          className="text-blue-600 font-semibold hover:underline"
                        >
                          Read More
                        </Link>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div> */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6953220018369928"
        crossOrigin="anonymous"
      ></Script>
    </>
  );
};

export default FeaturedBlogPosts;
