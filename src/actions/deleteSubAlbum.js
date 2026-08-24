"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import { ObjectId } from "mongodb";

export async function deleteSubAlbum({ id, albumId }) {
  await requireAdmin();

  try {
    // Validate IDs
    if (!ObjectId.isValid(id) || !ObjectId.isValid(albumId)) {
      return {
        success: false,
        message: "Invalid ID.",
      };
    }

    const db = await getDb();

    const subAlbumId = new ObjectId(id);
    const mainAlbumId = new ObjectId(albumId);

    // Find sub album
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

    // Do not delete if photos exist
    if (subAlbum.totalImages > 0) {
      return {
        success: false,
        message:
          "This event contains photos. Please delete all photos before deleting the event.",
      };
    }

    // Delete cover image from Cloudinary
    if (subAlbum.coverImagePublicId) {
      try {
        await cloudinary.uploader.destroy(subAlbum.coverImagePublicId);
      } catch (error) {
        console.error("Cover image deletion error:", error);

        return {
          success: false,
          message: "Failed to delete the event cover image.",
        };
      }
    }
    
    // Delete all comments for this content
    await db.collection("comments").deleteMany({
      contentId: new ObjectId(subAlbumId),
    });
    
    // Delete sub album
    const result = await db.collection("subAlbums").deleteOne({
      _id: subAlbumId,
      albumId: mainAlbumId,
    });


    if (!result.deletedCount) {
      return {
        success: false,
        message: "Failed to delete event.",
      };
    }

    return {
      success: true,
      message: "Event deleted successfully.",
    };
  } catch (error) {
    console.error("Delete Sub Album Error:", error);

    return {
      success: false,
      message: "Failed to delete event.",
    };
  }
}
