import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export async function getEvents({
  id,
  page = 1,
  limit = 10,
} = {}) {
  const db = await getDb();

  // Fetch single event
  if (id) {
    const event = await db.collection("events").findOne({
      _id: new ObjectId(id),
    });

    if (!event) return null;

    return {
      ...event,
      _id: event._id.toString(),
    };
  }


  const skip = (Number(page) - 1) * Number(limit);

  // Total events
  const total = await db.collection("events").countDocuments();

  // Fetch events
  const events = await db
    .collection("events")
    .find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .toArray();

  return {
    events: events.map((event) => ({
      ...event,
      _id: event._id.toString(),
    })),
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / Number(limit)),
  };
}