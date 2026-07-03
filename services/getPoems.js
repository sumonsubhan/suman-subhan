import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export async function getPoems({
  id,
  page = 1,
  limit = 10,
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

  const skip = (Number(page) - 1) * Number(limit);

    // Total poems
  const total = await db.collection("poems").countDocuments();

  // Fetch poems
  const poems = await db
    .collection("poems")
    .find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .toArray();

  return {
    poems: poems.map((poem) => ({
      ...poem,
      _id: poem._id.toString(),
    })),
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  };
}