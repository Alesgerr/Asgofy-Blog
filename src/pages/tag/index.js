// /pages/tags.js

import Link from "next/link";
import { getTagsWithPostCount } from "../../../sanity/lib/client";
import Head from "next/head";
import AnimationWrapper from "@/components/AnimationWrapper";

const TagsPage = ({ tags }) => {
  return (
    <div className="max-w-7xl mx-auto py-5 px-5 md:px-14 overflow-hidden">
      <Head>
        <title>All Tags - Asgofy</title>
        <meta
          name="description"
          content="All tags on the blog. Here are the number of posts and descriptions for each tag."
        />
        {/* Open Graph meta etiketleri */}
        <meta property="og:title" content="Asgofy - All Tags" />
        <meta
          property="og:description"
          content="All tags on the blog. Here are the number of posts and descriptions for each tag."
        />
        <meta property="og:type" content="website" />
        {/* Twitter Cards meta etiketleri */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Asgofy - All Tags" />
        <meta
          name="twitter:description"
          content="All tags on the blog. Here are the number of posts and descriptions for each tag."
        />
      </Head>
      <AnimationWrapper>
        <h1 className="text-2xl font-bold mb-4">Tags</h1>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {tags.map((tag) => (
            <li
              key={tag?._id}
              className="p-2 py-4 bg-zinc-900 dark:bg-white rounded-md"
            >
              <Link href={`/tag/${tag?.slug?.current}`}>
                <span className="text-white dark:text-black font-bold hover:text-blue-700">
                  {tag?.tag} ({tag?.postCount})
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </AnimationWrapper>
    </div>
  );
};

export const getServerSideProps = async () => {
  // Sanity.io'dan etiket verilerini ve gönderi sayılarını al
  const tags = await getTagsWithPostCount();

  return {
    props: {
      tags,
    },
  };
};

export default TagsPage;
