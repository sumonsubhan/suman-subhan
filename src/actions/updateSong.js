"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import validateImage from "@/lib/validateImage";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function updateSong(formData) {
  await requireAdmin();

  try {

    const id = formData.get("id");
    const title = formData.get("title")?.trim();
    const videoURL = formData.get("videoURL")?.trim();
    const description = formData.get("description")?.trim();
    const image = formData.get("cover");

    if (!id || !title || !videoURL || !description) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    if (!ObjectId.isValid(id)) {
      return {
        success: false,
        message: "Invalid song id.",
      };
    }

    const db = await getDb();

    const oldSong = await db.collection("songs").findOne({
      _id: new ObjectId(id),
    });

    if (!oldSong) {
      return {
        success: false,
        message: "Song not found.",
      };
    }

    let coverImage = oldSong.coverImage;

    let publicId = oldSong.publicId;

    // If new image uploaded

    if (image && image.size > 0) {
      const validation = validateImage(image, 5 * 1024 * 1024);

      if (!validation.success) {
        return validation;
      }

      // Delete old Cloudinary image

      if (oldSong.publicId) {
        await cloudinary.uploader.destroy(oldSong.publicId);
      }

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "songs",
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

    const result = await db.collection("songs").updateOne(
      {
        _id: new ObjectId(id),
      },

      {
        $set: {
          title,
          coverImage,
          publicId,
          videoURL,
          description,
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

    revalidatePath("/admin/songs");

    return {
      success: true,

      message: "Song updated successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,

      message: "Something went wrong.",
    };
  }
}
