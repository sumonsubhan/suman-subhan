"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import validateImage from "@/lib/validateImage";

export async function addBlog(formData) {
  await requireAdmin();

  try {
    const title = formData.get("title")?.trim();
    const description = formData.get("description")?.trim();
    const videoURL = formData.get("videoURL")?.trim();
    const image = formData.get("cover");

    // Validation
    if (!title || !videoURL || !description || !image) {
      return {
        success: false,
        message: "All fields are required.",
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
            folder: "blogs",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    const db = await getDb();

    await db.collection("blogs").insertOne({
      title,
      coverImage: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      videoURL,
      description,
      createdAt: new Date(),
    });

    return {
      success: true,
      message: "Blog added successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}
