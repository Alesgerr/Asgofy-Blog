"use client";
import React, { Suspense, useEffect, useMemo, useState } from "react";
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
import PostPublishedDate from "../PostPublishedDate";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { usePostContext } from "@/context/PostContext";
import { FaLongArrowAltRight } from "react-icons/fa";
import AnimationWrapper from "../AnimationWrapper";
import LatestBlogPosts from "./LatestBlogPosts";
import PopularCategories from "./PopularCategories";
import PopularTags from "./PopularTags";
import dynamic from "next/dynamic";
import AdBanner from "../Ads/AdBanner";
// const LatestBlogPosts = dynamic(
//   () => import("@/components/Blog/LatestBlogPosts"),
//   {
//     ssr: false,
//   }
// );
// const PopularCategories = dynamic(
//   () => import("@/components/Blog/PopularCategories"),
//   {
//     ssr: false,
//   }
// );
// const PopularTags = dynamic(() => import("@/components/Blog/PopularTags"), {
//   ssr: false,
// });
// const AnimationWrapper = dynamic(
//   () => import("@/components/AnimationWrapper"),
//   {
//     ssr: false,
//   }
// );
export default function CategoryArticles({
  latestProducts,
  catPostCount,
  tagPostCount,
}) {
  // const {
  //   featuredProducts,
  //   // latestProducts,
  //   loading,
  //   loadingCatCount,
  //   loadingTagCount,
  // } = usePostContext();
  return (
    <>
      <div className="home_article px-5 max-w-7xl py-10 md:px-14 lg:py-14 overflow-hidden mx-auto flex justify-between flex-wrap">
        <div className="w-full lg:w-9/12 pb-2 lg:pr-4">
          <AnimationWrapper
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <LatestBlogPosts latestProducts={latestProducts} />
          </AnimationWrapper>
        </div>
        <div className="w-full lg:w-3/12">
          <AnimationWrapper
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          >
            <PopularCategories catPostCount={catPostCount} />
          </AnimationWrapper>
          <AnimationWrapper
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
            className="mt-4" // Margin-top ekleyerek boşluk yaratıyoruz
          >
            <PopularTags tagPostCount={tagPostCount} />
          </AnimationWrapper>
          <AdBanner />
        </div>
      </div>
    </>
  );
}
