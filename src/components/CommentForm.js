import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import fetchComments, {
  createComment,
  deleteComment,
} from "../../sanity/lib/client";
import useAuth from "@/custom-hook/useAuth";
import { CircularProgress, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image"

const CommentForm = ({ postId }) => {
  const [loadingStates, setLoadingStates] = useState({});
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const { currentUser } = useAuth();
console.log(comments);
  useEffect(() => {
    const getComments = async () => {
      const fetchedComments = await fetchComments(postId); // Ürün kimliğine göre yorumları al
      setComments(fetchedComments);
    };
    getComments();
  }, [postId]); // Ürün kimliği değiştiğinde yorumları yeniden al

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoadingStates({ ...loadingStates, submitting: true });
    const newCommentData = {
      text: comment,
      rating: rating,
      user: {
        fullName: currentUser?.displayName,
        imageUrl: currentUser?.photoURL,
        id: currentUser?.uid,
      },
      date: new Date().toISOString(),
    };

    // Yorumu oluştur ve yeni yorumun kimliğini al
    const newCommentId = await createComment(postId, newCommentData);

    if (newCommentId) {
      // Yorumları güncelle
      const updatedComments = [
        ...comments,
        { _id: newCommentId, ...newCommentData },
      ];
      setComments(updatedComments);
      // Formu temizle
      setComment("");
      setRating(0);
      setLoadingStates({ ...loadingStates, submitting: true });
    } else {
      console.error("Failed to submit comment.");
    }
    setLoadingStates({ ...loadingStates, submitting: false });
  };
  const handleDeleteComment = async (commentId) => {
    setLoadingStates({ ...loadingStates, [commentId]: true }); // İlgili yorumun loading durumunu true yap

    try {
      // Yorumu sil
      await deleteComment(commentId);
      // Yorumları güncelle (silinen yorumu listeden kaldır)
      const updatedComments = comments.filter(
        (comment) => comment._id !== commentId
      );
      setComments(updatedComments);
      console.log("Comment deleted successfully.");
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setLoadingStates({ ...loadingStates, [commentId]: false }); // İlgili yorumun loading durumunu false yap
    }
  };
  const renderRatingStars = (comment) => {
    const stars = [];
    const rate = comment.rating; // Tek bir yorumun rating değerini alın
    for (let i = 0; i < 5; i++) {
      const starColor = i < rate ? "#ffc107" : "#c7c7c7"; // Rating değerine göre yıldız rengini belirleyin
      stars.push(<FaStar key={i} color={starColor} size={13} />);
    }
    return stars;
  };

  const formatDate = (date) => {
    const currentDate = new Date();
    const commentDate = new Date(date);

    const diffTime = Math.abs(currentDate - commentDate);
    const diffSeconds = Math.floor(diffTime / 1000);
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffYears >= 1) {
      return `${diffYears} years ago`;
    } else if (diffMonths >= 1) {
      return `${diffMonths} months ago`;
    } else if (diffDays >= 1) {
      return `${diffDays} days ago`;
    } else if (diffHours >= 1) {
      return `${diffHours} hours ago`;
    } else if (diffMinutes >= 1) {
      return `${diffMinutes} minutes ago`;
    } else {
      return `${diffSeconds} seconds ago`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex justify-center items-center">
      <div className="md:px-5 my-5 w-full rounded-md dark:bg-zinc-950 dark:border-none p-4 shadow-md border">
        <p className="text-xl mb-3 font-semibold text-indigo-700 dark:text-white transition-all">
          Reviews
        </p>

        {currentUser && currentUser ? (
          <form onSubmit={handleSubmit} className="mb-8">
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Write your comment here..."
              required
              className="w-full px-3 py-2 border dark:border-none rounded-md focus:outline-none resize-y"
              style={{ height: "150px" }}
            ></textarea>
            <div className="my-3">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index} className="inline-block mr-2">
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => handleRatingChange(ratingValue)}
                      className="sr-only"
                      required
                    />
                    <FaStar
                      className="star cursor-pointer"
                      color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                      size={25}
                    />
                  </label>
                );
              })}
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 dark:bg-indigo-600  bg-none px-5 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
              disabled={loadingStates.submitting} // Eğer yorum gönderme işlemi devam ediyorsa butonu devre dışı bırak
            >
              {loadingStates.submitting ? ( // Yüklenme durumuna göre buton içeriğini değiştir
                <CircularProgress size={24} /> // Gönderme işlemi sürerken dairesel ilerleme göstergesi göster
              ) : (
                "Post Comment" // Gönderme işlemi tamamlanınca tekrar "Post Comment" metnini göster
              )}
            </button>
          </form>
        ) : (
          <p className="my-3">
            You Need to Register to Comment{" "}
            <span className="text-blue-800 underline">
              <Link href="/profile/sign-in">Login</Link>
            </span>
          </p>
        )}
        <h2 className="text-lg font-bold mb-4">
          Comments ({comments?.length})
        </h2>
        <ul>
          {comments?.length === 0 ? (
            <li className="text-sm text-gray-500 mb-4">No comments yet</li>
          ) : (
            comments?.map((comment, index) => (
              <li key={index} className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Image
                      src={comment?.user?.imageUrl || "/avatar.png"}
                      alt="Profile"
                      width={36}
                      height={36}
                      priority
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <p className="font-bold">{comment?.user?.fullName}</p>
                  </div>
                  {loadingStates[comment._id] ? (
                    <CircularProgress className="mx-5" size={24} />
                  ) : (
                    currentUser &&
                    currentUser?.uid === comment?.user?.id && (
                      <IconButton
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        <DeleteIcon className="dark:text-red-600" />
                      </IconButton>
                    )
                  )}
                </div>
                <p className="mb-1 text-sm">{comment.text}</p>
                <p className="text-sm mb-1 flex">
                  {renderRatingStars(comment)}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(comment.date)}
                </p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default CommentForm;
