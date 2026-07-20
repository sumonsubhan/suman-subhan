import DeleteButton from "@/components/comments/DeleteButton";
import { getComments } from "../../../../../../services/getCommentsAdmin";
import Pagination from "@/components/pagination/Pagination";

export default async function ApprovedComments({searchParams}) {
  const search = await searchParams;
  const page = Number(search.page) || 1;

  const { comments, total, totalPages } = await getComments({
    approved: true,
    page: page,
    limit: 20,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Approved Comments ({total})</h1>

      {comments.length === 0 && <p>No approved comments.</p>}

      {comments.map((comment) => (
        <div key={comment._id} className="rounded-lg border-2 border-gray-200 p-5 bg-white">
          <div className="flex justify-between bg-gray-200 p-2 rounded">
            <div className="space-y-2">
              <h3 className="font-semibold">{comment.name}</h3>

              <p>{comment.email}</p>

              <p>
                Content Type: <span className="bg-yellow-300 rounded px-2">{comment.contentType}</span>
              </p>
              <p>
                Content Title: <span className="bg-yellow-300 rounded px-2">{comment.contentTitle}</span>
              </p>

              <p className="text-sm">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="">
              <DeleteButton id={comment._id} />
            </div>
          </div>

          <p className="mt-4 whitespace-pre-wrap font-bold">Comment: <span className="text-green-500 [overflow-wrap:anywhere]">{comment.comment}</span></p>
        </div>
      ))}

      <Pagination
        page={page}
        totalPages={totalPages}
        baseUrl={"/admin/comments/approved-comments"}
      />
    </div>
  );
}
