import { usePostContext } from "@/context/PostContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaRegSadCry } from "react-icons/fa";

const SearchMenu = ({ isModalOpen, setIsModalOpen, handleModalClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState();
  const { latestProducts, loading } = usePostContext();

  const [loadings, setLoadings] = useState(true);

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    // Arama yap
    const results = latestProducts.filter((product) =>
      product?.title.toLowerCase().includes(query.toLowerCase())
    );
    // Eğer sonuç bulunamazsa
    if (results.length === 0) {
      setLoadings(false);
      setSearchResults(results);
      // Kullanıcıya bir bildirim göster
      setSearchMessage("No results found for the searched term.");
    } else {
      // Sonuç bulunduysa
      setLoadings(false);
      setSearchResults(results);
      setSearchMessage(""); // Bildirimi temizle
    }
    setLoadings(false);
    setSearchResults(results);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Modalı kapat
    setIsModalOpen(false);
  };
  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-black p-4 max-w-[380px] sm:max-w-[500px] rounded-lg">
            <form
              onSubmit={handleSearchSubmit}
              className="flex justify-between"
            >
              <div className="relative flex-1 mr-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  placeholder="Make a call..."
                  className="border dark:border-none outline-none w-full p-2 rounded-md mr-2"
                />
                <span className="absolute top-[25%] right-2">
                  <CiSearch size={22} />
                </span>
              </div>
              <button
                onClick={handleModalClose}
                className="bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-md transition duration-300"
              >
                Cancel
              </button>
            </form>
            <div className="mt-4">
              {searchResults?.slice(0, 5)?.map((result, index) => (
                <div key={index}>
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <Link href={`/blog/${result?.slug}`}>
                      <div
                        key={result.id}
                        onClick={handleModalClose}
                        className="mb-2 flex items-center"
                      >
                        <Image
                          src={result?.imageUrl}
                          width={100}
                          height={100}
                          priority
                          className="w-10 h-10 mr-3 rounded-md"
                          alt="post_image"
                        />
                        <h3 className="text-[12px] sm:text-sm font-semibold">
                          {result?.title}
                        </h3>
                        {/* <p className="text-sm text-gray-600">{result.}</p> */}
                      </div>
                    </Link>
                  )}
                </div>
              ))}
              {searchMessage && (
                <div className="flex justify-between items-center">
                  <FaRegSadCry size={22} className="mr-5" />
                  {searchMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchMenu;
