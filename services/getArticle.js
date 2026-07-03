import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export async function getArticles({
  id,
  categoryId,
  page = 1,
  limit = 5,
} = {}) {
  const db = await getDb();
  const skip = (Number(page) - 1) * Number(limit);

  // Fetch single article
  if (id) {
    const article = await db
      .collection("articles")
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "articleCategories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $project: {
            _id: { $toString: "$_id" },
            categoryId: { $toString: "$categoryId" },
            title: 1,
            shortNote: 1,
            content: 1,
            coverImage: 1,
            createdAt: 1,
            updatedAt: 1,

            "category._id": { $toString: "$category._id" },
            "category.title": 1,
            "category.coverImage": 1,
            "category.description": 1,
          },
        },
      ])
      .toArray();

    return article[0] || null;
  }

  // count total documents
  const total = await db.collection("articles").countDocuments(
    categoryId
      ? {
          categoryId: new ObjectId(categoryId),
        }
      : {},
  );

  // Build aggregation pipeline
  const pipeline = [];

  // Filter by category
  if (categoryId) {
    pipeline.push({
      $match: {
        categoryId: new ObjectId(categoryId),
      },
    });
  }

  // Join category
  pipeline.push({
    $lookup: {
      from: "articleCategories",
      localField: "categoryId",
      foreignField: "_id",
      as: "category",
    },
  });

  pipeline.push({
    $unwind: "$category",
  });

  // Sort newest first
  pipeline.push({
    $sort: {
      createdAt: -1,
    },
  });

  // Page wise skip the documnets
  pipeline.push({
    $skip: skip,
  });

  // Limit if provided
  if (limit) {
    pipeline.push({
      $limit: Number(limit),
    });
  }

  // Select fields
  pipeline.push({
    $project: {
      _id: { $toString: "$_id" },
      categoryId: { $toString: "$categoryId" },
      title: 1,
      shortNote: 1,
      content: 1,
      coverImage: 1,
      createdAt: 1,
      updatedAt: 1,

      "category._id": { $toString: "$category._id" },
      "category.title": 1,
      "category.coverImage": 1,
      "category.description": 1,
    },
  });

  const articles = await db
    .collection("articles")
    .aggregate(pipeline)
    .toArray();

  return {
    articles,
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  };
}
