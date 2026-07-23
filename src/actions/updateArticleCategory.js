"use server";

import { ObjectId } from "mongodb";
import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import validateImage from "@/lib/validateImage";
import { revalidatePath } from "next/cache";

export async function updateArticleCategory(formData) {
  await requireAdmin();

  try {
    const id = formData.get("id");

    const title = formData.get("title")?.trim();
    const description = formData.get("description")?.trim();
    const image = formData.get("cover");

    if (!id || !title || !description) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    const db = await getDb();

    const category = await db.collection("articleCategories").findOne({
      _id: new ObjectId(id),
    });

    if (!category) {
      return {
        success: false,
        message: "Category not found.",
      };
    }

    const updateData = {
      title,
      description,
      updatedAt: new Date(),
    };

    if (image && image.size > 0) {
      const validation = validateImage(image, 5 * 1024 * 1024);

      if (!validation.success) {
        return validation;
      }

      await cloudinary.uploader.destroy(category.coverImagePublicId);

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadedImage = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "articleCategory",
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

    await db.collection("articleCategories").updateOne(
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
      message: "Category updated successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}
