// auth.js
import firebase, { getApp, getApps } from "firebase/app";
import "firebase/auth";
import "firebase/analytics"; // Firebase Analytics'ı içe aktarın
// import firebaseConfig from "./firebaseConfig"; // Firebase yapılandırma bilgilerini içeren dosya
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "@firebase/firestore";
import toast from "react-hot-toast";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
let app
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // Zaten mevcut olan uygulamayı al
}
// const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// export const getStories = async () => {
//   const storiesSnapshot = await getDocs(collection(db, "stories"));
//   const stories = storiesSnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
//   return stories;
// };

export const register = async (email, password, displayName) => {
  const auth = getAuth(app);
  const usersCollection = collection(db, "users");
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Kullanıcı adını güncelleme
    await updateProfile(user, {
      displayName: displayName,
    });
    // Firestore'da kullanıcı bilgilerini ekleyin
    await addDoc(usersCollection, {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      // Diğer kullanıcı bilgilerini ekleyebilirsiniz
    });
    return user;
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "This email address is already in use.";
    } else {
      errorMessage = error.message;
    }
    toast.error(`Error: ${errorMessage}`);
  }
};
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    //  toast.success("Sign in successful");
    return user;
  } catch (error) {
    //  toast.error("Login failed. Please check your email and password.");
    toast.error(`Error: Invalid credentials.`);
  }
};
export const logout = async () => {
  await signOut(auth)
    .then(() => {
      toast.success("Logged out");
    })
    .catch(() => {
      toast.error("Logout failed. Please try again.");
    });
};
export const forgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success(
      "Password reset email has been sent! Please check your email address."
    );
    // Başarılı bir şekilde e-posta gönderildiğini kullanıcıya bildirin
  } catch (error) {
    toast.error("Password reset error:", error);

    // Hata durumunda kullanıcıya uygun bir geri bildirim sağlayın
  }
};
export const emailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    //  toast.success(
    //    `${auth.currentUser.email} confirmation e-mail sent to your address`
    //  );
  } catch (error) {
    //  toast.error(error.message);
  }
};
export const update = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
    //  toast.success("Profile Updated");
    return true;
  } catch (error) {
    //  toast.error(error.message);
  }
};
export const reAuth = async (password) => {
  try {
    const credential = await EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );
    const { user } = await reauthenticateWithCredential(
      auth.currentUser,
      credential
    );
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export default app;
