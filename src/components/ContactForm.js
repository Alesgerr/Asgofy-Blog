import { MyFormcarryFormURL } from "@/formcarryConfig";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export default function BasicFormData() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function resetStates() {
    setSubmitted(false);
    setError("");

  }

  function resetForm() {
    setName("");
    setEmail("");
    setMessage("");
  }

  function onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    resetStates();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    // Change your endpoint from ./config.js file
    fetch(MyFormcarryFormURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.code === 200) {
          setSubmitted(true);
          resetForm();
        } else if (response.code === 422) {
          // Field validation failed
          setError(response.message);
        } else {
          // other error from formcarry
          setError(response.message);
        }
      })
      .catch((error) => {
        // request related error.
        setError(error.message ? error.message : error);
      });
  }

  const showNotification = submitted || error;

  function renderStatus() {
    let message = error
      ? error
      : `Thanks for reaching out!, we'll get back to you soon.`;
    let icon = error ? "error" : "success";

    return (
      <div className="formcarry-block">
        <div className={`formcarry-message-block fc-${icon} active`}>
          <div className="fc-message-icon"></div>
          <div className="fc-message-content">{message}</div>
          <div className="fc-message-close" onClick={() => resetStates()}></div>
        </div>
      </div>
    );
  }
  return (
    <>
      <section class="body-font relative  text-gray-400">
        <Head>
          <title>Contact - Asgofy</title>
          <meta
            name="description"
            content="Contact us for inquiries, feedback, or collaborations. We'd love to hear from you!"
          />
          <meta
            name="keywords"
            content="contact, reach out, feedback, inquiries, collaborations"
          />
          <link rel="canonical" href="https://asgofy.com/contact" />
        </Head>
        <div class="container mx-auto px-5 py-24">
          <div class="mb-12 flex w-full flex-col text-center">
            <h1 class="title-font mb-4 text-2xl font-bold text-black dark:text-white sm:text-3xl">
              Contact Us
            </h1>
            <p class="mx-auto text-base leading-relaxed lg:w-2/3">
              Feel free to reach out to us! Whether you have a question,
              feedback, or a collaboration proposal, we d love to hear from you.
            </p>
          </div>

          <div class="mx-auto md:w-2/3 lg:w-1/2">
            <div class="-m-2 flex flex-wrap">
              {/* <!-- form --> */}
              <form className="flex flex-wrap" onSubmit={(e) => onSubmit(e)}>
                <div class="w-1/2 p-2">
                  <div class="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      class="peer w-full rounded border dark:border-gray-700 dark:bg-gray-800 bg-opacity-40 py-1 px-3 text-base leading-8 text-gray-100 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900"
                      placeholder="Name"
                    />
                    <label
                      for="name"
                      class="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500"
                    >
                      Name
                    </label>
                  </div>
                </div>
                <div class="w-1/2 p-2">
                  <div class="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      class="peer w-full rounded border dark:border-gray-700 dark:bg-gray-800 bg-opacity-40 py-1 px-3 text-base leading-8 text-gray-100 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900"
                      placeholder="Email"
                    />
                    <label
                      for="email"
                      class="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500"
                    >
                      Email
                    </label>
                  </div>
                </div>
                <div class="mt-4 w-full p-2">
                  <div class="relative">
                    <textarea
                      id="message"
                      name="message"
                      class="peer h-32 w-full resize-none rounded border dark:border-gray-700 dark:bg-gray-800 bg-opacity-40 py-1 px-3 text-base leading-6 text-gray-100 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900"
                      placeholder="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <label
                      for="message"
                      class="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500"
                    >
                      Message
                    </label>
                  </div>
                </div>
                <div class="w-full p-2">
                  <button
                    type="submit"
                    class="mx-auto flex rounded border-0 bg-indigo-500 py-2 px-8 text-lg text-white hover:bg-indigo-600 focus:outline-none"
                  >
                    Send
                  </button>
                </div>
                {showNotification && renderStatus()}
              </form>

              {/* <!-- footer --> */}
              <div class="mt-8 w-full border-t border-gray-800 p-2 pt-8 text-center">
                <a class="text-indigo-400">asgofy@email.com</a>
                {/* <p class="my-5 leading-normal">
                  49 Smith St. <br />
                  Saint Cloud, MN 56301
                </p> */}
                <div className="my-5"></div>
                <span class="inline-flex">
                  <a
                    href="https://twitter.com/asgofy"
                    class="ml-4 text-gray-500"
                  >
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
