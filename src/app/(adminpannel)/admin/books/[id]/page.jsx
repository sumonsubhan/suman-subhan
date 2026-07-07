import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/pagination/Pagination";
import { getContent } from "../../../../../../services/getContent";
import DeleteContent from "@/components/admin/DeleteContent";

export default async function BookContents({ params, searchParams }) {
  const { id } = await params;

  const search = await searchParams;
  const page = Number(search.page) || 1;

  const { contents, total, totalPages } = await getContent({
    bookId: id,
    page,
    limit: 10,
  });

  const book = contents.length > 0 ? contents[0].book : null;

  return (
    <section>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {book?.title || "Book Contents"}
          </h1>

          <div className="flex gap-6 items-center mt-2">
            <p className="text-gray-500">Total Contents: {total? total: ""}</p>
            <p>Category: {book?.category}</p>
          </div>
        </div>

        <Link
          href={`/admin/books/${id}/add-content`}
          className="btn btn-primary"
        >
          Add Content
        </Link>
      </div>

      {/* Empty State */}
      {contents.length === 0 ? (
        <div className="rounded-xl bg-white py-20 text-center shadow">
          <h2 className="text-2xl font-semibold">No Contents Found</h2>

          <p className="mt-2 text-gray-500">
            Upload your first content to this book.
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
                <th>Short Note</th>
                <th>Created</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {contents.map((content, index) => (
                <tr key={content._id}>
                  {/* Serial */}
                  <td>{(page - 1) * 10 + index + 1}</td>

                  {/* Cover */}
                  <td>
                    <Image
                      src={content.coverImage}
                      alt={content.title}
                      width={70}
                      height={70}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  </td>

                  {/* Title */}
                  <td className="font-medium">{content.title}</td>

                  {/* Short Note */}
                  <td className="max-w-sm">
                    <p className="line-clamp-2">{content.shortNote}</p>
                  </td>

                  {/* Created */}
                  <td>
                    {new Date(content.createdAt).toLocaleDateString("bn-BD", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="flex justify-center gap-2">
                        <DeleteContent id={content._id}/>
                      <Link
                        href={`/admin/books/content/${content._id}/edit`}
                        className="btn btn-sm btn-outline btn-info"
                      >
                        Edit
                      </Link>
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
        baseUrl={`/admin/books/${id}`}
      />
    </section>
  );
}
