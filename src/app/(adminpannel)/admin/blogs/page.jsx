import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/pagination/Pagination";
import { getBlogs } from "../../../../../services/getBlogs";
import DeleteSong from "@/components/admin/DeleteSong";
import DeleteBlog from "@/components/admin/DeleteBlog";

export default async function Blogs({ searchParams }) {
  const search = await searchParams;
  const page = Number(search.page) || 1;
  const { blogs, totalPages, total } = await getBlogs({
    page,
    limit: 10,
  });

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Blogs</h1>
          <p className="text-gray-500 mt-1">Total Blogs: {total}</p>
        </div>

        <Link href="/admin/blogs/add-blog" className="btn btn-primary">
          Add Blog
        </Link>
      </div>

      {/* Empty State */}
      {blogs.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-12 text-center">
          <h2 className="text-2xl font-semibold">No Blogs Found</h2>

          <p className="mt-2 text-gray-500">
            Add your first blog to get started.
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
              {blogs.map((blog, index) => (
                <tr key={blog._id}>
                  <td>{index + 1}</td>

                  <td>
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      width={70}
                      height={70}
                      className="rounded-lg object-cover w-[70px] h-[70px]"
                    />
                  </td>

                  <td>
                    <h2 className="font-semibold">{blog.title}</h2>
                  </td>

                  <td>
                    {new Date(blog.createdAt).toLocaleDateString("bn-BD", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td>
                    <div className="flex justify-center">
                      <DeleteBlog id={blog._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination page={page} totalPages={totalPages} baseUrl="/admin/blogs" />
    </section>
  );
}
