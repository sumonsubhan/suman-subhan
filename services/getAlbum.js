import { getDb } from "@/lib/db";

export async function getAlbums({ page = 1, limit = 12 } = {}) {
  const db = await getDb();

  const skip = (Number(page) - 1) * Number(limit);

  // Total albums
  const total = await db.collection("albums").countDocuments();

  const albums = await db
    .collection("albums")
    .find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .toArray();

  return {
    albums: albums.map((album) => ({
      ...album,
      _id: album._id.toString(),
    })),
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  }
}
