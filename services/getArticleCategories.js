import { getDb } from "@/lib/db";

export async function getArticleCategories() {
  const db = await getDb();

  const articleCategories = await db
    .collection("articleCategories")
    .find({})
    .sort({ createdAt: 1 })
    .toArray();

  return articleCategories.map((category) => ({
    ...category,
    _id: category._id.toString(),
  }));
}
