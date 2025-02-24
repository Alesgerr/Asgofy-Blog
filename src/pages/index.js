// pages/index.js
import dynamic from "next/dynamic";
import {
  getCatWithPostCount,
  getFeaturedProducts,
  getPosts,
  getTagsWithPostCount,
} from "../../sanity/lib/client";
import { urlForImage } from "../../sanity/lib/image";
import { calculateTimeAgo } from "@/components/calculateTimeAgo";
import LatestBlogPosts from "@/components/Blog/LatestBlogPosts";
import CategoryArticles from "@/components/Blog/CategoryArticles";
import Hero from "@/components/Hero/Hero";
import Newsletter from "@/components/Newsletter";
// import FeaturedPosts from "@/components/Blog/FeaturedPosts";
import FeaturedPosts from "@/components/Blog/FeaturedBlogPosts";
import HomePage from "@/components/Blog/HomePage";
import PopularTags from "@/components/Blog/PopularTags";
import PopularCategories from "@/components/Blog/PopularCategories";
import RecentPosts from "@/components/Blog/RecentPosts";
import LatestPosts from "@/components/Blog/LatestPosts";
import PopularPosts from "@/components/Blog/PopularPosts";
import PostList from "@/components/Blog/PostList";
import Sidebar from "@/components/Sidebar";
// import CategoryArticles from "@/components/Blog/CategoryArticles";
// import AnimationWrapper from "@/components/AnimationWrapper";
// import PopularCategories from "@/components/Blog/PopularCategories";
// import PopularTags from "@/components/Blog/PopularTags";
// import Hero from "@/components/Hero";

// const HomePage = dynamic(() => import("@/components/Blog/Home"), {
//   ssr: false,
// });
// const Hero = dynamic(() => import("@/components/Hero"), {
//   ssr: false,
// });
// const LatestBlogPosts = dynamic(
//   () => import("@/components/Blog/LatestBlogPosts"),
//   {
//     ssr: false,
//   }
// );
// const FeaturedBlogPosts = dynamic(
//   () => import("@/components/Blog/FeaturedBlogPosts"),
//   {
//     ssr: false,
//   }
// );
const Home = ({
  latestProducts,
  catPostCount,
  tagPostCount,
  featuredProducts,
}) => {
  return (
    <div className="pt-20 max-w-7xl mx-auto px-5 md:px-14">
      {/* Popüler Yazılar */}
      <PopularPosts featuredProducts={featuredProducts} />

      {/* İçerik Alanı */}
      <div className="flex flex-col lg:flex-row mt-10">
        <PostList
          latestPosts={latestProducts}
          popularPosts={featuredProducts}
        />
        <Sidebar categories={catPostCount} />
      </div>
    </div>
  );
};
export default Home;
export async function getStaticProps() {
  const [posts, catPostCount, tagPostCount, featuredPosts] = await Promise.all([
    getPosts(),
    getCatWithPostCount(),
    getTagsWithPostCount(),
    getFeaturedProducts(),
  ]);

  const processedData = posts?.map((product) => ({
    ...product,
    imageUrl: urlForImage(product?.mainImage?.asset?._ref), // Burada resmin referansını kullanarak URL oluşturuyoruz
    timeAgo: calculateTimeAgo(product?.publishedAt), // Yayınlanma zamanını hesaplayıp ekliyoruz
  }));

  const processedFeaturedData = featuredPosts?.map((product) => ({
    ...product,
    imageUrl: urlForImage(product?.mainImage?.asset?._ref), // Resim URL'lerini oluştur
    timeAgo: calculateTimeAgo(product?.publishedAt), // Yayınlanma zamanını hesaplayıp ekliyoruz
  }));

  return {
    props: {
      latestProducts: processedData,
      featuredProducts: processedFeaturedData,
      catPostCount,
      tagPostCount,
    },
    revalidate: 60 * 60, // Önbelleği 1 saatte bir yenile
  };
}
