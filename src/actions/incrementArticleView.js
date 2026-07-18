"use server";

import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function incrementArticleView(articleId) {
  const db = await getDb();

  await db.collection("articles").updateOne(
    {
      _id: new ObjectId(articleId),
    },
    {
      $inc: {
        views: 1,
      },
    }
  );
}