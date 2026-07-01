import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getArticleCategories } from "../../../../services/getArticleCategories";

const ArticleCategory = async () => {
  const categories = await getArticleCategories();

  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-14 my-8 lg:my-10">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="font-bold text-3xl md:text-4xl">লেখালোক</h1>

        <p className="mt-3 text-sm md:text-base leading-7">
          চিন্তার মানচিত্রে শব্দ যখন রেখা হয়ে ধরা দেয়, তখন জন্ম নেয় এক একটি
          বয়ান। এই বিভাগে আমার বিভিন্ন বিষয়ের প্রবন্ধ, কলাম এবং বিশ্লেষণগুলো
          সুবিন্যস্ত করা হয়েছে। সমসাময়িক রাজনীতি থেকে শুরু করে ধ্রুপদী
          সাহিত্য—শব্দের এই বৈচিত্র্যে আপনাকে স্বাগতম।
        </p>
      </div>

      {/* Category Section */}
      <div className="my-8 lg:my-10 flex justify-center">
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {categories.map((category) => (
            <Link
              href={`/article-categories/${category._id}`}
              key={category._id}
              className="space-y-4 h-full"
            >
              <div>
                <Image
                  src={category.coverImage}
                  alt={category.title}
                  width={350}
                  height={150}
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>

              <div>
                <h1 className="font-bold text-xl md:text-2xl">
                  {category.title}
                </h1>

                <p className="mt-2 text-sm md:text-base leading-7">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleCategory;