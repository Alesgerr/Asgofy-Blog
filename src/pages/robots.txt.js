// /pages/robots.txt.js

const generateRobotsTxt = () => {
  // Burada dinamik olarak oluşturmak istediğiniz robots.txt içeriğini hazırlayabilirsiniz.
  const disallow = ["/dashboard"]; // Örnek olarak, /admin ve /secret-page sayfalarını engelliyoruz.
  // Sitemap URL'si
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const sitemap = `${baseUrl}/sitemap.xml`;
  return `
    User-agent: *
    Disallow: ${disallow.join("\n    Disallow: ")}
    Sitemap: ${sitemap}
  `;
};

const RobotsTxt = () => null;

export const getServerSideProps = async ({ res }) => {
  const robotsTxt = generateRobotsTxt();

  res.setHeader("Content-Type", "text/plain");
  res.write(robotsTxt);
  res.end();

  return {
    props: {},
  };
};

export default RobotsTxt;
