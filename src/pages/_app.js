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
import PageLoader from "@/components/PageLoader";
import dynamic from "next/dynamic";
import Header from "@/components/Header/Header";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { initGA, logPageView } from "@/utils/analytics";
import MainLayout from "@/Layout/MainLayout";
import DashboardLayout from "@/Layout/DashboardLayout";
// const Header = dynamic(() => import("@/components/Header"), {
//   ssr: false,
// });
// const PageLoader = dynamic(() => import("@/components/PageLoader"), {
//   ssr: false,
// });
const inter = Inter({ weight: "400", subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isDashboard = router.pathname.startsWith("/dashboard");
  const Layout = isDashboard ? DashboardLayout : MainLayout;
  useEffect(() => {
    initGA(); // Google Analytics başlat
    logPageView(window.location.pathname);

    // Sayfa değiştikçe görüntüleme event'ini kaydet
    router.events.on("routeChangeComplete", logPageView);

    return () => {
      router.events.off("routeChangeComplete", logPageView);
    };
  }, [router.events]);
  return (
    <>
      <Head>
        <title>Asgofy Blog - Latest Guides, Tips & Articles</title>
        <meta
          name="description"
          content="Discover the latest blog posts, expert guides, and insightful tips on Asgofy. Stay updated with digital trends, tech news, and valuable content."
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
            <PageLoader />
            <Layout>
              <Component {...pageProps} />
            </Layout>

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
          </ThemeProvider>
        </AuthContextProvider>
      </PostProvider>
    </>
  );
}

export default MyApp;
