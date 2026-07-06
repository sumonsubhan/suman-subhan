import { getDb } from "@/lib/db";

export async function searchArticles(keyword) {
  const db = await getDb();

  if (!keyword.trim()) {
    return [];
  }

  const pipeline = [
    {
      $match: {
        $or: [
          {
            title: {
              $regex: keyword,
              $options: "i",
            },
          },
          {
            shortNote: {
              $regex: keyword,
              $options: "i",
            },
          },
        ],
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
      $sort: {
        createdAt: -1,
      },
    },

    {
      $project: {
        _id: { $toString: "$_id" },
        categoryId: { $toString: "$categoryId" },

        title: 1,
        shortNote: 1,
        coverImage: 1,
        createdAt: 1,

        "category.title": 1,
        "category._id": {
          $toString: "$category._id",
        },
      },
    },

    {
      $limit: 20,
    },
  ];

  return db.collection("articles").aggregate(pipeline).toArray();
}