import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const ThemeToggle = dynamic(() => import("@/components/ThemeToggle"), {
  ssr: false,
});
const MobileMenu = ({ isOpen, navigation, toggleMenu, currentUser }) => {
  const renderNavigationLinks = () => {
    return navigation?.map((link, index) => (
      <Link
        key={index}
        href={link.path}
        onClick={toggleMenu}
        className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 dark:text-gray-400 hover:text-indigo-500"
      >
        {link.title}
      </Link>
    ));
  };
  return (
    <div className="lg:hidden">
      {/* <!-- Background backdrop, show/hide based on slide-over state. --> */}
      <div className={`fixed inset-0 z-50 ${isOpen ? "" : "hidden"}`}></div>
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full overflow-y-auto dark:bg-black dark:text-white bg-white px-5 py-5 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 transition-menu duration-150 ${
          isOpen
            ? "transform translate-x-0"
            : "transform translate-x-full hidden"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/">
            <span
              style={{ letterSpacing: "3px" }}
              className="text-2xl font-bold text-black dark:text-white"
            >
              Asgofy
            </span>
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={toggleMenu}
          >
            <span className="sr-only">Close menu</span>
            <IoMdClose size={27} className="dark:text-white" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">{renderNavigationLinks()}</div>
            <div className="py-6">
              <div className="text-center text-gray-600 hover:text-indigo-600 block lg:inline lg:border-0">
                <ThemeToggle />
              </div>
              {currentUser ? (
                <Link
                  href="/profile/"
                  onClick={toggleMenu}
                  className="block rounded-lg sm:ml-2 px-3 py-3 mt-3 sm:py-3 text-base font-semibold items-center bg-black dark:bg-white text-white dark:text-black"
                >
                  <div className="flex items-center justify-center font-bold">
                    <span className="sm:hidden">Profile</span>
                    <FaUser className="ml-2 sm:flex" />
                  </div>
                </Link>
              ) : (
                <Link
                  href="/profile/sign-in"
                  onClick={toggleMenu}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 dark:text-gray-400"
                >
                  Log in
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
