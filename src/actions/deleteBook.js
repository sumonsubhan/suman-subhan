"use server";

import { ObjectId } from "mongodb";
import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";

export async function deleteBook(id, imageId) {
  
  await requireAdmin();

  try {
    const db = await getDb();

    // Delete image from Cloudinary
    if (imageId) {
      await cloudinary.uploader.destroy(imageId);
    }

    // Delete document
    const result = await db.collection("books").deleteOne({
      _id: new ObjectId(id),
    });

    if (!result.deletedCount) {
      return {
        success: false,
        message: "Book not found.",
      };
    }

    return {
      success: true,
      message: "Book deleted successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to delete book.",
    };
  }
}