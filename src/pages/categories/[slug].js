// CategoryDetailPage.js
"use client";
import { useEffect, useState } from "react";

import Head from "next/head";
import Link from "next/link";
import { calculateTimeAgo } from "@/components/calculateTimeAgo";
import { urlForImage } from "../../../sanity/lib/image";
import { getProductsByCategory } from "../../../sanity/lib/client";
import { useRouter } from "next/router";
import Script from "next/script";
import Image from "next/image";

const CategoryDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [products, setProducts] = useState([]);

  console.log(slug);
  const fetchProducts = async () => {
    if (slug) {
      const products = await getProductsByCategory(slug);
      console.log(products);
      const processedData = products?.map((product) => ({
        ...product,
        imageUrl: urlForImage(product.mainImage.asset._ref), // Burada resmin referansını kullanarak URL oluşturuyoruz
        timeAgo: calculateTimeAgo(product.publishedAt), // Yayınlanma zamanını hesaplayıp ekliyoruz
      }));
      setProducts(processedData);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [slug]);
  //   const metaSlugTitle = products?.map((item) => item.slug);
  //   //   const metaDescription = products?.categories[0].map(item => item.description)
  //   const descriptions = products?.flatMap((item) =>
  //     item.categories?.map((category) => category.description)
  //   );

  //   const combinedDescription = descriptions.join(" ");
  return (
    <div>
      <Head>
        <title>{slug} - Asgofy</title>
        {/* <meta name="description" content={combinedDescription} /> */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6953220018369928"
          crossorigin="anonymous"
        ></Script>
      </Head>
      <section>
        <div className="mx-auto w-full max-w-7xl px-5 py-10 md:px-14">
          <div className="flex flex-col items-center">
            <h2 className="max-w-3xl text-center text-2xl mb-12 mt-4 font-bold">
              <span>
                {products?.slice(0, 1)?.map((item) => (
                  <span>
                    {item?.categories[0]?.title} <br />
                  </span>
                ))}
              </span>
            </h2>
            <div className="mb-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3 ">
              {products?.map((item) => (
                <Link
                  href={`/blog/${item?.slug}`}
                  className="flex w-full flex-col gap-4 rounded-md border border-solid dark:bg-zinc-900 dark:text-white dark:border-none border-[#dfdfdf] px-4 py-8 text-black md:max-w-xs md:px-0 md:py-0"
                >
                  <Image
                    src={item?.imageUrl}
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
                    <p className="mb-4 text-xl font-semibold">{item?.title}</p>
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
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryDetailPage;
