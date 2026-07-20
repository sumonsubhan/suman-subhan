"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import { ObjectId } from "mongodb";

export async function deleteArticleCategory(categoryId) {
  await requireAdmin();

  try {
    const db = await getDb();

    const articleCategory = await db.collection("articleCategories").findOne({
      _id: new ObjectId(categoryId),
    });

    if (!articleCategory) {
      return {
        success: false,
        message: "Article category not found.",
      };
    }

    // Check if the category has any article
    const hasArticle = await db.collection("articles").findOne({
      categoryId: new ObjectId(categoryId),
    });

    if (hasArticle) {
      return {
        success: false,
        message:
          "This category cannot be deleted because it contains articles. Please delete all articles first.",
      };
    }

    // Delete cover image from Cloudinary
    if (articleCategory.coverImagePublicId) {
      await cloudinary.uploader.destroy(articleCategory.coverImagePublicId);
    }
    

    // Delete the category
    await db.collection("articleCategories").deleteOne({
      _id: new ObjectId(categoryId),
    });

    return {
      success: true,
      message: "Article category deleted successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to delete article category.",
    };
  }
}
