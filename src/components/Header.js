"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import { useAuth } from "@/context/authContext";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import IconBtn from "@mui/material/IconButton";
import { motion } from "framer-motion";
import { logout } from "@/utils/firebase/auth";
import { CiSearch, CiMenuBurger } from "react-icons/ci";
import { usePostContext } from "@/context/PostContext";
import { FaRegSadCry } from "react-icons/fa";
const Header = () => {
  const [state, setState] = useState(false);
  const [state1, setState1] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const { currentUser } = useAuth();
  const navRef = useRef();
  const profileRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { latestProducts, loading } = usePostContext();
  const [loadings, setLoadings] = useState(true);
  const [searchMessage, setSearchMessage] = useState();
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  //  if (loading) {
  //    return <p>Loading...</p>;
  //  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    // Arama yap
    const results = latestProducts.filter((product) =>
      product?.title.toLowerCase().includes(query.toLowerCase())
    );
    // Eğer sonuç bulunamazsa
    if (results.length === 0) {
      setLoadings(false);
      setSearchResults(results);
      // Kullanıcıya bir bildirim göster
      setSearchMessage("No results found for the searched term.");
    } else {
      // Sonuç bulunduysa
      setLoadings(false);
      setSearchResults(results);
      setSearchMessage(""); // Bildirimi temizle
    }
    setLoadings(false);
    setSearchResults(results);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Modalı kapat
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
          className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-14 p-3"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="flex">
              {/* <Image
                src="/wings.png"
                loading="lazy"
                className="w-28"
                width={1000}
                height={50}
                alt=""
              /> */}
              <span className="text-2xl font-bold text-purple-700">
                Asgorise
              </span>
            </Link>
            <a href="/" className="text-2xl font-extrabold">
              <span className="sr-only">Asgorise</span>
              {/* <Image
                src="/wings.png"
                loading="lazy"
                className="w-40"
                width={100}
                height={50}
                alt=""
              /> */}
            </a>
            <a href="/" className="text-2xl font-extrabold hidden dark:block">
              <span className="sr-only">Asgorise</span>
              {/* <Image
                src="/logo_darkmode.svg"
                loading="lazy"
                className="w-40"
                width={100}
                height={50}
                alt=""
              /> */}
            </a>
          </div>
          <div className="flex lg:hidden">
            <button className="mr-2" onClick={handleModalOpen}>
              <CiSearch size={22} />
            </button>
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <CiMenuBurger size={22} />
              {/* <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg> */}
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <div className="relative">
              {/* <button
                type="button"
                className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                aria-expanded="false"
              >
                Product
                <svg
                  className="h-5 w-5 flex-none text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button> */}
              {/* 
        <!--
          'Product' flyout menu, show/hide based on flyout menu state.

          Entering: "transition ease-out duration-200"
            From: "opacity-0 translate-y-1"
            To: "opacity-100 translate-y-0"
          Leaving: "transition ease-in duration-150"
            From: "opacity-100 translate-y-0"
            To: "opacity-0 translate-y-1"
        --> */}
              {/* <div className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <svg
                        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
                        />
                      </svg>
                    </div>
                    <div className="flex-auto">
                      <a href="#" className="block font-semibold text-gray-900">
                        Analytics
                        <span className="absolute inset-0"></span>
                      </a>
                      <p className="mt-1 text-gray-600">
                        Get a better understanding of your traffic
                      </p>
                    </div>
                  </div>
                  <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <svg
                        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                        />
                      </svg>
                    </div>
                    <div className="flex-auto">
                      <a href="#" className="block font-semibold text-gray-900">
                        Engagement
                        <span className="absolute inset-0"></span>
                      </a>
                      <p className="mt-1 text-gray-600">
                        Speak directly to your customers
                      </p>
                    </div>
                  </div>
                  <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <svg
                        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
                        />
                      </svg>
                    </div>
                    <div className="flex-auto">
                      <a href="#" className="block font-semibold text-gray-900">
                        Security
                        <span className="absolute inset-0"></span>
                      </a>
                      <p className="mt-1 text-gray-600">
                        Your customers’ data will be safe and secure
                      </p>
                    </div>
                  </div>
                  <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <svg
                        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                    </div>
                    <div className="flex-auto">
                      <a href="#" className="block font-semibold text-gray-900">
                        Integrations
                        <span className="absolute inset-0"></span>
                      </a>
                      <p className="mt-1 text-gray-600">
                        Connect with third-party tools
                      </p>
                    </div>
                  </div>
                  <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <svg
                        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                    </div>
                    <div className="flex-auto">
                      <a href="#" className="block font-semibold text-gray-900">
                        Automations
                        <span className="absolute inset-0"></span>
                      </a>
                      <p className="mt-1 text-gray-600">
                        Build strategic funnels that will convert
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  <a
                    href="#"
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                  >
                    <svg
                      className="h-5 w-5 flex-none text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Watch demo
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                  >
                    <svg
                      className="h-5 w-5 flex-none text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Contact sales
                  </a>
                </div>
              </div> */}
            </div>
            {navigation?.map((link, index) => (
              <Link
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-indigo-500"
                href={link?.path}
                key={index}
              >
                {link.title}
              </Link>
            ))}
            {/* <Link href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Posts
            </Link>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Features
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Marketplace
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Company
            </a> */}
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography> */}
                  {/* <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
                  <Tooltip title="Account settings">
                    <IconBtn
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <motion.img
                        className="rounded-full w-7 h-7 object-contain border"
                        whileTap={{ scale: 1.2 }}
                        src={
                          currentUser?.photoURL
                            ? currentUser.photoURL
                            : "avatar.png"
                        }
                        alt={currentUser ? "" : ""}
                      />
                    </IconBtn>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 42,
                        height: 42,
                        ml: 1,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link href="/profile">
                      <div className="flex flex-col justify-center">
                        <motion.img
                          className="rounded-full w-24 h-24 object-cover mr-1"
                          src={
                            currentUser?.photoURL
                              ? currentUser.photoURL
                              : "avatar.png"
                          }
                          alt={currentUser ? "" : ""}
                        />
                        <div className="mt-2">
                          {currentUser ? (
                            <h1 className="font-bold">
                              {currentUser.displayName}
                            </h1>
                          ) : (
                            <div className="hidden"></div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      {/* <Settings fontSize="small" /> */}
                      {currentUser ? (
                        <>
                          <div className="text-gray-600 font-bold">
                            <div>
                              <Link href="/profile">
                                <button>Settings</button>
                              </Link>
                            </div>
                            <div className="mt-2">
                              <button onClick={logout}>Logout</button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <Link
                          href="/sign-in"
                          className="text-gray-600 font-bold w-full"
                        >
                          <button>Sign in</button>
                        </Link>
                      )}
                    </ListItemIcon>
                  </MenuItem>
                </Menu>
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
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white dark:bg-black p-4 max-w-[380px] sm:max-w-[500px] rounded-lg">
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex justify-between"
                >
                  <div className="relative flex-1 mr-2">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                      placeholder="Make a call..."
                      className="border dark:border-none outline-none w-full p-2 rounded-md mr-2"
                    />
                    <span className="absolute top-[25%] right-2">
                      <CiSearch size={22} />
                    </span>
                  </div>
                  <button
                    onClick={handleModalClose}
                    className="bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-md transition duration-300"
                  >
                    Cancel
                  </button>
                </form>
                <div className="mt-4">
                  {searchResults?.slice(0, 5)?.map((result, index) => (
                    <div key={index}>
                      {loading ? (
                        <p>Loading...</p>
                      ) : (
                        <Link href={`/blog/${result?.slug}`}>
                          <div
                            key={result.id}
                            onClick={handleModalClose}
                            className="mb-2 flex items-center"
                          >
                            <Image
                              src={result?.imageUrl}
                              width={100}
                              height={100}
                              priority
                              className="w-10 h-10 mr-3 rounded-md"
                              alt="post_image"
                            />
                            <h3 className="text-[12px] sm:text-sm font-semibold">
                              {result?.title}
                            </h3>
                            {/* <p className="text-sm text-gray-600">{result.}</p> */}
                          </div>
                        </Link>
                      )}
                    </div>
                  ))}
                  {searchMessage && (
                    <div className="flex justify-between items-center">
                      <FaRegSadCry size={22} className="mr-5" />
                      {searchMessage}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>
        {/* <!-- Mobile menu, show/hide based on menu open state. --> */}
        <div className="lg:hidden" role="dialog" aria-modal="true">
          {/* <!-- Background backdrop, show/hide based on slide-over state. --> */}
          <div className={`fixed inset-0 z-50 ${isOpen ? "" : "hidden"}`}></div>
          <div
            className={`fixed inset-y-0 right-0 z-50 w-full overflow-y-auto dark:bg-black dark:text-white bg-white px-5 py-3 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 transition-menu duration-150 ${
              isOpen
                ? "transform translate-x-0"
                : "transform translate-x-full hidden"
            }`}
          >
            <div className="flex items-center justify-between">
              <Link href="/">
                <span className="text-2xl font-bold text-purple-700">
                  Asgorise
                </span>
              </Link>
              {/* <a href="/" className="text-2xl font-extrabold dark:hidden">
                <span className="sr-only">Asgorise</span>
                <Image
                  src="/logo_lightmode.svg"
                  loading="lazy"
                  className="w-40"
                  width={100}
                  height={50}
                  alt=""
                />
              </a>
              <a href="/" className="text-2xl font-extrabold hidden dark:block">
                <span className="sr-only">Asgorise</span>
                <Image
                  src="/logo_darkmode.svg"
                  loading="lazy"
                  className="w-40"
                  width={100}
                  height={50}
                  alt=""
                />
              </a> */}

              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={toggleMenu}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation?.map((link, index) => (
                    <Link
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 dark:text-gray-400 hover:text-indigo-500"
                      href={link?.path}
                      onClick={toggleMenu}
                      key={index}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <div className="text-center border text-gray-600 hover:text-indigo-600 rounded-md block lg:inline lg:border-0">
                    <ThemeToggle />
                  </div>
                  {currentUser ? (
                    <Link
                      href="/profile/"
                      onClick={toggleMenu}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 dark:text-gray-400"
                    >
                      Profile
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
      </header>
    </>
    // <nav ref={navRef} className="w-full top-0 z-50 bg-white dark:bg-black">
    //   <div className="mx-auto max-w-7xl items-center px-5 md:px-14 py-1 lg:flex shadow-sm border-b-2 dark:border-b-gray-950">
    //     <div className="flex items-center justify-between py-3 lg:py-4 lg:block ">
    //       <a href="/" className="text-2xl font-extrabold dark:hidden">
    //         <Image
    //           src="/logo_lightmode.svg"
    //           loading="lazy"
    //           className="w-40"
    //           width={100}
    //           height={50}
    //           alt=""
    //         />
    //       </a>
    //       <a href="/" className="text-2xl font-extrabold hidden dark:block">
    //         <Image
    //           src="/logo_darkmode.svg"
    //           loading="lazy"
    //           className="w-40"
    //           width={100}
    //           height={50}
    //           alt=""
    //         />
    //       </a>
    //       <div className="lg:hidden">
    //         <button
    //           className="text-gray-700 outline-none p-2 rounded-md"
    //           onClick={() => setState(!state)}
    //         >
    //           {state ? (
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className="h-6 w-6"
    //               viewBox="0 0 20 20"
    //               fill="currentColor"
    //             >
    //               <path
    //                 fillRule="evenodd"
    //                 d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
    //                 clipRule="evenodd"
    //               />
    //             </svg>
    //           ) : (
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className="h-6 w-6"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               stroke="currentColor"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth={2}
    //                 d="M4 8h16M4 16h16"
    //               />
    //             </svg>
    //           )}
    //         </button>
    //       </div>
    //     </div>
    //     <div></div>
    //     <div
    //       className={`flex-1 justify-between items-center flex-row-reverse lg:overflow-visible lg:flex lg:pb-0 lg:pr-0 lg:h-auto ${
    //         state ? "h-screen pb-20 overflow-auto pr-4" : "hidden"
    //       }`}
    //     >
    //       <div>
    //         <ul className="flex flex-col-reverse items-center space-x-0 lg:space-x-3 lg:flex-row">
    //           <li className="mt-4 lg:mt-0">
    //             <div className="text-center border text-gray-600 hover:text-indigo-600 rounded-md block lg:inline lg:border-0">
    //               <ThemeToggle />
    //             </div>
    //           </li>
    //           {/* <li className="mt-4 lg:mt-0">
    //             <Link
    //               href="sign-in"
    //               className="py-3 px-4 text-center border dark:text-white bg-black rounded-md block lg:inline lg:border-0"
    //             >
    //               Login
    //             </Link>
    //           </li> */}
    //           {currentUser ? (
    //             <div className="relative">
    //               <div className="">
    //                 <button
    //                   ref={profileRef}
    //                   className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 lg:focus:ring-2 lg:block"
    //                   onClick={() => setState1(!state1)}
    //                 >
    //                   <img
    //                     src={
    //                       currentUser.photoURL
    //                         ? currentUser.photoURL
    //                         : "default-avatar.png"
    //                     }
    //                     loading="lazy"
    //                     className="w-10 h-10 rounded-full object-cover"
    //                   />
    //                 </button>
    //               </div>
    //               <ul
    //                 className={`z-50 top-14 right-0 mt-6 space-y-6 lg:absolute lg:border lg:rounded-md lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${
    //                   state1 ? "" : "lg:hidden"
    //                 }`}
    //               >
    //                 {navigationUser.map((item, idx) => (
    //                   <li key={idx}>
    //                     <Link
    //                       className="hover:text-indigo-600 lg:p-3"
    //                       href={item.path}
    //                     >
    //                       {item.title}
    //                     </Link>
    //                   </li>
    //                 ))}
    //                 {/* <button className="block w-full text-justify text-gray-600 hover:text-gray-900 border-t py-3 lg:hover:bg-gray-50 lg:p-3">
    //                   Logout
    //                 </button> */}
    //               </ul>
    //             </div>
    //           ) : (
    //             <li className="mt-8 lg:mt-0">
    //               <Link
    //                 href="/sign-in"
    //                 className="py-2 px-4 text-center text-white bg-indigo-700 rounded-md shadow block lg:inline"
    //               >
    //                 Sign in
    //               </Link>
    //             </li>
    //           )}
    //         </ul>
    //       </div>
    //       <div className="flex-1">
    //         <ul className="justify-center items-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
    //           {navigation.map((item, idx) => {
    //             return (
    //               <li key={idx}>
    //                 <Link className="hover:text-indigo-600" href={item.path}>
    //                   {item.title}
    //                 </Link>
    //               </li>
    //             );
    //           })}
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
  );
};
export default Header;
