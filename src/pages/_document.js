// _document.js

import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
    return (
      <Html lang="en">
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GTM_ID}', {
                page_path: window.location.pathname
              });
              `,
            }}
          ></script>
          <script
            data-name="BMC-Widget"
            data-cfasync="false"
            src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
            data-id="Alesger"
            data-description="Support me on Buy me a coffee!"
            data-message="Enjoying my blog? Support it with a coffee's price on Buy Me a Coffee! Your help keeps new content coming. Thanks in advance!"
            data-color="#5F7FFF"
            data-position="Right"
            data-x_margin="5"
            data-y_margin="5"
            async // Asenkron olarak yükleme
          ></script>
          {/* <Script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date());

              gtag('config', 'G-JLL3BBVNRL');
            `}
          </Script> */}
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4424970427520359"
            crossorigin="anonymous"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
