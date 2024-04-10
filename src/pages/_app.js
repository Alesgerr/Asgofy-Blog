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
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=G-Q4NP0KLP3F`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-Q4NP0KLP3F");

    return () => {
      // Cleanup if needed
    };
  }, []);
  return (
    <>
      <Head>
        <title>Asgorise - Latest Blog Posts and Articles</title>
        <meta
          name="description"
          content="Asgorise offers guides, tips and updates on the latest blog posts and articles."
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
          content="Asgorise - Latest Blog Posts and Articles"
        />
        <meta
          property="og:description"
          content="Asgorise offers guides, tips and updates on the latest blog posts and articles."
        />

        <meta property="og:image" content="/logo_lightmode.svg" />
        <meta property="og:url" content="https://asgoshop.com/" />
        {/* <meta
          name="keywords"
          content="blog, article, post, guide, tip, update, content"
        /> */}
        <Script
          dangerouslySetInnerHTML={{
            __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-N7RMCHQB');
      `,
          }}
        />
        <Script
          type="text/javascript"
          charset="UTF-8"
          src="//cdn.cookie-script.com/s/5a9abd4a4750bb73cf85b012a01ea82c.js"
        ></Script>
      </Head>
      {/* <!-- Google Tag Manager (noscript) --> */}

      {/* <!-- End Google Tag Manager (noscript) --> */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-N7RMCHQB"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
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
