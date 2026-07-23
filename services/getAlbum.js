import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function getAlbums({
  id,
  page = 1,
  limit = 12
} = {}) {

  const db = await getDb();

  // Single album
  if(id){

    const album = await db.collection("albums").findOne({
      _id:new ObjectId(id)
    });

    if(!album) return null;

    return {
      ...album,
      _id:album._id.toString()
    }

  }

  const skip = (Number(page)-1)*Number(limit);

  const total = await db.collection("albums").countDocuments();

  const albums = await db.collection("albums")
    .find({})
    .sort({
      createdAt:-1
    })
    .skip(skip)
    .limit(Number(limit))
    .toArray();

  return {
    albums:albums.map(album=>({
      ...album,
      _id:album._id.toString()
    })),
    total,
    page:Number(page),
    limit:Number(limit),
    totalPages:Math.ceil(total/limit)
  }
}