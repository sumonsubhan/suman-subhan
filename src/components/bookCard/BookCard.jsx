import React from "react";
import Image from "next/image";

import book1 from "../../../public/book1.jpeg";
import Link from "next/link";

const BookCard = () => {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-xl transition duration-300">
      
      {/* Book Image */}
      <div className="flex justify-center pt-2">
        <Image
          src={book1}
          alt="Book Cover"
          height={300}
          width={220}
          className="rounded-xl p-2 bg-gray-100"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        
        {/* Title */}
        <h2 className="text-xl font-bold">
          ঝরা পাতার গান
        </h2>

        {/* Author */}
        <p className="text-sm">
          সুমন সুবাহান
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed">
          স্বপ্নের ফেলে আসা দিনের এক মায়াবী আখ্যান।
        </p>

        {/* Button / Link */}
        <div className="pt-2">
          <Link
            href="/"
            className="text-blue-600 font-medium hover:underline"
          >
            বিস্তারিত →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;