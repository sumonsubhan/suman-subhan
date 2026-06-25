import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import {songs} from "@/data/songs";

const Songs = () => {
  return (
    <div className="px-2 md:px-4 lg:px-10 py-10">
      <h1 className="text-3xl md:text-4xl font-bold">সুরসুধা</h1>

      <p className="mt-5 mb-10 text-gray-600 leading-relaxed">
        শব্দ আর সুরের এক মায়াবী মেলবন্ধন। এখানে আমাদের সঙ্গীতযাত্রা এবং
        বিশিষ্ট শিল্পীদের সাথে করা সহযোগিতামূলক কাজের সংকলন রয়েছে।
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {songs.map((song) => (
          <div
            key={song.id}
            className="border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
          >
            <div className="relative group">
              <Image
                src={song.cover}
                alt={song.title}
                width={400}
                height={500}
                className="w-full h-[220px] object-cover"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <Link href={`/songs/${song.id}`}>
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
    </div>
  );
};

export default Songs;