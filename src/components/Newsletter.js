import React from "react";

const Newsletter = () => {
  return (
    <section>
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
        {/* Component */}
        <div className="grid justify-items-center rounded-md gap-4 dark:text-white dark:bg-[#333333] bg-[#f2f2f7] p-8 sm:p-10 md:grid-cols-[1.5fr_1fr] md:justify-items-start md:p-16">
          <div className="text-center md:text-start">
            <h3 className="mb-2 text-2xl font-bold md:text-3xl">
              Join our Blog Newsletter
            </h3>
            <p className="max-w-md max-[479px]:text-sm">
              Stay updated with our latest blog posts, news, and insights.
            </p>
          </div>
          <div className="max-w-md sm:max-w-full">
            <form
              name="email-form"
              method="get"
              className="relative mx-auto mb-4 flex w-full flex-col justify-center sm:flex-row"
            >
              <input
                type="email"
                className="h-9 w-full rounded-md border border-solid dark:focus:outline-none border-black px-3 py-6 text-sm "
                placeholder="Enter your email"
              />
              <input
                type="submit"
                value="Subscribe"
                className="relative right-0 top-[5px] w-full cursor-pointer rounded-md bg-black px-3 py-2 text-sm font-semibold text-white sm:absolute sm:right-[5px] sm:w-24 lg:w-28 lg:text-base"
              />
            </form>
            <p className="text-sm dark:text-white text-[#636262] sm:text-base">
              Join our community of over <span>5000+ subscribers</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
