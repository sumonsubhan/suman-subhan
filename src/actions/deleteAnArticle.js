"use server";

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";

export async function deleteArticle(id) {
  try {
    const db = await getDb();

    // Find article
    const article = await db.collection("articles").findOne({
      _id: new ObjectId(id),
    });

    if (!article) {
      return {
        success: false,
        message: "Article not found.",
      };
    }

    // Delete image from Cloudinary
    if (article.coverImagePublicId) {
      await cloudinary.uploader.destroy(article.coverImagePublicId);
    }

    // Delete article
    const result = await db.collection("articles").deleteOne({
      _id: new ObjectId(id),
    });

    if (!result.acknowledged) {
      return {
        success: false,
        message: "Failed to delete article.",
      };
    }

    // Update total articles count
    await db.collection("articleCategories").updateOne(
      {
        _id: article.categoryId,
      },
      {
        $inc: {
          totalArticles: -1,
        },
      }
    );

    revalidatePath("/admin/articles");

    return {
      success: true,
      message: "Article deleted successfully.",
    };
  } catch (error) {
    console.error("Delete Article Error:", error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}