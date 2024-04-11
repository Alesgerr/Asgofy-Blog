// TagProductsPage.js
"use client";
import React, { useEffect, useState } from "react";
import { calculateTimeAgo } from "@/components/calculateTimeAgo";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { urlForImage } from "../../../sanity/lib/image";
import { getProductsByTag } from "../../../sanity/lib/client";

const TagProductsPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProductsByTag(slug);
        const processedData = products?.map((product) => ({
          ...product,
          imageUrl: urlForImage(product.mainImage.asset._ref), // Burada resmin referansını kullanarak URL oluşturuyoruz
          timeAgo: calculateTimeAgo(product.publishedAt), // Yayınlanma zamanını hesaplayıp ekliyoruz
        }));
        setProducts(processedData);
      } catch (error) {
        console.error("Error fetching products by tag:", error);
      }
    };

    fetchProducts();
  }, [slug]);
  return (
    <div className="py-5 px-5 md:px-5 max-w-7xl mx-auto">
      <Head>
        <title>{slug} - Asgofy</title>
        <meta name="description" content={`Posts about ${slug} tag in blog.`} />
        {/* <meta property="og:title" content={`${slug} - Asgorise`} />
        <meta
          property="og:description"
          content={`Posts about ${slug} tag in blog.`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://www.asgoshop.com/tags/${slug}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${slug} - Asgorise`} />
        <meta name="twitter:description" content={`Posts about ${slug}`} /> */}
      </Head>
      <h1 className="text-lg font-extrabold mx-auto w-full flex justify-center">
        #{slug}
      </h1>
      <ul className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
        {products?.map((item, i) => (
          <li
            key={i}
            className="relative flex flex-col sm:flex-row xl:flex-col items-start"
          >
            <div className="order-1 sm:ml-6 xl:ml-0">
              <Link href={`/blog/${item?.slug?.current}`}>
                <h3 className="mb-1 text-slate-900 font-bold dark:text-slate-200">
                  <span className="mb-1 block text-sm leading-6 text-indigo-500">
                    {/* {item?.categories.ti} */}
                  </span>
                  {item?.title}
                </h3>
                <div className="prose prose-slate prose-sm text-slate-600 dark:prose-dark">
                  <p>
                    {item?.description?.length > 100
                      ? item?.description?.slice(0, 200) + "..."
                      : item?.description}
                  </p>
                </div>
              </Link>
              <Link
                className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mt-6"
                href={`/blog/${item?.slug?.current}`}
              >
                Learn more
                <span className="sr-only">
                  , Completely unstyled, fully accessible UI components
                </span>
                <svg
                  className="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400 dark:text-slate-500 dark:group-hover:text-slate-400"
                  width="3"
                  height="6"
                  viewBox="0 0 3 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M0 0L3 3L0 6"></path>
                </svg>
              </Link>
            </div>
            <Image
              src={item?.imageUrl}
              alt={item?.title}
              className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full"
              width={500}
              height={500}
              priority
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagProductsPage;
