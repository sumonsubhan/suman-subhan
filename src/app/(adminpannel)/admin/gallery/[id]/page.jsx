import Image from "next/image";
import Link from "next/link";
import { getPhotos } from "../../../../../../services/getPhotos";
import DeleteButton from "@/components/bookCard/DeleteButton/DeleteButton";
import Pagination from "@/components/pagination/Pagination";

export default async function Photos({ params, searchParams }) {
  const { id } = await params;
  const search = await searchParams;
  const page = Number(search.page) || 1;

  const { photos, total, totalPages } = await getPhotos({
    albumId: id,
    page,
    limit: 10,
  });

  const album = photos.length > 0 ? photos[0].album : null;

  return (
    <section>
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            {album?.title || "Photo Gallery"}
          </h1>

          <p className="text-gray-500 mt-1">Total Photos: {total}</p>
        </div>

        <Link
          href={`/admin/gallery/${id}/add-photo`}
          className="btn btn-primary"
        >
          Add Photo
        </Link>
      </div>

      {/* Empty State */}
      {photos.length === 0 ? (
        <div className="bg-white rounded-xl shadow text-center py-20">
          <h2 className="text-2xl font-semibold">No Photos Found</h2>

          <p className="mt-2 text-gray-500">
            Upload your first photo to this album.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Caption</th>
                <th>Created</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {photos.map((photo, index) => (
                <tr key={photo._id}>
                  {/* Serial */}
                  <td>{index + 1}</td>

                  {/* Image */}
                  <td>
                    <Image
                      src={photo.imageUrl}
                      alt={photo.caption}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover w-20 h-20"
                    />
                  </td>

                  {/* Caption */}
                  <td className="max-w-sm">
                    <p className="line-clamp-2">{photo.caption}</p>
                  </td>

                  {/* Created */}
                  <td>
                    {new Date(photo.createdAt).toLocaleDateString("bn-BD", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/admin/gallery/${id}/edit-photo/${photo._id}`}
                        className="btn btn-sm btn-warning"
                      >
                        Edit
                      </Link>
                      <DeleteButton photoId={photo._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        baseUrl={`/admin/gallery/${id}`}
      />
    </section>
  );
}
