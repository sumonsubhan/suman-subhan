"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import validateImage from "@/lib/validateImage";
import { ObjectId } from "mongodb";

export async function addContent(formData) {
  await requireAdmin();

  try {
    const bookId = formData.get("bookId");
    const title = formData.get("title")?.trim();
    const coverImage = formData.get("coverImage");
    const shortNote = formData.get("shortNote")?.trim();
    const content = formData.get("content");


    // Validation
    if ( !bookId || !title || !coverImage || coverImage.size === 0 || !shortNote || !content ) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    const validation = validateImage(coverImage, 5 * 1024 * 1024);

    if (!validation.success) {
      return validation;
    }


    const bytes = await coverImage.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "books/contents",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    const db = await getDb();

    await db.collection("bookContents").insertOne({
      bookId: new ObjectId(bookId),
      coverImage: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
      title,
      shortNote,
      content,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await db.collection("books").updateOne(
      {
        _id: new ObjectId(bookId),
      },
      {
        $inc: {
          totalContent: 1,
        },
      },
    );

    return {
      success: true,
      message: "Book content uploaded successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to upload content.",
    };
  }
}
