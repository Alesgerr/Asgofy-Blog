import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "../../../../sanity/lib/image";
import { getProductsByCategory } from "../../../../sanity/lib/client";
import AnimationWrapper from "@/components/AnimationWrapper";
import { calculateTimeAgo } from "@/components/calculateTimeAgo";
const CategoryDetailPage = ({ products, slug }) => {
  const prodTitle =
    products?.length > 0 ? products[0]?.categories[0]?.title : slug;
  const descriptions = products?.flatMap(
    (item) => item?.categories?.map((category) => category?.description) || []
  );
  const combinedDescription = descriptions.join(" ");
  return (
    <div>
      <Head>
        <title>{prodTitle} - Asgofy</title>
        <meta name="description" content={combinedDescription} />
      </Head>
      <AnimationWrapper>
        <section>
          <div className="mx-auto w-full max-w-7xl px-5 py-10 md:px-14">
            <div className="flex flex-col items-center">
              <h1 className="max-w-3xl text-center text-2xl mb-12 mt-4 font-bold">
                {prodTitle}
              </h1>
              <div className="mb-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                {products?.map((item) => (
                  <Link key={item._id} href={`/blog/${item?.slug}`}>
                    <div className="flex w-full flex-col gap-4 rounded-md border border-solid dark:bg-zinc-900 dark:text-white dark:border-none border-[#dfdfdf] px-4 py-8 text-black md:max-w-xs md:px-0 md:py-0">
                      <Image
                        src={urlForImage(item?.mainImage?.asset?._ref)}
                        alt={item?.title}
                        width={500}
                        height={200}
                        priority
                        className="inline-block h-60 w-full object-cover"
                      />
                      <div className="px-6 py-4">
                        <p className="mb-4 text-xs font-semibold uppercase text-purple-700">
                          {item?.categories[0]?.title}
                        </p>
                        <p className="mb-4 text-xl font-semibold">
                          {item?.title}
                        </p>
                        <p className="mb-6 text-[#636262]"></p>
                        <div className="mx-auto flex max-w-lg flex-row items-start">
                          <div className="flex flex-col items-start">
                            <h6 className="text-base font-semibold text-purple-700">
                              {item?.author?.name}
                            </h6>
                            <div className="flex flex-col items-start text-sm text-[#636262] lg:flex-row">
                              <p>{item?.timeAgo}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimationWrapper>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { slug } = context.query;
  let products = [];
  try {
    products = await getProductsByCategory(slug);
    products = products?.map((product) => ({
      ...product,
      imageUrl: urlForImage(product?.mainImage?.asset?._ref),
      timeAgo: calculateTimeAgo(product.publishedAt),
    }));
  } catch (error) {
    console.error("Error fetching products by category:", error);
  }

  return {
    props: {
      products,
      slug,
    },
  };
};

export default CategoryDetailPage;
