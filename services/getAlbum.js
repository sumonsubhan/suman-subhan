import { getDb } from "@/lib/db";

export async function getAlbums() {
  const db = await getDb();

  const albums = await db
    .collection("albums")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return albums.map((album) => ({
    ...album,
    _id: album._id.toString(),
  }));
}
