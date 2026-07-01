import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export async function getBooks({
  id,
  category,
  limit,
} = {}) {
  const db = await getDb();

  // Fetch a single book
  if (id) {
    const book = await db.collection("books").findOne({
      _id: new ObjectId(id),
    });

    if (!book) return null;

    return {
      ...book,
      _id: book._id.toString(),
    };
  }

  // Build query
  const query = {};

  if (category) {
    query.category = category;
  }

  let cursor = db
    .collection("books")
    .find(query)
    .sort({ createdAt: -1 });

  if (limit) {
    cursor = cursor.limit(limit);
  }

  const books = await cursor.toArray();

  return books.map((book) => ({
    ...book,
    _id: book._id.toString(),
  }));
}