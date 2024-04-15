// pages/[category]/rss.xml

import { Feed } from "feed";
import { getProductsByCategory } from "../../../../sanity/lib/client";

export async function getServerSideProps({ params }) {
  const { slug } = params;
  // Kategoriden ürünleri almak için gerekli işlemleri yapın
  const products = await getProductsByCategory(slug);

  // Ürünleri RSS XML formatına dönüştürün
  const feed = generateRSSFeed(products);
 
  return {
    props: {
      feed,
      products,
    },
  };
}
 function generateRSSFeed(products) {
   const feed = new Feed({
     title: "My Website RSS Feed",
     description: "Latest articles in the category",
     link: "https://asgofy.com/",
     language: "en",
     // Diğer isteğe bağlı ayarları buraya ekleyebilirsiniz
   });

   products.forEach((product) => {
     feed.addItem({
       title: product?.title,
       id: product?._id,
       link: `https://asgofy.com/blog/${product?.slug}`,
       description: product?.description,
       date: new Date(product?.publishedAt), // Ürünün yayınlanma tarihini ekleyin
     });
   });

   // Oluşturulan feed'i döndürün
   return feed.rss2();
 }
export default function RSS({ feed }) {
  return feed;
}
