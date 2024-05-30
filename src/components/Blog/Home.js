import React from "react";
import LatestBlogPosts from "./LatestBlogPosts";
import PopularCategories from "./PopularCategories";
import PopularTags from "./PopularTags";

export default function HomePage() {
  return (
    <>
      <div className="home_article px-5 max-w-7xl py-10 md:px-14 lg:py-14 overflow-hidden mx-auto flex justify-between flex-wrap">
        <div className="w-full lg:max-w-[73%] pb-2 ">
          <LatestBlogPosts />
        </div>
        <div className="w-full lg:w-3/12 relative">
          <PopularCategories />
          <PopularTags />
        </div>
      </div>
    </>
  );
}
