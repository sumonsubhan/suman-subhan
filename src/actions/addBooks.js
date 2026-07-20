"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import validateImage from "@/lib/validateImage";

export async function addBook(formData) {
  await requireAdmin();

  try {
    const title = formData.get("title")?.trim();
    const category = formData.get("category");
    const categorySlug = formData.get("categorySlug");
    const coverImage = formData.get("coverImage");
    const purchaseURL = formData.get("purchaseURL")?.trim() || "";

    // Validation
    if (!title || !category || !categorySlug || !coverImage) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    const validation = validateImage(coverImage, 5 * 1024 * 1024);

    if (!validation.success) {
      return validation;
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
      category,
      categorySlug,
      purchaseURL,
      coverImage: uploadedImage.secure_url,
      coverImagePublicId: uploadedImage.public_id,
      views: 0,
      totalContent: 0,
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
