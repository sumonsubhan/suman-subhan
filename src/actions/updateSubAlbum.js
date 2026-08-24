"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import validateImage from "@/lib/validateImage";
import { ObjectId } from "mongodb";

export async function updateSubAlbum(formData) {
  await requireAdmin();

  try {
    const id = formData.get("id");
    const albumId = formData.get("albumId");
    const title = formData.get("title")?.trim();
    const description = formData.get("description")?.trim();
    const image = formData.get("cover");

    // Validate IDs
    if (!ObjectId.isValid(id) || !ObjectId.isValid(albumId)) {
      return {
        success: false,
        message: "Invalid ID.",
      };
    }

    // Validate text fields
    if (!title || !description) {
      return {
        success: false,
        message: "Title and description are required.",
      };
    }

    const db = await getDb();

    const subAlbumId = new ObjectId(id);
    const mainAlbumId = new ObjectId(albumId);

    // Find existing sub album
    const subAlbum = await db.collection("subAlbums").findOne({
      _id: subAlbumId,
      albumId: mainAlbumId,
    });

    if (!subAlbum) {
      return {
        success: false,
        message: "Event not found.",
      };
    }

    const updateData = {
      title,
      description,
      updatedAt: new Date(),
    };

    // If new image selected
    if (image && image.size > 0) {
      const validation = validateImage(image, 5 * 1024 * 1024);

      if (!validation.success) {
        return validation;
      }

      const bytes = await image.arrayBuffer();

      const buffer = Buffer.from(bytes);

      // Upload new cover
      const uploadedImage = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "albums/sub-albums",
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

      updateData.coverImage = uploadedImage.secure_url;

      updateData.coverImagePublicId = uploadedImage.public_id;

      // Delete old cover
      if (subAlbum.coverImagePublicId) {
        try {
          await cloudinary.uploader.destroy(subAlbum.coverImagePublicId);
        } catch (error) {
          console.error("Old cover deletion error:", error);
        }
      }
    }

    // Update MongoDB
    const result = await db.collection("subAlbums").updateOne(
      {
        _id: subAlbumId,
        albumId: mainAlbumId,
      },
      {
        $set: updateData,
      },
    );

    if (!result.modifiedCount) {
      return {
        success: false,
        message: "No changes were made.",
      };
    }

    return {
      success: true,
      message: "Event updated successfully.",
    };
  } catch (error) {
    console.error("Update Sub Album Error:", error);

    return {
      success: false,
      message: "Failed to update event.",
    };
  }
}
