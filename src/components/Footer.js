import Image from "next/image";
import Link from "next/link";
import React from "react";

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
      {/* <footer className="block">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-14 py-5 md:py-10 border-t-1">
          <div className="flex flex-row justify-between max-[767px]:flex-col max-[767px]:items-start">
            <div className="max-[767px]: w-full max-w-[560px] max-[991px]:mr-4 max-[991px]:flex-initial">
            <h2 className="text-3xl font-bold md:text-5xl">
              {" "}
              Lightning Fast Webflow Dev made easy{" "}
            </h2>
          </div>
          <div className="max-[767px]: max-[991px]:ml-4 max-[991px]:flex-none max-[767px]:mt-8">
            <div className="mb-4 flex max-w-[272px] items-start justify-start">
              <img
                src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358f6e257ec977d799ff999_MapPin-2.svg"
                alt=""
                className="mr-3 inline-block"
              />
              <p className="text-[#636262] max-[479px]:text-sm">
                {" "}
                8502 Preston Rd. Inglewood, Maine 98380, USA{" "}
              </p>
            </div>
            <div className="mb-4 flex max-w-[272px] items-start justify-start">
              <img
                src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358f6e24e55dd49a541fd06_EnvelopeSimple-3.svg"
                alt=""
                className="mr-3 inline-block"
              />
              <p className="text-[#636262] max-[479px]:text-sm">
                {" "}
                asgorise@gmail.com{" "}
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
                Posts
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
      </footer> */}
      <footer className="mx-auto w-full max-w-7xl px-5 md:px-14 py-5 md:py-10 border-t-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:flex lg:items-center">
            <Link href="/">
              {/* <img
                src="logo_dark.jpg"
                alt="logo"
                className="w-48"
                width={100}
                height={100}
              /> */}
              <span className="text-4xl font-bold">Asgofy</span>
            </Link>
          </div>
          <div className="lg:flex lg:items-center">
            <ul className="flex space-x-6">
              <li>
                <Link href="https://twitter.com/asgofy">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="fill-black dark:fill-gray-300 dark:hover:fill-white w-7 h-7"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.92 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.83 4.5 17.72 4 16.46 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.9 20.29 6.16 21 8.58 21c7.88 0 12.21-6.54 12.21-12.21 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6 dark:text-white">
              Links
            </h4>
            <ul className="space-y-4">
              {navigation?.map((item) => (
                <li>
                  <Link
                    href={item?.path}
                    className="dark:text-gray-300 dark:hover:text-white text-sm"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6 dark:text-white">
              Information
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="dark:text-gray-300 dark:hover:text-white text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="dark:text-gray-300 dark:hover:text-white text-sm"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="dark:text-gray-300 dark:hover:text-white text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="dark:text-gray-300 text-sm mt-8">
          © {new Date().getFullYear()}
          <Link href="/" target="_blank" className="hover:underline mx-1">
            Asgofy
          </Link>
          All Rights Reserved.
        </p>
      </footer>
    </>
  );
};
