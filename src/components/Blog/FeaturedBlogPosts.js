import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../assets/Blog.css";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { Skeleton } from "@mui/material";
import { urlForImage } from "../../../sanity/lib/image";
import { calculateTimeAgo } from "../calculateTimeAgo";

const FeaturedPosts = () => {
  const [loading, setLoading] = useState(true); // Başlangıçta loading true
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [swiperRef, setSwiperRef] = useState(null);

  // Verileri fetch et
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true); // Yükleme başlıyor
        const response = await fetch("/api/featured-products");
        const data = await response.json();
        const processedFeaturedData = data?.map((product) => ({
          ...product,
          imageUrl: urlForImage(product?.mainImage?.asset?._ref), // Resim URL'lerini oluştur
          timeAgo: calculateTimeAgo(product?.publishedAt), // Yayınlanma zamanını hesaplayıp ekliyoruz
        }));
        setFeaturedProducts(processedFeaturedData);
      } catch (error) {
        console.error("Veri yüklenirken hata oluştu:", error);
      } finally {
        setLoading(false); // Yükleme tamamlandı
      }
    };

    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    const swiper = new Swiper(".mySwiper", {
      slidesPerView: 2,
      spaceBetween: 28,
      centeredSlides: false,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 10,
          centeredSlides: false,
        },
        568: {
          slidesPerView: 2,
          spaceBetween: 28,
          centeredSlides: false,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 28,
          centeredSlides: false,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
      },
      modules: [Navigation, Pagination],
    });
    return () => {
      swiper.destroy();
    };
  }, [featuredProducts]);

  return (
    <section className="py-5 mx-auto max-w-7xl px-5 md:px-14">
      <div className="flex justify-center flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between gap-8 bg-white dark:bg-gray-950 shadow-md rounded-md p-5">
        <div className="w-full flex justify-between flex-col lg:w-2/5">
          <div className="block lg:text-left text-center font2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-[3.25rem] mb-5">
              Our featured <span className=" text-indigo-600">blogs</span>
            </h2>
            <Link
              href="/blog"
              className="cursor-pointer border border-gray-300 dark:bg-white shadow-sm rounded-full py-3.5 px-7 w-52 lg:mx-0 mx-auto flex justify-center text-gray-900 font-semibold transition-all duration-300 hover:bg-gray-100"
            >
              View All
            </Link>
      
          </div>
          <div className="flex items-center lg:justify-start justify-center lg:mt-0 mt-8 gap-8 mb-4">
            <button
              id="slider-button-left"
              className="swiper-button-prev group flex justify-center items-center border border-solid border-indigo-600 w-11 h-11 transition-all duration-500 rounded-full hover:bg-indigo-600"
              data-carousel-prev
            >
              <FaLongArrowAltLeft className="text-indigo-600 hover:text-white duration-200" />
            </button>
            <button
              id="slider-button-right"
              className="swiper-button-next group flex justify-center items-center border border-solid border-indigo-600 w-11 h-11 transition-all duration-500 rounded-full hover:bg-indigo-600"
              data-carousel-next
            >
              <FaLongArrowAltRight className="text-indigo-600 hover:text-white duration-200" />
            </button>
          </div>
        </div>
        <div className="w-full lg:w-3/5">
          <div className="swiper mySwiper">
            <div className="swiper-wrapper">
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="swiper-slide w-full max-lg:max-w-xl lg:w-1/2 group"
                    >
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={200}
                        className="rounded-2xl dark:bg-gray-800"
                      />
                    </div>
                  ))
                : featuredProducts?.map((post, index) => (
                    <div
                      key={index}
                      className="swiper-slide w-full max-lg:max-w-xl lg:w-1/2 group font2"
                    >
                      <Link href={`/blog/${post?.slug}`}>
                        <Image
                          className="rounded-2xl w-full h-32 md:h-72 object-cover"
                          src={post?.imageUrl}
                          alt={post?.title}
                          width={400}
                          height={100}
                        />
                        <h3 className="text-[12px] mt-2 sm:text-lg text-gray-900 dark:text-white font-medium sm:leading-8 mb-4 group-hover:text-indigo-600">
                          {post?.title.length > 50
                            ? post?.title.slice(0, 50) + "..."
                            : post?.title}
                        </h3>
                      </Link>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
