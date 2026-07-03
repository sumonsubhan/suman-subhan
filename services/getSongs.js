import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export async function getSongs({
  id,
  page = 1,
  limit = 10,
} = {}) {
  const db = await getDb();

  // Fetch single song
  if (id) {
    const song = await db.collection("songs").findOne({
      _id: new ObjectId(id),
    });

    if (!song) return null;

    return {
      ...song,
      _id: song._id.toString(),
    };
  }

  const skip = (Number(page) - 1) * Number(limit);

  // Total songs
  const total = await db.collection("songs").countDocuments();

  // Fetch songs
  const songs = await db
    .collection("songs")
    .find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .toArray();

  return {
    songs: songs.map((song) => ({
      ...song,
      _id: song._id.toString(),
    })),
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  };
}