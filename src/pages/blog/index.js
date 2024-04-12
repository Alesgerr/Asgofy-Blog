"use client";
import BodyDescription from "@/components/BodyDescriptions";
import { usePostContext } from "@/context/PostContext";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
const page = () => {
  const { latestProducts, categories, loading } = usePostContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  useEffect(() => {
    // selectedCategory, searchTerm veya latestProducts değiştiğinde filtreleme işlemini yeniden yap
    setFilteredPosts(
      latestProducts.filter((post) => {
        // Arama terimine göre filtreleme
        if (
          searchTerm &&
          !post.title.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return false;
        }

        // Seçili kategoriye göre filtreleme
        if (
          selectedCategory &&
          !post.categories
            .map((category) => category._id)
            .includes(selectedCategory)
        ) {
          return false;
        }

        return true;
      })
    );
  }, [selectedCategory, searchTerm, latestProducts]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="mx-auto max-w-7xl items-center px-5 md:px-14">
      <Head>
        <title>All Blog Posts - Asgofy</title>
        <meta name="description" content="All posts on the blog." />
        {/* Open Graph meta etiketleri */}
        <meta property="og:title" content="All Blog Posts - Asgofy" />
        <meta property="og:description" content="All posts on the blog." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://asgofy.com/blog" />
        {/* Twitter Cards meta etiketleri */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="All Blog Posts - Asgofy" />
        <meta name="twitter:description" content="All posts on the blog." />
      </Head>
      {/* <div class="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 class="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
          Insights
        </h2>
        <p class="mt-1 text-gray-600 dark:text-gray-400">
          Stay in the know with insights from industry experts.
        </p>
      </div> */}
      <div>
        {/* Filter Search && Category */}
        <div className="flex flex-wrap items-center gap-1 md:gap-5 py-5">
          {/* Kategori seçimi buraya gelebilir */}
          <div className="md:mb-6 mb-3 md:order-2 w-full md:w-72">
            <FormControl className="w-full dark:bg-zinc-900 rounded-md">
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="min-w-[200px"
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
                <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
                  <Image
                    className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
                    src={post?.imageUrl}
                    alt={post?.title}
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
      </div>
    </div>
  );
};

export default page;
