import React from "react";
import { urlForImage } from "../../sanity/lib/image";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import { GoLinkExternal } from "react-icons/go";

const BodyDescription = ({ body, title, table }) => {
  let previousHeading = "";
  
  return (
    <div>
      {table && (
        <div className="overflow-x-auto bg-gray-300 dark:bg-zinc-900 rounded-md">
          <ul className="divide-y divide-gray-200 p-3">
            {table?.map((row, index) => (
              <li key={index} className="py-4">
                <h3 className="text-lg font-semibold">{row?.mainTitle}</h3>
                <ul className="mt-2">
                  {row?.subtitles?.map((subtitle, subIndex) => (
                    <li key={subIndex} className="flex items-center">
                      <span className="mr-2">{subIndex + 1}.</span>
                      {subtitle?.product ? (
                        <Link
                          href={subtitle?.product?.slug?.current}
                          className="text-black dark:text-gray-200 underline my-1 hover:underline text-sm"
                        >
                          {subtitle?.subtitle || subtitle?.product?.title}
                        </Link>
                      ) : (
                        <Link
                          href={`#${subtitle?.id}`}
                          className="text-black dark:text-gray-200 my-1 hover:underline text-sm"
                        >
                          {subtitle?.subtitle}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
      {body?.map((block, index) => {
        let key = `${block._type}-${index}`;
        {
          /* const key = block ? `${block._type}-${index}` : index; */
        }
        if (block._type === "block") {
          // Eğer blok bir başlık ise ve önceki başlık ile aynı değilse, ekrana yaz
          if (
            block.style === "h2" &&
            block.children[0].text !== previousHeading
          ) {
            previousHeading = block.children[0].text; // Önceki başlığı güncelle
            return (
              <div key={key} className="my-5">
                <h2 className="font-bold text-xl dark:text-white">
                  {block?.children?.map((item, index) => {
                    const linkMark = block?.markDefs?.find(
                      (mark) => mark._type === "link"
                    );
                    const link = linkMark ? linkMark.href : null;

                    return link ? (
                      <Link
                        key={index}
                        href={link}
                        className="font-bold underline"
                      >
                        {item?.text}
                      </Link>
                    ) : (
                      <React.Fragment key={index}>{item.text}</React.Fragment>
                    );
                  })}
                </h2>
              </div>
            );
          }
          // Eğer blok bir başlık ise ve önceki başlık ile aynıysa, hiçbir şey yapma
          else if (
            block.style === "h2" &&
            block.children[0].text === previousHeading
          ) {
            return null;
          }
          // Eğer blok bir alt başlık ise
          else if (block.style === "h3") {
            return (
              <div key={key} className="my-5">
                <h3 className="font-semibold tracking-wide text-md mb-2 text-gray-900 dark:text-gray-100">
                  {block?.children[0]?.text}
                </h3>
              </div>
            );
          } else if (block.style === "h4") {
            return (
              <div key={key} className="my-5">
                <h4 className="font-semibold text-md mb-2">
                  {block?.children?.map((item, i) => (
                    <span className="font-semibold tracking-wide" key={i}>
                      {item?.text}
                    </span>
                  ))}
                </h4>
              </div>
            );
          } else if (block.style === "h5") {
            return (
              <>
                {block?.markDefs?.map((item, index) => {
                  if (item._type === "link") {
                    const link = item.href;
                    return (
                      <h5 className="flex text-lg" key={`${key}-${index}`}>
                        <Link href={link}>
                          {block.children?.map((child, i) => {
                            return (
                              <span className="underline tracking-wide" key={i}>
                                {child?.text}
                              </span>
                            );
                          })}
                        </Link>
                      </h5>
                    );
                  }
                })}
                {block?.children?.map((item, index) => {
                  const linkMark = block?.markDefs?.find(
                    (mark) => mark._type === "link"
                  );
                  if (!linkMark) {
                    return (
                      <h5
                        className="font-semibold text-md flex"
                        key={`${key}-${index}`}
                      >
                        <span
                          className={`${item?.marks[0] === "strong" ? "font-semibold" : ""}`}
                          key={index}
                        >
                          {item?.text}
                        </span>
                      </h5>
                    );
                  }
                })}
              </>
            );
          } else if (block._type === "link") {
            return block?.children?.map((span, spanIndex) => {
              
              const markDefs = span?.markDefs;
              if (markDefs?.some((mark) => mark._type === "link")) {
                const link = span.marks.find(
                  (mark) => mark._type === "link"
                ).href;
                return (
                  <Link key={`${key}-${spanIndex}`} href={link}>
                    {span?.text}
                  </Link>
                );
              }
              return null; // Eğer link yoksa, null döndürüyoruz
            });
          }

          // Eğer blok bir sıralı liste (list item) ise
          else if (block.listItem === "bullet") {
            const level = block.level;
            return (
              <>
                {level === 1 ? (
                  <div key={key} className="my-5">
                    <ul
                      className="pl-5 body-content marker:text-indigo-600 flex flex-wrap"
                      // style={{ display: "flex", flexWrap: "wrap" }}
                    >
                      <li>
                        {block.children.map((listItem, listItemIndex) => {
                          return (
                            <span
                              key={listItemIndex}
                              className={`list-disc-first tracking-wide ${listItemIndex !== 0 ? "" : ""} ${listItem?.marks[0] === "strong" ? "font-bold" : "dark:text-gray-400"}`}
                            >
                              {listItem.text}
                            </span>
                          );
                        })}
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div key={key} className="my-5">
                    <ul
                      className="pl-5 ml-3 second_ul marker:text-red-600 flex flex-wrap"
                      // style={{ display: "flex", flexWrap: "wrap" }}
                    >
                      <li>
                        {block.children.map((listItem, listItemIndex) => {
                          return (
                            <span
                              key={listItemIndex}
                              className={`tracking-wide ${listItemIndex !== 0 ? "" : ""} ${listItem?.marks[0] === "strong" ? "font-bold" : ""}`}
                            >
                              {listItem.text}
                            </span>
                          );
                        })}
                      </li>
                    </ul>
                  </div>
                )}
              </>
            );
          } else if (block.listItem === "number") {
            return (
              <div key={key} className="my-5">
                <ol
                  className="pl-5 body-content flex flex-wrap"
                  // style={{ display: "flex", flexWrap: "wrap" }}
                >
                  <li>
                    {block.children.map((listItem, listItemIndex) => {
                      return (
                        <span
                          key={listItemIndex}
                          className={`list-disc-first list-disc tracking-wide ${listItemIndex !== 0 ? "" : ""} ${listItem?.marks[0] === "strong" ? "font-semibold" : ""}`}
                        >
                          {listItem.text}
                        </span>
                      );
                    })}
                  </li>
                </ol>
              </div>
            );
          }
          // Eğer blok bir metin içeriği ise
          else {
            return (
              <div key={key} className="my-5">
                {block.children.map((span, spanIndex) => {
                  const isStrong = span?.marks?.some(
                    (mark) => mark === "strong"
                  );

                  // block içindeki markDefs'lerde link olup olmadığını kontrol et
                  const linkMark = block?.markDefs?.find(
                    (mark) => mark._type === "link"
                  );
                  if (linkMark && span.marks.includes(linkMark._key)) {
                    return (
                      <Link href={linkMark?.href} key={`${key}-${spanIndex}`}>
                        <div className="underline text-indigo-600 tracking-wide inline-flex items-center">
                          {span?.text}
                          <span className="mx-2">
                            <GoLinkExternal />
                          </span>
                        </div>
                      </Link>
                    );
                  }

                  return (
                    <span
                      className={`tracking-wide ${isStrong ? "font-bold" : ""}`}
                      key={`${key}-${spanIndex}`}
                    >
                      {span?.text}
                    </span>
                  );
                })}
              </div>
            );
          }
        } else if (block._type === "image") {
          const image = urlForImage(block);

          return (
            <div key={key} className="my-5">
              <Image
                src={image}
                alt={title}
                className="rounded-md object-cover"
                width={1000}
                height={100}
                priority
              />
            </div>
          );
        } else {
          return null; // Diğer blok tipleri için null döndür
        }
      })}
    </div>
  );
};
export default BodyDescription;
