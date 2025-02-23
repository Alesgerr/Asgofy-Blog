import { google } from "googleapis";
import fs from "fs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Sadece POST isteği kabul edilir." });
  }

  try {
    // Google Auth için kimlik doğrulama
    const auth = new google.auth.GoogleAuth({
      keyFile: "indexing-api-key.json", // JSON dosyanız
      scopes: ["https://www.googleapis.com/auth/indexing"],
    });

    const client = await auth.getClient();
    const indexing = google.indexing({ version: "v3", auth: client });

    const { url, type } = req.body;

    // Google'a URL bildirimi gönder
    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url,
        type, // "URL_UPDATED" veya "URL_DELETED"
      },
    });

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error("Indexing API Hatası:", error);
    res.status(500).json({ error: "Indexing API isteği başarısız oldu." });
  }
}
