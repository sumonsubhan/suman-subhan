import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export async function getPhotos(albumId) {
  const db = await getDb();

  const photos = await db
    .collection("photos")
    .aggregate([
      {
        $match: {
          albumId: new ObjectId(albumId),
        },
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
    
  return photos;
}