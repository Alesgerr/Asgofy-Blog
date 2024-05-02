import React from "react";
import { urlForImage } from "../../sanity/lib/image";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";

const BodyDescription = ({ body, title, table }) => {
  // Önceki başlık kontrolü için bir değişken tanımlayalım
  let previousHeading = "";
  console.log(body);
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
                      <Link
                        href={subtitle?.product?.slug?.current}
                        className="text-black dark:text-gray-200 underline my-1 hover:underline text-sm"
                      >
                        {subtitle?.subtitle || subtitle?.product?.title}
                      </Link>
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

        if (block._type === "block") {
          // Eğer blok bir başlık ise ve önceki başlık ile aynı değilse, ekrana yaz
          if (
            block.style === "h2" &&
            block.children[0].text !== previousHeading
          ) {
            previousHeading = block.children[0].text; // Önceki başlığı güncelle
            return (
              <div key={key} className="my-5">
                {/* <h2 className="font-bold text-xl mb-3">
                  {block?.children[0].text}
                </h2> */}
                {/* <h2 className="flex text-lg">
                  {block?.markDefs?.map((item, index) => {
                    if (
                      block?.markDefs?.some((mark) => mark?._type === "link")
                    ) {
                      const linkMark = block?.markDefs?.find(
                        (mark) => mark._type === "link"
                      );
                      const link = linkMark.href;
                      return (
                        <a key={`${key}-${index}`} href={link}>
                          {block.children?.map((item) => (
                            <span>{item?.text}</span>
                          ))}
                        </a>
                      );
                    }
                  })}
                </h2> */}
                {/* <h2 className="font-semibold text-xl flex">
                  {block?.children?.map((item, index) => {
                    if (
                      block?.markDefs?.find((mark) => mark._type === "link")
                    ) {
                      const linkMark = block?.markDefs?.find(
                        (mark) => mark._type === "link"
                      );
                      const link = linkMark.href;
                      return (
                        <a key={index} href={link}>
                          <span className="font-bold underline">
                            {item.text}
                          </span>
                        </a>
                      );
                    } else {
                      return (
                        <>
                          <span key={index} className="font-bold text-xl flex">
                            {item?.text}
                          </span>
                        </>
                      );
                    }
                  })}
                </h2> */}
                <h2 className="font-semibold text-xl flex">
                  {block?.children?.map((item, index) => {
                    const linkMark = block?.markDefs?.find(
                      (mark) => mark._type === "link"
                    );
                    const link = linkMark ? linkMark.href : null;
                    return link ? (
                      <a key={index} href={link}>
                        <span className="font-bold underline">{item.text}</span>
                      </a>
                    ) : (
                      <span key={index} className="font-bold text-xl flex">
                        {item.text}
                      </span>
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
                <h3 className="font-semibold text-md mb-2">
                  {block.children[0].text}
                </h3>
              </div>
            );
          } else if (block.style === "h4") {
            return (
              <div key={key} className="my-5">
                <h4 className="font-semibold text-md mb-2">
                  {block?.children?.map((item, i) => (
                    <span className="font-medium" key={i}>
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
                          {block.children?.map((child, i) => (
                            <span className="underline" key={i}>
                              {child?.text}
                            </span>
                          ))}
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
                        className="font-semibold text-xl flex"
                        key={`${key}-${index}`}
                      >
                        <span key={index}>{item?.text}</span>
                      </h5>
                    );
                  }
                })}
              </>
            );
          } else if (block._type == "link") {
            {
              block?.children?.map((span) => {
                const markDefs = span?.markDefs;
                if (markDefs?.some((mark) => mark._type === "link")) {
                  const link = span.marks.find(
                    (mark) => mark._type === "link"
                  ).href;
                  return (
                    <a key={`${key}-${spanIndex}`} href={link}>
                      {span?.text}
                    </a>
                  );
                }
              });
            }
          } else if (block.style === "h4") {
            return (
              <div key={key} className="my-5">
                <h3 className="font-semibold text-md mb-2">
                  {block.children[0].text}
                </h3>
              </div>
            );
          }
          // Eğer blok bir sıralı liste (list item) ise
          else if (block.listItem === "bullet") {
            return (
              <div key={key} className="my-5">
                <ul
                  className="pl-5 body-content"
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  {block.children.map((listItem, listItemIndex) => {
                    console.log(listItem);
                    return (
                      <li
                        key={listItemIndex}
                        className={`list-disc-first ${listItemIndex !== 0 ? "inline-block" : ""} ${listItem?.marks[0] === "strong" ? "font-bold" : ""}`}
                        style={{ marginRight: "10px", marginBottom: "10px" }} // İstenirse bir boşluk eklenebilir
                      >
                        {listItem.text}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          }
          // Eğer blok bir metin içeriği ise
          else {
            return (
              <div key={key} className="my-5">
                {block.children.map((span, spanIndex) => {
                  return <span key={`${key}-${spanIndex}`}>{span?.text}</span>;
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
