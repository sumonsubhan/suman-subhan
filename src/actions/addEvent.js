"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";

export async function addEvent(formData) {

  await requireAdmin();
  
  try {
    const title = formData.get("title")?.trim();
    const coverImage = formData.get("coverImage");

    // Validation
    if (!title || !coverImage) {
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
            folder: "trendingBooks",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        )
        .end(buffer);
    });

    const db = await getDb();

    const result = await db.collection("events").insertOne({
      title,
      coverImage: uploadedImage.secure_url,
      coverImagePublicId: uploadedImage.public_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!result.acknowledged) {
      return {
        success: false,
        message: "Failed to publish event.",
      };
    }

    return {
      success: true,
      message: "Event published successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}
