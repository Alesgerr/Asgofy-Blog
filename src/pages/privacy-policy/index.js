import React from 'react'
import Head from "next/head";


const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | Asgofy</title>
        <meta
          name="description"
          content={`Privacy Policy for ${process?.env?.NEXT_PUBLIC_BASE_URL}`}
        />
      </Head>
      <div className="max-w-2xl mx-auto mt-8 p-8 rounded shadow-md">
        <h1 className="text-xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          This website does not store personal data of visitors and collects and
          uses. This data is used to improve user experience, content and
          personalize advertisements and analyze the performance of the website
          may be used for.
        </p>
        <p className="mb-4">
          Links to third-party sites may lead to this web is beyond the control
          of the site. When you follow these links, the relevant the site{"'"}s own
          privacy policies will apply.
        </p>
        <p className="mb-4">
          This website uses cookies. Cookies are used to save visitors{"'"}
          preferences and to is used to monitor the performance of the website.
          Accept the use of cookies You can adjust your browser settings to
          allow or refuse.
        </p>
        <p className="mb-4">
          The security of user data is important to us. Protecting your data we
          take safety precautions in line with industry standards.
        </p>
        <p className="mb-4">
          This privacy policy may be updated from time to time. About changes
          Please check this page regularly to stay informed.
        </p>
        <p className="mb-4">
          If you have any questions or concerns regarding the privacy policy,
          please contact us at{" "}
          <a href="mailto:asgofy@gmail.com">asgofy@gmail.com</a>.
        </p>
      </div>
    </>
  );
}

export default PrivacyPolicy;



