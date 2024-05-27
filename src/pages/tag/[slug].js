import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { urlForImage } from "../../../sanity/lib/image";
import { getProductsByTag } from "../../../sanity/lib/client";
import AnimationWrapper from "@/components/AnimationWrapper";

const TagProductsPage = ({ products, slug }) => {
  const router = useRouter();

  return (
    <div className="py-5 px-5 md:px-14 max-w-7xl mx-auto">
      <Head>
        <title>{slug} - Asgofy</title>
        <meta name="description" content={`Posts about ${slug} tag in blog.`} />
      </Head>
      <AnimationWrapper>
        <h1 className="text-lg font-extrabold mx-auto w-full flex justify-center mb-5">
          #{slug}
        </h1>
        <ul className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start">
          {products?.map((item, i) => (
            <li
              key={i}
              className="relative flex flex-col sm:flex-row xl:flex-col items-start"
            >
              <div className="order-1 sm:ml-6 xl:ml-0">
                <Link href={`/blog/${item?.slug?.current}`}>
                  <h3 className="mb-1 text-slate-900 font-bold dark:text-slate-200">
                    {item?.title}
                  </h3>
                  <div className="prose prose-slate prose-sm text-slate-600 dark:prose-dark">
                    <p>
                      {item?.description?.length > 100
                        ? item?.description?.slice(0, 100) + "..."
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
              <Link href={`/blog/${item?.slug?.current}`}>
                <Image
                  src={urlForImage(item?.mainImage?.asset?._ref)}
                  alt={item?.title}
                  className="mb-6 shadow-md rounded-lg bg-slate-50 w-full h-72 object-cover sm:w-[20rem] sm:mb-0 xl:mb-6 xl:w-full"
                  width={500}
                  height={500}
                  priority
                />
              </Link>
            </li>
          ))}
        </ul>
      </AnimationWrapper>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.query;
  let products = [];
  try {
    products = await getProductsByTag(slug);
    products = products?.map((product) => ({
      ...product,
    }));
  } catch (error) {
    console.error("Error fetching products by tag:", error);
  }

  return {
    props: {
      products,
      slug,
    },
  };
}

export default TagProductsPage;
