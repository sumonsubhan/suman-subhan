import { getDb } from "@/lib/db";

export async function getArticleCategories({ page = 1, limit = 12 } = {}) {
  const db = await getDb();

  const skip = (Number(page) - 1) * Number(limit);

  // Total Categories
  const total = await db.collection("articleCategories").countDocuments();

  const articleCategories = await db
    .collection("articleCategories")
    .find({})
    .sort({ createdAt: -1 })
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
    totalPages: Math.ceil(total / limit),
  }
}
