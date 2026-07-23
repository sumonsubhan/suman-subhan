import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export async function getPhoto(id) {
  const db = await getDb();

  const photo = await db.collection("photos").findOne({
    _id: new ObjectId(id),
  });

  if (!photo) return null;

  return {
    ...photo,

    _id: photo._id.toString(),

    albumId: photo.albumId.toString(),
  };
}
