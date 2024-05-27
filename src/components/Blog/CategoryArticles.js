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

export default function CategoryArticles() {
  const [categories, setCategories] = useState();
  const [tags, setTags] = useState();

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

  // useMemo kullanarak önbelleğe alma
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
      <div className="px-5 max-w-7xl py-10 md:px-14 lg:py-14 mx-auto flex justify-between flex-wrap">
        <div className="w-full lg:max-w-[73%] pb-2">
          <div className="popular_categories md:p-3 md:border md:dark:border-gray-900">
            <div className="">
              {processedCategories && (
                <h2 className="text-2xl font-bold pb-5 dark:text-white">
                  Popular Categories
                </h2>
              )}
              <div className="grid sm:grid-cols-2 gap-5 md:gap-3">
                {processedCategories ? (
                  processedCategories?.slice(0, 4)?.map((cat, index) => (
                    <Link
                      key={index}
                      className="group relative block rounded-xl"
                      href={`/categories/${cat?.slug?.current}`}
                    >
                      <div className="flex-shrink-0 relative rounded-xl overflow-hidden w-full h-72 before:absolute before:inset-x-0 before:size-full before:bg-gradient-to-t before:from-gray-900/[.7] before:z-[1]">
                        <Image
                          className="w-full h-72 absolute top-0 start-0 object-cover"
                          src={cat?.categoryImage}
                          width={300}
                          height={100}
                          loading="lazy"
                          quality={50}
                          alt={cat?.title}
                        />
                        <div className="absolute h-96 inset-0 bg-black opacity-60 rounded-md"></div>
                      </div>

                      {/* <div className="absolute top-0 inset-x-0 z-10">
                        <div className="p-4 flex flex-col h-full sm:p-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <Image
                                className="size-[46px] border-2 border-white rounded-full"
                                src={cat.imageUrl}
                                width={100}
                                height={100}
                                alt="Image Description"
                              />
                            </div>
                            <div className="ms-2.5 sm:ms-4">
                              <h4 className="font-semibold text-purple-700">
                                {cat?.author?.name}
                              </h4>
                              <p className="text-xs text-white/[.8]">
                                {cat?.timeAgo}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div> */}

                      <div className="absolute bottom-0 inset-x-0 z-10">
                        <div className="flex flex-col h-full p-4 sm:p-6">
                          <h3 className="text-2xl font-bold text-white group-hover:text-white/[.8]">
                            {cat?.title}
                          </h3>
                          <p className="mt-2 text-white/[.8]">
                            {cat?.description?.length > 50
                              ? cat?.description.slice(0, 80) + "..."
                              : cat?.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <>
                    <Skeleton
                      className="dark:bg-zinc-900"
                      width={400}
                      style={{
                        minWidth: "200px",
                        maxWidth: "calc(100% - 32px)",
                      }}
                      height={450}
                    />
                    <Skeleton
                      className="dark:bg-zinc-900"
                      width={400}
                      style={{
                        minWidth: "200px",
                        maxWidth: "calc(100% - 32px)",
                      }}
                      height={450}
                    />
                    <Skeleton
                      className="dark:bg-zinc-900"
                      width={400}
                      style={{
                        minWidth: "200px",
                        maxWidth: "calc(100% - 32px)",
                      }}
                      height={450}
                    />
                    <Skeleton
                      className="dark:bg-zinc-900"
                      width={400}
                      style={{
                        minWidth: "200px",
                        maxWidth: "calc(100% - 32px)",
                      }}
                      height={450}
                    />
                  </>
                )}

                {/* <a className="group relative block rounded-xl" href="#">
          <div className="flex-shrink-0 relative rounded-xl overflow-hidden w-full h-[350px] before:absolute before:inset-x-0 before:size-full before:bg-gradient-to-t before:from-gray-900/[.7] before:z-[1]">
            <img
              className="size-full absolute top-0 start-0 object-cover"
              src="https://images.unsplash.com/photo-1611625618313-68b87aaa0626?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
              alt="Image Description"
            />
          </div>

          <div className="absolute top-0 inset-x-0 z-10">
            <div className="p-4 flex flex-col h-full sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="size-[46px] border-2 border-white rounded-full"
                    src="https://images.unsplash.com/photo-1669837401587-f9a4cfe3126e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                    alt="Image Description"
                  />
                </div>
                <div className="ms-2.5 sm:ms-4">
                  <h4 className="font-semibold text-white">Gloria</h4>
                  <p className="text-xs text-white/[.8]">May 30, 2021</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 z-10">
            <div className="flex flex-col h-full p-4 sm:p-6">
              <h3 className="text-lg sm:text-3xl font-semibold text-white group-hover:text-white/[.8]">
                What CFR (Conversations, Feedback, Recognition) really is about
              </h3>
              <p className="mt-2 text-white/[.8]">
                For a lot of people these days, Measure What Matters.
              </p>
            </div>
          </div>
        </a> */}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/12 hidden md:block">
          <div className="popular_tags p-3 border dark:border-gray-900">
            {processedTags && (
              <h2 className="text-2xl font-bold pb-5 dark:text-white">
                Popular Tags
              </h2>
            )}
            <ul>
              {/* Etiketlerin listesi */}
              {processedTags ? (
                processedTags?.slice(0, 6).map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/tag/${item?.slug?.current}`}
                      className="dark:text-white hover:text-purple-700 hover:underline my-2 flex flex-wrap justify-between"
                    >
                      {item.tag}
                      <LiaArrowRightSolid className="ml-5" />
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <Skeleton
                    className="dark:bg-zinc-900"
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
    </>
  );
}
