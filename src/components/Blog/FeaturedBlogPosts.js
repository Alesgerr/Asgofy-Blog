import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../assets/Blog.css";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { usePostContext } from "@/context/PostContext";
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
              <svg
                className="h-6 w-6 text-indigo-600 group-hover:text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.9999 12L4.99992 12M9.99992 6L4.70703 11.2929C4.3737 11.6262 4.20703 11.7929 4.20703 12C4.20703 12.2071 4.3737 12.3738 4.70703 12.7071L9.99992 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              id="slider-button-right"
              className="swiper-button-next group flex justify-center items-center border border-solid border-indigo-600 w-11 h-11 transition-all duration-500 rounded-full hover:bg-indigo-600"
              data-carousel-next
            >
              <svg
                className="h-6 w-6 text-indigo-600 group-hover:text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12L19 12M14 18L19.2929 12.7071C19.6262 12.3738 19.7929 12.2071 19.7929 12C19.7929 11.7929 19.6262 11.6262 19.2929 11.2929L14 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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
                        width={400}
                        height={100}
                        priority
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
                    <div className="cursor-pointer flex items-center gap-2 text-lg text-indigo-700 font-semibold">
                      Read more
                      <svg
                        width="15"
                        height="12"
                        viewBox="0 0 15 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.25 6L13.25 6M9.5 10.5L13.4697 6.53033C13.7197 6.28033 13.8447 6.15533 13.8447 6C13.8447 5.84467 13.7197 5.71967 13.4697 5.46967L9.5 1.5"
                          stroke="#4338CA"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
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
