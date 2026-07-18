import { getDb } from "@/lib/db";

export async function getComments({
  approved,
  page = 1,
  limit = 10,
} = {}) {
  const db = await getDb();

  const query = {};

  if (approved !== undefined) {
    query.approved = approved;
  }

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
    })),
    total,
    totalPages: Math.ceil(total / limit),
  };
}