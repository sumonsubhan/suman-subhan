import Image from "next/image";
import { FaCameraRetro } from "react-icons/fa";
import { getPhotos } from "../../../../../services/getPhotos";
import Pagination from "@/components/pagination/Pagination";

export const metadata = {
  title: "কালের ক্যানভাস",
}

export default async function Photos({ params, searchParams }) {
  const { id } = await params;
  const search = await searchParams;
  const page = Number(search.page) || 1;

  const {photos, total, totalPages} = await getPhotos({
    albumId: id,
    page,
    limit:8
  });

  const album = photos.length > 0 ? photos[0].album : null;

  return (
    <section className="py-10">
      {/* Album Header */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <p className="text-bgprimary font-medium">
          আলোকচিত্র সংগ্রহশালা
        </p>

        <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold">
          {album?.title || "Photo Gallery"}
        </h1>

        <p className="mt-5 text-gray-600 leading-8 text-base md:text-lg">
          {album?.description ||
            "এই অ্যালবামে এখনও কোনো ছবি যোগ করা হয়নি।"}
        </p>

        {photos.length > 0 && (
          <div className="mt-8 flex justify-center items-center gap-6 text-sm text-gray-500">
            <span>{total} টি ছবি</span>

            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />

            <span>
              সর্বশেষ আপডেট{" "}
              {new Date(photos[0].createdAt).toLocaleDateString("bn-BD", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        )}
      </div>

      {/* Empty State */}
      {photos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 py-28 text-center bg-gray-50">
          <FaCameraRetro className="mx-auto text-5xl text-gray-400" />

          <h2 className="mt-6 text-2xl font-semibold">
            কোনো ছবি পাওয়া যায়নি
          </h2>

          <p className="mt-3 text-gray-500">
            এই অ্যালবামে এখনো কোনো ছবি যোগ করা হয়নি।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {photos.map((photo) => (
            <article
              key={photo._id}
              className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={photo.imageUrl}
                  alt={photo.caption}
                  fill
                  sizes="(max-width:640px)100vw,
                         (max-width:1024px)50vw,
                         (max-width:1280px)33vw,
                         25vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="leading-7 text-gray-800 min-h-[72px]">
                  {photo.caption}
                </p>

                <div className="mt-5 pt-4 border-t flex items-center justify-between text-sm text-gray-500">
                  <span>
                    {new Date(photo.createdAt).toLocaleDateString("bn-BD", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>

                  <FaCameraRetro className="text-bgprimary" />
                </div>
              </div>
            </article>
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