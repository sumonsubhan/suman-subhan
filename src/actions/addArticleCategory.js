"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";

export async function addArticleCategory(formData) {
  try {
    const title = formData.get("title")?.trim();
    const description = formData.get("description")?.trim();
    const image = formData.get("cover");

    // Validation
    if (!title || !description || !image || image.size === 0) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    // Convert image to buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const imageUrl = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "articleCategory",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        )
        .end(buffer);
    });

    // Save to MongoDB
    const db = await getDb();

    const result = await db.collection("articleCategories").insertOne({
      title,
      description,
      coverImage: imageUrl,
      totalArticles: 0,
      createdAt: new Date(),
    });

    if (!result.acknowledged) {
      return {
        success: false,
        message: "Failed to create category.",
      };
    }

    return {
      success: true,
      message: "Category created successfully.",
    };
  } catch (error) {
    console.error("Add Category Error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}