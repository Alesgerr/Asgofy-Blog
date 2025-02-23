// components/Blog/RecentPosts.js
import React from "react";
import Link from "next/link";

const RecentPosts = ({ latestProducts }) => {
  return (
    <section className="recent-posts mt-10 lg:mt-0 w-full lg:w-1/4">
      <h3 className="text-2xl font-bold mb-4">Yeni Yazılar</h3>
      {latestProducts?.map((post) => (
        <div
          key={post._id}
          className="recent-post border p-4 mb-4 rounded-lg shadow-md"
        >
          <Link href={`/blog/${post.slug.current}`}>
            <h4 className="text-lg font-semibold mb-2">{post.title}</h4>
            <p className="text-sm text-gray-600">{post.timeAgo}</p>
          </Link>
        </div>
      ))}
    </section>
  );
};

export default RecentPosts;
