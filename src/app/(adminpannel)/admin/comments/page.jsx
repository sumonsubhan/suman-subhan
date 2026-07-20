import ApproveButton from "@/components/comments/ApproveButton";
import DeleteButton from "@/components/comments/DeleteButton";
import { getComments } from "../../../../../services/getCommentsAdmin";
import Link from "next/link";
import Pagination from "@/components/pagination/Pagination";


export default async function PendingComments({searchParams}) {
  const search = await searchParams;
  const page = Number(search.page) || 1;

  const { comments, total, totalPages } = await getComments({
    approved: false,
    page: page,
    limit: 20,
  });


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
        Pending Comments ({total})
      </h1>
      <Link href="/admin/comments/approved-comments" className="btn btn-primary">Approved Comments</Link>
      </div>

      {comments.length === 0 && (
        <p>No pending comments found.</p>
      )}

      {comments.map((comment) => (
        <div
          key={comment._id}
          className="rounded-lg border-2 border-gray-200 p-5 bg-white"
        >
          <div className="flex justify-between bg-gray-200 rounded p-2">
            <div className="space-y-2">
              <h3 className="font-semibold">
                {comment.name}
              </h3>

              <p className="text-sm">
                {comment.email}
              </p>

              <p>
                Content Type: <span className="bg-yellow-300 px-2 rounded">{comment.contentType}</span>
              </p>
              <p>
                Content Title: <span className="bg-yellow-300 px-2 rounded">{comment.contentTitle}</span>
              </p>

              <p className="text-sm">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-2">
              <DeleteButton id={comment._id} />
              <ApproveButton id={comment._id}/>
            </div>
          </div>

          <p className="mt-4 whitespace-pre-wrap font-bold">
            Comment: <span className="text-green-500 [overflow-wrap:anywhere]">{comment.comment}</span>
          </p>
        </div>
      ))}

      <Pagination
      page={page}
      totalPages={totalPages}
      baseUrl={"/admin/comments"}
      />
    </div>
  );
}