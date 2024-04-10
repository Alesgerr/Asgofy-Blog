// import { useAuth } from "@/context/authContext";
// import React, { useState, useEffect } from "react";

// const ResetPassword = () => {
//   const { reAuth } = useAuth(); // AuthContext'teki reAuth fonksiyonunu alın
//   const [modalOpen, setModalOpen] = useState(false); // Modal durumunu saklayan state

//   const handleResetPassword = async (password) => {
//     try {
//       // Parolayı yeniden doğrulama işlemine gönder
//       const user = await reAuth(password);
//       console.log("User re-authenticated:", user);
//     } catch (error) {
//       // Hata: AuthContext'ten gelen hatayı kontrol et
//       if (error.code === "auth/requires-recent-login") {
//         // Hatayı işle: Modal durumunu güncelle
//         setModalOpen(true);
//       } else {
//         // Diğer hatalar: Kullanıcıya bildirin veya loglayın
//         console.error("An error occurred:", error.message);
//       }
//     }
//   };

//   useEffect(() => {
//     // Modal kapatma işlemi
//     const closeModal = () => {
//       setModalOpen(false);
//     };

//     // Modal kapatma işlemi dinleyicisini ekleyin
//     window.addEventListener("click", closeModal);

//     // Listener'ı temizleme
//     return () => {
//       window.removeEventListener("click", closeModal);
//     };
//   }, []);

//   return (
//     <div>
//       {/* Parola sıfırlama bileşeni */}
//       <input
//         type="password"
//         placeholder="Enter your password"
//         // Kullanıcı parolasını girme işlevselliği burada olacak
//       />
//       <button onClick={handleResetPassword}>Reset Password</button>

//       {/* Modal bileşeni */}
//       {modalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={() => setModalOpen(false)}>
//               &times;
//             </span>
//             <p>You need to re-authenticate to perform this action.</p>
//             {/* Kullanıcıyı yeniden oturum açmaya yönlendirme veya başka bir eylem */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResetPassword;
