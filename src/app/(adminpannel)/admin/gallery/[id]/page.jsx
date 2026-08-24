import Link from "next/link";
import Image from "next/image";
import { getAlbums } from "../../../../../../services/getAlbum";
import { getSubAlbums } from "../../../../../../services/getSubAlbums";
import Pagination from "@/components/pagination/Pagination";
import DeleteSubAlbum from "@/components/admin/DeleteSubAlbum";

export default async function AlbumDetails({ params, searchParams }) {
  const { id } = await params;
  const search = await searchParams;

  const page = Number(search.page) || 1;

  const album = await getAlbums({ id });

  const { subAlbums, total, totalPages } = await getSubAlbums({
    albumId: id,
    page,
    limit: 10,
  });

  if (!album) {
    return <div className="text-center py-20">Album not found.</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-gray-400 pb-4">
        <div>
          <h1 className="text-2xl font-bold">{album.title}</h1>

          <p className="text-gray-500 mt-1">{total} events</p>
        </div>

        <Link
          href={`/admin/gallery/${id}/add-sub-album`}
          className="btn btn-primary"
        >
          Add Event
        </Link>
      </div>

      {/* Events */}
      <div className="mt-8">
        {subAlbums.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No events found.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border bg-white shadow">
            <table className="table">
              <thead className="bg-gray-100">
                <tr>
                  <th>#</th>
                  <th>Cover</th>
                  <th>Event</th>
                  <th>Total Photos</th>
                  <th>Creation Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {subAlbums.map((subAlbum, index) => (
                  <tr key={subAlbum._id}>
                    <td>{index + 1}</td>

                    <td>
                      <Image
                        src={subAlbum.coverImage}
                        alt={subAlbum.title}
                        width={70}
                        height={50}
                        className="rounded-lg object-cover"
                      />
                    </td>

                    <td className="font-medium">{subAlbum.title}</td>

                    <td>{subAlbum.totalImages}</td>

                    <td>
                      {new Date(subAlbum.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </td>

                    <td className="flex gap-2">
                      <Link
                        href={`/admin/gallery/${id}/sub-album/edit/${subAlbum._id}`}
                        className="btn btn-sm btn-warning"
                      >
                        Edit
                      </Link>

                      <DeleteSubAlbum id={subAlbum._id} albumId={id} />

                      <Link
                        href={`/admin/gallery/${id}/sub-album/${subAlbum._id}`}
                        className="btn btn-sm btn-primary"
                      >
                        Show Photos
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        baseUrl={`/admin/gallery/${id}`}
      />
    </div>
  );
}
