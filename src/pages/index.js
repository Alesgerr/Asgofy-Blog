// pages/index.js
import LatestBlogPosts from "@/components/Blog/LatestBlogPosts";
import FeaturedBlogPosts from "@/components/Blog/FeaturedBlogPosts";
// import Newsletter from "@/components/Newsletter";
import Hero from "@/components/Hero";
import CategoryArticles from "@/components/Blog/CategoryArticles";

const Home = () => {
  return (
    <div>
      <Hero />
      {/* <FeaturedBlogPosts
        featuredProducts={featuredProducts}
        isLoading={loading}
      /> */}
      <CategoryArticles
      />

      {/* <LatestBlogPosts latestProducts={latestProducts} isLoading={loading} /> */}
      {/* <Newsletter /> */}
    </div>
  );
};

export default Home;
