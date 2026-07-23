"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import validateImage from "@/lib/validateImage";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function updateBlog(formData) {
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

    const db = await getDb();

    const oldBlog = await db.collection("blogs").findOne({
      _id: new ObjectId(id),
    });

    if (!oldBlog) {
      return {
        success: false,
        message: "Blog not found.",
      };
    }

    let imageURL = oldBlog.coverImage;
    let publicId = oldBlog.publicId;

    // Upload new image only if selected
    if (image && image.size > 0) {
      const validation = validateImage(image, 5 * 1024 * 1024);

      if (!validation.success) {
        return validation;
      }

      // Delete old cloudinary image
      if (oldBlog.publicId) {
        await cloudinary.uploader.destroy(oldBlog.publicId);
      }

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploaded = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "blogs",
            },

            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          )
          .end(buffer);
      });

      imageURL = uploaded.secure_url;
      publicId = uploaded.public_id;
    }

    const result = await db.collection("blogs").updateOne(
      {
        _id: new ObjectId(id),
      },

      {
        $set: {
          title,
          videoURL,
          description,
          coverImage: imageURL,
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
    
    revalidatePath("/admin/blogs");

    return {
      success: true,
      message: "Blog updated successfully.",
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}
