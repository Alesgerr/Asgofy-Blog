import { getFeaturedProducts } from "../../../sanity/lib/client";

export default async function handler(req, res) {
  try {
    const featuredProducts = await getFeaturedProducts();
    if (!featuredProducts) {
      return res.status(404).json({ error: "No featured products found" });
    }
    res.status(200).json(featuredProducts);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
