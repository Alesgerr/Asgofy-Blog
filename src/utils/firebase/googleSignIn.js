// // GoogleSignIn.js
// "use client";
// import React, { useEffect, useState } from "react";
// import auth from "./auth";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// const GoogleSignIn = () => {
//   const [value, setVaule] = useState();

//   const handleSignIn = async () => {
//     try {
//       const provider = new GoogleAuthProvider(); // GoogleAuthProvider'ı oluşturun
//       const result = await signInWithPopup(auth, provider); // signInWithPopup ile Google ile oturum açma işlemini gerçekleştirin
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken; // Erişim belirteci
//       const user = result.user; // Kullanıcı bilgisi
//       console.log("Successfully signed in with Google:", user);
//     } catch (error) {
//       console.error("Google sign-in error:", error);
//     }
//   };
//   console.log(value);
//   useEffect(() => {
//     // handleSignIn();
//   }, []);
//   return <button onClick={handleSignIn}>Sign in with Google</button>;
// };

// export default GoogleSignIn;
