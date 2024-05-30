import React from "react";
import LatestBlogPosts from "./LatestBlogPosts";
import PopularCategories from "./PopularCategories";
import PopularTags from "./PopularTags";
import FeaturedBlogPosts from "./FeaturedBlogPosts";

export default function HomePage({
  latestProducts,
  catPostCount,
  tagPostCount,
  featuredProducts,
}) {
  return (
    <>
      <div className="home_article px-5 max-w-7xl md:px-14 lg:py-14 overflow-hidden mx-auto">
        <div className="flex flex-wrap justify-between ">
          <div className="w-full lg:max-w-[73%] pb-2 ">
            <LatestBlogPosts latestProducts={latestProducts} />
          </div>
          <div className="w-full lg:w-3/12 hidden md:hidden">
            <PopularCategories catPostCount={catPostCount} />
            <PopularTags tagPostCount={tagPostCount} />
          </div>
        </div>
        <div>
          <FeaturedBlogPosts featuredProducts={featuredProducts} />
        </div>
      </div>
    </>
  );
}
