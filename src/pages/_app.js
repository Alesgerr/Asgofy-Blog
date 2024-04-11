// pages/_app.js
import Head from "next/head";
import "../app/globals.css";
import { ThemeProvider } from "next-themes";
import { PostProvider } from "@/context/PostContext";
import { AuthContextProvider } from "@/context/authContext";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PageLoader from "@/components/PageLoader";

// import { Toaster } from "react-hot-toast";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Asgofy - Latest Blog Posts and Articles</title>
        <meta
          name="description"
          content="Asgofy offers guides, tips and updates on the latest blog posts and articles."
        />

        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" sizes="32x32" href="/favicon-32x32.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta
          property="og:title"
          content="Asgofy - Latest Blog Posts and Articles"
        />
        <meta
          property="og:description"
          content="Asgofy offers guides, tips and updates on the latest blog posts and articles."
        />

        <meta property="og:image" content="/logo_lightmode.svg" />
        <meta property="og:url" content="https://asgofy.com/" />
        {/* <meta
          name="keywords"
          content="blog, article, post, guide, tip, update, content"
        /> */}
      </Head>
      {/* <!-- Google Tag Manager (noscript) --> */}

      {/* <!-- End Google Tag Manager (noscript) --> */}
      <PostProvider>
        <AuthContextProvider>
          <ThemeProvider enableSystem={true} attribute="class">
            <Header />
            <main>
              <PageLoader />
              <Component {...pageProps} />
            </main>
            <Toaster
              position="bottom-right"
              containerClassName="Toaster"
              toastOptions={{
                // Define default options
                className: "",
                duration: 1500,
                style: {
                  background: "#fff",
                  color: "#000",
                },

                // Default options for specific types
                success: {
                  duration: 1500,
                  theme: {
                    primary: "green",
                    secondary: "black",
                  },
                },
              }}
            />
            <Footer />
          </ThemeProvider>
        </AuthContextProvider>
      </PostProvider>
    </>
  );
}

export default MyApp;
