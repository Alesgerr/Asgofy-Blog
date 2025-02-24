// components/Blog/PopularPosts.js
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@mui/material";

const PopularPosts = ({ featuredProducts }) => {
  const isLoading = !featuredProducts || featuredProducts.length === 0;
  return (
    <div className="my-3">
      <div className="grid gap-8 xl:grid-cols-3">
        {/* Büyük Görsel Alanı */}
        <div className="xl:col-span-2 relative">
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={480}
              className="dark:bg-gray-900 rounded-lg"
            />
          ) : (
            <>
              <Image
                width={500}
                height={500}
                loading="lazy"
                src={featuredProducts[0].imageUrl}
                alt={featuredProducts[0].title}
                className="w-full sm:h-[27rem] md:h-[30rem] object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-65 rounded-lg"></div>
              <Link href={`/blog/${featuredProducts[0]?.slug}`}>
                <div className="absolute bottom-2 left-6 right-6 bg-black bg-opacity-50 text-white p-3 md:p-6 rounded-lg max-w-lg">
                  <h2 className="text-xs sm:text-sm lg:text-lg font-bold">
                    {featuredProducts[0].title}
                  </h2>
                  <button className="mt-4 bg-black text-white px-5 py-2 rounded-lg font-medium transition duration-300 hover:bg-white hover:text-black">
                    Read More
                  </button>
                </div>
              </Link>
            </>
          )}
        </div>

        {/* Küçük Kartlar */}
        <div className="grid gap-6 grid-cols-2">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex flex-col rounded-lg">
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={160}
                    className="dark:bg-gray-900 rounded-lg"
                  />
                  <Skeleton
                    variant="text"
                    width="80%"
                    className="dark:bg-gray-900 mt-3"
                  />
                  <Skeleton
                    variant="text"
                    width="60%"
                    className="dark:bg-gray-900"
                  />
                </div>
              ))
            : featuredProducts?.slice(1, 5).map((article, index) => (
                <div
                  key={index}
                  className="flex flex-col rounded-lg overflow-hidden"
                >
                  <div className="relative">
                    <Link href={`/blog/${article?.slug}`}>
                      <Image
                        width={500}
                        height={500}
                        loading="lazy"
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-40 sm:h-64 xl:h-24 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                    </Link>
                  </div>

                  <div className="mt-3">
                    <Link
                      href={`/categories/${article?.categories[0]?.slug?.current}`}
                      className="text-sm font-semibold"
                    >
                      <span className="bg-black dark:bg-white dark:text-black text-white p-1 hover:opacity-50 hover:text-white dark:hover:text-black transition duration-300 rounded-lg">
                        {article?.categories[0]?.title}
                      </span>
                    </Link>
                    <Link href={`/blog/${article?.slug}`}>
                      <h2 className="text-xs sm:text-sm font-medium hover:opacity-50 hover:text-gray-950 dark:hover:text-gray-200 transition duration-300 mt-3">
                        {article?.title.length > 50
                          ? article?.title.slice(0, 50) + "..."
                          : article?.title}
                      </h2>
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default PopularPosts;
