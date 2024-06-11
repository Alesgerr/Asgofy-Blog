// app/components/Breadcrumb.js
"use client";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
const Breadcrumb = () => {
  const [pathSegments, setPathSegments] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const breadcrumbsRef = useRef(null);

  useEffect(() => {
    const handlePathChange = () => {
      const currentPath = window.location.pathname;
      const segments = currentPath
        .split("/")
        .filter((segment) => segment !== "");
      setPathSegments(segments);
    };

    handlePathChange();
    window.addEventListener("popstate", handlePathChange);
    window.addEventListener("hashchange", handlePathChange);

    return () => {
      window.removeEventListener("popstate", handlePathChange);
      window.removeEventListener("hashchange", handlePathChange);
    };
  }, []);

  return (
    <div className=" mb-5">
      {isMobile ? (
        <div className="breadcrumbs-container">
          <div className="breadcrumbs-scroll" ref={breadcrumbsRef}>
            <Breadcrumbs
              className="bg-gray-100 rounded-sm dark:bg-zinc-900 py-2 sm:py-3 md:px-14 px-5"
              aria-label="breadcrumb"
              maxItems={2}
            >
              <Link
                underline="hover"
                color="inherit"
                href="/"
                className="dark:text-white text-sm"
              >
                Home
              </Link>
              {pathSegments.map((segment, index) => (
                <span key={index} className="dark:text-white">
                  {index === pathSegments.length - 1 ? (
                    <span style={{ fontWeight: 500 }} className="text-sm">
                      {capitalize(segment)}
                    </span>
                  ) : (
                    <Link
                      underline="hover"
                      color="inherit"
                      className="dark:text-white text-sm"
                      href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                    >
                      {capitalize(segment)}
                    </Link>
                  )}
                  {index !== pathSegments.length - 1 && ""}
                </span>
              ))}
            </Breadcrumbs>
          </div>
        </div>
      ) : (
        <Breadcrumbs
          className="bg-gray-100 rounded-sm dark:bg-zinc-900 py-3 md:px-2"
          aria-label="breadcrumb"
        >
          <Link
            underline="hover"
            color="inherit"
            className="dark:text-white"
            href="/"
          >
            Home
          </Link>
          {pathSegments.map((segment, index) => (
            <span key={index} className="dark:text-white">
              {index === pathSegments.length - 1 ? (
                <span
                  style={{ fontWeight: 500 }}
                  className="text-black dark:text-white"
                >
                  {capitalize(segment)}
                </span>
              ) : (
                <Link
                  underline="hover"
                  color="inherit"
                  className="dark:text-white"
                  href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                >
                  {capitalize(segment)}
                </Link>
              )}
              {index !== pathSegments.length - 1 && ""}
            </span>
          ))}
        </Breadcrumbs>
      )}
    </div>
  );
};

export default Breadcrumb;

function capitalize(text) {
  if (typeof text === "string" && text.length > 0) {
    return text
      .split("-") // "-" karakterine göre bölüp her kelimenin baş harfini büyük yap
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    return text; // Eğer text boş veya undefined ise direk olarak text'i döndür.
  }
}
