
"use client"
import { auth } from "@/utils/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null); // Değişiklik: Başlangıç değeri null olarak ayarlandı

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    // Temizlik için aboneliği kaldır
    return () => unsubscribe();
  }, []);

  return { currentUser, setCurrentUser };
};

export default useAuth;
