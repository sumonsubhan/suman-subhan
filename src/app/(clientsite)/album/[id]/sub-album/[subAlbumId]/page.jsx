import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaCameraRetro } from "react-icons/fa";


import Pagination from "@/components/pagination/Pagination";
import CommentSection from "@/components/comments/CommentSection";
import { getSubAlbums } from "../../../../../../../services/getSubAlbums";
import { getPhotos } from "../../../../../../../services/getPhotos";

export const metadata = {
  title: "কালের ক্যানভাস",
};

export default async function Photos({
  params,
  searchParams,
}) {
  const { id, subAlbumId } = await params;
  const search = await searchParams;

  const page = Number(search.page) || 1;

  // Get sub album
  const subAlbum = await getSubAlbums({
    id: subAlbumId,
  });

  // Sub album not found
  if (!subAlbum) {
    return (
      <section className="py-24 text-center">
        <h1 className="text-3xl font-bold">
          ইভেন্ট পাওয়া যায়নি
        </h1>

        <p className="mt-4 text-gray-500">
          আপনি যে ইভেন্টটি খুঁজছেন সেটি পাওয়া যায়নি।
        </p>
      </section>
    );
  }

  // Make sure this sub album actually belongs
  // to the current main album
  if (subAlbum.albumId !== id) {
    return (
      <section className="py-24 text-center">
        <h1 className="text-3xl font-bold">
          ইভেন্ট পাওয়া যায়নি
        </h1>

        <p className="mt-4 text-gray-500">
          এই ইভেন্টটি এই অ্যালবামের অন্তর্ভুক্ত নয়।
        </p>
      </section>
    );
  }

  // Get photos of this sub album
  const {
    photos,
    total,
    totalPages,
  } = await getPhotos({
    subAlbumId,
    page,
    limit: 8,
  });

  return (
    <section className="py-10">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href={`/album/${id}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-bgprimary transition-colors"
        >
          <FaArrowLeft />

          <span>ফিরে যান</span>
        </Link>
      </div>

      {/* Event Header */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <p className="text-bgprimary font-medium">
          আলোকচিত্র সংগ্রহশালা
        </p>

        <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold">
          {subAlbum.title}
        </h1>

        <p className="mt-5 text-gray-600 leading-8 text-base md:text-lg">
          {subAlbum.description}
        </p>

        <div className="mt-8 flex justify-center items-center gap-6 text-sm text-gray-500">
          <span>
            {total} টি ছবি
          </span>

          <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />

          <span>
            সর্বশেষ আপডেট{" "}
            {new Date(
              subAlbum.updatedAt || subAlbum.createdAt
            ).toLocaleDateString("bn-BD", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Photos */}
      {photos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 py-28 text-center bg-gray-50">
          <FaCameraRetro className="mx-auto text-5xl text-gray-400" />

          <h2 className="mt-6 text-2xl font-semibold">
            কোনো ছবি পাওয়া যায়নি
          </h2>

          <p className="mt-3 text-gray-500">
            এই ইভেন্টে বর্তমানে কোনো ছবি প্রকাশিত হয়নি।
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
                  alt={photo.caption || subAlbum.title}
                  fill
                  sizes="(max-width:640px)100vw,
                         (max-width:1024px)50vw,
                         (max-width:1280px)33vw,
                         25vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Photo Information */}
              <div className="p-5">

                <div className="mt-5 pt-4 border-t flex items-center justify-between text-sm text-gray-500">
                  <span>
                    {new Date(
                      photo.createdAt
                    ).toLocaleDateString("bn-BD", {
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

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          baseUrl={`/album/${id}/sub-album/${subAlbumId}`}
        />
      )}

      {/* Comments */}
      <CommentSection
        contentId={subAlbum._id}
        contentType="photo"
        contentTitle={subAlbum.title}
        path={`/album/${id}/sub-album/${subAlbumId}`}
      />
    </section>
  );
}