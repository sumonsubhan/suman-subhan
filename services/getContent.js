import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export async function getContent({
  id,
  bookId,
  page = 1,
  limit = 10,
} = {}) {
  const db = await getDb();

  // Fetch single content

  if (id) {
    const content = await db
      .collection("bookContents")
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "books",
            localField: "bookId",
            foreignField: "_id",
            as: "book",
          },
        },
        {
          $unwind: "$book",
        },
        {
          $project: {
            _id: { $toString: "$_id" },
            bookId: { $toString: "$bookId" },

            title: 1,
            shortNote: 1,
            content: 1,
            coverImage: 1,
            imagePublicId: 1,
            views: 1,
            createdAt: 1,
            updatedAt: 1,

            "book._id": { $toString: "$book._id" },
            "book.title": 1,
            "book.category": 1,
            "book.categorySlug": 1,
            "book.coverImage": 1,
            "book.totalContent": 1,
            "book.views": 1,
            "book.purchaseURL": 1,
          },
        },
      ])
      .toArray();

    return content[0] || null;
  }


  // Fetch contents of a book
  const query = {};

  if (bookId) {
    query.bookId = new ObjectId(bookId);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const total = await db
    .collection("bookContents")
    .countDocuments(query);

  const contents = await db
    .collection("bookContents")
    .aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "books",
          localField: "bookId",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: Number(limit),
      },
      {
        $project: {
          _id: { $toString: "$_id" },
          bookId: { $toString: "$bookId" },

          title: 1,
          shortNote: 1,
          content: 1,
          coverImage: 1,
          views: 1,
          createdAt: 1,
          updatedAt: 1,

          "book._id": { $toString: "$book._id" },
          "book.title": 1,
          "book.category": 1,
          "book.categorySlug": 1,
          "book.coverImage": 1,
          "book.totalContent": 1,
          "book.views": 1,
          "book.purchaseURL": 1,
        },
      },
    ])
    .toArray();

  return {
    contents,
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / Number(limit)),
  };
}