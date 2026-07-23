"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import validateImage from "@/lib/validateImage";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function updatePoem(formData) {
  await requireAdmin();

  try {
    const id = formData.get("id");
    const title = formData.get("title")?.trim();
    const bookTitle = formData.get("bookTitle")?.trim();
    const videoURL = formData.get("videoURL")?.trim();
    const purchaseURL = formData.get("purchaseURL")?.trim() || "";
    const description = formData.get("description")?.trim();
    const image = formData.get("cover");

    if (!id || !title || !bookTitle || !videoURL || !description) {
      return {
        success: false,
        message: "Required fields are missing.",
      };
    }

    if (!ObjectId.isValid(id)) {
      return {
        success: false,
        message: "Invalid poem id.",
      };
    }

    const db = await getDb();

    const oldPoem = await db.collection("poems").findOne({
      _id: new ObjectId(id),
    });

    if (!oldPoem) {
      return {
        success: false,
        message: "Poem not found.",
      };
    }

    let coverImage = oldPoem.coverImage;

    let publicId = oldPoem.publicId;

    // New image selected
    if (image && image.size > 0) {
      const validation = validateImage(image, 5 * 1024 * 1024);

      if (!validation.success) {
        return validation;
      }

      // Delete old image
      if (oldPoem.publicId) {
        await cloudinary.uploader.destroy(oldPoem.publicId);
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

      coverImage = uploadResult.secure_url;

      publicId = uploadResult.public_id;
    }

    const result = await db.collection("poems").updateOne(
      {
        _id: new ObjectId(id),
      },

      {
        $set: {
          title,
          bookTitle,
          videoURL,
          purchaseURL,
          description,
          coverImage,
          publicId,
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

    revalidatePath("/admin/poems");

    return {
      success: true,
      message: "Poem updated successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}
