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

    // Get all contents of this book
    const contents = await db
      .collection("bookContents")
      .find({
        bookId: new ObjectId(bookId),
      })
      .toArray();

    // Delete book cover from Cloudinary
    if (book.coverImagePublicId) {
      await cloudinary.uploader.destroy(book.coverImagePublicId);
    }

    // Delete all content images
    await Promise.all(
      contents.map(async (content) => {
        if (content.imagePublicId) {
          await cloudinary.uploader.destroy(content.imagePublicId);
        }
      })
    );

    // Delete all contents
    await db.collection("bookContents").deleteMany({
      bookId: new ObjectId(bookId),
    });

    // Delete book
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