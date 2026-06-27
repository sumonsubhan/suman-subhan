import Link from "next/link";
import React from "react";
import { getAlbums } from "../../../../../services/getAlbum";
import Image from "next/image";

const Gallery = async () => {
  const albums = await getAlbums();
  return (
    <div>
      <div className="flex justify-between items-center border-b-2 border-gray-400 pb-2">
        <h1 className="text-2xl font-bold">Gallery</h1>
        <div className="flex gap-6">
          <Link
            className="px-3 py-2 rounded text-white bg-bgprimary"
            href="/admin/gallery/add-album"
          >
            Add Album
          </Link>
        </div>
      </div>


      {/* Albums */}
      <div className="my-10">
        <h1 className="font-bold text-xl">Your Albums</h1>
        {/* Albums Grid */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album) => (
            <Link
              key={album._id}
              href={`/admin/gallery/${album._id}`}
              className="group"
            >
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
      </div>
    </div>
  );
};

export default Gallery;
