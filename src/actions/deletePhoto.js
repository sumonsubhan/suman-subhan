"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function deletePhoto(photoId) {
    console.log("jhfdsjhg", photoId)
  try {
    const db = await getDb();

    // Find the photo first
    const photo = await db.collection("photos").findOne({
      _id: new ObjectId(photoId),
    });

    if (!photo) {
      return {
        success: false,
        message: "Photo not found.",
      };
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(photo.publicId);

    // Delete from MongoDB
    await db.collection("photos").deleteOne({
      _id: new ObjectId(photoId),
    });

    // Update album photo count
    await db.collection("albums").updateOne(
      {
        _id: photo.albumId,
      },
      {
        $inc: {
          totalImages: -1,
        },
      }
    );

    return {
      success: true,
      message: "Photo deleted successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to delete photo.",
    };
  }
}