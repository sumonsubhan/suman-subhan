import Link from "next/link";

import { getSubAlbums } from "../../../../../../../../../services/getSubAlbums";
import EditSubAlbum from "@/components/admin/EditSubAlbum";

export default async function EditSubAlbumPage({
  params,
}) {
  const { id, subAlbumId } = await params;

  const subAlbum = await getSubAlbums({
    id: subAlbumId,
  });

  if (!subAlbum || subAlbum.albumId !== id) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">
          Event not found
        </h1>

        <Link
          href={`/admin/gallery/${id}`}
          className="btn btn-primary mt-6"
        >
          Back to Album
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        Edit Event
      </h1>

      <EditSubAlbum
        subAlbum={subAlbum}
        albumId={id}
      />
    </div>
  );
}