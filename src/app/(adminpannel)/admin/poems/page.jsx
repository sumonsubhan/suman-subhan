import Image from "next/image";
import Link from "next/link";
import DeletePoem from "@/components/admin/DeletePoem";
import { getPoems } from "../../../../../services/getPoems";
import Pagination from "@/components/pagination/Pagination";


export default async function Poems({searchParams}) {
  const search = await searchParams;
  const page = Number(search.page) || 1;

  const {poems, totalPages, total} = await getPoems({
    page,
    limit:10,
  });

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Poems
          </h1>

          <p className="text-gray-500 mt-1">
            Total Poems: {total}
          </p>
        </div>

        <Link
          href="/admin/poems/add-poem"
          className="btn btn-primary"
        >
          Add Poem
        </Link>
      </div>

      {/* Empty State */}
      {poems.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-12 text-center">
          <h2 className="text-2xl font-semibold">
            No poems Found
          </h2>

          <p className="mt-2 text-gray-500">
            Add your first poem to get started.
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
              {poems.map((poem, index) => (
                <tr key={poem._id}>
                  <td>{index + 1}</td>

                  <td>
                    <Image
                      src={poem.coverImage}
                      alt={poem.title}
                      width={70}
                      height={70}
                      className="rounded-lg object-cover w-[70px] h-[70px]"
                    />
                  </td>

                  <td>
                    <h2 className="font-semibold">
                      {poem.title}
                    </h2>
                  </td>

                  <td>
                    {new Date(poem.createdAt).toLocaleDateString("bn-BD", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td>
                    <div className="flex justify-center">
                      <DeletePoem id={poem._id} />
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
        baseUrl={`/admin/poems`}
      ></Pagination>
    </section>
  );
}