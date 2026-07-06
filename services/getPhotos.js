import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export async function getPhotos({
  albumId,
  page = 1,
  limit = 10,
} = {}) {
  const db = await getDb();

  const query = {
    albumId: new ObjectId(albumId),
  };

  const skip = (Number(page) - 1) * Number(limit);

  // Count only photos of this album
  const total = await db.collection("photos").countDocuments(query);

  const photos = await db
    .collection("photos")
    .aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "albums",
          localField: "albumId",
          foreignField: "_id",
          as: "album",
        },
      },
      {
        $unwind: "$album",
      },
      {
        $sort: {
          createdAt: -1,
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
          albumId: { $toString: "$albumId" },
          imageUrl: 1,
          caption: 1,
          createdAt: 1,

          "album._id": { $toString: "$album._id" },
          "album.title": 1,
          "album.coverImage": 1,
          "album.description": 1,
        },
      },
    ])
    .toArray();

  return {
    photos,
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / Number(limit)),
  };
}