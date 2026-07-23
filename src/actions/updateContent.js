"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import validateImage from "@/lib/validateImage";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function updateContent(formData) {
  await requireAdmin();

  try {
    const id = formData.get("id");

    const title = formData.get("title")?.trim();

    const shortNote = formData.get("shortNote")?.trim();

    const content = formData.get("content");

    const coverImage = formData.get("coverImage");

    if (!id || !title || !shortNote || !content) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    if (!ObjectId.isValid(id)) {
      return {
        success: false,
        message: "Invalid content id.",
      };
    }

    const db = await getDb();

    const oldContent = await db.collection("bookContents").findOne({
      _id: new ObjectId(id),
    });

    if (!oldContent) {
      return {
        success: false,
        message: "Content not found.",
      };
    }

    let imageURL = oldContent.coverImage;

    let imagePublicId = oldContent.imagePublicId;

    // If new image uploaded
    if (coverImage && coverImage.size > 0) {
      const validation = validateImage(coverImage, 5 * 1024 * 1024);

      if (!validation.success) {
        return validation;
      }

      // Delete old image
      if (oldContent.imagePublicId) {
        await cloudinary.uploader.destroy(oldContent.imagePublicId);
      }

      // Upload new image

      const bytes = await coverImage.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "books/contents",
            },

            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            },
          )
          .end(buffer);
      });

      imageURL = uploadResult.secure_url;

      imagePublicId = uploadResult.public_id;
    }

    const result = await db.collection("bookContents").updateOne(
      {
        _id: new ObjectId(id),
      },

      {
        $set: {
          title,

          shortNote,

          content,

          coverImage: imageURL,

          imagePublicId,

          updatedAt: new Date(),
        },
      },
    );

    if (!result.modifiedCount) {
      return {
        success: true,
        message: "Nothing changed.",
      };
    }

    revalidatePath("/admin/books");

    return {
      success: true,
      message: "Content updated successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to update content.",
    };
  }
}
