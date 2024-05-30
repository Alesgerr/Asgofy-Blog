import dynamic from "next/dynamic";
import React from "react";
const FeaturedBlogPosts = dynamic(
  () => import("@/components/Blog/FeaturedBlogPosts"),
  {
    ssr: false,
  }
);
const LatestBlogPosts = dynamic(
  () => import("@/components/Blog/LatestBlogPosts"),
  {
    ssr: false,
  }
);
const PopularCategories = dynamic(
  () => import("@/components/Blog/PopularCategories"),
  {
    ssr: false,
  }
);
const PopularTags = dynamic(() => import("@/components/Blog/PopularTags"), {
  ssr: false,
});
export default function HomePage({
  latestProducts,
  catPostCount,
  tagPostCount,
  featuredProducts,
}) {
  return (
    <>
      <div className="home_article px-5 max-w-7xl md:px-14 lg:py-14 flex flex-col overflow-hidden mx-auto">
        <div className="md:order-2">
          <FeaturedBlogPosts featuredProducts={featuredProducts} />
        </div>
        <div className="md:order-1 flex flex-wrap justify-between ">
          <div className="w-full lg:max-w-[73%] pb-2 ">
            <LatestBlogPosts latestProducts={latestProducts} />
          </div>
          <div className="w-full lg:w-3/12 hidden md:block">
            <PopularCategories catPostCount={catPostCount} />
            <PopularTags tagPostCount={tagPostCount} />
          </div>
        </div>
      </div>
    </>
  );
}
