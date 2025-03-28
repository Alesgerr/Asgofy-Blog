import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineEmail } from "react-icons/md";

export const Footer = () => {
  const navigation = [
    // { title: "Author", path: "/author" },
    { title: "Blogs", path: "/blog" },
    { title: "Categories", path: "/categories" },
    { title: "Tags", path: "/tag" },
    { title: "Contact", path: "/contact" },
    { title: "About", path: "/about" },
  ];
  return (
    <>
      <footer className="">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-14 py-5 md:py-10 border-t-1">
          <div className="flex flex-row justify-between max-[767px]:flex-col max-[767px]:items-start">
            <div className="max-[767px]: w-full max-w-[560px] max-[991px]:mr-4 max-[991px]:flex-initial">
              <h2 className="text-2xl font-bold md:text-3xl"> Asgofy </h2>
            </div>
            <div className="flex items-center">
              {/* <div className="mb-4 flex max-w-[272px] items-start justify-start">
                <img
                  src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358f6e257ec977d799ff999_MapPin-2.svg"
                  alt=""
                  className="mr-3 inline-block"
                />
                <p className="text-[#636262] max-[479px]:text-sm">
                  {" "}
                  8502 Preston Rd. Inglewood, Maine 98380, USA{" "}
                </p>
              </div> */}
              <div className="mt-5 sm:mt-0 flex max-w-[272px] items-center justify-start">
                <MdOutlineEmail size={25} />
                <p className="text-[#636262] max-[479px]:text-sm ml-2">
                  {" "}
                  asgofy@gmail.com{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="mb-14 mt-16 w-full [border-bottom:1.7px_solid_rgb(0,_0,_0)] dark:[border-bottom:1.7px_solid_rgb(255,_255,_255)]"></div>
          <div className="pt-20 flex flex-row justify-between max-[991px]:items-center max-[767px]:flex-col max-[767px]:items-start max-[479px]:flex-col-reverse">
            <div className="max-[991px]: m-auto text-center font-semibold max-[991px]:py-1 max-[479px]:mb-4 sm:text-center">
              <Link
                href="/blog"
                className="inline-block py-1.5 pr-6 font-normal text-[#636262] transition hover:text-[#276EF1] sm:py-2 sm:pr-6 lg:pr-12"
              >
                Blogs
              </Link>
              <Link
                href="/about"
                className="inline-block py-1.5 pr-6 font-normal text-[#636262] transition hover:text-[#276EF1] sm:py-2 sm:pr-6 lg:pr-12"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="inline-block py-1.5 pr-6 font-normal text-[#636262] transition hover:text-[#276EF1] sm:py-2 sm:pr-6 lg:pr-12"
              >
                Contact
              </Link>
              <Link
                href="/cookie-policy"
                className="inline-block py-1.5 pr-6 font-normal text-[#636262] transition hover:text-[#276EF1] sm:py-2 sm:pr-6 lg:pr-12"
              >
                Cookie Policy
              </Link>
              <Link
                href="/privacy-policy"
                className="inline-block py-1.5 pr-6 font-normal text-[#636262] transition hover:text-[#276EF1] sm:py-2 sm:pr-6 lg:pr-12"
              >
                Privacy Policy
              </Link>
            </div>
            <div className="max-[991px]:flex-none m-auto">
              <p className="text-[#636262] max-[479px]:text-sm text-center">
                {" "}
                © Copyright Asgofy {new Date().getFullYear()}. All rights
                reserved.{" "}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
