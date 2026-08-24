import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export async function getSubAlbums({
  id,
  albumId,
  page = 1,
  limit = 8,
} = {}) {
  const db = await getDb();

  // Get single sub album
  if (id) {
    const subAlbum = await db.collection("subAlbums").findOne({
      _id: new ObjectId(id),
    });

    if (!subAlbum) return null;

    return {
      ...subAlbum,
      _id: subAlbum._id.toString(),
      albumId: subAlbum.albumId.toString(),
    };
  }

  const query = {
    albumId: new ObjectId(albumId),
  };

  const skip = (Number(page) - 1) * Number(limit);

  const total = await db
    .collection("subAlbums")
    .countDocuments(query);

  const subAlbums = await db
    .collection("subAlbums")
    .aggregate([
      {
        $match: query,
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

      // Get 3 photos for every sub album
      {
        $lookup: {
          from: "photos",
          let: {
            subAlbumId: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$subAlbumId", "$$subAlbumId"],
                },
              },
            },
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $limit: 3,
            },
            {
              $project: {
                _id: 0,
                imageUrl: 1,
              },
            },
          ],
          as: "photos",
        },
      },

      {
        $project: {
          _id: 1,
          albumId: 1,
          title: 1,
          description: 1,
          coverImage: 1,
          totalImages: 1,
          createdAt: 1,
          updatedAt: 1,
          photos: 1,
        },
      },
    ])
    .toArray();

  return {
    subAlbums: subAlbums.map((subAlbum) => ({
      ...subAlbum,
      _id: subAlbum._id.toString(),
      albumId: subAlbum.albumId.toString(),

      // Convert:
      // [{ imageUrl: "..." }, { imageUrl: "..." }]
      //
      // to:
      // ["...", "..."]
      photos: subAlbum.photos.map(
        (photo) => photo.imageUrl
      ),
    })),

    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(
      total / Number(limit)
    ),
  };
}