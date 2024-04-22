"use client";
import React, { useEffect, useMemo, useState } from "react";
import { urlForImage } from "../../../sanity/lib/image";
import { calculateTimeAgo } from "../calculateTimeAgo";
import { LiaArrowRightSolid } from "react-icons/lia";
import Link from "next/link";
import Image from "next/image";
import {
  getCatWithPostCount,
  getTagsWithPostCount,
} from "../../../sanity/lib/client";
import { Skeleton } from "@mui/material";
import AnimationWrapper from "../AnimationWrapper";
import PostPublishedDate from "../PostPublishedDate";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function CategoryArticles({ articles, loading }) {
  const [categories, setCategories] = useState();
  const [tags, setTags] = useState();
  const [page, setPage] = useState(1); // Başlangıçta varsayılan olarak ilk sayfa
  const itemsPerPage = 15; // Sayfa başına gösterilecek öğe sayısı

  // Anlık sayfa numarasına bağlı olarak görüntülenecek makaleleri hesaplar
  const startIndex = (page - 1) * itemsPerPage;
  const visibleArticles = articles.slice(startIndex, startIndex + itemsPerPage);
  // Toplam sayfa sayısını hesaplar
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  // Sayfa değiştirme işlevi
  const handleChange = (event, value) => {
    setPage(value); // Sayfa değiştiğinde sayfa numarasını güncelle

    // Sayfanın belirli bir yere kaydırılması için bir referans alınabilir.
    // Örneğin, bir bileşenin referansı alınabilir ve bu bileşenin yüksekliği kullanılabilir.
    const targetRef = document.getElementById("targetElement"); // Kaydırılacak hedef bileşenin id'si

    // Eğer hedef bileşen varsa ve yüksekliği alınabiliyorsa, sayfa bu yüksekliğe kaydırılır.
    if (targetRef) {
      const targetPosition = targetRef.offsetTop; // Hedef bileşenin sayfanın başlangıcından itibaren yüksekliği
      window.scrollTo({ top: targetPosition, behavior: "smooth" }); // Hedef bileşenin bulunduğu yere kaydır
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCatWithPostCount();
      setCategories(res);
    };

    const fetchTags = async () => {
      const res = await getTagsWithPostCount();
      setTags(res);
    };
    fetchCategories();
    fetchTags();
  }, []);

  const processedCategories = useMemo(() => {
    return categories?.map((item) => ({
      ...item,
      imageUrl: urlForImage(item?.author?.image?.asset?._ref),
      categoryImage: urlForImage(item?.image?.asset?._ref),
      timeAgo: calculateTimeAgo(item?._createdAt),
    }));
  }, [categories]);

  const processedTags = useMemo(() => {
    return tags?.map((item) => ({
      ...item,
      timeAgo: calculateTimeAgo(item?._createdAt),
    }));
  }, [tags]);
  return (
    <>
      <AnimationWrapper>
        <div className="px-5 max-w-7xl py-10 md:px-14 lg:py-14 overflow-hidden mx-auto flex justify-between flex-wrap">
          <div className="w-full lg:max-w-[73%] pb-2 ">
            <div
              id="targetElement"
              className="popular_categories rounded-md p-3 bg-white dark:bg-gray-950 shadow-md"
            >
              {articles && (
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-[3.25rem] mb-5">
                  Recent <span className=" text-indigo-600">Posts</span>
                </h2>
              )}
              <div>
                {loading ? (
                  <div className="grid md:grid-cols-2 overflow-hidden">
                    <div className="md:order-2 flex md:justify-end">
                      <Skeleton
                        className="dark:bg-gray-800"
                        width={200}
                        height={250}
                      />
                    </div>
                    <div className="md:order-1">
                      <Skeleton
                        className="dark:bg-gray-800"
                        width={100}
                        height={50}
                      />
                      <Skeleton
                        className="dark:bg-gray-800"
                        width={290}
                        height={60}
                      />
                      <Skeleton
                        className="dark:bg-gray-800"
                        width={250}
                        height={60}
                      />
                      <Skeleton
                        className="dark:bg-gray-800"
                        width={100}
                        height={60}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    {visibleArticles?.map((item, i) => (
                      <div
                        key={i}
                        className={`grid md:grid-cols-2 ${i !== visibleArticles.length - 1 ? "border-b-2" : ""} dark:border-gray-900 gap-2 mb-5`}
                      >
                        <div className="md:order-2 flex items-center md:justify-end">
                          <Link href={`/blog/${item?.slug}`}>
                            <Image
                              className="w-full md:w-32 md:h-32 object-cover rounded-md mb-3"
                              width={500}
                              height={500}
                              src={item?.imageUrl}
                              alt={item?.title}
                            />
                          </Link>
                        </div>
                        <div className="md:order-1 flex-1">
                          <Link href={`/blog/${item.slug}`}>
                            <div className="md:mb-6 mb-3">
                              {loading ? (
                                <div>Loading...</div>
                              ) : (
                                <span>
                                  <PostPublishedDate
                                    publishedAt={item?.publishedAt}
                                  />
                                </span>
                              )}

                              <span className="px-1">|</span>
                              <span>{item?.timeAgo}</span>
                            </div>
                            <h2 className="text-lg mb-3 font-bold">
                              {item?.title}
                            </h2>
                            <p className="text-sm mb-5">
                              {item?.description.length > 100
                                ? item?.description.slice(0, 120) + "..."
                                : item?.description}
                            </p>
                          </Link>
                          <div className="mb-5">
                            <Link
                              href={`/categories/${item?.categories[0]?.slug?.current}`}
                            >
                              <span className="bg-gray-200 dark:bg-white rounded-md p-2 px-3 text-black">
                                {item?.categories[0]?.title}
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                    {visibleArticles && (
                      <Stack spacing={2}>
                        <Pagination
                          count={totalPages} // Toplam sayfa sayısı
                          page={page} // Şu anki sayfa
                          onChange={handleChange} // Sayfa değiştiğinde çalışacak fonksiyon
                          color="standard" // Sayfa numaralarının rengi
                          size="large" // Büyük boyut
                          className="dark:bg-gray-100 rounded-md"
                        />
                      </Stack>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-3/12">
            <div className="popular_categories rounded-md p-3 bg-white dark:bg-gray-950 shadow-md mb-3">
              {processedCategories && (
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-[3.25rem] mb-5">
                  Our Popular{" "}
                  <span className=" text-indigo-600">Categories</span>
                </h2>
              )}
              <ul>
                {/* Etiketlerin listesi */}
                {processedCategories ? (
                  processedCategories?.slice(0, 6).map((item, index) => (
                    <li key={index}>
                      <Link
                        href={`/categories/${item?.slug?.current}`}
                        className="dark:text-white hover:text-indigo-600 hover:underline my-3 flex flex-wrap justify-between"
                      >
                        {item?.title?.length > 20
                          ? item?.title?.slice(0, 17) + "..."
                          : item?.title}
                        <LiaArrowRightSolid className="ml-5" />
                      </Link>
                    </li>
                  ))
                ) : (
                  <>
                    <Skeleton
                      className="dark:bg-gray-800"
                      width={400}
                      style={{
                        minWidth: "200px",
                        maxWidth: "calc(100% - 10px)",
                      }}
                      height={450}
                    />
                  </>
                )}
              </ul>
            </div>
            <div className="popular_tags rounded-md p-3 bg-white dark:bg-gray-950 shadow-md">
              {processedTags && (
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-[3.25rem] mb-5">
                  Popular <span className=" text-indigo-600">tags</span>
                </h2>
              )}
              <ul>
                {/* Etiketlerin listesi */}
                {processedTags ? (
                  processedTags?.slice(0, 6).map((item, index) => (
                    <li key={index}>
                      <Link
                        href={`/tag/${item?.slug?.current}`}
                        className="dark:text-white hover:text-indigo-600 hover:underline my-3 flex flex-wrap justify-between"
                      >
                        {item?.tag?.length > 20
                          ? item?.tag?.slice(0, 17) + "..."
                          : item?.tag}
                        <LiaArrowRightSolid className="ml-5" />
                      </Link>
                    </li>
                  ))
                ) : (
                  <>
                    <Skeleton
                      className="dark:bg-gray-800"
                      width={400}
                      style={{
                        minWidth: "200px",
                        maxWidth: "calc(100% - 10px)",
                      }}
                      height={450}
                    />
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </AnimationWrapper>
    </>
  );
}
