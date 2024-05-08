"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithPopup,
  signOut,
  updatePassword,
} from "firebase/auth";
import { auth } from "@/utils/firebase/auth";
import { useRouter } from "next/navigation";

// Oturum durumu için bir Context oluşturun
const AuthContext = createContext();

// Oturum durumu ile ilgili işlevleri içeren bir bileşen oluşturun
export const useAuth = () => {
  return useContext(AuthContext);
};
// AuthContextProvider bileşeni, alt bileşenlere oturum durumu bilgilerini sağlar
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userCheckLoading, setUserCheckLoading] = useState(true);
  const navigate = useRouter()


  const googleSingIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      throw error;
    }
  };


  const logOut = () => {
    signOut(auth);
  };
  const updateDisplayName = async (displayName) => {
    try {
      const user = auth.currentUser;
      if (user) {
        if (user.displayName) {
          // Kullanıcı ismi varsa, güncelle
          await updateProfile(user, { displayName });
        } else {
          // Kullanıcı ismi yoksa, ekle
          await setDisplayName(user, displayName);
        }
      } else {
        console.error("Current user not found.");
      }
    } catch (error) {
      console.error("Update display name error:", error);
    }
  };

  const updateProfile = async (data) => {
    try {
      await auth.currentUser.updateProfile(data);
      setCurrentUser({ ...currentUser, ...data });
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    }
  };

  // const resetUserPassword = async (newPassword) => {
  //   try {
  //     await auth.currentUser.updatePassword(newPassword);
  //   } catch (error) {
  //     console.error("Password reset error:", error);
  //     throw error;
  //   }
  // };

  const logoutUser = async () => {
    try {
      await auth.signOut();
      navigate.push('/profile/sign-in')
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const uploadProfilePhoto = async (file) => {
    try {
      const storageRef = storage.ref(
        `images/${currentUser.displayName}_${Date.now()}`
      );
      const uploadTask = storageRef.put(file);
      await uploadTask;
      const url = await storageRef.getDownloadURL();
      await updateProfile(auth.currentUser, { photoURL: url });
      window.location.reload();
    } catch (error) {
      console.error("Upload profile photo error:", error);
    }
  };

  const emailVerification = async () => {
    try {
      await auth.currentUser.sendEmailVerification();
    } catch (error) {
      console.error("Email verification error:", error);
    }
  };
  const passwordResetEmail = async (email) => {
    try {
     if (currentUser) {
       await sendPasswordResetEmail(auth.currentUser, email);
     }
    } catch (error) {
      throw new Error("Failed to send password reset email", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setUserCheckLoading(false);
    });

    // Temizlik için aboneliği kaldır
    return () => unsubscribe();
  }, []);
  const value = {
    currentUser,
    googleSingIn,
    logOut,
    // resetUserPassword,
    emailVerification,
    updateDisplayName,
    uploadProfilePhoto,
    logoutUser,
    userCheckLoading,
    passwordResetEmail,
    // resetPassword,
    // openResetModals,
    // closeModal,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
