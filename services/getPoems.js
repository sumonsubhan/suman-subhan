import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export async function getPoems({
  id,
  limit,
} = {}) {
  const db = await getDb();

  // Fetch single poem
  if (id) {
    const poem = await db.collection("poems").findOne({
      _id: new ObjectId(id),
    });

    if (!poem) return null;

    return {
      ...poem,
      _id: poem._id.toString(),
    };
  }

  // Fetch poems
  let cursor = db
    .collection("poems")
    .find({})
    .sort({ createdAt: -1 });

  if (limit) {
    cursor = cursor.limit(limit);
  }

  const poems = await cursor.toArray();

  return poems.map((poem) => ({
    ...poem,
    _id: poem._id.toString(),
  }));
}