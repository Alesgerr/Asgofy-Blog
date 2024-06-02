// import { useEffect } from "react";

// const BuymeacoffeeWidget = () => {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
//     script.setAttribute("data-name", "BMC-Widget");
//     script.setAttribute("data-cfasync", "false");
//     script.setAttribute("data-id", "Alesger");
//     script.setAttribute("data-description", "Support me on Buy me a coffee!");
//     script.setAttribute(
//       "data-message",
//       "Time for a coffee break! If you enjoy the content on my blog and would like to support it, you can send your support for the price of a cup of coffee via Buymeacoffee. This is a great way to help keep new content and updates coming. Thank you in advance!"
//     );
//     script.setAttribute("data-color", "#5F7FFF");
//     script.setAttribute("data-position", "Right");
//     script.setAttribute("data-x_margin", "18");
//     script.setAttribute("data-y_margin", "18");

//     // Append the script to the body
//     document.body.appendChild(script);

//     // Clean up function
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return null; // Bileşen bir şey render etmeyecek
// };

// export default BuymeacoffeeWidget;
