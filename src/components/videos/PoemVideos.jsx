import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { IoBook } from "react-icons/io5";

const PoemVideos = ({ poems }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {poems.map((poem) => (
        <div
          key={poem._id}
          className="border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
        >
          <Link href={`/poems/${poem._id}`} className="relative group">
            <Image
              src={poem.coverImage}
              alt={poem.title}
              width={400}
              height={500}
            />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <div>
                <button className="w-16 h-16 rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-110 transition">
                  <FaPlay className="text-red-600 ml-1" />
                </button>
              </div>
            </div>
          </Link>

          <div className="p-4">
            <h2 className="font-bold text-lg mb-2 line-clamp-1">
              {poem.title}
            </h2>

            <p className="text-gray-600 text-sm line-clamp-2">
              {poem.description}
            </p>

            <div className="flex justify-between items-center mt-4 mb-2">
              <a
                href={
                  poem?.purchaseURL ||
                  "https://seller.rokomari.com/book/author/25823/sumon-subhan"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex max-w-fit bg-blue-100 text-blue-700 rounded-2xl p-1"
              >
                <div className="flex items-center gap-2 px-2 text-xs">
                  <IoBook size={18} />
                  <p className="line-clamp-1">{poem.bookTitle}</p>
                </div>
              </a>

              <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                <p>ভিউস: {poem.views.toLocaleString("bn-BD")}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PoemVideos;
