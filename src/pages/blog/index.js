"use client";
import BodyDescription from "@/components/BodyDescriptions";
import { usePostContext } from "@/context/PostContext";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import React, { useEffect, useState, useMemo } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import AnimationWrapper from "@/components/AnimationWrapper";
import { getCategories, getPosts } from "../../../sanity/lib/client";
import { urlForImage } from "../../../sanity/lib/image";
import { calculateTimeAgo } from "@/components/calculateTimeAgo";

export async function getServerSideProps() {
  const latestProducts = await getPosts();
  const categories = await getCategories();
  const posts = latestProducts.map((product) => ({
    ...product,
    timeAgo: calculateTimeAgo(product?.publishedAt),
    postImage: urlForImage(product?.mainImage?.asset?._ref),
  }));

  return {
    props: {
      posts,
      categories,
    },
  };
}

const BlogPage = ({ posts, categories }) => {
  const { loading } = usePostContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (
        searchTerm &&
        !post.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      if (
        selectedCategory &&
        !post.categories.some((cat) => cat._id === selectedCategory)
      ) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, searchTerm, posts]); // useMemo yalnızca bağımlılıklar değiştiğinde filtreleme yapar

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="mx-auto max-w-7xl items-center px-5 md:px-14 py-20">
      <Head>
        <title>All Blog Posts - Asgofy</title>
        <meta name="description" content="All posts on the blog." />

        {/* Google’a bu sayfayı indekslememesini söyleyen meta etiketi */}
        <meta name="robots" content="noindex, follow" />

        {/* Open Graph meta etiketleri */}
        <meta property="og:title" content="All Blog Posts - Asgofy" />
        <meta property="og:description" content="All posts on the blog." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://asgofy.com/blog" />

        {/* Twitter Cards meta etiketleri */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="All Blog Posts - Asgofy" />
        <meta name="twitter:description" content="All posts on the blog." />

        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed"
          href="https://asgofy.com/api/rss.xml"
        />
      </Head>

      {/* <div class="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 class="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
          Insights
        </h2>
        <p class="mt-1 text-gray-600 dark:text-gray-400">
          Stay in the know with insights from industry experts.https://asgofy.com/blog
        </p>
      </div> */}
      <div className="flex justify-center mt-5">
        <h1 className="text-2x1 md:text-3xl font-semibold">All Blog Posts</h1>
      </div>
      <AnimationWrapper>
        {/* Filter Search && Category */}
        <div className="flex flex-wrap items-center gap-1 md:gap-5 py-5">
          {/* Kategori seçimi buraya gelebilir */}

          <div className="md:mb-6 mb-3 md:order-2 w-full md:w-72">
            <FormControl className="w-full dark:bg-zinc-900 rounded-md">
              <InputLabel id="category-select-label" className="-top-[2px]">
                Category
              </InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="min-w-[200px] max-h-[45px]"
              >
                <MenuItem value="">All</MenuItem>
                {categories?.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category?.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* Search box */}
          <div className="flex items-center w-full md:flex-1 mb-6 md:order-1 dark:bg-zinc-900 rounded-md">
            <TextField
              id="outlined-basic"
              placeholder="Search..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:flex-1 mui_field"
              variant="outlined"
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts?.map((post) => (
            <Link key={post?.slug} href={`/blog/${post?.slug}`}>
              <span className="group dark:focus:outline-none">
                <div className="rounded-xl overflow-hidden">
                  <Image
                    // className="top-0 w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-md"
                    src={post?.postImage}
                    alt={post?.title}
                    // fill
                    className="mb-6 shadow-md rounded-lg bg-slate-50 h-72 object-cover sm:mb-0 xl:mb-6 "
                    width={500}
                    height={500}
                    loading="lazy"
                  />
                </div>
                <div className="mt-7">
                  <h3 className="text-sm md:text-md font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-200">
                    {post?.title}
                  </h3>
                  <p className="mt-5 inline-flex items-center gap-x-1 text-blue-600 decoration-2 group-hover:underline font-medium">
                    Read more
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </p>
                </div>
              </span>
            </Link>
          ))}
        </div>
      </AnimationWrapper>
    </div>
  );
};

export default BlogPage;
