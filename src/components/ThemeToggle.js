"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { CiDark, CiLight } from "react-icons/ci";
const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeMode = theme === "system" ? systemTheme : theme;
  return (
    <div className="sm:ml-2">
      {mounted &&
        (themeMode === "dark" ? (
          <div
            className="btnColor cursor-pointer flex py-3 sm:py-2 justify-center rounded-lg bg-black dark:bg-white text-white dark:text-black w-full px-2"
            onClick={() => setTheme("light")}
          >
            <div className="font-bold sm:hidden">Light Mode</div>
            <CiLight className="ml-2 sm:ml-0 text-purple-700 font-bold" size={25} />
          </div>
        ) : (
          <div
            className="btnColor cursor-pointer flex py-3 sm:py-2 justify-center rounded-lg bg-black dark:bg-white text-white dark:text-black w-full px-2"
            onClick={() => setTheme("dark")}
          >
            <div className="font-bold sm:hidden">Dark Mode</div>
            <CiDark className="ml-2 sm:ml-0 " size={25} />
          </div>
        ))}
    </div>
  );
};

export default ThemeToggle;
// // components/ThemeToggle.js
// "use client"
// import { useState, useEffect } from "react";

// function ThemeToggle() {
//   const [theme, setTheme] = useState("light");

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//   };

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme) {
//       setTheme(savedTheme);
//     }
//   }, []);

//   useEffect(() => {
//     document.body.classList.remove(
//       theme === "light" ? "dark-mode" : "light-mode"
//     );
//     document.body.classList.add(theme === "light" ? "light-mode" : "dark-mode");
//   }, [theme]);

//   return (
//     <button onClick={toggleTheme} className="rounded-lg  ml-2">
//       {theme === "dark" ? (
//         <img src="/sun-fill.svg" className="w-6 h-6" alt="" />
//       ) : (
//         <img src="/moon-fill.svg" className="w-6 h-6" alt="" />
//       )}
//     </button>
//   );
// }

// export default ThemeToggle;
// components/ThemeToggle.js
// "use client";
// import { useState, useEffect } from "react";

// function ThemeToggle() {
//   const [theme, setTheme] = useState(
//     localStorage.getItem("theme") === "light" ? "dark" : "light"
//   );

//   useEffect(() => {
//     if (
//       localStorage.theme === "dark" ||
//       (!("theme" in localStorage) &&
//         window.matchMedia("(prefers-color-scheme: dark)").matches)
//     ) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);
//   const changeTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   };
//   return (
//     <>
//       {/* <button onClick={toggleTheme}>
//         {theme === "light" ? (
//           <img src="/moon-fill.svg" className="w-6 h-6" alt="" />
//         ) : (
//           <img src="/sun-fill.svg" className="w-6 h-6" alt="" />
//         )}
//       </button> */}
//       <button onClick={changeTheme} className="rounded-lg  ml-2">
//         {theme === "dark" ? (
//           <img src="/moon-fill.svg" className="w-6 h-6" alt="" />
//         ) : (
//           <img src="/sun-fill.svg" className="w-6 h-6" alt="" />
//         )}
//       </button>
//     </>
//   );
// }

// export default ThemeToggle;
