import ArticleClient from "@/components/articles/ArticleClient";
import { getArticleCategories } from "../../../../services/getArticleCategories";

export const metadata = {
  title: "লেখালোক",

  description:
    "সুমন শুভানের প্রবন্ধ, কলাম, বিশ্লেষণ ও মতামতের সংগ্রহ। রাজনীতি, সাহিত্য, সমাজ, ইতিহাস, নিরাপত্তা এবং সমসাময়িক বিভিন্ন বিষয়ে লেখা পড়ুন। Explore articles, essays, columns, and analyses by Suman Subhan.",

  keywords: [
    // Bangla
    "সুমন শুভান",
    "লেখালোক",
    "প্রবন্ধ",
    "কলাম",
    "বিশ্লেষণ",
    "মতামত",
    "বাংলা প্রবন্ধ",
    "বাংলা নিবন্ধ",
    "বাংলা কলাম",
    "রাজনীতি",
    "সাহিত্য",
    "সমাজ",
    "ইতিহাস",
    "নিরাপত্তা বিশ্লেষণ",

    // English
    "Suman Subhan",
    "Articles",
    "Essays",
    "Columns",
    "Opinion",
    "Analysis",
    "Bangla Articles",
    "Bengali Essays",
    "Politics",
    "Literature",
    "History",
    "Society",
    "Security Analysis",
  ],

  alternates: {
    canonical: "/articles",
  },

  openGraph: {
    title: "লেখালোক | সুমন শুভান",
    description: "সুমন শুভানের প্রবন্ধ, কলাম, বিশ্লেষণ ও মতামতের সংগ্রহ।",
    url: "/articles",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "লেখালোক | সুমন শুভান",
      },
    ],
  },

  twitter: {
    title: "লেখালোক | সুমন শুভান",
    description: "সুমন শুভানের প্রবন্ধ, কলাম, বিশ্লেষণ ও মতামতের সংগ্রহ।",
    images: ["/og-image.jpg"],
  },
};

export default async function ArticleCategory() {
  const categories = await getArticleCategories();

  if (!categories.length) {
    return (
      <section className="px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">লেখালোক</h1>
        <p className="mt-4 text-gray-600">বর্তমানে কোনো ক্যাটাগরি নেই।</p>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-14 my-8 lg:my-10">
      <div className="max-w-3xl">
        <h1 className="font-bold text-3xl md:text-4xl">লেখালোক</h1>

        <p className="mt-3 text-sm md:text-base leading-7">
          চিন্তার মানচিত্রে শব্দ যখন রেখা হয়ে ধরা দেয়, তখন জন্ম নেয় এক একটি
          বয়ান। এই বিভাগে আমার বিভিন্ন বিষয়ের প্রবন্ধ, কলাম এবং বিশ্লেষণগুলো
          সুবিন্যস্ত করা হয়েছে। সমসাময়িক রাজনীতি থেকে শুরু করে ধ্রুপদী
          সাহিত্য—শব্দের এই বৈচিত্র্যে আপনাকে স্বাগতম।
        </p>
      </div>

      <ArticleClient categories={categories} />
    </section>
  );
}
