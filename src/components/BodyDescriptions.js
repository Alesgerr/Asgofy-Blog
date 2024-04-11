import React from "react";
import { urlForImage } from "../../sanity/lib/image";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";

const BodyDescription = ({ body, title }) => {
  // Önceki başlık kontrolü için bir değişken tanımlayalım
  let previousHeading = "";
  return (
    <div>
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
                <h2 className="font-bold text-xl flex">
                  {block?.children?.map((item) => {
                    if (
                      block?.markDefs?.find((mark) => mark._type === "link")
                    ) {
                      const linkMark = block?.markDefs?.find(
                        (mark) => mark._type === "link"
                      );
                      const link = linkMark.href;
                      return (
                        <a key={`${key}-${index}`} href={link}>
                            <span className="font-extrabold underline">{item.text}</span>
                        </a>
                      );
                    } else {
                      return (
                        <span className="font-extrabold text-xl flex">
                          {item.text}
                        </span>
                      );
                    }
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
                <h3 className="font-bold text-md mb-2">
                  {block.children[0].text}
                </h3>
              </div>
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
          }
          else if(block.style === "h4"){
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
                <ul className="list-disc pl-5">
                  {block.children.map((listItem, listItemIndex) => (
                    <li key={`${key}-${listItemIndex}`}>{listItem.text}</li>
                  ))}
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
