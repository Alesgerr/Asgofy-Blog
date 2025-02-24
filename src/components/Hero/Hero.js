import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <div className="hero">
      <section class="max-w-7xl px-5 md:px-14 mx-auto p-8 rounded-2xl shadow-lg">
        <h3 class="text-orange-500 text-sm font-bold uppercase text-center">
          Our Blog
        </h3>
        <h1 class="text-4xl font-bold text-center mt-2 mb-6">
          News & <span class="italic">Articles</span>
        </h1>
      </section>
    </div>
  );
}

export default Hero;
