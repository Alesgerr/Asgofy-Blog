// pages/index.js
// import LatestBlogPosts from "@/components/Blog/LatestBlogPosts";
// import FeaturedBlogPosts from "@/components/Blog/FeaturedBlogPosts";
// import Newsletter from "@/components/Newsletter";
import HomePage from "@/components/Blog/Home";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";

const Home = () => {
  return (
    <div>
      <HomePage />
      {/* <LatestBlogPosts /> */}
      {/* <FeaturedBlogPosts /> */}
      {/* <Newsletter /> */}
    </div>
  );
};

export default Home;
