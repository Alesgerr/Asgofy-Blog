// /pages/sitemap.xml.js
import { formatISO } from "date-fns";
import { getPosts } from "../../sanity/lib/client";

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const blogPosts = await getPosts(); // Tüm blog yazılarını alın
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // Site haritası XML içeriğini oluşturun
  const generateSitemap = () => {
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${baseUrl}</loc>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>
        <url>
          <loc>${baseUrl}/blog</loc>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>
         <url>
          <loc>${baseUrl}/about</loc>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
        <url>
          <loc>${baseUrl}/contact</loc>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
        <url>
          <loc>${baseUrl}/categories</loc>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
        `;

    // Tüm blog yazıları için URL'leri ekleyin
    blogPosts.forEach((post) => {
       const lastmod = formatISO(new Date(post?.lastModifiedDate), {
         representation: "date",
       });
       sitemap += `
        <url>
          <loc>${baseUrl}/blog/${post?.slug}</loc>
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
