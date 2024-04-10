import React from "react";

const PostPublishedDate = ({ publishedAt }) => {
  const publishedDate = new Date(publishedAt);
  const monthIndex = publishedDate.getMonth();
  const dayOfMonth = publishedDate.getDate();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[monthIndex];

  return (
    <span>
      {monthName} {dayOfMonth}
    </span>
  );
};

export default PostPublishedDate;
