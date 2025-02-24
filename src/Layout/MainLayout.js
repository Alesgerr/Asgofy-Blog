import Header from "@/components/Header/Header";
import { Footer } from "@/components/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}
