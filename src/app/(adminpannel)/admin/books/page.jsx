import Image from "next/image";
import Link from "next/link";
import { getBooks } from "../../../../../services/getBooks";
import DeleteBook from "@/components/admin/DeleteBook";

export default async function Books() {
  const books = await getBooks();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">
          Total Books: {books.length}
        </h1>

        <Link
          href="/admin/books/add-book"
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
                <th>Cover</th>
                <th>Title</th>
                <th>Category</th>
                <th>Created</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
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

                  {/* Category */}
                  <td>
                    <span className="badge badge-outline capitalize">
                      {book.category}
                    </span>
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
                        href={`/admin/books/edit/${book._id}`}
                        className="btn btn-sm btn-info"
                      >
                        Edit
                      </Link>

                      <DeleteBook
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
    </div>
  );
}