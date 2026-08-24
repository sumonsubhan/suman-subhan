"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import { ObjectId } from "mongodb";

export async function deletePhoto({
  id,
  subAlbumId,
  albumId,
}) {
  await requireAdmin();

  try {
    // Validate IDs
    if (
      !ObjectId.isValid(id) ||
      !ObjectId.isValid(subAlbumId) ||
      !ObjectId.isValid(albumId)
    ) {
      return {
        success: false,
        message: "Invalid ID.",
      };
    }

    const db = await getDb();

    // Find photo
    const photo = await db.collection("photos").findOne({
      _id: new ObjectId(id),
      subAlbumId: new ObjectId(subAlbumId),
      albumId: new ObjectId(albumId),
    });

    if (!photo) {
      return {
        success: false,
        message: "Photo not found.",
      };
    }

    // Delete image from Cloudinary
    if (photo.publicId) {
      await cloudinary.uploader.destroy(
        photo.publicId
      );
    }

    // Delete photo from MongoDB
    const result = await db
      .collection("photos")
      .deleteOne({
        _id: new ObjectId(id),
      });

    if (!result.deletedCount) {
      return {
        success: false,
        message: "Failed to delete photo.",
      };
    }

    // Decrease sub album photo count
    await db.collection("subAlbums").updateOne(
      {
        _id: new ObjectId(subAlbumId),
      },
      {
        $inc: {
          totalImages: -1,
        },
        $set: {
          updatedAt: new Date(),
        },
      }
    );

    // Decrease main album photo count
    await db.collection("albums").updateOne(
      {
        _id: new ObjectId(albumId),
      },
      {
        $inc: {
          totalImages: -1,
        },
        $set: {
          updatedAt: new Date(),
        },
      }
    );

    return {
      success: true,
      message: "Photo deleted successfully.",
    };
  } catch (error) {
    console.error("Delete Photo Error:", error);

    return {
      success: false,
      message: "Failed to delete photo.",
    };
  }
}