import Link from "next/link";
import Image from "next/image";
import { getAlbums } from "../../../../../services/getAlbum";
import DeleteAlbum from "@/components/admin/DeleteAlbum";
import Pagination from "@/components/pagination/Pagination";

const Albums = async ({ searchParams }) => {
  const search = await searchParams;
  const page = Number(search.page) || 1;
  const { albums, total, totalPages } = await getAlbums({ page, limit: 10 });

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-gray-400 pb-2">
        <h1 className="text-2xl font-bold">Albums</h1>

        <Link href="/admin/gallery/add-album" className="btn btn-primary">
          Add Album
        </Link>
      </div>

      {/* Table */}
      <div className="mt-8 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow">
        <table className="table">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Cover</th>
              <th>Title</th>
              <th>Total Photos</th>
              <th>Creation Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {albums.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">
                  No album found.
                </td>
              </tr>
            ) : (
              albums.map((album, index) => (
                <tr key={album._id}>
                  <td>{index + 1}</td>

                  <td>
                    <Image
                      src={album.coverImage}
                      alt={album.title}
                      width={70}
                      height={50}
                      className="rounded-lg object-cover"
                    />
                  </td>

                  <td className="font-medium">{album.title}</td>

                  <td>{album.totalImages}</td>

                  <td>
                    {new Date(album.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="flex gap-2 items-center">
                    <DeleteAlbum id={album._id} />
                    <Link
                      href={`/admin/gallery/${album._id}`}
                      className="btn btn-sm btn-primary"
                    >
                      Show Album
                    </Link>
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
       baseUrl={`/admin/gallery`}
      />
    </div>
  );
};

export default Albums;
