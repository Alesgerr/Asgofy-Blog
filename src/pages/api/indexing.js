import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Sadece POST isteği kabul edilir." });
  }

  try {
    const { url, type } = req.body;
    if (!url || !type) {
      return res.status(400).json({ error: "URL ve type zorunludur!" });
    }

    // Base64 formatındaki JSON'u çözüyoruz
    const credentials = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_BASE64, "base64").toString(
        "utf-8"
      )
    );

    // Google Auth Client oluşturuyoruz
    const auth = new google.auth.GoogleAuth({
      credentials, // Base64 çözülen JSON nesnesi burada kullanılmalı!
      scopes: ["https://www.googleapis.com/auth/indexing"],
    });

    const client = await auth.getClient();
    const indexing = google.indexing({ version: "v3", auth: client });

    const response = await indexing.urlNotifications.publish({
      requestBody: { url, type },
    });

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error(
      "Indexing API Hatası:",
      error?.response?.data || error.message
    );
    res.status(500).json({
      error: "Indexing API isteği başarısız oldu.",
      details: error.message,
    });
  }
}
