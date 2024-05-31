import Link from "next/link";
import { useRef, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/authContext";
import { logout } from "@/utils/firebase/auth";
import { CiSearch, CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { FaUser } from "react-icons/fa";
// import SearchMenu from "./SearchMenu";
import dynamic from "next/dynamic";
import MobileMenu from "./MobileMenu";
const ThemeToggle = dynamic(() => import("@/components/ThemeToggle"), {
  ssr: false,
});
const SearchMenu = dynamic(() => import("@/components/SearchMenu"), {
  ssr: false,
});
// const MobileMenu = dynamic(() => import("@/components/MobileMenu"), {
//   ssr: false,
// });
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser } = useAuth();
  const profileRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const open = Boolean(anchorEl);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsMenuOpen(!isMenuOpen);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Replace javascript:void(0) path with your path
  const navigation = [
    // { title: "Author", path: "/author" },
    { title: "Blogs", path: "/blog" },
    { title: "Categories", path: "/categories" },
    { title: "Tags", path: "/tag" },
    // { title: "Guides", path: "javascript:void(0)" },
    // { title: "Partners", path: "javascript:void(0)" },
    // { title: "Teams", path: "javascript:void(0)" },
    { title: "Contact", path: "/contact" },
    { title: "About", path: "/about" },
  ];
  return (
    <>
      <header className="header">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-5 w-full md:px-14 p-5"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="flex">
              <span
                style={{ letterSpacing: "3px" }}
                className="text-2xl font-bold text-black dark:text-white"
              >
                Asgofy
              </span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button className="mr-4" onClick={handleModalOpen}>
              <CiSearch size={27} />
            </button>
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <CiMenuBurger size={27} />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation?.map((link, index) => (
              <Link
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-600"
                href={link?.path}
                key={index}
              >
                {link?.title}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
            <div className="mr-2 flex">
              <button onClick={handleModalOpen}>
                <CiSearch size={25} />
              </button>
            </div>
            <span className="flex">
              <ThemeToggle />
            </span>
            {currentUser ? (
              <>
                <div className="overflow-hidden">
                  <button
                    type="button"
                    onClick={toggleMenu}
                    className="px-3 flex items-centertext-[#333] text-sm border-gray-300"
                  >
                    <Image
                      src={
                        currentUser?.photoURL
                          ? currentUser?.photoURL
                          : "/avatar.png"
                      }
                      width={50}
                      height={50}
                      alt="avatar"
                      className="w-8 h-8 mr-3 rounded-full shrink-0"
                    />
                    {/* {currentUser?.displayName} */}
                  </button>

                  {isMenuOpen && (
                    <ul
                      onClick={toggleMenu}
                      className="absolute shadow-lg bg-white py-2 z-[1000]"
                    >
                      <li className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
                        {currentUser?.displayName}
                      </li>
                      <li className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
                        <Link href="/profile">View profile</Link>
                      </li>
                      <li
                        onClick={logout}
                        className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer"
                      >
                        Logout
                      </li>
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <Link
                href="/profile/sign-in"
                className="text-sm font-semibold ml-2 leading-6 text-gray-900 dark:text-white"
              >
                Log in
              </Link>
            )}
          </div>
          {/* ! Search Results */}
          <SearchMenu
            handleModalClose={handleModalClose}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </nav>
        {/* <!-- Mobile menu, show/hide based on menu open state. --> */}
        <MobileMenu
          isOpen={isOpen}
          navigation={navigation}
          toggleMenu={toggleMenu}
          currentUser={currentUser}
        />
      </header>
    </>
  );
};
export default Header;
