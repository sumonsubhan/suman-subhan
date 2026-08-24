import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export async function getPhotos({
  subAlbumId,
  page = 1,
  limit = 12,
} = {}) {
  const db = await getDb();

  const query = {
    subAlbumId: new ObjectId(subAlbumId),
  };

  const skip =
    (Number(page) - 1) * Number(limit);

  const total = await db
    .collection("photos")
    .countDocuments(query);

  const photos = await db
    .collection("photos")
    .find(query)
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(Number(limit))
    .toArray();

  return {
    photos: photos.map((photo) => ({
      ...photo,
      _id: photo._id.toString(),
      albumId: photo.albumId.toString(),
      subAlbumId: photo.subAlbumId.toString(),
    })),

    total,

    page: Number(page),

    limit: Number(limit),

    totalPages: Math.ceil(
      total / Number(limit)
    ),
  };
}