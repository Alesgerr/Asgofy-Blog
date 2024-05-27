import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePostContext } from "@/context/PostContext";
import { Skeleton } from "@mui/material";
import PostPublishedDate from "../PostPublishedDate";
import Slider from "react-slick";

const LatestBlogPosts = () => {
  const {latestProducts, isLoading} = usePostContext()
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 1,
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
          {isLoading ? (
            <div className="rounded-md">
              <Skeleton
                width={300}
                height={50}
                variant="rectangular"
                className="rounded-md dark:bg-zinc-900 mx-auto sm:mx-0"
              />
            </div>
          ) : (
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-[3.25rem] mb-5">
              Our latest <span className=" text-indigo-600">posts</span>
            </h2>
          )}
          {isLoading ? (
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
                  {isLoading ? (
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
                            className="rounded-md mb-3 h-72 object-cover"
                            src={post?.imageUrl}
                            alt={post?.title}
                            width={400}
                            height={100}
                            loading="lazy"
                          />
                        </Link>

                        <Link href={`/blog/${post?.slug}`}>
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
                        </Link>
                        <Link
                          href={`/categories/${post?.categories[0]?.slug.current}/`}
                        >
                          <h3 className="mb-2 text-indigo-600 font-bold">
                            {post?.categories[0]?.title}
                          </h3>
                        </Link>
                        <Link href={`/blog/${post?.slug}`}>
                          <h2 className="text-sm md:text-base font-semibold dark:text-white mb-2">
                            {post?.title.length > 50
                              ? post?.title.slice(0, 60) + "..."
                              : post?.title}
                          </h2>
                        </Link>

                        {/* <div className="text-purple-700 font-semibold hover:underline">
                            Read More
                          </div> */}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </>
  );
};
export default LatestBlogPosts;
