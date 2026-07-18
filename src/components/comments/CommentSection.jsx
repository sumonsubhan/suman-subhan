import { getComments } from "../../../services/getComment";
import CommentForm from "./CommentForm";


export default async function CommentSection({
  contentId,
  contentType,
  contentTitle,
  path,
}) {
  const {comments} = await getComments({
    contentId,
    contentType,
  });

  return (
    <section className="mt-20">
      <h2 className="mb-8 text-3xl font-bold">
        মন্তব্য ({comments.length})
      </h2>

      {/* Approved Comments */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="rounded-xl border bg-gray-50 p-6 text-center text-gray-500">
            এখনো কোনো মন্তব্য নেই।
          </div>
        ) : (
          comments.map((comment) => (
            <article
              key={comment._id}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">
                  {comment.name}
                </h3>

                <span className="text-sm text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString(
                    "bn-BD",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </span>
              </div>

              <p className="mt-4 leading-7 text-gray-700 [overflow-wrap:anywhere]">
                {comment.comment}
              </p>
            </article>
          ))
        )}
      </div>

      {/* Comment Form */}
      <div className="mt-14">
        <CommentForm
          contentId={contentId}
          contentType={contentType}
          contentTitle={contentTitle}
          path={path}
        />
      </div>
    </section>
  );
}