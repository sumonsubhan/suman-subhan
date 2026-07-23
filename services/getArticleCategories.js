import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export async function getArticleCategories({
  id,
  page = 1,
  limit = 12,
} = {}) {
  const db = await getDb();

  // Get single category
  if (id) {
    const category = await db.collection("articleCategories").findOne({
      _id: new ObjectId(id),
    });

    if (!category) return null;

    return {
      ...category,
      _id: category._id.toString(),
    };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const total = await db.collection("articleCategories").countDocuments();

  const articleCategories = await db
    .collection("articleCategories")
    .find({})
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(Number(limit))
    .toArray();

  return {
    categories: articleCategories.map((category) => ({
      ...category,
      _id: category._id.toString(),
    })),
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / Number(limit)),
  };
}