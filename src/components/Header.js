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
import { IoMdClose } from "react-icons/io";
import { FaUser } from "react-icons/fa";
const Header = () => {
  const [state, setState] = useState(false);
  const [state1, setState1] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loadings, setLoadings] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState();
  const { latestProducts, loading } = usePostContext();

  const { currentUser } = useAuth();
  const navRef = useRef();
  const profileRef = useRef();
  const open = Boolean(anchorEl);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
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
    // { title: "Contact", path: "/contact" },
    // { title: "About", path: "/about" },
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
                {link.title}
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
                        className="rounded-full w-9 h-9 object-contain border"
                        whileTap={{ scale: 1.2 }}
                        src={
                          currentUser?.photoURL
                            ? currentUser.photoURL
                            : "/avatar.png"
                        }
                        alt="Profile Picture"
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
                        {/* <motion.img
                          className="rounded-full w-24 h-24 object-cover mr-1"
                          src={
                            currentUser?.photoURL
                              ? currentUser?.photoURL
                              : "/avatar.png"
                          }
                          alt='Profile Picture'
                        /> */}
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
      </header>
    </>
  );
};
export default Header;
