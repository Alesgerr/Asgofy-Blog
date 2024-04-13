import { formatISO } from "date-fns";
import { getPosts } from "../../../sanity/lib/client";

export default async function handler(req, res) {
  // Blog gönderilerini al
  const posts = await getPosts();
  // RSS feed içeriğini oluştur
  const feed = generateRssFeed(posts);

  // RSS feed'i yanıt olarak gönder
  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(feed);
}

// RSS feed içeriğini oluşturan fonksiyon
function generateRssFeed(posts) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // RSS feed XML içeriğini oluştur
  let feed = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>My Blog Feed</title>
        <link>${baseUrl}</link>
        <description>Recent posts from my blog</description>`;

  // Her bir blog gönderisi için RSS feed öğesi oluştur
  posts.forEach((post) => {
    const pubMod = formatISO(new Date(post?.publishedAt), {
      representation: "date",
    });
    const title = post?.title
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const description = post?.description
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    feed += `
      <item>
        <title>${title}</title>
        <link>${baseUrl}/blog/${post?.slug}</link>
        <description>${description}</description>
        <pubDate>${pubMod}</pubDate>
      </item>`;
  });

  // RSS feed XML içeriğini tamamla
  feed += `
      </channel>
    </rss>`;

  return feed;
}
