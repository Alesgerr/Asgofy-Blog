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
              <h1 className="text-2xl tracking-tight font-extrabold text-white sm:text-4xl">
                <span className="block xl:inline">Welcome!</span>{" "}
                <span className="block text-indigo-200 xl:inline">
                  Your Source for Knowledge and Growth
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-md text-indigo-200 sm:text-xl md:mt-5 md:max-w-3xl">
                Dive deeper into our curated content and elevate your
                understanding in various domains.
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
