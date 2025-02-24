import Link from "next/link";
import AdBanner from "./Ads/AdBanner";
import Newsletter from "./Newsletter";

export default function Sidebar({ categories }) {

  return (
    <aside className="lg:w-1/3 w-full lg:pl-6 mt-6 lg:mt-0">
      <Newsletter />

      {/* Topics - Kategoriler */}
      <div className="bg-gray-100 dark:text-white dark:bg-[#333333] p-4 rounded-lg mb-4">
        <h2 className="text-xl font-bold mb-2">Topics</h2>
        <ul className="space-y-2">
          {categories?.map((cat) => (
            <Link href={`/categories/${cat?.slug?.current}`}>
              <li className="pb-2 hover:opacity-50 hover:text-gray-200 transition duration-300">📌 {cat?.title}</li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Advertisement - Reklam Alanı */}
      {/* <div className="bg-gray-300 p-4 rounded-lg text-center">
        <h2 className="text-xl font-bold">Advertisement</h2>
        
      </div> */}
      <AdBanner />
    </aside>
  );
}
