import Image from "next/image";
import Link from "next/link";
import { getSongs } from "../../../../../services/getSongs";
import DeleteSong from "@/components/admin/DeleteSong";


export default async function Songs() {
  const songs = await getSongs();

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Songs
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all songs from here.
          </p>
        </div>

        <Link
          href="/admin/songs/add-song"
          className="btn btn-primary"
        >
          Add Song
        </Link>
      </div>

      {/* Empty State */}
      {songs.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-12 text-center">
          <h2 className="text-2xl font-semibold">
            No Songs Found
          </h2>

          <p className="mt-2 text-gray-500">
            Add your first song to get started.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Cover</th>
                <th>Title</th>
                <th>Created</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {songs.map((song, index) => (
                <tr key={song._id}>
                  <td>{index + 1}</td>

                  <td>
                    <Image
                      src={song.coverImage}
                      alt={song.title}
                      width={70}
                      height={70}
                      className="rounded-lg object-cover w-[70px] h-[70px]"
                    />
                  </td>

                  <td>
                    <h2 className="font-semibold">
                      {song.title}
                    </h2>
                  </td>

                  <td>
                    {new Date(song.createdAt).toLocaleDateString("bn-BD", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td>
                    <div className="flex justify-center gap-2 items-center">
                      <Link
                        href={`/admin/songs/edit/${song._id}`}
                        className="btn btn-sm btn-outline btn-info"
                      >
                        Edit
                      </Link>

                      <DeleteSong id={song._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}