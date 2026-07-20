"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import { ObjectId } from "mongodb";

export async function deleteAlbum(albumId) {
  await requireAdmin();

  try {
    const db = await getDb();

    const album = await db.collection("albums").findOne({
      _id: new ObjectId(albumId),
    });

    if (!album) {
      return {
        success: false,
        message: "Album not found.",
      };
    }

    // Check if the album has any photo
    const hasPhoto = await db.collection("photos").findOne({
      albumId: new ObjectId(albumId),
    });

    if (hasPhoto) {
      return {
        success: false,
        message:
          "This album cannot be deleted because it contains photos. Please delete all photos first.",
      };
    }

    // Delete cover image from Cloudinary
    if (album.coverImagePublicId) {
      await cloudinary.uploader.destroy(album.coverImagePublicId);
    }
    
    // Delete all comments for this content
    await db.collection("comments").deleteMany({
      contentId: new ObjectId(albumId),
    });

    // Delete the album
    await db.collection("albums").deleteOne({
      _id: new ObjectId(albumId),
    });

    return {
      success: true,
      message: "Album deleted successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to delete album.",
    };
  }
}
