"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import validateImage from "@/lib/validateImage";

export async function addPoem(formData) {
  await requireAdmin();

  try {
    const title = formData.get("title");
    const bookTitle = formData.get("bookTitle");
    const videoURL = formData.get("videoURL");
    const purchaseURL = formData.get("purchaseURL")?.trim() || "";
    const description = formData.get("description");
    const image = formData.get("cover");

    // Validation
    if (!title || !bookTitle || !videoURL || !description || !image) {
      return {
        success: false,
        message: "All fields are required except purchase url.",
      };
    }

    const validation = validateImage(image, 5 * 1024 * 1024);

    if (!validation.success) {
      return validation;
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "poems",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    const db = await getDb();

    await db.collection("poems").insertOne({
      title,
      bookTitle,
      coverImage: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      videoURL,
      purchaseURL,
      description,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      success: true,
      message: "Poem added successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}
