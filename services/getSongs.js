import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export async function getSongs(id = null) {
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

  // Fetch all songs
  const songs = await db
    .collection("songs")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return songs.map((song) => ({
    ...song,
    _id: song._id.toString(),
  }));
}