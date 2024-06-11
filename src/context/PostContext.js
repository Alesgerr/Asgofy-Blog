"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getCatWithPostCount,
  getCategories,
  getFeaturedProducts,
  getPosts,
  getTagsWithPostCount,
} from "../../sanity/lib/client";
import { urlForImage } from "../../sanity/lib/image";
import { calculateTimeAgo } from "@/components/calculateTimeAgo";
const PostContext = createContext();
export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const [catPostCount, setCatPostCount] = useState([]);
  const [tagPostCount, setTagPostCount] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingGetPosts, setLoadingGetPosts] = useState(true);
  const [loadingCatCount, setLoadingCatCount] = useState(true);
  const [loadingTagCount, setLoadingTagCount] = useState(true);
  const fetchFeaturedPosts = async () => {
    try {
      const res = await getFeaturedProducts();
      const processedData = res.map((product) => ({
        ...product,
        imageUrl: urlForImage(product?.mainImage?.asset?._ref), // Resim URL'lerini oluştur
        timeAgo: calculateTimeAgo(product?.publishedAt), // Yayınlanma zamanını hesaplayıp ekliyoruz
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
        imageUrl: urlForImage(product?.mainImage?.asset?._ref), // Burada resmin referansını kullanarak URL oluşturuyoruz
        timeAgo: calculateTimeAgo(product?.publishedAt), // Yayınlanma zamanını hesaplayıp ekliyoruz
      }));
      setLatestProducts(processedData);
      setLoadingGetPosts(true);
    } catch (error) {
      setLoadingGetPosts(true);
      console.error("Error fetching featured products:", error);
    }
  };
  const fetchCategories = async () => {
    const res = await getCategories();
    setCategories(res);
  };
   const fetchCatPostCount = async () => {
    try {
      setLoadingCatCount(false);
      const res = await getCatWithPostCount();
      setCatPostCount(res);
    } catch (error) {
      setLoadingCatCount(true);
      console.error("Error fetching catPostCount:", error);
    }
   };
   const fetchTagPostCount = async () => {
     try {
       setLoadingTagCount(false);
       const res = await getTagsWithPostCount();
       setTagPostCount(res);
     } catch (error) {
       setLoadingTagCount(true);
       console.error("Error fetching catPostCount:", error);
     }
   };
   
  useEffect(() => {
    fetchFeaturedPosts();
    fetchPosts();
    fetchCategories();
    fetchCatPostCount()
    fetchTagPostCount()
  }, []);
 
  const value = {
    featuredProducts,
    latestProducts,
    catPostCount,
    tagPostCount,
    categories,
    loading,
    loadingGetPosts,
    loadingCatCount,
    loadingTagCount
  };
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
