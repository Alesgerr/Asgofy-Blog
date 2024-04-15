import { Feed } from "feed";
import { getProductsByCategory } from "../../../../sanity/lib/client";

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
      title: product.title,
      id: product._id,
      link: `https://asgofy.com/blog/${product?.slug}`,
      description: product?.description,
      date: new Date(product.publishedAt), // Ürünün yayınlanma tarihini ekleyin
    });
  });

  // Oluşturulan feed'i döndürün
  return feed.rss2();
}

export async function getServerSideProps({ params, res }) {
  const { slug } = params;
  // Kategoriden ürünleri almak için gerekli işlemleri yapın
  const products = await getProductsByCategory(slug);

  // Ürünleri RSS XML formatına dönüştürün
  const feed = generateRSSFeed(products);

  // XML içeriğini döndürmek için HTTP yanıtını yapılandırın
  res.setHeader("Content-Type", "text/xml");
  res.write(feed);
  res.end();

  // Döndürülen içeriği kullanmadığımız için `props` objesini boş bırakabiliriz
  return { props: {} };
}

export default function RSS() {
  // Bu bileşen aslında hiçbir şey yapmaz, çünkü RSS içeriğini HTTP yanıtı olarak döndürüyoruz
  return null;
}
