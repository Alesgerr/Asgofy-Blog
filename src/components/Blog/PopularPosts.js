// components/Blog/PopularPosts.js
import React from "react";
import Image from "next/image";
import Link from "next/link";

const PopularPosts = ({ featuredProducts }) => {

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="grid gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2 relative">
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
        </div>
        <div className="grid gap-6 grid-cols-2">
          {featuredProducts.slice(1, 5).map((article, index) => (
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
                  <span className="bg-black dark:bg-white dark:text-black text-white p-1 rounded-lg">
                    {article?.categories[0]?.title}
                  </span>
                </Link>
                <Link href={`/blog/${article?.slug}`}>
                  <h2 className="text-xs sm:text-sm font-medium mt-3">
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
