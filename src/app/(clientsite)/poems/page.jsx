import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { poems } from "@/data/poems";

const Poems = () => {
  return (
    <div className="px-2 md:px-4 lg:px-10 py-10">
      <h1 className="text-3xl md:text-4xl font-bold">শব্দসুধা</h1>

      <p className="mt-5 mb-10 text-gray-600 leading-relaxed">
        কবিতা ও আবৃত্তির এক অনন্য সংকলন। এখানে শব্দের ঝংকারে হৃদয়ের অনুভূতিগুলো
        প্রাণ পায় সুরের মূর্ছনায়।
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {poems.map((poem) => (
          <div
            key={poem.id}
            className="border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
          >
            <div className="relative group">
              <Image
                src={poem.cover}
                alt={poem.title}
                width={400}
                height={500}
                className="w-full h-[220px] object-cover"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <Link href={`/poems/${poem.id}`}>
                  <button className="w-16 h-16 rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-110 transition">
                    <FaPlay className="text-red-600 ml-1" />
                  </button>
                </Link>
              </div>
            </div>

            <div className="p-4">
              <h2 className="font-bold text-lg mb-2 line-clamp-2">
                {poem.title}
              </h2>

              <p className="text-gray-600 text-sm line-clamp-3">
                {poem.description}
              </p>
              <div className="flex items-end max-w-fit bg-gray-300 rounded-2xl p-1 mt-4 mb-2">
                <p>{poem.bookName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Poems;
