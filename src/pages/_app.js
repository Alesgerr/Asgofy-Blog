// pages/_app.js
import Head from "next/head";
import "../app/globals.css";
import { ThemeProvider } from "next-themes";
import { PostProvider } from "@/context/PostContext";
import { AuthContextProvider } from "@/context/authContext";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { Inter } from "next/font/google";
// import PageLoader from "@/components/PageLoader";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/components/Header"), {
  ssr: false,
});
const PageLoader = dynamic(() => import("@/components/PageLoader"), {
  ssr: false,
});
// import { Toaster } from "react-hot-toast";
  const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Latest Blog Posts and Articles - Asgofy</title>
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
        <link rel="manifest" href="/site.webmanifest" />
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
        <script
          src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
          async
        ></script>
        <script
          type="text/javascript"
          charset="UTF-8"
          src="//cdn.cookie-script.com/s/ab640e8d39ee02e1f1b3f60cf55c81dc.js"
          async
          defer
        ></script>
      </Head>
      <PostProvider>
        <AuthContextProvider>
          <ThemeProvider enableSystem={true} attribute="class">
            <Header />
            <PageLoader />
            <main className={inter.className}>
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
