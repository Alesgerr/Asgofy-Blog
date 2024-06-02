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
// import PopularCategories from "@/components/Blog/PopularCategories";
// import PopularTags from "@/components/Blog/PopularTags";
// import Hero from "@/components/Hero";

// const HomePage = dynamic(() => import("@/components/Blog/Home"), {
//   ssr: false,
// });
const Hero = dynamic(() => import("@/components/Hero"), {
  ssr: false,
});
const LatestBlogPosts = dynamic(
  () => import("@/components/Blog/LatestBlogPosts"),
  {
    ssr: false,
  }
);
const FeaturedBlogPosts = dynamic(
  () => import("@/components/Blog/FeaturedBlogPosts"),
  {
    ssr: false,
  }
);
const PopularCategory = dynamic(
  () => import("@/components/Blog/PopularCategories"),
  {
    ssr: false,
  }
);
const PopularTag = dynamic(() => import("@/components/Blog/PopularTags"), {
  ssr: false,
});
const Home = ({
  latestProducts,
  catPostCount,
  tagPostCount,
  featuredProducts,
}) => {
  return (
    <div className="px-5 max-w-7xl md:px-14 lg:py-10 flex flex-col overflow-hidden mx-auto">
      {/* <Hero /> */}
      <div className="md:order-2">
        <FeaturedBlogPosts featuredProducts={featuredProducts} />
      </div>
      <div className="md:order-1 flex flex-wrap justify-between ">
        <div className="w-full lg:max-w-[73%] pb-2 ">
          <LatestBlogPosts latestProducts={latestProducts} />
        </div>
        <div className="w-full lg:w-3/12 hidden md:block">
          <PopularCategory catPostCount={catPostCount} />
          <PopularTag tagPostCount={tagPostCount} />
        </div>
      </div>
      {/* <Newsletter /> */}
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
