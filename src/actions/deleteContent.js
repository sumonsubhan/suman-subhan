"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import { ObjectId } from "mongodb";

export async function deleteContent(contentId) {
  await requireAdmin();

  try {
    const db = await getDb();

    const content = await db.collection("bookContents").findOne({
      _id: new ObjectId(contentId),
    });

    if (!content) {
      return {
        success: false,
        message: "Content not found.",
      };
    }

    // Delete image from Cloudinary
    if (content.imagePublicId) {
      await cloudinary.uploader.destroy(content.imagePublicId);
    }

    // Delete all comments for this content
    await db.collection("comments").deleteMany({
      contentId: new ObjectId(contentId),
    });

    // Delete content
    await db.collection("bookContents").deleteOne({
      _id: new ObjectId(contentId),
    });

    // Decrease totalContent count
    await db.collection("books").updateOne(
      {
        _id: content.bookId,
      },
      {
        $inc: {
          totalContent: -1,
        },
      },
    );

    return {
      success: true,
      message: "Content deleted successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to delete content.",
    };
  }
}
