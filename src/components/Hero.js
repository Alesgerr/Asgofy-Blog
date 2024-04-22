import Link from "next/link";
import React from "react";
import AnimationWrapper from "./AnimationWrapper";

function Hero() {
  return (
    <AnimationWrapper>
      <div className="hero">
        <div className="bg-gradient-to-r from-blue-900 to-purple-700">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Welcome!</span>{" "}
                <span className="block text-indigo-200 xl:inline">
                  Our blog site
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-lg text-indigo-200 sm:text-xl md:mt-5 md:max-w-3xl">
                Explore our new content and gain more depth of knowledge.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <Link
                    href="/blog"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10"
                  >
                    Explore Content
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
}

export default Hero;
