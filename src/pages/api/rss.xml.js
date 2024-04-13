import { format } from "date-fns";
import { getPosts } from "../../../sanity/lib/client";

export default async function handler(req, res) {
  try {
    // Blog gönderilerini al
    const posts = await getPosts();
    // RSS feed içeriğini oluştur
    const feed = generateRssFeed(posts);

    // RSS feed'i yanıt olarak gönder
    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(feed);
  } catch (error) {
    console.error("RSS feed oluşturulurken bir hata oluştu:", error);
    res.status(500).send("Internal Server Error");
  }
}

// RSS feed içeriğini oluşturan fonksiyon
function generateRssFeed(posts) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // RSS feed XML içeriğini oluştur
  let feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>My Blog Feed</title>
    <link>${baseUrl}</link>
    <description>Recent posts from my blog</description>
    <atom:link href="https://asgofy.com/api/rss.xml" rel="self" type="application/rss+xml"/>`;

  posts.forEach((post) => {
    const pubDate = new Date(post?.publishedAt);
    const formattedPubDate = format(pubDate, "EEE, dd MMM yyyy HH:mm:ss xx");
    const title = escapeXml(post?.title);
    const description = escapeXml(post?.description);
    feed += `
    <item>
      <title>${title}</title>
      <link>${baseUrl}/blog/${post?.slug}</link>
      <description>${description}</description>
      <pubDate>${formattedPubDate}</pubDate>
      <guid>${baseUrl}/blog/${post?.slug}</guid>
    </item>`;
  });

  // RSS feed XML içeriğini tamamla
  feed += `
  </channel>
</rss>`;

  return feed;
}

// HTML özel karakterlerini kaçıran yardımcı işlev
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}
