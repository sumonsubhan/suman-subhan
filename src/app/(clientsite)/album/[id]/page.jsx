import Image from "next/image";
import Link from "next/link";
import { FaCameraRetro } from "react-icons/fa";

import Pagination from "@/components/pagination/Pagination";
import { getAlbums } from "../../../../../services/getAlbum";
import { getSubAlbums } from "../../../../../services/getSubAlbums";

export const metadata = {
  title: "কালের ক্যানভাস",
};

export default async function Album({ params, searchParams }) {
  const { id } = await params;
  const search = await searchParams;

  const page = Number(search.page) || 1;

  // Get main album
  const album = await getAlbums({
    id,
  });

  // Get sub albums / events
  const { subAlbums, total, totalPages } = await getSubAlbums({
    albumId: id,
    page,
    limit: 8,
  });

  // Main album not found
  if (!album) {
    return (
      <section className="py-24 text-center">
        <h1 className="text-3xl font-bold">অ্যালবাম পাওয়া যায়নি</h1>

        <p className="mt-4 text-gray-500">
          আপনি যে অ্যালবামটি খুঁজছেন সেটি পাওয়া যায়নি।
        </p>
      </section>
    );
  }

  return (
    <section className="py-10">
      {/* Album Header */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <p className="text-bgprimary font-medium">আলোকচিত্র সংগ্রহশালা</p>

        <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold">
          {album.title}
        </h1>

        <p className="mt-5 text-gray-600 leading-8 text-base md:text-lg">
          {album.description}
        </p>

        <div className="mt-8 flex justify-center items-center gap-6 text-sm text-gray-500">
          <span>{album.totalImages || 0} টি ছবি</span>

          <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />

          <span>{total} টি ইভেন্ট</span>
        </div>
      </div>

      {/* Sub Albums / Events */}
      {subAlbums.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 py-28 text-center bg-gray-50">
          <FaCameraRetro className="mx-auto text-5xl text-gray-400" />

          <h2 className="mt-6 text-2xl font-semibold">
            কোনো ইভেন্ট পাওয়া যায়নি
          </h2>

          <p className="mt-3 text-gray-500">
            এই অ্যালবামে বর্তমানে কোনো ইভেন্ট যোগ করা হয়নি।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {subAlbums.map((subAlbum) => (
            <Link
              key={subAlbum._id}
              href={`/album/${id}/sub-album/${subAlbum._id}`}
              className="group"
            >
              <article className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                {/* Cover Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {subAlbum.photos?.length === 1 && (
                    <Image
                      src={subAlbum.photos[0]}
                      alt={subAlbum.title}
                      fill
                      sizes="(max-width:640px)100vw,
             (max-width:1024px)50vw,
             (max-width:1280px)33vw,
             25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}

                  {subAlbum.photos?.length === 2 && (
                    <div className="grid grid-cols-2 h-full gap-1">
                      {subAlbum.photos.map((photo, index) => (
                        <div key={index} className="relative overflow-hidden">
                          <Image
                            src={photo}
                            alt={`${subAlbum.title} ${index + 1}`}
                            fill
                            sizes="50vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {subAlbum.photos?.length >= 3 && (
                    <div className="grid grid-cols-2 h-full gap-1">
                      {/* Large first image */}
                      <div className="relative overflow-hidden">
                        <Image
                          src={subAlbum.photos[0]}
                          alt={subAlbum.title}
                          fill
                          sizes="50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Two smaller images */}
                      <div className="grid grid-rows-2 gap-1">
                        {subAlbum.photos.slice(1, 3).map((photo, index) => (
                          <div key={index} className="relative overflow-hidden">
                            <Image
                              src={photo}
                              alt={`${subAlbum.title} ${index + 2}`}
                              fill
                              sizes="25vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Fallback if no photos */}
                  {(!subAlbum.photos || subAlbum.photos.length === 0) && (
                    <div className="h-full flex items-center justify-center bg-gray-100">
                      <FaCameraRetro className="text-5xl text-gray-400" />
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300 pointer-events-none" />
                </div>

                {/* Event Information */}
                <div className="p-5">
                  <h2 className="text-xl font-bold line-clamp-1">
                    {subAlbum.title}
                  </h2>

                  <p className="mt-2 text-gray-600 text-sm leading-6 line-clamp-1">
                    {subAlbum.description}
                  </p>

                  <div className="mt-5 pt-4 border-t flex items-center justify-between text-sm text-gray-500">
                    <span>{subAlbum.totalImages || 0} টি ছবি</span>

                    <span>
                      {new Date(subAlbum.createdAt).toLocaleDateString(
                        "bn-BD",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        baseUrl={`/album/${id}`}
      />
    </section>
  );
}
