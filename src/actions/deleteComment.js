"use server";

import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import { revalidatePath } from "next/cache";

export async function deleteComment(id) {
  await requireAdmin();

  try {
    const db = await getDb();

    const result = await db.collection("comments").deleteOne({
      _id: new ObjectId(id),
    });

    if (!result.deletedCount) {
      return {
        success: false,
        message: "Comment not found.",
      };
    }

    revalidatePath("/admin/comments");

    return {
      success: true,
      message: "Comment deleted.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to delete comment.",
    };
  }
}