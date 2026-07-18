"use server";

import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import { revalidatePath } from "next/cache";

export async function approveComment(id) {
  await requireAdmin();

  try {
    const db = await getDb();

    const result = await db.collection("comments").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          approved: true,
          approvedAt: new Date(),
        },
      }
    );

    if (!result.modifiedCount) {
      return {
        success: false,
        message: "Comment not found.",
      };
    }

    revalidatePath("/admin/comments");

    return {
      success: true,
      message: "Comment approved.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to approve comment.",
    };
  }
}