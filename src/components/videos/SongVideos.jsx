import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaPlay } from 'react-icons/fa';

const SongVideos = ({songs}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {songs.map((song) => (
          <div
            key={song._id}
            className="border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
          >
            <div className="relative group">
              <Image
                src={song.coverImage}
                alt={song.title}
                width={400}
                height={500}
                className="w-full h-[220px] object-cover"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <Link href={`/songs/${song._id}`}>
                  <button className="w-16 h-16 rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-110 transition">
                    <FaPlay className="text-red-600 ml-1" />
                  </button>
                </Link>
              </div>
            </div>

            <div className="p-4">
              <h2 className="font-bold text-lg mb-2 line-clamp-2">
                {song.title}
              </h2>

              <p className="text-gray-600 text-sm line-clamp-3">
                {song.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
};

export default SongVideos;