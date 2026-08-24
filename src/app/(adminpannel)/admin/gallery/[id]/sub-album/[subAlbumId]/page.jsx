import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

import Pagination from "@/components/pagination/Pagination";
import { getAlbums } from "../../../../../../../../services/getAlbum";
import { getSubAlbums } from "../../../../../../../../services/getSubAlbums";
import { getPhotos } from "../../../../../../../../services/getPhotos";
import DeletePhoto from "@/components/admin/DeletePhoto";

const Photos = async ({ params, searchParams }) => {
  const { id, subAlbumId } = await params;
  const search = await searchParams;

  const page = Number(search.page) || 1;

  // Get main album
  const album = await getAlbums({
    id,
  });

  // Get sub album
  const subAlbum = await getSubAlbums({
    id: subAlbumId,
  });

  // Album not found
  if (!album) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">Album not found</h1>
      </div>
    );
  }

  // Sub album not found
  if (!subAlbum) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">Event not found</h1>
      </div>
    );
  }

  // Make sure this sub album belongs to this album
  if (subAlbum.albumId !== id) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">Invalid event</h1>
      </div>
    );
  }

  // Get photos
  const { photos, total, totalPages } = await getPhotos({
    subAlbumId,
    page,
    limit: 10,
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b-2 border-gray-400 pb-4">
        <div>
          <h1 className="text-2xl font-bold">{subAlbum.title}</h1>

          <p className="text-gray-500 mt-1">
            Main Album:{" "}
            <span className="font-medium text-gray-700">{album.title}</span>
          </p>

          <p className="text-gray-500 mt-1">Total Photos: {total}</p>
        </div>

        <Link
          href={`/admin/gallery/${id}/sub-album/${subAlbumId}/add-photo`}
          className="btn btn-primary"
        >
          <FaPlus />
          Add Photo
        </Link>
      </div>

      {/* Photos Table */}
      <div className="mt-8 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow">
        <table className="table">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Upload Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {photos.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-500">
                  No photos found.
                </td>
              </tr>
            ) : (
              photos.map((photo, index) => (
                <tr key={photo._id}>
                  {/* Number */}
                  <td>{(page - 1) * 10 + index + 1}</td>

                  {/* Photo */}
                  <td>
                    <Image
                      src={photo.imageUrl}
                      alt={photo.caption || "Photo"}
                      width={100}
                      height={70}
                      className="w-24 h-16 object-cover rounded-lg"
                    />
                  </td>


                  {/* Date */}
                  <td>
                    {new Date(photo.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  {/* Action */}
                  <td>
                    <div className="flex items-center gap-2">
                      <DeletePhoto
                        id={photo._id}
                        subAlbumId={subAlbumId}
                        albumId={id}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

     
        <Pagination
          totalPages={totalPages}
          page={page}
          baseUrl={`/admin/gallery/${id}/sub-album/${subAlbumId}`}
        />
      
    </div>
  );
};

export default Photos;
