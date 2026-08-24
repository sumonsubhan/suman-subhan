"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import validateImage from "@/lib/validateImage";
import { ObjectId } from "mongodb";

export async function addSubAlbum(formData) {
  await requireAdmin();

  try {
    const albumId = formData.get("albumId");
    const title = formData.get("title")?.trim();
    const description = formData.get("description")?.trim();
    const image = formData.get("cover");

    // Validation
    if (
      !albumId ||
      !title ||
      !description ||
      !image ||
      image.size === 0
    ) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    if (!ObjectId.isValid(albumId)) {
      return {
        success: false,
        message: "Invalid album ID.",
      };
    }

    const validation = validateImage(
      image,
      5 * 1024 * 1024
    );

    if (!validation.success) {
      return validation;
    }

    const db = await getDb();

    // Check main album exists
    const album = await db.collection("albums").findOne({
      _id: new ObjectId(albumId),
    });

    if (!album) {
      return {
        success: false,
        message: "Main album not found.",
      };
    }

    // Convert image to buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadedImage = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "albums/sub-albums",
            },
            (error, result) => {
              if (error) {
                return reject(error);
              }

              resolve(result);
            }
          )
          .end(buffer);
      }
    );

    // Save sub album
    const result = await db
      .collection("subAlbums")
      .insertOne({
        albumId: new ObjectId(albumId),

        title,
        description,

        coverImage: uploadedImage.secure_url,
        coverImagePublicId: uploadedImage.public_id,

        totalImages: 0,

        createdAt: new Date(),
        updatedAt: new Date(),
      });

    if (!result.acknowledged) {
      return {
        success: false,
        message: "Failed to create sub album.",
      };
    }

    return {
      success: true,
      message: "Sub album created successfully.",
    };
  } catch (error) {
    console.error("Add Sub Album Error:", error);

    return {
      success: false,
      message:
        "Something went wrong. Please try again.",
    };
  }
}