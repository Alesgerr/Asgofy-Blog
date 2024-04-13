"use client";
import { useAuth } from "@/context/authContext";
import React, { useEffect, useState } from "react";
import Login from "./sign-in";
import { auth, login, storage } from "@/utils/firebase/auth";
import { useRouter } from "next/navigation";
import "../../assets/Profile.css";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Input from "@mui/joy/Input";
import { motion } from "framer-motion";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Skeleton from "@mui/material/Skeleton";
import {
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import toast from "react-hot-toast";
const ProfilePage = () => {
  const {
    currentUser,
    uploadProfilePhoto,
    emailVerification,
    logout,
    logoutUser,
    userCheckLoading,
  } = useAuth();
  const [displayName, setDisplayName] = useState(
    currentUser?.displayName || ""
  );
  const [avatar, setAvatar] = useState(currentUser?.photoURL || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useRouter();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [providerId, setProviderId] = useState("password");
  const history = useRouter();
  const {
    isOpen: isOpenResetPassword,
    onOpen: onOpenResetPassword,
    onOpenChange: onOpenReset,
  } = useDisclosure();
  const {
    isOpen: isOpenChangeUsername,
    onOpen: onOpenChangeUsername,
    onOpenChange: onOpenUsername,
  } = useDisclosure();
  const {
    isOpen: isOpenLogout,
    onOpen: onOpenLogout,
    onOpenChange: onOpenlogout,
  } = useDisclosure();

  const [modalPlacement, setModalPlacement] = useState("auto");
  const logoutHandle = async () => {
    try {
      await logoutUser();
      navigate.push("/profile/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred while logging out. Please try again.");
    }
  };
  const handleChangeUsername = async () => {
    try {
      await updateDisplayName(displayName);
      toast.success("Username updated successfully!");
    } catch (error) {
      console.error("Error updating username:", error);
      toast.error("An error occurred while updating username.");
    }
  };

  const handleSendEmailVerification = async () => {
    try {
      const user = auth.currentUser;
      await sendEmailVerification(user);
      toast.success("Email verification sent!");
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  };
  const handleSendResetPassEmail = async () => {
    try {
      await sendPasswordResetEmail(auth, email).then(() =>
        toast.success("password reset email sent!")
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleProfileUpdate = async () => {
    if (file) {
      setLoading(true);
      // Yeni fotoğrafı Firebase Storage'a yükle
      const storageRef = ref(
        storage,
        `images/${currentUser.displayName}_${Date.now()}`
      );

      const uploadTask = uploadBytesResumable(storageRef, file);

      try {
        await uploadTask;
        const url = await getDownloadURL(storageRef);

        // Kullanıcı profiline yeni fotoğrafı ekle
        await updateProfile(auth.currentUser, {
          photoURL: url,
        });

        setLoading(false);
        // Profil güncellendikten sonra sayfayı yeniden yükle
        setAvatar(url);
        toast.success("Profile photo updated successfully!");
      } catch (error) {
        console.error("Fotoğraf yükleme hatası: ", error);
        toast.error(
          "An error occurred while updating profile photo. Please try again."
        );
      }
    }
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
          setDisplayName(user, displayName);
          toast.success("Display name updated successfully!");
        }
      } else {
        console.error("Current user not found.");
      }
    } catch (error) {
      console.error("Update display name error:", error);
    }
  };
  useEffect(() => {
    // Kullanıcı oturum açılmışsa ve kullanıcı durumu kontrol edilmişse, profil sayfasını göster
    // Ayrıca, kullanıcı oturum açmamışsa ve kullanıcı durumu kontrol edilmişse, giriş sayfasına yönlendir
    if (!userCheckLoading) {
      if (currentUser) {
        // Kullanıcı oturum açmışsa, profil sayfasını göster
        // Örnek olarak, "/dashboard" sayfasına yönlendir
      } else {
        // Kullanıcı oturum açmamışsa, giriş sayfasına yönlendir
        history.push("/profile/sign-in");
      }
    }
  }, [currentUser, userCheckLoading, history]);

  return (
    <div className="user-profile mx-auto max-w-7xl">
      {/* Kullanıcı yükleniyor durumundayken gösterilecek içerik */}
      {userCheckLoading ? (
        <LoadingCard />
      ) : (
        <div className="flex flex-wrap flex-auto px-5 md:px-14 py-5">
          <div className="sm:w-4/12 md:w-5/12 lg:w-4/12 w-full">
            <div className="profile-info1">
              {/* Profil fotoğrafı ve güncelleme */}
              <div className="flex justify-center">
                <label htmlFor="fileInput" className="custom-file-upload">
                  <img
                    className="rounded-circle object-fit-cover mr-1"
                    width={35}
                    height={35}
                    src={currentUser?.photoURL || "/default-avatar.png"}
                    alt="asasa"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    id="fileInput"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <div className="prof-btn-box">
                <button
                  className={`user-prof-btn ${file ? "d-block" : "d-none"}`}
                  onClick={handleProfileUpdate}
                  disabled={!file || loading}
                >
                  {loading ? <CircularProgress /> : "Photo Update"}
                </button>
              </div>
              {/* Kullanıcı adı ve e-posta */}
              <div className="user-details">
                <h2>{currentUser?.displayName}</h2>
                <p>{currentUser?.email}</p>
              </div>
              {/* Şifre sıfırlama butonu */}
            </div>
          </div>
          {/* Diğer profil bilgileri ve işlemleri buraya eklenecek */}
          <div className="sm:w-8/12 md:w-7/12 lg:w-8/12 w-full">
            <div className="reset-password bg-white p-3  dark:bg-black rounded-md border dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">Reset Password:</h2>
                <Button
                  onPress={onOpenResetPassword}
                  className="bg-zinc-900 text-white dark:text-black dark:bg-white font-bold py-2 px-4 rounded"
                >
                  Reset Password
                </Button>
              </div>
              <Modal
                isOpen={isOpenResetPassword}
                onOpenChange={onOpenReset}
                placement={modalPlacement}
                className="p-1 dark:bg-white shadow-md modal bg-black dark:text-black text-white rounded-md"
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader>Reset Password</ModalHeader>
                      <ModalBody>
                        <div>
                          {currentUser.emailVerified ? (
                            <div>
                              <input
                                type="email"
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-2 w-full outline-none rounded-md px-5 py-3 dark:bg-zinc-900 text-black dark:text-white"
                              />
                              <div className="flex flex-wrap justify-between gap-1 py-2">
                                <Button
                                  className="p-2 bg-white rounded-md dark:bg-black text-black dark:text-white"
                                  onClick={handleSendResetPassEmail}
                                >
                                  Send password to email
                                </Button>
                                <Button onPress={onClose}>Cancel</Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-between py-5">
                              <Button
                                className="p-2 bg-white rounded-md dark:bg-black text-black dark:text-white"
                                onClick={handleSendEmailVerification}
                              >
                                Send confirmation to email
                              </Button>{" "}
                              <Button onPress={onClose}>Cancel</Button>
                            </div>
                          )}
                        </div>

                        {/* {resetError && <p>{resetError}</p>} */}
                      </ModalBody>

                      <ModalFooter>
                        {/* <Button onClick={handleResetPassword}>Reset Password</Button>
            <Button onClick={handleSendEmailVerification}>
              Send Email Verification
            </Button> */}
                        {/* <Button onPress={onClose}>Cancel</Button> */}
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
            <div className="change-username bg-white p-3 border dark:bg-black rounded-md dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">Change User Name:</h2>
                <Button
                  onPress={onOpenChangeUsername}
                  className="bg-zinc-900 text-white dark:text-black dark:bg-white font-bold py-2 px-4 rounded"
                >
                  Change Username
                </Button>
              </div>
              <Modal
                isOpen={isOpenChangeUsername}
                onOpenChange={onOpenUsername}
                placement={modalPlacement}
                className="p-1 dark:bg-white shadow-md modal bg-black dark:text-black text-white rounded-md"
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader>Change Username</ModalHeader>
                      <ModalBody>
                        <div>
                          {currentUser.emailVerified ? (
                            <div>
                              <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="Enter new username"
                                className="p-2 w-full outline-none rounded-md px-5 py-3 dark:bg-zinc-900 text-black dark:text-white"
                              />
                              <div className="flex justify-between py-5">
                                <Button
                                  className="p-2 bg-white rounded-md dark:bg-black text-black dark:text-white"
                                  onClick={handleChangeUsername}
                                >
                                  Change Username
                                </Button>{" "}
                                <Button onPress={onClose}>Cancel</Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-between">
                              <Button
                                className="p-2 bg-white rounded-md dark:bg-black text-black dark:text-white"
                                onClick={handleSendEmailVerification}
                              >
                                Send Email Verification
                              </Button>{" "}
                              <Button onPress={onClose}>Cancel</Button>
                            </div>
                          )}
                        </div>
                        {/* {resetError && <p>{resetError}</p>} */}
                      </ModalBody>

                      <ModalFooter></ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
            <div className="logout bg-white p-3 border dark:bg-black rounded-md dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">Logout:</h2>
                <Button
                  onPress={onOpenLogout}
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </Button>
              </div>
              <Modal
                isOpen={isOpenLogout}
                onOpenChange={onOpenlogout}
                placement={modalPlacement}
                className="p-1 dark:bg-white shadow-md modal bg-black dark:text-black text-white rounded-md"
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader>Logout</ModalHeader>
                      <ModalBody>
                        <div className="flex justify-between">
                          <Button
                            className="p-2 bg-white rounded-md dark:bg-black text-black dark:text-white"
                            onClick={logoutHandle}
                          >
                            Logout
                          </Button>{" "}
                          <Button onPress={onClose}>Cancel</Button>
                        </div>
                        {/* {resetError && <p>{resetError}</p>} */}
                      </ModalBody>

                      <ModalFooter></ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

const LoadingCard = () => (
  <>
    <div className="py-2 sm:py-3 lg:px-10 px-5 mx-auto">
      <div className="flex"></div>
      <div className="lg:col-gap-10 xl:col-gap-16 mt-8 overflow-hidden grid grid-cols-1 gap-12 lg:grid-cols-5">
        <div className="lg:col-span-4 lg:row-end-1 flex justify-center">
          <Skeleton
            className="dark:bg-gray-500 rounded-sm"
            variant="rectangular"
            width={400}
            height={200}
          />
        </div>
        <div className="lg:col-span-8 lg:row-span-2 lg:row-end-2">
          <Skeleton
            className="dark:bg-gray-500 rounded-sm my-1"
            variant="rectangular"
            width={1000}
            height={80}
          />
          <Skeleton
            className="dark:bg-gray-500 rounded-sm my-1"
            variant="rectangular"
            width={1000}
            height={80}
          />
          <Skeleton
            className="dark:bg-gray-500 rounded-sm my-1"
            variant="rectangular"
            width={1000}
            height={80}
          />
        </div>
      </div>
    </div>
  </>
);
