// pages/index.js
import LatestBlogPosts from "@/components/Blog/LatestBlogPosts";
import FeaturedBlogPosts from "@/components/Blog/FeaturedBlogPosts";
// import Newsletter from "@/components/Newsletter";
import Hero from "@/components/Hero";
import CategoryArticles from "@/components/Blog/CategoryArticles";
import { usePostContext } from "@/context/PostContext";

const Home = () => {
  const { featuredProducts, latestProducts, loading } = usePostContext();

  return (
    <div>
      <Hero />
      <CategoryArticles />
      <FeaturedBlogPosts featuredProducts={featuredProducts} isLoading={loading} />
      <LatestBlogPosts latestProducts={latestProducts} isLoading={loading}/>
      {/* <Newsletter /> */}
    </div>
  );
};

export default Home;
