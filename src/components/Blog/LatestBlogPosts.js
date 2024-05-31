import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePostContext } from "@/context/PostContext";
import { Skeleton } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const LatestBlogPosts = ({ latestProducts }) => {
  const { loading } = usePostContext();
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
    <>
      <div
        id="targetElement"
        className="popular_categories rounded-md p-3 py-5 bg-white md:dark:bg-gray-950 dark:bg-black md:shadow-md"
      >
        {latestProducts && (
          <h2 className="text-lg text-gray-900 dark:text-white leading-[3.25rem] mb-5">
            Recent <span className=" text-indigo-600 font-bold">Posts</span>
          </h2>
        )}
        <div>
          {loading ? (
            <div className="grid md:grid-cols-2 overflow-hidden">
              <div className="md:order-2 flex md:justify-end">
                <span className="loader"></span>
              </div>
            </div>
          ) : (
            <div>
              {visibleArticles?.map((item, i) => (
                <div
                  key={i}
                  className={`grid md:grid-cols-2 ${i !== visibleArticles.length - 1 ? "border-b-2" : ""} dark:border-gray-900 gap-2 mb-5`}
                >
                  <div className="md:order-2 flex items-center justify-center md:justify-end">
                    <Link rel="preload" href={`/blog/${item?.slug}`}>
                      <Image
                        className="w-full md:w-32 h-80 md:h-32 object-cover rounded-md mb-3"
                        width={250} // Set appropriate width and height
                        height={100}
                        // priority
                        src={item?.imageUrl}
                        alt={item?.title}
                      />
                    </Link>
                  </div>
                  <div className="md:order-1 flex-1">
                    <Link href={`/blog/${item.slug}`}>
                      <div className="mb-3">
                        {loading ? (
                          <div>Loading...</div>
                        ) : (
                          <span className="text-sm">
                            {/* <PostPublishedDate
                                  publishedAt={item?.publishedAt}
                                /> */}
                          </span>
                        )}

                        {/* <span className="pr-1">,</span> */}
                        <span className="text-sm">{item?.timeAgo}</span>
                      </div>
                      <h2 className="sm:text-lg mb-4 font-semibold">
                        {item?.title}
                      </h2>
                      <div className="mb-4">
                        {/* <Link
                              href={`/categories/${item?.categories[0]?.slug?.current}`}
                            >
                              <span className="bg-gray-200 dark:bg-white rounded-md p-2 px-3 text-black">
                                {item?.categories[0]?.title}
                              </span>
                            </Link> */}
                        <span className="text-black dark:text-gray-300 dark:hover:text-white">
                          Read More
                        </span>
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
          )}
        </div>
      </div>
    </>
  );
};
export default LatestBlogPosts;
