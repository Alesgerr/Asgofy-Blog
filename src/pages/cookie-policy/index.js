import Head from "next/head";

const CookiesPage = () => {
  return (
    <div className="py-16">
      <Head>
        <title>Cookie Policy | Asgofy</title>
        <meta
          name="description"
          content={`Cookie Policy for ${process.env.NEXT_PUBLIC_BASE_URL}`}
        />
      </Head>
      <div className="max-w-2xl mx-auto mt-8 p-8 rounded shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Cookie Policy</h1>
        <p className="mb-4">
          Our website uses cookies to ensure you get the best experience on our
          website. By continuing to use our website, you accept our use of
          cookies.
        </p>
        <h2 className="text-lg font-bold mb-2">What Are Cookies</h2>
        <p className="mb-4">Cookies are small</p>
        <h2 className="text-lg font-bold mb-2">How We Use Cookies</h2>
        <p className="mb-4">
          We use cookies for a variety of purposes, including to provide and
          improve our services, to analyze traffic, and to personalize content.
          By using our website, you agree to the use of cookies in accordance
          with our Cookie Policy.
        </p>
        <h2 className="text-lg font-bold mb-2">Types of Cookies We Use</h2>
        <p className="mb-4">
          There are several different types of cookies, including:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>
            Essential cookies: These are necessary for the website to function
            properly.
          </li>
          <li>
            Analytics cookies: These help us understand how visitors interact
            with our website by collecting and reporting information
            anonymously.
          </li>
          <li>
            Marketing cookies: These are used to track visitors across websites
            with the intention of displaying ads that are relevant and engaging
            for the individual user.
          </li>
        </ul>
        <h2 className="text-lg font-bold mb-2">
          Your Choices Regarding Cookies
        </h2>
        <p className="mb-4">
          You can choose to accept or decline cookies. Most web browsers
          automatically accept cookies, but you can usually modify your browser
          setting to decline cookies if you prefer. However, this may prevent
          you from taking full advantage of the website.
        </p>
        <h2 className="text-lg font-bold mb-2">More Information</h2>
        <p className="mb-4">
          For more information about cookies, you can visit{" "}
          <a href="https://www.allaboutcookies.org/">All About Cookies</a>.
        </p>
      </div>
    </div>
  );
};

export default CookiesPage;
