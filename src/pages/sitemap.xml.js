// /pages/sitemap.xml.js
import { formatISO } from "date-fns";
import { getPosts } from "../../sanity/lib/client";

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const blogPosts = await getPosts(); // Tüm blog yazılarını alın
  console.log(blogPosts, 'post');
  // Site haritası XML içeriğini oluşturun
  const generateSitemap = () => {
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://asgoshop.com/</loc>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>`;

    // Tüm blog yazıları için URL'leri ekleyin
    blogPosts.forEach((post) => {
       const lastmod = formatISO(new Date(post?.lastModifiedDate), {
         representation: "date",
       });
      console.log(lastmod,'salam');

       sitemap += `
        <url>
          <loc>https://asgoshop.com/blog/${post?.slug}</loc>
          <lastmod>${lastmod}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>`;
    });

    sitemap += `</urlset>`;
    return sitemap;
  };

  // Site haritasını oluşturun
  const sitemap = generateSitemap();

  // Sunucuya XML dosyasını yazın
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
