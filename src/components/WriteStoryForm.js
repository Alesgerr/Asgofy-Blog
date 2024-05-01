// import { useState } from "react";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { db, storage } from "@/utils/firebase/auth";
// import { useAuth } from "@/context/authContext";

// const WriteStoryForm = () => {
//   const { currentUser } = useAuth();
//   const [title, setTitle] = useState("");
//   const [storyContent, setStoryContent] = useState("");
//   const [image, setImage] = useState(null);
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };
//   const handleStorySubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const currentDate = new Date(); // Şu anki tarih ve saat bilgisini al
//       const createdAt = currentDate.toISOString(); // ISO 8601 biçiminde tarih ve saat bilgisini al
//       let imageUrl = ""; // Resim URL'sini tutmak için boş bir string oluşturun
//       if (image) {
//         // Eğer bir resim seçilmişse, resmi Firestore Storage'a yükle
//         const storageRef = storage.ref();
//         const imageRef = storageRef.child(
//           `storyImages/${currentUser.uid}/${image.name}`
//         );
//         console.log(imageRef);
//         await imageRef.put(image);
//         imageUrl = await imageRef.getDownloadURL(); // Yükleme tamamlandığında resim URL'sini al
//       }
//         console.log(imageUrl, "sasa");

//       // Firestore'a yeni bir hikaye ekleyin
//       const docRef = await addDoc(collection(db, "stories"), {
//         title: title,
//         content: storyContent,
//         imageUrl: imageUrl,
//         author: currentUser.displayName,
//         authorId: currentUser.uid,
//         createdAt: createdAt,
//         //   createdAt: serverTimestamp(),
//       });
//       console.log("Yeni hikaye eklendi, belge kimliği:", docRef.id);
//       setStoryContent(""); // Formu sıfırla
//     } catch (error) {
//       console.error("Hikaye eklenirken bir hata oluştu:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleStorySubmit}>
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Başlık"
//         required
//       />
//       <textarea
//         value={storyContent}
//         onChange={(e) => setStoryContent(e.target.value)}
//         placeholder="Hikayenizi buraya yazın"
//         required
//       />
//       <input
//         type="file"
//         onChange={handleFileChange}
//         accept="image/*"
//         required
//       />
//       <button type="submit">Hikayemi Gönder</button>
//     </form>
//   );
// };

// export default WriteStoryForm;
