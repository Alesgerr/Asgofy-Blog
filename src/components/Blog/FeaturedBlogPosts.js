import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../assets/Blog.css";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { usePostContext } from "@/context/PostContext";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
const FeaturedPosts = ({ featuredProducts }) => {
  const { loading } = usePostContext();
  const [swiperRef, setSwiperRef] = useState(null);
  // useEffect(() => {
  //   if (swiperRef) {
  //     swiperRef.el.swiper.resize(); // Resize Swiper after data is loaded
  //   }
  // }, [featuredProducts]);
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
    <section className="py-5 mx-auto max-w-7xl">
      <div className="flex justify-center flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between gap-8 bg-white dark:bg-gray-950 shadow-md rounded-md p-5">
        <div className="w-full flex justify-between flex-col lg:w-2/5">
          <div className="block lg:text-left text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-[3.25rem] mb-5">
              Our featured <span className=" text-indigo-600">blogs</span>
            </h2>
            {/* <p className="text-gray-500 mb-10  max-lg:max-w-xl max-lg:mx-auto">
              Welcome to our blog section, where knowledge meets inspiration.
              Explore insightful articles, expert tips, and the latest trends in
              our field.
            </p> */}
            <Link
              href="/blog"
              className="cursor-pointer border border-gray-300 dark:bg-white shadow-sm rounded-full py-3.5 px-7 w-52 lg:mx-0 mx-auto flex justify-center text-gray-900 font-semibold transition-all duration-300 hover:bg-gray-100"
            >
              View All
            </Link>
          </div>
          {/* <!-- Slider controls --> */}
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
          {/* <!--Slider wrapper--> */}
          <div className="swiper mySwiper">
            <div className="swiper-wrapper">
              {featuredProducts?.map((post, index) => (
                <div
                  key={index}
                  className="swiper-slide w-full max-lg:max-w-xl lg:w-1/2 group"
                >
                  <Link href={`/blog/${post?.slug}`}>
                    <div className="flex items-center mb-9">
                      <Image
                        className="rounded-2xl w-full h-32 md:h-72 object-cover"
                        src={post?.imageUrl}
                        alt={post?.title}
                        width={250}
                        height={100}
                        // priority
                      />
                    </div>
                    <h3 className="text-[12px] sm:text-lg text-gray-900 dark:text-white font-medium sm:leading-8 mb-4 group-hover:text-indigo-600">
                      {post?.title}
                    </h3>
                    {/* <p className="text-gray-500 leading-6 transition-all duration-500 mb-8">
                          {post?.description.length > 100
                          {post?.description?.length > 100
                            ? post?.description?.slice(0, 100) + "..."
                            : post?.description}
                        </p> */}
                    <div className="cursor-pointer flex items-center gap-2 text-sm sm:text-md text-indigo-700 font-semibold">
                      Read more
                      <FaLongArrowAltRight />
                    </div>
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
