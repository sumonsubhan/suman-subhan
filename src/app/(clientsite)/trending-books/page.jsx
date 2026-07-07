import React from "react";
import Image from "next/image";
import { getTrendingBooks } from "../../../../services/getTrendingBooks";
import Pagination from "@/components/pagination/Pagination";

export const metadata = {
  title: "ট্রেন্ডিং বই",

  description:
    "সুমন শুভানের সর্বাধিক জনপ্রিয় ও আলোচিত বইগুলোর সংগ্রহ। পাঠকদের পছন্দের ট্রেন্ডিং বাংলা বই, কবিতা, গল্প, উপন্যাস ও প্রবন্ধ আবিষ্কার করুন। Explore the most popular and trending books by Suman Subhan.",

  keywords: [
    // Bangla
    "সুমন শুভান",
    "ট্রেন্ডিং বই",
    "জনপ্রিয় বই",
    "বাংলা বই",
    "বেস্ট সেলার",
    "কবিতার বই",
    "গল্পের বই",
    "উপন্যাস",
    "প্রবন্ধ",
    "বাংলা সাহিত্য",

    // English
    "Suman Subhan",
    "Trending Books",
    "Popular Books",
    "Best Selling Books",
    "Bangla Books",
    "Bengali Books",
    "Poetry Books",
    "Story Books",
    "Novels",
    "Essays",
  ],

  alternates: {
    canonical: "/trending-books",
  },

  openGraph: {
    title: "ট্রেন্ডিং বই | সুমন শুভান",
    description: "সুমন শুভানের সর্বাধিক জনপ্রিয় ও আলোচিত বইগুলোর সংগ্রহ।",
    url: "/trending-books",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ট্রেন্ডিং বই | সুমন শুভান",
      },
    ],
  },

  twitter: {
    title: "ট্রেন্ডিং বই | সুমন শুভান",
    description: "সুমন শুভানের সর্বাধিক জনপ্রিয় ও আলোচিত বইগুলোর সংগ্রহ।",
    images: ["/og-image.jpg"],
  },
};

const TrendingBooks = async ({ searchParams }) => {
  const search = await searchParams;

  const page = Number(search.page) || 1;

  const { books, totalPages } = await getTrendingBooks({
    page,
    limit: 8,
  });

  if (books.length === 0) {
    return (
      <section className="py-20 text-center">
        <h1 className="text-3xl font-bold">ট্রেন্ডিং বই</h1>

        <p className="mt-4 text-gray-600">
          বর্তমানে কোনো ট্রেন্ডিং বই উপলব্ধ নেই।
        </p>
      </section>
    );
  }

  return (
    <section className="py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-bgprimary">
          ট্রেন্ডিং বই
        </h1>

        <p className="mt-2 text-gray-500">জনপ্রিয় ও সর্বাধিক আলোচিত বইসমূহ</p>
      </div>

      {/* Books */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <article
            key={book._id}
            className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Cover */}
            <div className="flex justify-center bg-gray-50 p-5">
              <div className="relative aspect-[3/4] w-[180px]">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  sizes="180px"
                  className="rounded-lg object-cover shadow-md"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
              <h2 className="line-clamp-2 min-h-[56px] text-lg font-bold leading-7">
                {book.title}
              </h2>

              <div className="mt-auto border-t pt-4">
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {new Date(book.createdAt).toLocaleDateString("bn-BD", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>

                  <span className="text-gray-500">✍️ সুমন সুবহান</span>
                </div>

                <a
                  href={book.purchaseURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg bg-bgprimary py-2.5 text-center text-sm font-medium text-white transition hover:opacity-90"
                >
                  অর্ডার করুন
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        baseUrl={`trending-books`}
      />
    </section>
  );
};

export default TrendingBooks;
