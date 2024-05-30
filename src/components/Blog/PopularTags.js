import { usePostContext } from "@/context/PostContext";
import Link from "next/link";
import React, { useMemo } from "react";
import { calculateTimeAgo } from "../calculateTimeAgo";
import { LiaArrowRightSolid } from "react-icons/lia";

const PopularTags = ({ tagPostCount }) => {
  const { loadingTagCount } = usePostContext();
  const processedTags = useMemo(() => {
    return tagPostCount?.map((item) => ({
      ...item,
      timeAgo: calculateTimeAgo(item?._createdAt),
    }));
  }, [tagPostCount]);
  return (
    <div className="popular_tags rounded-md p-3 bg-white md:dark:bg-gray-950 dark:bg-black md:shadow-md">
      {processedTags && (
        <h2 className="text-lg text-gray-900 dark:text-white leading-[3.25rem] mb-5">
          Popular <span className="text-indigo-600 font-bold">tags</span>
        </h2>
      )}
      {loadingTagCount ? (
        <span className="loader"></span>
      ) : (
        <ul>
          {/* Etiketlerin listesi */}
          {processedTags?.slice(0, 6).map((item, index) => (
            <li key={index}>
              <Link
                href={`/tag/${item?.slug?.current}`}
                className="dark:text-white hover:text-indigo-600 hover:underline my-3 flex flex-wrap justify-between"
              >
                {item?.tag?.length > 20
                  ? item?.tag?.slice(0, 17) + "..."
                  : item?.tag}
                <LiaArrowRightSolid className="ml-5" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PopularTags;
