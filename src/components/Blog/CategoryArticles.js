// "use client";
// import React, { Suspense, useEffect, useMemo, useState } from "react";
// import { urlForImage } from "../../../sanity/lib/image";
// import { calculateTimeAgo } from "../calculateTimeAgo";
// import { LiaArrowRightSolid } from "react-icons/lia";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   getCatWithPostCount,
//   getTagsWithPostCount,
// } from "../../../sanity/lib/client";
// import { Skeleton } from "@mui/material";
// import PostPublishedDate from "../PostPublishedDate";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// import { usePostContext } from "@/context/PostContext";
// import { FaLongArrowAltRight } from "react-icons/fa";
// import dynamic from "next/dynamic";
// import AdBanner from "../Ads/AdBanner";
// // const LatestBlogPosts = dynamic(
// //   () => import("@/components/Blog/LatestBlogPosts"),
// //   {
// //     ssr: false,
// //   }
// // );

// // Dinamik yükleme işlemi
// const LatestBlogPosts = dynamic(() => import("@/components/Blog/LatestBlogPosts"), {
//   ssr: false,
// });
// const PopularCategories = dynamic(
//   () => import("@/components/Blog/PopularCategories"),
//   {
//     ssr: false,
//   }
// );
// const PopularTags = dynamic(() => import("@/components/Blog/PopularTags"), {
//   ssr: false,
// });
// const AnimationWrapper = dynamic(() => import("@/components/AnimationWrapper"), {
//   ssr: false,
// });


// export default function CategoryArticles({
//   latestProducts,
//   catPostCount,
//   tagPostCount,
// }) {
//   return (
//     <div className="home_article px-5 max-w-7xl py-10 md:px-14 lg:py-8 overflow-hidden mx-auto flex justify-between flex-wrap">
//       <div className="w-full lg:w-9/12 pb-2 lg:pr-4">
//         <Suspense
//           fallback={
//             <Skeleton variant="rectangular" width="100%" height={200} />
//           }
//         >
//           <AnimationWrapper
//             initial={{ opacity: 0, y: 100 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//           >
//             <LatestBlogPosts latestProducts={latestProducts} />
//           </AnimationWrapper>
//         </Suspense>
//       </div>
//       <div className="w-full lg:w-3/12">
//         <Suspense
//           fallback={
//             <Skeleton variant="rectangular" width="100%" height={200} />
//           }
//         >
//           <AnimationWrapper
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1.2 }}
//           >
//             <PopularCategories catPostCount={catPostCount} />
//           </AnimationWrapper>
//         </Suspense>
//         <Suspense
//           fallback={
//             <Skeleton variant="rectangular" width="100%" height={200} />
//           }
//         >
//           <AnimationWrapper
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1.5 }}
//             className="mt-4"
//           >
//             <PopularTags tagPostCount={tagPostCount} />
//           </AnimationWrapper>
//         </Suspense>
//         <Suspense
//           fallback={
//             <Skeleton variant="rectangular" width="100%" height={200} />
//           }
//         >
//           <AdBanner />
//         </Suspense>
//       </div>
//     </div>
//   );
// }

