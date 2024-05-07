import React from "react";
import { FaArrowDown } from "react-icons/fa";
const Faq = (faq) => {
  return (
    <div className="mx-auto min-h-sceen">
      {faq?.faqs?.length > 0 && (
        <>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold dark:text-white transition-all">
              FAQ
            </h2>
            <p className="text-neutral-500 text-sm mt-3">
              Frequenty asked questions
            </p>
          </div>
          <div className="grid divide-y divide-neutral-200 mx-auto">
            {faq?.faqs?.map((item, i) => (
              <div key={i} className="py-5">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                    <span>{item?.question}</span>
                    <span className="transition group-open:rotate-180">
                      <FaArrowDown />
                    </span>
                  </summary>
                  <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                    {item?.answer}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Faq;
