"use client";
import React, { useEffect, useRef, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { AiOutlineDislike } from "react-icons/ai";
import {
  PinterestShareButton,
  PinterestIcon,
  TwitterShareButton,
  TwitterIcon,
} from "next-share";
import { dislikePost, getPostById, likePost } from "../../sanity/lib/client";


const ShareGroup = ({ post, slug }) => {
  const [likes, setLikes] = useState(post?.likes); // Beğeni sayısını tutmak için state
  const [dislikes, setDislikes] = useState(post?.dislikes); // Beğenmeme sayısını tutmak için state
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { metaTitle, metaDescription } = post;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const postUrl = `${baseUrl}/blog/blog-detail/${post?.slug}`;
  const postImage = post?.postImage;
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef?.current &&
        !dropdownRef?.current?.contains(event?.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const postData = await getPostById(slug);
  //         setLikes(postData.likes);
  //         setDislikes(postData.dislikes);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchData();
  //   }, [slug]);

  // Beğeni işlemini gerçekleştiren işlev
//   const handleLikeClick = async () => {
//     try {
//       const updatedLikes = await likePost(slug); // likePost işlevini çağırarak beğeni sayısını güncelle
//       setLikes(updatedLikes); // Güncellenmiş beğeni sayısını state'e ayarla
//     } catch (error) {
//       console.error("Beğeni işlemi sırasında bir hata oluştu:", error);
//     }
//   };

//   // Beğenmeme işlemini gerçekleştiren işlev
//   const handleDislikeClick = async () => {
//     try {
//       const updatedDislikes = await dislikePost(slug); // dislikePost işlevini çağırarak beğenmeme sayısını güncelle
//       setDislikes(updatedDislikes); // Güncellenmiş beğenmeme sayısını state'e ayarla
//     } catch (error) {
//       console.error("Beğenmeme işlemi sırasında bir hata oluştu:", error);
//     }
//   };
// const addToLikes = async (selectedService) => {
//    console.log(selectedService);
//   console.log("addToLikes triggered");
//   try {
//     const data = { id: slug };
//     console.log(data);
//     const result = await axios.patch("/api/updateLikes", data);
//     console.log(result.data);
//   } catch (error) {
//     console.error(error);
//   }
// };
  const copyToClipboard = () => {
    //  const url = window.location.href;
    setIsOpen(!isOpen);
    navigator.clipboard
      .writeText(postUrl)
      .then(() => {
        console.log("URL copied to clipboard:", postUrl);
      })
      .catch((error) => {
        console.error("Error copying URL to clipboard:", error);
      });
  };

//   const handleLike = async () => {
//     try {
//       const token = process.env.NEXT_PUBLIC_SANITY_API_TOKEN;
//       const response = await fetch(`/api/like/${post?._id}`, {
//         method: "POST",
//         headers: {
//           Authorization: token,
//         },
//       });
//       console.log(response);
//       if (response.ok) {
//         const data = await response.json();
//         setLikes(data.likes);
//       }
//     } catch (error) {
//       console.error("Bir hata oluştu:", error);
//     }
//   };
  return (
    <div className="sticky bottom-6 inset-x-0 text-center" ref={dropdownRef}>
      <div className="inline-block bg-white shadow-md rounded-full py-3 px-4 dark:bg-gray-800">
        <div className="flex items-center  gap-x-1.5">
          {/* <div className="hs-tooltip inline-block border-e">
            <button
              type="button"
              onClick={handleLike}
              className="hs-tooltip-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              <CiHeart size={25} />
              {post?.likes}
              <span
                className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-black"
                role="tooltip"
              >
                Like
              </span>
            </button>
          </div> */}
          {/*
          <div className="block h-3 border-e border-gray-300 mx-3 dark:border-gray-600"></div>
          <div className="hs-tooltip inline-block">
            <button
              type="button"
              //   onClick={handleDislikeClick}
              className="hs-tooltip-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              <AiOutlineDislike size={23} />
              {post?.dislikes}
              <span
                className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-black"
                role="tooltip"
              >
                Comment
              </span>
            </button>
          </div> */}

          {/* <div className="block h-3 border-e border-gray-300 mx-3 dark:border-gray-600"></div> */}

          <div className="hs-dropdown relative inline-flex">
            <button
              type="button"
              id="blog-article-share-dropdown"
              className="hs-dropdown-toggle outline-none focus:outline-none border-none shadow-none flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              onClick={toggleDropdown}
            >
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" x2="12" y1="2" y2="15" />
              </svg>
              Share
            </button>
            <div
              className={`hs-dropdown-menu flex flex-col w-56 transition-[opacity,margin] duration absolute bottom-10 -left-10 md:-left-10 mb-1 z-10 bg-gray-900 shadow-md rounded-xl p-2 dark:bg-white ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <button
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm outline-none text-gray-400 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:text-black font-semibold"
                onClick={copyToClipboard}
              >
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                Copy link
              </button>
              <div className="border-t border-gray-600 my-2"></div>
              {/* <a
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-400 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    href="#"
                  >
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                    </svg>
                    Share on Twitter
                  </a> */}
              <PinterestShareButton
                title={metaTitle}
                url={postUrl}
                className="block"
                media={
                  "next-share is a social share buttons for your next React apps."
                }
              >
                <span className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-400 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-400">
                  <PinterestIcon size={25} round />
                  <span className="dark:text-black font-semibold">Pin</span>
                </span>
              </PinterestShareButton>

              <TwitterShareButton
                className="flex"
                title={metaTitle}
                url={postUrl}
                image={post?.postImage}
              >
                <span className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-400 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-400">
                  <TwitterIcon size={32} round />
                  <span className="dark:text-black font-semibold">Tweet</span>
                </span>
              </TwitterShareButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareGroup;
