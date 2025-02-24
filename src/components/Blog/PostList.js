import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@mui/material";

export default function PostList({ latestPosts, popularPosts }) {
  const [activeTab, setActiveTab] = useState("latest");
  const router = useRouter();

  const displayedPosts = activeTab === "latest" ? latestPosts : popularPosts;

  return (
    <div className="xl:w-2/3 w-full border border-gray-200 dark:border-gray-700 p-3 rounded-lg">
      {/* Butonlar */}
      <div className="flex gap-4 mb-4">
        <Button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "latest"
              ? "bg-black dark:bg-white dark:text-black text-white"
              : "bg-gray-200 dark:bg-gray-900"
          }`}
          onClick={() => setActiveTab("latest")}
        >
          Latest Posts
        </Button>

        <Button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "popular"
              ? "bg-black dark:bg-white dark:text-black text-white"
              : "bg-gray-200 dark:bg-gray-900"
          }`}
          onClick={() => setActiveTab("popular")}
        >
          Popular Posts
        </Button>
      </div>

      {/* Gönderiler veya Skeleton */}
      <div className="space-y-4">
        {displayedPosts?.length > 0
          ? // Eğer veri varsa, normal gönderileri göster

            displayedPosts.slice(0, 15).map((post) => (
              <div
                key={post?.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow"
              >
                <Link href={`/blog/${post?.slug}`}>
                  <div className="flex justify-between gap-2">
                    <h3 className="text-sm sm:text-lg font-semibold hover:opacity-50 hover:text-gray-950 dark:hover:text-gray-200 transition duration-300">
                      {post?.title}
                    </h3>
                    <Image
                      width={500}
                      height={500}
                      className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-lg"
                      src={post?.imageUrl}
                      alt={post?.title}
                    />
                  </div>
                </Link>

                <div>
                  <Link
                    href={`/categories/${post?.categories[0]?.slug?.current}`}
                  >
                    <div className="text-sm font-semibold text-red-500 mb-3">
                      {post?.categories[0]?.title}
                    </div>
                  </Link>

                  <div className="text-xs text-gray-500 dark:text-gray-200">
                    {post?.timeAgo}
                  </div>
                </div>
              </div>
            ))
          : // Eğer veri yoksa, Skeleton göster
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow"
              >
                <Skeleton
                  variant="rectangular"
                  width={200}
                  height={50}
                  className="dark:bg-gray-800 rounded-md"
                />
                {/* <Skeleton className="bg-gray-200 h-5 w-2/3 rounded-lg mb-2" /> */}
                <Skeleton className="dark:bg-gray-800 h-20 w-full rounded-lg mb-2" />
                <Skeleton className="dark:bg-gray-800 h-4 w-1/4 rounded-lg" />
              </div>
            ))}
      </div>

      {/* Daha Fazlasına Bak Butonu */}
      <button
        className="mt-4 px-4 py-2 text-black dark:text-gray-200 transition duration-200 hover:opacity-50 underline rounded-md"
        onClick={() => router.push(`/blog`)}
      >
        See More
      </button>
    </div>
  );
}
