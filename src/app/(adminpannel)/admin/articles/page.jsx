import Link from "next/link";
import Image from "next/image";
import { getArticleCategories } from "../../../../../services/getArticleCategories";
import DeleteArticleCategory from "@/components/admin/DeleteArticleCategory";
import Pagination from "@/components/pagination/Pagination";

const Articles = async ({ searchParams }) => {
  const search = await searchParams;
  const page = Number(search.page) || 1;

  const { categories, total, totalPages } = await getArticleCategories({
    page,
    limit: 10,
  });

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-gray-400 pb-2">
        <h1 className="text-2xl font-bold">
          Article Categories ({total ? total : 0})
        </h1>

        <Link href="/admin/articles/add-category" className="btn btn-primary">
          Add Category
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
              <th>Total Articles</th>
              <th>Creation Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((category, index) => (
                <tr key={category._id}>
                  <td>{index + 1}</td>

                  <td>
                    <Image
                      src={category.coverImage}
                      alt={category.title}
                      width={70}
                      height={50}
                      className="rounded-lg object-cover h-auto w-auto"
                    />
                  </td>

                  <td className="font-medium">{category.title}</td>

                  <td>{category.totalArticles}</td>

                  <td>
                    {new Date(category.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/articles/edit-category/${category._id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </Link>
                      <DeleteArticleCategory id={category._id} />

                      <Link
                        href={`/admin/articles/${category._id}`}
                        className="btn btn-sm btn-primary"
                      >
                        Show Category
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
        totalPages={totalPages}
        page={page}
        baseUrl={"/admin/articles"}
      />
    </div>
  );
};

export default Articles;
