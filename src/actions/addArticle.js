"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import { ObjectId } from "mongodb";

export async function addArticle(formData) {
  
  await requireAdmin();

  try {
    const categoryId = formData.get("categoryId");
    const title = formData.get("title")?.trim();
    const shortNote = formData.get("shortNote")?.trim();
    const content = formData.get("content");
    const coverImage = formData.get("coverImage");

    // Validation
    if (!categoryId || !title || !shortNote || !content || !coverImage) {
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
            folder: "articles",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        )
        .end(buffer);
    });

    const db = await getDb();

    const result = await db.collection("articles").insertOne({
      categoryId: new ObjectId(categoryId),
      title,
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
        message: "Failed to publish article.",
      };
    }

    await db.collection("articleCategories").updateOne(
      {
        _id: new ObjectId(categoryId),
      },
      {
        $inc: {
          totalArticles: 1,
        },
      },
    );

    return {
      success: true,
      message: "Article published successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}
