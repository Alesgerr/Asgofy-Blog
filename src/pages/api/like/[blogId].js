// /pages/api/like/[blogId].js (dosya adınızı isteğinize göre ayarlayabilirsiniz)

import { client } from "../../../../sanity/lib/client";

export default async function handler(req, res) {
  const { blogId } = req.query;
  console.log(blogId,'sasa');

  try {
    // Blog gönderisini alın
    const blog = await client.fetch(
      `*[_type == "post" && _id == $blogId][0]`,
      { blogId }
    );
    if (!blog) {
      return res.status(404).json({ error: "Blog gönderisi bulunamadı" });
    }

    // Like sayısını artırın
    const updatedLikes = (blog.likes || 0) + 1;

    // Sanity'de like sayısını güncelleyin
    await client.patch(blog._id).set({ likes: updatedLikes }).commit();

    res.status(200).json({ likes: updatedLikes });
  } catch (error) {
    console.error("Bir hata oluştu:", error);
    res.status(500).json({ error: "İşlem sırasında bir hata oluştu" });
  }
}
