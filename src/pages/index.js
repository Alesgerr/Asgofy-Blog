// pages/index.js
// import LatestBlogPosts from "@/components/Blog/LatestBlogPosts";
// import FeaturedBlogPosts from "@/components/Blog/FeaturedBlogPosts";
// import Newsletter from "@/components/Newsletter";
// import HomePage from "@/components/Blog/Home";
import LatestBlogPosts from "@/components/Blog/LatestBlogPosts";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";
import {
  getCatWithPostCount,
  getFeaturedProducts,
  getPosts,
  getTagsWithPostCount,
} from "../../sanity/lib/client";
import { urlForImage } from "../../sanity/lib/image";
import { calculateTimeAgo } from "@/components/calculateTimeAgo";

const HomePage = dynamic(
  () => import("@/components/Blog/Home"),
  {
    ssr: false,
  }
);
const Home = ({
  latestProducts,
  catPostCount,
  tagPostCount,
  featuredProducts,
}) => {
  return (
    <div>
      <HomePage
        latestProducts={latestProducts}
        catPostCount={catPostCount}
        tagPostCount={tagPostCount}
        featuredProducts={featuredProducts}
      />
      {/* <LatestBlogPosts /> */}
      {/* <FeaturedBlogPosts /> */}
      {/* <Newsletter /> */}
    </div>
  );
};
export default Home;
export async function getStaticProps() {
  const posts = await getPosts();
  const catPostCount = await getCatWithPostCount();
  const tagPostCount = await getTagsWithPostCount();
  const featuredPosts = await getFeaturedProducts();
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
  };
}
