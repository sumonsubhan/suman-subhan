"use server";

import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/requireAdmin";

export async function deleteSong(id) {
  await requireAdmin();

  try {
    const db = await getDb();

    // Find the song
    const song = await db.collection("songs").findOne({
      _id: new ObjectId(id),
    });

    if (!song) {
      return {
        success: false,
        message: "Song not found",
      };
    }

    // Delete from Cloudinary
    if (song.publicId) {
      await cloudinary.uploader.destroy(song.publicId);
    }

    // Delete all comments for this content
    await db.collection("comments").deleteMany({
      contentId: new ObjectId(id),
    });

    // Delete from mongodb
    const result = await db.collection("songs").deleteOne({
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
      message: "Song deleted successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to delete song.",
    };
  }
}
