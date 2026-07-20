"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import { ObjectId } from "mongodb";

export async function deleteBook(bookId) {
  await requireAdmin();

  try {
    const db = await getDb();

    const book = await db.collection("books").findOne({
      _id: new ObjectId(bookId),
    });

    if (!book) {
      return {
        success: false,
        message: "Book not found.",
      };
    }

    // Check if the book has any content
    const hasContent = await db.collection("bookContents").findOne({
      bookId: new ObjectId(bookId),
    });

    if (hasContent) {
      return {
        success: false,
        message:
          "This book cannot be deleted because it contains content. Please delete all book contents first.",
      };
    }

    // Delete cover image from Cloudinary
    if (book.coverImagePublicId) {
      await cloudinary.uploader.destroy(book.coverImagePublicId);
    }

    // Delete the book
    await db.collection("books").deleteOne({
      _id: new ObjectId(bookId),
    });

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