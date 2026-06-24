import Story from "@/components/books/story/Story";
import React from "react";

const Books = () => {
  return (
    <div className="p-4 lg:px-30 py-5">
      <div className="text-center space-y-10">
        <h1 className="font-bold text-4xl">অক্ষর বৃত্ত</h1>
        <div className="w-30 items-center">
          <hr />
        </div>
        <p>
          সাহিত্যের অন্তহীন পথে শব্দের মালা গেঁথে গড়ে তোলা এক মায়াবী জগৎ। এখানে
          আপনি পাবেন আমার সকল রচনাশৈলীর পূর্ণ সংগ্রহ।
        </p>
      </div>

      <div>
        <Story></Story>
      </div>
    </div>
  );
};

export default Books;
