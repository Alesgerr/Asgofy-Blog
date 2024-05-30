import { usePostContext } from "@/context/PostContext";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { LiaArrowRightSolid } from "react-icons/lia";
import { urlForImage } from "../../../sanity/lib/image";
import { calculateTimeAgo } from "../calculateTimeAgo";

const PopularCategories = () => {
  const [categories, setCategories] = useState();
  const { catPostCount, loadingCatCount } = usePostContext();
  const processedCategories = useMemo(() => {
    return catPostCount?.map((item) => ({
      ...item,
      imageUrl: urlForImage(item?.author?.image?.asset?._ref),
      // categoryImage: urlForImage(item?.image?.asset?._ref),
      timeAgo: calculateTimeAgo(item?._createdAt),
    }));
  }, [catPostCount]);
  return (
    <div className="popular_categories rounded-md p-3 bg-white md:dark:bg-gray-950 dark:bg-black md:shadow-md mb-3">
      {processedCategories && (
        <h2 className="text-lg text-gray-900 dark:text-white mb-5">
          Our Popular{" "}
          <span className="lg:ml-2 text-indigo-600 font-bold">Categories</span>
        </h2>
      )}
      {loadingCatCount ? (
        <span className="loader"></span>
      ) : (
        <ul>
          {/* Etiketlerin listesi */}
          {processedCategories?.slice(0, 6).map((item, index) => (
            <li key={index}>
              <Link
                href={`/categories/${item?.slug?.current}`}
                className="dark:text-white hover:text-indigo-600 hover:underline my-3 flex flex-wrap justify-between"
              >
                {item?.title?.length > 20
                  ? item?.title?.slice(0, 17) + "..."
                  : item?.title}
                <LiaArrowRightSolid className="ml-5" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PopularCategories;
