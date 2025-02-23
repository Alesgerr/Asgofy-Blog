import { useInView } from "react-intersection-observer";
import { Suspense } from "react";
import Image from "next/image";
import {
  getCatWithPostCount,
  getFeaturedProducts,
  getPosts,
  getTagsWithPostCount,
} from "../../../sanity/lib/client";
import LatestBlogPosts from "./LatestBlogPosts";

const LazyLoadComponent = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={inView ? "animate-fade-in" : ""}>
      {children}
    </div>
  );
};

export default function HomePage({
  latestProducts,
  tagPostCount,
  featuredProducts,
}) {
  console.log(latestProducts);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="latest-posts">
      
      </section>

      <section className="popular-topics mt-10">
        <h2 className="text-3xl font-bold mb-4">Popüler Konular</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tagPostCount?.map((topic) => (
            <div key={topic.id} className="topic-card">
              <h3 className="text-xl font-semibold">{topic.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="popular-posts mt-10">
        <h2 className="text-3xl font-bold mb-4">Popüler Makaleler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredProducts?.map((post) => (
            <div key={post.id} className="card">
              <Image
                src={urlForImage(post.image).url()}
                alt={post.title}
                width={500}
                height={300}
                className="rounded-lg"
              />
              <h3 className="text-xl font-semibold mt-4">{post.title}</h3>
              <p>{post.excerpt}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

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
      featuredProducts: processedFeaturedData,
      catPostCount,
      tagPostCount,
    },
    revalidate: 60 * 60, // Önbelleği 1 saatte bir yenile
  };
}
