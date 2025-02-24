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

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="md:col-span-2">
            <img
              src="https://pettownsendvet.com/wp-content/uploads/2023/01/iStock-1052880600-1024x683.jpg"
              alt="Main Article"
              class="rounded-xl mb-4"
            />
            <p class="text-gray-400 text-sm">Jul 20, 2022</p>
            <h2 class="text-xl font-bold mb-2">
              Consectures Dummy Content Velit officia consequat duis enim velit
            </h2>
            <p class="text-gray-600 text-sm">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit
              exercitation veniam consequat sunt nostrud amet.
            </p>
          </div>
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <img
                src="https://pettownsendvet.com/wp-content/uploads/2023/01/iStock-1052880600-1024x683.jpg"
                alt="Article 1"
                class="w-24 h-24 rounded-lg"
              />
              <div>
                <p class="text-gray-400 text-sm">Jul 20, 2022</p>
                <h3 class="font-semibold text-md">
                  Consectures Content Velitpato officia consequat duis enim
                  velit mollit
                </h3>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <img
                src="https://pettownsendvet.com/wp-content/uploads/2023/01/iStock-1052880600-1024x683.jpg"
                alt="Article 2"
                class="w-24 h-24 rounded-lg"
              />
              <div>
                <p class="text-gray-400 text-sm">Jul 20, 2022</p>
                <h3 class="font-semibold text-md">
                  Consectures Content Velitpato officia consequat duis enim
                  velit mollit
                </h3>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <img
                src="https://pettownsendvet.com/wp-content/uploads/2023/01/iStock-1052880600-1024x683.jpg"
                alt="Article 3"
                class="w-24 h-24 rounded-lg"
              />
              <div>
                <p class="text-gray-400 text-sm">Jul 20, 2022</p>
                <h3 class="font-semibold text-md">
                  Consectures Content Velitpato officia consequat duis enim
                  velit mollit
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
