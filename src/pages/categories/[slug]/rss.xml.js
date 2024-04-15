import { Feed } from "feed";
import { getProductsByCategory } from "../../../../sanity/lib/client";

function generateRSSFeed(products, slug) {
  const feed = new Feed({
    title: "Asgofy RSS Feed",
    description: "Follow our latest blog posts and updates here!",
    link: "https://asgofy.com/",
    language: "en",
    // Diğer isteğe bağlı ayarları buraya ekleyebilirsiniz
  });
  // feed.addAtomLink(`https://asgofy.com/categories/${slug}/rss.xml`);
  products.forEach((product) => {
    feed.addItem({
      title: product.title,
      link: `https://asgofy.com/blog/${product?.slug}`,
      description: product?.description,
      date: new Date(product.publishedAt), // Ürünün yayınlanma tarihini ekleyin
      guid: `https://asgofy.com/blog/${product._id}`,
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
  const feed = generateRSSFeed(products, slug);

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
