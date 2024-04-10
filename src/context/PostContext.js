"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getCatWithPostCount,
  getCategories,
  getFeaturedProducts,
  getPosts,
} from "../../sanity/lib/client";
import { urlForImage } from "../../sanity/lib/image";
import { calculateTimeAgo } from "@/components/calculateTimeAgo";
const PostContext = createContext();
export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const [catPostCount, setCatPostCount] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchFeaturedPosts = async () => {
    try {
      const res = await getFeaturedProducts();
      const processedData = res.map((product) => ({
        ...product,
        imageUrl: urlForImage(product.mainImage.asset._ref), // Resim URL'lerini oluştur
        timeAgo: calculateTimeAgo(product.publishedAt), // Yayınlanma zamanını hesaplayıp ekliyoruz
      }));
      setLoading(false);
      setFeaturedProducts(processedData);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      setLoading(true);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await getPosts();
      const processedData = res.map((product) => ({
        ...product,
        imageUrl: urlForImage(product.mainImage.asset._ref), // Burada resmin referansını kullanarak URL oluşturuyoruz
        timeAgo: calculateTimeAgo(product.publishedAt), // Yayınlanma zamanını hesaplayıp ekliyoruz
      }));
      setLatestProducts(processedData);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.error("Error fetching featured products:", error);
    }
  };
  const fetchCategories = async () => {
    const res = await getCategories();
    setCategories(res);
  };
   const fetchCatPostCount = async () => {
     const res = await getCatWithPostCount();
     setCatPostCount(res);
   };
  useEffect(() => {
    fetchFeaturedPosts();
    fetchPosts();
    fetchCategories();
    fetchCatPostCount()
  }, []);
 
  const value = {
    featuredProducts,
    latestProducts,
    catPostCount,
    categories,
    loading,
  };
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
