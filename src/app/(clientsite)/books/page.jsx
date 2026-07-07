import EssaySection from "@/components/books/essay/EssaySection";
import NovelSection from "@/components/books/novel/NovelSection";
import PoemsSection from "@/components/books/poems/PoemSection";
import RhymeSection from "@/components/books/rhyme/RhymeSection";
import StorySection from "@/components/books/story/StorySection";
import React from "react";

export const metadata = {
  title: "অক্ষর বৃত্ত",

  description:
    "সুমন শুভানের সকল প্রকাশিত বই এক জায়গায়। কবিতা, গল্প, উপন্যাস, প্রবন্ধ এবং ছড়ার পূর্ণ সংগ্রহ পড়ুন ও আবিষ্কার করুন। Explore all published books by Suman Subhan including novels, poems, stories, essays, and rhymes.",

  keywords: [
    // Bangla
    "সুমন শুভান",
    "অক্ষর বৃত্ত",
    "বাংলা বই",
    "প্রকাশিত বই",
    "কবিতার বই",
    "গল্পের বই",
    "উপন্যাস",
    "প্রবন্ধ",
    "ছড়া",
    "বাংলা সাহিত্য",
    "লেখকের বই",

    // English
    "Suman Subhan",
    "Books",
    "Published Books",
    "Bangla Books",
    "Bengali Books",
    "Poetry Books",
    "Story Books",
    "Novels",
    "Essays",
    "Rhymes",
    "Bangla Literature",
  ],

  alternates: {
    canonical: "/books",
  },

  openGraph: {
    title: "অক্ষর বৃত্ত | সুমন শুভান",
    description:
      "সুমন শুভানের কবিতা, গল্প, উপন্যাস, প্রবন্ধ এবং ছড়ার পূর্ণ সংগ্রহ।",
    url: "/books",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "সুমন শুভানের বইসমূহ",
      },
    ],
  },

  twitter: {
    title: "অক্ষর বৃত্ত | সুমন শুভান",
    description: "সুমন শুভানের সকল প্রকাশিত বইয়ের সংগ্রহ।",
    images: ["/og-image.jpg"],
  },
};

const Books = () => {
  return (
    <div className="p-4 lg:px-30 py-5">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">অক্ষর বৃত্ত</h1>

        <hr className="w-30 mx-auto border-gray-600" />

        <p className="mx-auto max-w-3xl text-gray-600 leading-relaxed">
          সাহিত্যের অন্তহীন পথে শব্দের মালা গেঁথে গড়ে তোলা এক মায়াবী জগৎ। এখানে
          আপনি পাবেন আমার সকল রচনাশৈলীর পূর্ণ সংগ্রহ।
        </p>
      </div>

      <section >
        <StorySection/>
        <PoemsSection/>
        <RhymeSection/>
        <NovelSection/>
        <EssaySection/>
      </section>
    </div>
  );
};

export default Books;
