import Image from "next/image";
import Link from "next/link";
import { getPhotos } from "../../../../../../services/getPhotos";
import DeleteButton from "@/components/bookCard/DeleteButton/DeleteButton";

export default async function Photos({ params }) {
  const { id } = await params;

  const photos = await getPhotos(id);
  const album = photos.length > 0 ? photos[0].album : null;

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="mt-3 text-2xl font-bold">
          {album?.title || "Photo Gallery"}
        </h1>

        <Link
          href={`/admin/gallery/${id}/add-photo`}
          className="btn btn-primary"
        >
          Add Photo
        </Link>
      </div>

      {photos.length === 0 ? (
        <div className="text-center py-20 border rounded-xl bg-white">
          <p className="text-gray-500">No photos uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
          {photos.map((photo) => (
            <div
              key={photo._id}
              className="rounded-lg overflow-hidden bg-white shadow"
            >
              <div className="relative aspect-square">
                <Image
                  src={photo.imageUrl}
                  alt={photo.caption}
                  fill
                  sizes="(max-width:768px) 50vw, (max-width:1280px) 33vw, 20vw"
                  className="object-cover"
                />
              </div>

              <div className="p-3">
                <p className="line-clamp-2">{photo.caption}</p>
                <div className="flex justify-between items-center my-2">
                  <p className="text-sm">{photo.createdAt.toLocaleString()}</p>
                  <DeleteButton photoId={photo._id}></DeleteButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
