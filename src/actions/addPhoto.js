"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import validateImage from "@/lib/validateImage";
import { ObjectId } from "mongodb";

export async function addPhoto(formData) {
  await requireAdmin();

  try {
    const albumId = formData.get("albumId");
    const subAlbumId = formData.get("subAlbumId");
    const image = formData.get("photo");

    // Validation
    if (
      !albumId ||
      !subAlbumId ||
      !image ||
      image.size === 0
    ) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    if (
      !ObjectId.isValid(albumId) ||
      !ObjectId.isValid(subAlbumId)
    ) {
      return {
        success: false,
        message: "Invalid album or event ID.",
      };
    }

    const validation = validateImage(
      image,
      10 * 1024 * 1024
    );

    if (!validation.success) {
      return validation;
    }

    const db = await getDb();

    // Verify sub album
    const subAlbum = await db
      .collection("subAlbums")
      .findOne({
        _id: new ObjectId(subAlbumId),
        albumId: new ObjectId(albumId),
      });

    if (!subAlbum) {
      return {
        success: false,
        message: "Event not found.",
      };
    }

    // Convert image
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "albums/photos",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          )
          .end(buffer);
      }
    );

    // Save photo
    await db.collection("photos").insertOne({
      albumId: new ObjectId(albumId),
      subAlbumId: new ObjectId(subAlbumId),

      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,

      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Increase sub album count
    await db.collection("subAlbums").updateOne(
      {
        _id: new ObjectId(subAlbumId),
      },
      {
        $inc: {
          totalImages: 1,
        },
        $set: {
          updatedAt: new Date(),
        },
      }
    );

    // Increase main album count
    await db.collection("albums").updateOne(
      {
        _id: new ObjectId(albumId),
      },
      {
        $inc: {
          totalImages: 1,
        },
        $set: {
          updatedAt: new Date(),
        },
      }
    );

    return {
      success: true,
      message: "Photo uploaded successfully.",
    };
  } catch (error) {
    console.error("Add Photo Error:", error);

    return {
      success: false,
      message: "Failed to upload photo.",
    };
  }
}