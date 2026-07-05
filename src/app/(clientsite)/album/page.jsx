import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getAlbums } from "../../../../services/getAlbum";

const Albums = async () => {
  const albums = await getAlbums();

  return (
    <section className="px-4 md:px-8 lg:px-12 xl:px-20 py-12">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-bgprimary font-medium mb-3">আলোকচিত্র সংগ্রহশালা</p>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          কালের ক্যানভাস
        </h1>

        <p className="text-gray-600 leading-relaxed text-base md:text-lg">
          শব্দ যেখানে রূপ নেয় দৃশ্যে আর অতীত এসে থমকে দাঁড়ায় বর্তমানের দর্পণে।
          এটি কেবল কিছু ছবির কোলাজ নয়, বরং জীবন ও সময়ের গতিপথের এক নান্দনিক
          চালচিত্র।
        </p>
      </div>

      {/* Albums Grid */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {albums.map((album) => (
          <Link key={album._id} href={`/album/${album._id}`} className="group">
            <div className="overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
              {/* Image */}
              <div className="relative h-[180px] md:h-[200px] overflow-hidden">
                <Image
                  src={album.coverImage}
                  alt={album.title}
                  fill
                  sizes="(max-width: 640px) 100vw,
                         (max-width: 1024px) 50vw,
                        33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="p-5 flex justify-between items-center">
                <h2 className="text-xl font-bold">{album.title}</h2>

                <p className="text-blue-800 text-sm">
                  {album.totalImages} টি ছবি
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quate Section */}

      <div className="p-10 md:p-20 text-center bg-gray-200 my-6 font-semibold text-xl rounded">
        <q>
          একটি ছবি হাজারো শব্দের চেয়েও শক্তিশালী, যখন তা কালের ক্যানভাসে স্মৃতি
          হয়ে ধরা দেয়।
        </q>
      </div>
    </section>
  );
};

export default Albums;
