// Örnek bir article-id.js dosyası

import { incrementArticleViews } from "../../../../sanity/lib/client";

// Bu importları eklemeyi unutmayın

export default async function handler(req, res) {
  if (req.method === "GET") {
    const articleId = req.query.articleId; // Makaleye ait benzersiz bir kimlik alınması gerekebilir
    // Makale görüntüleme sayısını artırma işlevini çağır
    await incrementArticleViews(articleId);

    // İsteğe başarılı bir yanıt döndür
    res.status(200).json({ message: "Makale görüntülenme sayısı artırıldı" });
  } else {
    // Geçersiz istekler için 405 (Method Not Allowed) hatası döndür
    res.status(405).end();
  }
}
