"use server";

import { ObjectId } from "mongodb";
import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import validateImage from "@/lib/validateImage";
import { revalidatePath } from "next/cache";

export async function updateArticle(formData) {
  await requireAdmin();

  try {
    const id = formData.get("id");

    const title = formData.get("title")?.trim();
    const shortNote = formData.get("shortNote")?.trim();
    const content = formData.get("content");
    const image = formData.get("coverImage");

    const db = await getDb();

    const article = await db.collection("articles").findOne({
      _id: new ObjectId(id),
    });

    if (!article) {
      return {
        success: false,
        message: "Article not found.",
      };
    }

    const updateData = {
      title,
      shortNote,
      content,
      updatedAt: new Date(),
    };

    if (image && image.size > 0) {
      const validation = validateImage(image, 5 * 1024 * 1024);

      if (!validation.success) {
        return validation;
      }

      if (article.coverImagePublicId) {
        await cloudinary.uploader.destroy(article.coverImagePublicId);
      }

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadedImage = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "articles",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          )
          .end(buffer);
      });

      updateData.coverImage = uploadedImage.secure_url;

      updateData.coverImagePublicId = uploadedImage.public_id;
    }

    await db.collection("articles").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: updateData,
      },
    );

    revalidatePath("/admin/articles");

    return {
      success: true,
      message: "Article updated successfully.",
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}
