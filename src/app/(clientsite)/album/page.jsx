import Image from "next/image";
import Link from "next/link";
import React from "react";

const albumData = [
  {
    id: 1,
    img: "https://sumansubhan.com/admin/postimages/2590c4b30d1a98aa1751a6bfc53aec47.jpg",
    title: "একুশে বইমেলা",
    totalPhotos: 24,
  },
  {
    id: 2,
    img: "https://sumansubhan.com/admin/postimages/1a1443c7a1589dcde49f91d9c557230b.jpg",
    title: "যাপিত জীবন",
    totalPhotos: 18,
  },
  {
    id: 3,
    img: "https://sumansubhan.com/admin/postimages/b8ee3f345bd4cbf5f77676eb2fd2ad6d.jpg",
    title: "স্মৃতি ভাস্বর",
    totalPhotos: 32,
  },
];

const Albums = () => {
  return (
    <section className="px-4 md:px-8 lg:px-12 xl:px-20 py-12">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-bgprimary font-medium mb-3">
          আলোকচিত্র সংগ্রহশালা
        </p>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          কালের ক্যানভাস
        </h1>

        <p className="text-gray-600 leading-relaxed text-base md:text-lg">
          শব্দের অতীত যেখানে দৃশ্যপটে জীবন্ত হয়ে ওঠে। ফ্রেমবন্দি কিছু মুহূর্ত,
          স্মৃতি আর সময়ের শৈল্পিক দলিল। লেখকের যাত্রাপথের দৃশ্যমান পাণ্ডুলিপি।
        </p>
      </div>

      {/* Albums Grid */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {albumData.map((album) => (
          <Link
            key={album.id}
            href={`/album/${album.id}`}
            className="group"
          >
            <div className="overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
              {/* Image */}
              <div className="relative h-[180px] md:h-[200px] overflow-hidden">
                <Image
                  src={album.img}
                  alt={album.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="p-5 flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {album.title}
                </h2>

                <p className="text-blue-800 text-sm">
                  {album.totalPhotos} টি ছবি
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quate Section */}

      <div className="p-10 md:p-20 text-center bg-gray-200 my-6 font-semibold text-xl rounded">
        <q>একটি ছবি হাজারো শব্দের চেয়েও শক্তিশালী, যখন তা কালের ক্যানভাসে স্মৃতি হয়ে ধরা দেয়।</q>
      </div>
    </section>
  );
};

export default Albums;