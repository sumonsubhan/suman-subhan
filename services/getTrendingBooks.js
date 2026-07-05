import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export async function getTrendingBooks({
  id,
  page = 1,
  limit = 10,
} = {}) {
  const db = await getDb();

  // Fetch single book
  if (id) {
    const book = await db.collection("trendingBooks").findOne({
      _id: new ObjectId(id),
    });

    if (!book) return null;

    return {
      ...book,
      _id: book._id.toString(),
    };
  }


  const skip = (Number(page) - 1) * Number(limit);

  // Total books
  const total = await db.collection("trendingBooks").countDocuments();

  // Fetch books
  const books = await db
    .collection("trendingBooks")
    .find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .toArray();

  return {
    books: books.map((book) => ({
      ...book,
      _id: book._id.toString(),
    })),
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / Number(limit)),
  };
}