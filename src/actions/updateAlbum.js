"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import validateImage from "@/lib/validateImage";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function updateAlbum(formData) {

  await requireAdmin();

  try {

    const id = formData.get("id");
    const title = formData.get("title")?.trim();
    const description = formData.get("description")?.trim();
    const image = formData.get("cover");

    const db = await getDb();

    const oldAlbum = await db.collection("albums").findOne({
      _id: new ObjectId(id),
    });

    if (!oldAlbum) {
      return {
        success: false,
        message: "Album not found",
      };
    }

    let coverImage = oldAlbum.coverImage;
    let coverImagePublicId = oldAlbum.coverImagePublicId;

    if (image && image.size > 0) {
      const validation = validateImage(image, 5 * 1024 * 1024);

      if (!validation.success) {
        return validation;
      }

      // delete old image
      if (oldAlbum.coverImagePublicId) {
        await cloudinary.uploader.destroy(oldAlbum.coverImagePublicId);
      }

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "albums",
            },

            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          )

          .end(buffer);
      });

      coverImage = uploadResult.secure_url;
      coverImagePublicId = uploadResult.public_id;
    }

    await db.collection("albums").updateOne(
      {
        _id: new ObjectId(id),
      },

      {
        $set: {
          title,
          description,
          coverImage,
          coverImagePublicId,
          updatedAt: new Date(),
        },
      },
    );

    revalidatePath("/admin/gallery");

    return {
      success: true,

      message: "Album updated successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,

      message: "Something went wrong.",
    };
  }
}
