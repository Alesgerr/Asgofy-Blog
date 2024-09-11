import Link from "next/link";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { getCatWithPostCount } from "../../../sanity/lib/client";
import AnimationWrapper from "@/components/AnimationWrapper";

const CategoryPage = ({categories}) => {
  // const [categories, setCategories] = useState();
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     const res = await getCatWithPostCount();
  //     console.log(res);
  //     setCategories(res);
  //   };
  //   fetchCategories();
  // }, []);

  return (
    <div className="max-w-7xl mx-auto py-5 pt-20 px-5 md:px-14">
      <Head>
        <title>Blog Categories - Asgofy</title>
        <meta name="description" content="Explore our blog categories" />
      </Head>
      <h1 className="text-2xl font-bold mb-8 mt-5">Blog Categories</h1>
      <AnimationWrapper>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories?.map((category, i) => (
            <div
              className="dark:bg-white flex flex-col justify-center dark:text-black bg-zinc-900 font-bold text-white rounded-md py-4 px-6 text-center transition duration-300"
              key={i}
            >
              <Link
                href={`/categories/${category?.slug?.current}`}
                key={category?._id}
                className="hover:text-blue-700 text-[14px] md:text-[16px]"
              >
                {category?.title}
                <span className="pl-1">({category?.postCount})</span>
              </Link>
            </div>
          ))}
        </div>
      </AnimationWrapper>
    </div>
  );
};
export const getServerSideProps = async () => {
  const categories = await getCatWithPostCount()
  return {
    props: {
      categories
    }
  }
};
export default CategoryPage;
