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
import Hero from "@/components/Hero";
import FeaturedPosts from "@/components/Blog/FeaturedBlogPosts";
import Newsletter from "@/components/Newsletter";
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
    <div className="pt-20">
      {/* <Hero /> */}
      <div className="md:order-2">
        <FeaturedPosts featuredProducts={featuredProducts} />
      </div>
      <CategoryArticles
        latestProducts={latestProducts}
        catPostCount={catPostCount}
        tagPostCount={tagPostCount}
      />
      {/* <LatestBlogPosts latestProducts={latestProducts} /> */}

      {/* <div className="md:order-1 flex flex-wrap justify-between ">
        <div className="w-full lg:max-w-[73%] pb-2 ">
          <AnimationWrapper
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <LatestBlogPosts latestProducts={latestProducts} />
          </AnimationWrapper>
        </div>
        <div className="w-full lg:w-3/12">
          <AnimationWrapper
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          >
            <PopularCategory catPostCount={catPostCount} />
          </AnimationWrapper>
          <AnimationWrapper
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
          >
            <PopularTag tagPostCount={tagPostCount} />
          </AnimationWrapper>
        </div>
      </div> */}

      <Newsletter />
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
