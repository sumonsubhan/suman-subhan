import Link from "next/link";
import Image from "next/image";
import { getBooks } from "../../../../../services/getBooks";
import DeleteBook from "@/components/admin/DeleteBook";
import Pagination from "@/components/pagination/Pagination";

const Books = async ({ searchParams }) => {
  const search = await searchParams;
  const page = Number(search.page) || 1;
  const { books, total, totalPages } = await getBooks({ page, limit: 10 });

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-gray-400 pb-2">
        <h1 className="text-2xl font-bold">Total Books: {total ? total : 0}</h1>

        <Link href="/admin/books/add-book" className="btn btn-primary">
          Add Book
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
              <th>Total Content</th>
              <th>Category</th>
              <th>Creation Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {books.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">
                  No Book found.
                </td>
              </tr>
            ) : (
              books.map((book, index) => (
                <tr key={book._id}>
                  <td>{index + 1}</td>

                  <td>
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      width={50}
                      height={20}
                      className="rounded-lg object-cover h-auto w-auto"
                    />
                  </td>

                  <td className="font-medium">{book.title}</td>

                  <td>{book.totalContent}</td>

                  <td>{book.category}</td>

                  <td>
                    {new Date(book.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/books/edit/${book._id}`}
                        className="btn btn-sm btn-warning"
                      >
                        Edit
                      </Link>

                      <DeleteBook id={book._id} />
                      <Link
                        href={`/admin/books/${book._id}`}
                        className="btn btn-sm btn-primary"
                      >
                        View Book
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        baseUrl={`/admin/books`}
      />
    </div>
  );
};

export default Books;
