import { usePostContext } from "@/context/PostContext";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { LiaArrowRightSolid } from "react-icons/lia";

const PopularCategories = ({ catPostCount }) => {
  return (
    <div className="popular_categories rounded-md p-3 bg-white md:dark:bg-gray-950 dark:bg-black md:shadow-md mb-3">
      {catPostCount && (
        <h2 className="text-lg text-gray-900 dark:text-white mb-5">
          Our Popular
          <span className="lg:ml-2 text-indigo-600 font-bold">Categories</span>
        </h2>
      )}
      {catPostCount ? (
        <ul>
          {/* Etiketlerin listesi */}
          {catPostCount?.slice(0, 6).map((item, index) => (
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
      ) : (
        <span className="loader"></span>
      )}
    </div>
  );
};

export default PopularCategories;
