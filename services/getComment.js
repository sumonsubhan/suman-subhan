import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

const ALLOWED_TYPES = [
  "book",
  "article",
  "poem",
  "song",
  "blog",
  "album"
];

export async function getComments({
  contentId,
  contentType,
  page = 1,
  limit = 10,
}) {
  const db = await getDb();

  // Validate
  if (
    !ObjectId.isValid(contentId) ||
    !ALLOWED_TYPES.includes(contentType)
  ) {
    return {
      comments: [],
      total: 0,
      page: 1,
      totalPages: 0,
    };
  }

  const query = {
    contentId: new ObjectId(contentId),
    contentType,
    approved: true,
  };

  const skip = (page - 1) * limit;

  const total = await db.collection("comments").countDocuments(query);

  const comments = await db
    .collection("comments")
    .find(query)
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit)
    .toArray();

  return {
    comments: comments.map((comment) => ({
      ...comment,
      _id: comment._id.toString(),
      contentId: comment.contentId.toString(),
    })),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}