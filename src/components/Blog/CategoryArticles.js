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
      <div className="px-5 max-w-7xl py-10 md:px-14 lg:py-14 overflow-hidden mx-auto flex justify-between flex-wrap">
        <div className="w-full lg:max-w-[73%] pb-2 ">
          <div className="popular_categories rounded-md md:p-3">
            {processedCategories && (
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-[3.25rem] mb-5">
                Our popular <span className=" text-indigo-600">categories</span>
              </h2>
            )}
            <div className="grid sm:grid-cols-2 gap-5 md:gap-3">
              {processedCategories ? (
                processedCategories?.slice(0, 4)?.map((cat, index) => (
                  <Link
                    key={index}
                    className="group relative block rounded-xl my-3"
                    href={`/categories/${cat?.slug?.current}`}
                  >
                    <div className="flex-shrink-0 relative rounded-xl overflow-hidden w-full h-[350px] before:absolute before:inset-x-0 before:size-full before:bg-gradient-to-t before:from-gray-900/[.7] before:z-[1]">
                      <Image
                        className="size-full absolute top-0 start-0 object-cover"
                        src={cat?.categoryImage}
                        width={300}
                        height={100}
                        priority
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
                            <h4 className="font-semibold text-indigo-600">
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
                    width={310}
                    style={{
                      minWidth: "200px",
                      maxWidth: "calc(100% - 10px)",
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
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/12 hidden lg:block">
          <div className="popular_tags rounded-md p-3">
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
