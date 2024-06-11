import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePostContext } from "@/context/PostContext";
import { Skeleton } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { FaLongArrowAltRight } from "react-icons/fa";
const LatestBlogPosts = ({ latestProducts }) => {
  const { loadingGetPosts } = usePostContext();
  const [page, setPage] = useState(1); // Başlangıçta varsayılan olarak ilk sayfa
  const itemsPerPage = 10; // Sayfa başına gösterilecek öğe sayısı
  // Anlık sayfa numarasına bağlı olarak görüntülenecek makaleleri hesaplar
  const startIndex = (page - 1) * itemsPerPage;
  const visibleArticles = latestProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  // Toplam sayfa sayısını hesaplar
  const totalPages = Math.ceil(latestProducts.length / itemsPerPage);

  // Sayfa değiştirme işlevi
  const handleChange = (event, value) => {
    setPage(value); // Sayfa değiştiğinde sayfa numarasını güncelle

    // Sayfanın belirli bir yere kaydırılması için bir referans alınabilir.
    // Örneğin, bir bileşenin referansı alınabilir ve bu bileşenin yüksekliği kullanılabilir.
    const targetRef = document.getElementById("targetElement"); // Kaydırılacak hedef bileşenin id'si

    // Eğer hedef bileşen varsa ve yüksekliği alınabiliyorsa, sayfa bu yüksekliğe kaydırılır.
    if (targetRef) {
      const targetPosition = targetRef.offsetTop; // Hedef bileşenin sayfanın başlangıcından itibaren yüksekliği
      window.scrollTo({ top: targetPosition, behavior: "smooth" }); // Hedef bileşenin bulunduğu yere kaydır
    }
  };
  return (
    <div
      id="targetElement"
      className="latest_posts rounded-md md:p-3 py-5 bg-white md:dark:bg-gray-950 dark:bg-black md:shadow-md"
    >
      <h2 className="text-lg text-gray-900 dark:text-white mb-5">
        Recent <span className=" text-indigo-600 font-bold">Posts</span>
      </h2>
      {latestProducts && (
        <div>
          <div>
            {visibleArticles?.map((item, i) => (
              <div
                key={i}
                className={`grid md:grid-cols-2 ${i !== visibleArticles.length - 1 ? "border-b-2" : ""} dark:border-gray-900 gap-2 mb-5`}
              >
                <div
                  className={`md:order-2 md:flex md:items-center ${loadingGetPosts ? "" : "justify-between"} md:justify-end`}
                >
                  <Link rel="preload" href={`/blog/${item?.slug}`}>
                    {loadingGetPosts ? (
                      <>
                        <div className="hidden md:block">
                          <Skeleton
                            variant="rectangular"
                            width={150}
                            height={100}
                            className="dark:bg-gray-800 rounded-md"
                          />
                        </div>
                        <div className="md:hidden">
                          <Skeleton
                            variant="rectangular"
                            width={350}
                            height={250}
                            className="dark:bg-gray-800 rounded-md"
                          />
                        </div>
                      </>
                    ) : (
                      <Image
                        className="w-full md:w-32 md:h-32 object-cover rounded-md mb-3"
                        width={350} // Set appropriate width and height
                        height={100}
                        // priority
                        src={item?.imageUrl}
                        alt={item?.title}
                      />
                    )}
                  </Link>
                </div>
                <div className="md:order-1 flex-1">
                  <Link href={`/blog/${item.slug}`}>
                    <div className="mb-3">
                      <span className="text-sm">
                        {/* <PostPublishedDate
                                  publishedAt={item?.publishedAt}
                                /> */}
                      </span>
                      {/* <span className="pr-1">,</span> */}
                      {loadingGetPosts ? (
                        <Skeleton
                          variant="rectangular"
                          width={100}
                          height={30}
                          className="dark:bg-gray-800 rounded-md"
                        />
                      ) : (
                        <span className="text-sm">{item?.timeAgo}</span>
                      )}
                    </div>
                    {loadingGetPosts ? (
                      <Skeleton
                        variant="rectangular"
                        width={200}
                        height={50}
                        className="dark:bg-gray-800 rounded-md"
                      />
                    ) : (
                      <h2 className="sm:text-lg mb-4 font-semibold">
                        {item?.title}
                      </h2>
                    )}

                    <div className="mb-4 mt-4">
                      {/* <Link
                              href={`/categories/${item?.categories[0]?.slug?.current}`}
                            >
                              <span className="bg-gray-200 dark:bg-white rounded-md p-2 px-3 text-black">
                                {item?.categories[0]?.title}
                              </span>
                            </Link> */}
                      {loadingGetPosts ? (
                        <Skeleton
                          variant="rectangular"
                          width={130}
                          height={30}
                          className="dark:bg-gray-800 rounded-md"
                        />
                      ) : (
                        <span className="text-black flex items-center dark:text-gray-300 dark:hover:text-white">
                          <FaLongArrowAltRight className="mr-1 text-indigo-600 hover:text-black duration-200" />
                          Read More
                        </span>
                      )}
                    </div>
                  </Link>
                  {/* <p className="text-sm mb-5">
                          {item?.description.length > 100
                            ? item?.description.slice(0, 120) + "..."
                            : item?.description}
                        </p> */}
                </div>
              </div>
            ))}
            {visibleArticles && (
              <Stack spacing={2}>
                <Pagination
                  count={totalPages} // Toplam sayfa sayısı
                  page={page} // Şu anki sayfa
                  onChange={handleChange} // Sayfa değiştiğinde çalışacak fonksiyon
                  color="standard" // Sayfa numaralarının rengi
                  size="large" // Büyük boyut
                  className="rounded-md"
                />
              </Stack>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default LatestBlogPosts;
