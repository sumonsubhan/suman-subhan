"use server";

import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/requireAdmin";

export async function deleteBlog(id) {
  await requireAdmin();

  try {
    const db = await getDb();

    // Find the song
    const blog = await db.collection("blogs").findOne({
      _id: new ObjectId(id),
    });

    if (!blog) {
      return {
        success: false,
        message: "Song not found",
      };
    }

    // Delete from Cloudinary
    if (blog.publicId) {
      await cloudinary.uploader.destroy(blog.publicId);
    }

    // Delete all comments for this content
    await db.collection("comments").deleteMany({
      contentId: new ObjectId(id),
    });

    // Delete from mongodb
    const result = await db.collection("blogs").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return {
        success: false,
        message: "Something Went wrong",
      };
    }

    return {
      success: true,
      message: "Blog deleted successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to delete blog.",
    };
  }
}
