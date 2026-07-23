"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import validateImage from "@/lib/validateImage";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function updateEvent(formData) {
  await requireAdmin();

  try {
    const id = formData.get("id");
    const title = formData.get("title")?.trim();
    const coverImage = formData.get("coverImage");

    if (!id || !title) {
      return {
        success: false,
        message: "Title is required.",
      };
    }

    const db = await getDb();

    const oldEvent = await db.collection("events").findOne({
      _id: new ObjectId(id),
    });

    if (!oldEvent) {
      return {
        success: false,
        message: "Event not found.",
      };
    }

    let imageURL = oldEvent.coverImage;
    let publicId = oldEvent.coverImagePublicId;

    // If new image selected
    if (coverImage && coverImage.size > 0) {
      const validation = validateImage(coverImage, 5 * 1024 * 1024);

      if (!validation.success) {
        return validation;
      }

      // Delete old image

      if (oldEvent.coverImagePublicId) {
        await cloudinary.uploader.destroy(oldEvent.coverImagePublicId);
      }

      const bytes = await coverImage.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const uploadedImage = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "events",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          )
          .end(buffer);
      });

      imageURL = uploadedImage.secure_url;

      publicId = uploadedImage.public_id;
    }

    const result = await db.collection("events").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          title,
          coverImage: imageURL,
          coverImagePublicId: publicId,
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

    revalidatePath("/admin/events");

    return {
      success: true,
      message: "Event updated successfully.",
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}
