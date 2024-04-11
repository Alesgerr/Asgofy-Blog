import React from "react";

const WithAd = (Component) => {
  return (
    <div>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6953220018369928"
        crossorigin="anonymous"
      ></script>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-6953220018369928"
        data-ad-slot="6064022843"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      <Component />
    </div>
  );
};

export default WithAd;