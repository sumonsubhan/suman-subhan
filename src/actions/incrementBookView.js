"use server";

import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function incrementBookView(bookId) {
  const db = await getDb();

  await db.collection("books").updateOne(
    {
      _id: new ObjectId(bookId),
    },
    {
      $inc: {
        views: 1,
      },
    }
  );
}