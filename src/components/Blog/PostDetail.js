import React from "react";
import { calculateTimeAgo } from "@/components/calculateTimeAgo";
// import PostPublishedDate from "@/components/PostPublishedDate";
// import BodyDescription from "@/components/BodyDescriptions";
import Image from "next/image";
import { Skeleton } from "@mui/material";
import { LiaArrowRightSolid } from "react-icons/lia";
import { CiUser, CiClock1 } from "react-icons/ci";
import Link from "next/link";

import {
  PinterestShareButton,
  PinterestIcon,
  TwitterShareButton,
  TwitterIcon,
} from "next-share";
import dynamic from "next/dynamic";
import AdBanner from "../Ads/AdBanner";
// import ShareGroup from "@/components/ShareGroup";
// import CommentForm from "@/components/CommentForm";
// import AnimationWrapper from "@/components/AnimationWrapper";
// import Faq from "@/components/Faq";
// import Breadcrumb from "@/components/Breadcrumbs";
const PostPublishedDate = dynamic(
  () => import("@/components/PostPublishedDate"),
  {
    loading: () => <Skeleton variant="text" width={100} height={20} />,
  }
);
const BodyDescription = dynamic(() => import("@/components/BodyDescriptions"), {
  loading: () => <Skeleton variant="rectangular" width="100%" height={200} />,
});
const ShareGroup = dynamic(() => import("@/components/ShareGroup"), {
  loading: () => <Skeleton variant="rectangular" width="100%" height={50} />,
});
const CommentForm = dynamic(() => import("@/components/CommentForm"), {
  loading: () => <Skeleton variant="rectangular" width="100%" height={200} />,
});
const AnimationWrapper = dynamic(
  () => import("@/components/AnimationWrapper"),
  {
    loading: () => <Skeleton variant="rectangular" width="100%" height={50} />,
  }
);
const Faq = dynamic(() => import("@/components/Faq"), {
  loading: () => <Skeleton variant="rectangular" width="100%" height={200} />,
});
const Breadcrumb = dynamic(() => import("@/components/Breadcrumbs"), {
  loading: () => <Skeleton variant="text" width={100} height={20} />,
});
const PostDetail = ({ post, relatedProducts }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const postUrl = `${baseUrl}/blog/${post?.slug}`;
  const postImage = post?.postImage;
  return (
    <AnimationWrapper
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="justify-between relative mx-auto max-w-7xl overflow-hidden py-5 px-5 md:px-14">
        {/* <!-- Blog Article --> */}
        <Breadcrumb />
        <div className="blog-article">
          <div className="pb-12 lg:flex">
            <div className="lg:w-9/12 md:order-2">
              <div className="md:mr-3 rounded">
                {/* <!-- Avatar Media --> */}
                <div className="flex justify-between items-center mb-6 overflow-hidden">
                  <div className="flex w-full sm:items-center gap-x-3 sm:gap-x-3">
                    <div className="flex-shrink-0">
                      <Image
                        className="size-12 rounded-full"
                        src={post?.imageUrl}
                        alt={post?.title}
                        width={100}
                        height={100}
                        quality={60}
                        // priority
                        loading="lazy"
                      />
                    </div>
                    <div className="grow">
                      <div className="flex justify-between items-center gap-x-2">
                        <div>
                          {/* <!-- Tooltip --> */}
                          <div className="hs-tooltip inline-block [--trigger:hover] [--placement:bottom]">
                            <div className="hs-tooltip-toggle sm:mb-1 block text-start cursor-pointer">
                              <div>
                                {/* <span className="font-semibold text-sm">
                                    By
                                  </span> */}
                                <span className="font-semibold">
                                  {post?.author.name}
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* <!-- End Tooltip --> */}
                          <ul className="text-xs text-gray-500">
                            <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                              <PostPublishedDate
                                publishedAt={post?.publishedAt}
                              />
                            </li>
                            <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                              {post?.timeAgo}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- Content --> */}
                <div className="space-y-5 md:space-y-8">
                  <h1 className="text-lg mt-5 sm:text-2xl font-bold">
                    {post?.title}
                  </h1>
                  <AdBanner />
                  <div>
                    <Image
                      src={post?.postImage}
                      alt={post?.title}
                      width={350}
                      height={200}
                      sizes="(max-width:768px) 100vw, 700px"
                      priority
                      className="rounded-md object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-md font-normal">{post?.description}</p>
                  <BodyDescription
                    body={post?.body}
                    title={post?.title}
                    table={post?.table}
                  />
                  <Faq faqs={post?.faq} />
                  <div className="shareButtons">
                    <div className="social-buttons flex">
                      <PinterestShareButton
                        title={post?.title || post?.metaTitle}
                        url={postUrl}
                        image={post?.postImage}
                        media={
                          "next-share is a social share buttons for your next React apps."
                        }
                      >
                        <span className="mr-2 py-1.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                          <PinterestIcon size={32} round />
                          <span className="hidden sm:block">Pin</span>
                        </span>
                      </PinterestShareButton>

                      <TwitterShareButton
                        className="flex"
                        title={post?.title || post?.metaTitle}
                        url={postUrl}
                        image={post?.postImage}
                      >
                        <span className="py-1.5 px-2.5 flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                          <TwitterIcon size={32} round />
                          <span className="hidden sm:block">Tweet</span>
                        </span>
                      </TwitterShareButton>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <CommentForm postId={post && post?._id} />
              </div>
              {/* <!-- End Content --> */}
            </div>

            <div className="lg:w-3/12 md:order-3">
              <div className="md:ml-2">
                <div className="category">
                  <div className="mb-3 md:mr-4">
                    <p className="font-semibold">Categories</p>
                    {/* <div className="border border-b-2 border-y-red-900 dark:border-red-900 my-5"></div> */}
                    <div className="rounded-md mt-2">
                      {post?.categories?.map((category) => (
                        <Link
                          href={`/categories/${category?.slug?.current}`}
                          key={category._id}
                        >
                          <span className="mr-2 px-1 py-1 text-sm border border-gray-200 rounded-md transition hover:text-indigo-600">
                            {category?.title}
                          </span>
                          {/* <LiaArrowRightSolid /> */}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="tags">
                  <p className="font-semibold">Tags</p>
                  <div className="flex flex-wrap mt-2 gap-3">
                    {post?.tags?.map((item) => (
                      <span key={item._id}>
                        <Link
                          href={`/tag/${item?.slug?.current}`}
                          className="px-1 py-1 text-sm border border-gray-200 rounded-md transition hover:text-indigo-600"
                        >
                          {item?.tag}
                        </Link>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="related">
                  <div className="my-5 mb-3">
                    <h2 className="font-bold mb-5">Related Posts</h2>
                    <div className="grid grid-cols-1 mx-auto">
                      {relatedProducts?.slice(0, 6)?.map((post, i) => (
                        <Link href={`/blog/${post?.slug}`} key={i}>
                          <div className="flex items-center mb-5 md:mb-7 lg:mb-2">
                            <div className="img-box">
                              <Image
                                src={post?.imageUrl}
                                alt={post?.title}
                                width={150}
                                height={150}
                                priority
                                quality={50}
                                className="rounded-md h-[70px] max-w-[100px] object-cover"
                              />
                            </div>
                            <div className="body-box p-2">
                              <h2 className="text-sm md:text-[13px] font-semibold">
                                {post?.title?.length > 50
                                  ? post?.title.slice(0, 40) + "..."
                                  : post?.title}
                              </h2>
                              <div className="flex flex-wrap items-center">
                                <span className="mr-1">
                                  <CiClock1 />
                                </span>
                                <span className="text-sm md:text-[13px]">
                                  {post?.timeAgo}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <AdBanner />
              </div>
            </div>
          </div>
        </div>
        <ShareGroup post={post} slug={post?.slug} />
      </div>
    </AnimationWrapper>
  );
};

export default PostDetail;
