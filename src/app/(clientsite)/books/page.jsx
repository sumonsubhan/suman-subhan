import EssaySection from "@/components/books/essay/EssaySection";
import NovelSection from "@/components/books/novel/NovelSection";
import PoemsSection from "@/components/books/poems/PoemSection";
import RhymeSection from "@/components/books/rhyme/RhymeSection";
import StorySection from "@/components/books/story/StorySection";
import React from "react";

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

      <div>
        <StorySection></StorySection>
        <PoemsSection></PoemsSection>
        <RhymeSection></RhymeSection>
        <NovelSection></NovelSection>
        <EssaySection></EssaySection>
      </div>
    </div>
  );
};

export default Books;
