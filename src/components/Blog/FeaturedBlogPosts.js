"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@mui/material";
import { usePostContext } from "@/context/PostContext";
import PostPublishedDate from "../PostPublishedDate";
import Slider from "react-slick";
import Script from "next/script";

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
  return (
    <>
      <div className="py-12">
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
              {/* Her bir slide için içerik doğrudan burada tanımlanıyor */}
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
                          {/* <Link
                          href={`/blog/blog-detail/${post?.slug}`}
                          className="text-blue-600 font-semibold hover:underline"
                        >
                          Read More
                        </Link> */}
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
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6953220018369928"
        crossOrigin="anonymous"
      ></Script>
    </>
  );
};

export default FeaturedBlogPosts;
