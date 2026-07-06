import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/pagination/Pagination";
import { getTrendingBooks } from "../../../../../services/getTrendingBooks";
import DeleteTrendingBook from "@/components/admin/DeleteTrendingBook";

export default async function TrendingBooks({searchParams}) {
  const search = await searchParams;
  const page = Number(search.page) || 1;

  const {books, totalPages, total} = await getTrendingBooks({
    page,
    limit: 10
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">
          Total Books: {total}
        </h1>

        <Link
          href="/admin/trending-books/add-book"
          className="btn btn-primary"
        >
          Add Book
        </Link>
      </div>

      {/* Empty State */}
      {books.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-12 text-center">
          <h2 className="text-xl font-semibold">
            No books found
          </h2>

          <p className="text-gray-500 mt-2">
            Start by adding your first book.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="table">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Cover</th>
                <th>Title</th>
                <th>Created</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book, index) => (
                <tr key={book._id}>
                  <td>
                    {index+1}
                  </td>
                  {/* Cover */}
                  <td>
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      width={60}
                      height={80}
                      className="rounded object-cover border"
                    />
                  </td>

                  {/* Title */}
                  <td>
                    <div>
                      <h2 className="font-semibold">
                        {book.title}
                      </h2>

                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                        {book.shortNote}
                      </p>
                    </div>
                  </td>

                  {/* Created */}
                  <td>
                    {new Date(book.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>

                  {/* Action */}
                  <td>
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/admin/trending-book/edit/${book._id}`}
                        className="btn btn-sm btn-info"
                      >
                        Edit
                      </Link>

                      <DeleteTrendingBook
                        id={book._id}
                        imageId={book.coverImagePublicId}
                      />
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
        baseUrl={`/admin/trending-books`}
      />
    </div>
  );
}