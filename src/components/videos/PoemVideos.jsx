import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPlay } from "react-icons/fa";

const PoemVideos = ({poems}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {poems.map((poem) => (
        <Link href={`/poems/${poem._id}`}
          key={poem._id}
          className="border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
        >
          <div className="relative group">
            <Image
              src={poem.coverImage}
              alt={poem.title}
              width={400}
              height={500}
              className="w-full h-[220px] object-cover"
            />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <div>
                <button className="w-16 h-16 rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-110 transition">
                  <FaPlay className="text-red-600 ml-1" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h2 className="font-bold text-lg mb-2 line-clamp-2">
              {poem.title}
            </h2>

            <p className="text-gray-600 text-sm line-clamp-3">
              {poem.description}
            </p>
            <div className="flex max-w-fit bg-gray-300 rounded-2xl p-1 mt-4 mb-2">
              <p>{poem.bookTitle}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PoemVideos;
