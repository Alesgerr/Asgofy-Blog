import ReactGA from "react-ga4";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const initGA = () => {
  ReactGA.initialize(GTM_ID); // Buraya kendi Google Analytics ID'ni ekle
};

export const logPageView = (url) => {
  ReactGA.send({ hitType: "pageview", page: url });
};
