import { Feed } from "feed";
import { getProductsByCategory } from "../../../../sanity/lib/client";

export async function getServerSideProps({ params, res }) {
  const { slug } = params;
  // Kategoriden ürünleri almak için gerekli işlemleri yapın
  const products = await getProductsByCategory(slug);

  // RSS beslemesini oluştur
  const feed = new Feed({
    title: "Asgofy RSS Feed",
    description: "Follow our latest blog posts and updates here!",
    link: "https://asgofy.com/",
    language: "en",
    // Diğer isteğe bağlı ayarları buraya ekleyebilirsiniz
  });

  // Ürünleri RSS XML formatına dönüştürün
  products.forEach((product) => {
    feed.addItem({
      title: product.title,
      link: `https://asgofy.com/blog/${product?.slug}`,
      description: product?.description,
      date: new Date(product.publishedAt), // Ürünün yayınlanma tarihini ekleyin
      guid: `https://asgofy.com/blog/${product?.slug}`,
    });
  });

  // Atom linkini XML içeriğine doğrudan ekleyin
  const feedXml = feed.rss2();
  const atomLink = `<atom:link href="https://asgofy.com/categories/${slug}/rss.xml" rel="self" type="application/rss+xml"/>`;
  const modifiedFeedXml = feedXml.replace(
    "</channel>",
    `${atomLink}</channel>`
  );

  // Atom ad alanını tanımlayın
  const rssWithAtomNamespace = modifiedFeedXml.replace(
    '<rss version="2.0">',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">'
  );

  // XML içeriğini HTTP yanıtı olarak gönder
  res.setHeader("Content-Type", "text/xml");
  res.write(rssWithAtomNamespace);
  res.end();

  // Döndürülen içeriği kullanmadığımız için `props` objesini boş bırakabiliriz
  return { props: {} };
}

export default function RSS() {
  // Bu bileşen aslında hiçbir şey yapmaz, çünkü RSS içeriğini HTTP yanıtı olarak döndürüyoruz
  return null;
}
