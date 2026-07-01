"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";

export async function addBook(formData) {
  try {
    const title = formData.get("title")?.trim();
    const bookName = formData.get("bookName")?.trim();
    const category = formData.get("category");
    const shortNote = formData.get("shortNote")?.trim();
    const content = formData.get("content");
    const coverImage = formData.get("coverImage");

    // Validation
    if (!title || !bookName || !category || !shortNote || !content || !coverImage) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    // Upload image to Cloudinary

    const bytes = await coverImage.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadedImage = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "books",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        )
        .end(buffer);
    });

    const db = await getDb();

    const result = await db.collection("books").insertOne({
      title,
      bookName,
      category,
      shortNote,
      content,
      coverImage: uploadedImage.secure_url,
      coverImagePublicId: uploadedImage.public_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!result.acknowledged) {
      return {
        success: false,
        message: "Failed to publish book.",
      };
    }

    return {
      success: true,
      message: "Book published successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}
