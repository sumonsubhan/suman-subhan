"use server";

import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function updatePhoto(formData) {

  await requireAdmin();

  try {
    const id = formData.get("id");
    const caption = formData.get("caption")?.trim();

    if (!caption) {
      return {
        success: false,
        message: "Caption is required.",
      };
    }

    const db = await getDb();

    const result = await db.collection("photos").updateOne(
      {
        _id: new ObjectId(id),
      },

      {
        $set: {
          caption,
          updatedAt: new Date(),
        },
      },
    );

    if (!result.modifiedCount) {
      return {
        success: true,
        message: "Nothing changed.",
      };
    }

    revalidatePath("/admin/gallery");

    return {
      success: true,
      message: "Photo updated successfully.",
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}
