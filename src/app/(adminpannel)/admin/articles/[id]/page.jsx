import Image from "next/image";
import Link from "next/link";
import { getArticles } from "../../../../../../services/getArticle";
import DeleteArticle from "@/components/admin/DeleteArticle";

export default async function CategoryArticles({ params }) {
  const { id } = await params;

  const articles = await getArticles({categoryId: id});

  const category = articles.length > 0 ? articles[0].category : null;

  return (
    <section>
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            {category?.title || "Articles"}
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all articles in this category.
          </p>
        </div>

        <Link
          href={`/admin/articles/${id}/add-article`}
          className="btn btn-primary"
        >
          Add Article
        </Link>
      </div>

      {/* Empty State */}
      {articles.length === 0 ? (
        <div className="bg-white rounded-xl shadow text-center py-20">
          <h2 className="text-2xl font-semibold">
            No Articles Found
          </h2>

          <p className="mt-2 text-gray-500">
            Upload your first article to this category.
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
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {articles.map((article, index) => (
                <tr key={article._id}>
                  {/* Serial */}
                  <td>{index + 1}</td>

                  {/* Image */}
                  <td>
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover w-20 h-20"
                    />
                  </td>

                  {/* Caption */}
                  <td className="max-w-sm">
                    <p className="line-clamp-2">
                      {article.title}
                    </p>
                  </td>

                  {/* Created */}
                  <td>
                    {new Date(article.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/admin/articles/${id}/edit-article/${article._id}`}
                        className="btn btn-sm btn-outline btn-info"
                      >
                        Edit
                      </Link>

                      <DeleteArticle id={article._id}></DeleteArticle>
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