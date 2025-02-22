import React from 'react'

const FeaturedPosts = ({ featuredProducts }) => {
  return (
    <div>
      <section className="max-w-7xl px-5 md:px-14 mx-auto p-8 rounded-2xl shadow-lg">
        <h3 className="text-orange-500 text-sm font-bold uppercase text-center">
          Our Blog
        </h3>
        <h1 className="text-4xl font-bold text-center mt-2 mb-6">
          News & <span className="italic">Articles</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts?.slice(0, 4).map((item, index) => (
            <div
              key={index}
              className={index === 0 ? "md:col-span-2" : "space-y-4"}
            >
              <img
                src={item?.imageUrl || "https://via.placeholder.com/600x300"}
                alt={item?.title || "Article Image"}
                className={
                  index === 0
                    ? "rounded-xl mb-4 w-full"
                    : "w-24 h-24 rounded-lg"
                }
              />
              <p className="text-gray-400 text-sm">
                {item?.date || "Unknown Date"}
              </p>
              <h2 className="text-xs font-bold mb-2">
                {item?.title?.length > 30
                  ? item.title.slice(0, 37) + "..."
                  : item?.title}
              </h2>
              {index === 0 && (
                <p className="text-gray-600 text-sm">
                  {item?.excerpt?.length > 150
                    ? item.excerpt.slice(0, 147) + "..."
                    : item?.excerpt}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturedPosts