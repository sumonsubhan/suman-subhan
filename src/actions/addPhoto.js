"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function addPhoto(formData) {
  try {
    const albumId = formData.get("albumId");
    const caption = formData.get("caption")?.trim();
    const image = formData.get("photo");

    if (!albumId || !caption || !image || image.size === 0) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "albums/photos",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    const db = await getDb();

    await db.collection("photos").insertOne({
      albumId: new ObjectId(albumId),
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      caption,
      createdAt: new Date(),
    });

    await db.collection("albums").updateOne(
      {
        _id: new ObjectId(albumId),
      },
      {
        $inc: {
          totalImages: 1,
        },
      },
    );

    return {
      success: true,
      message: "Photo uploaded successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to upload photo.",
    };
  }
}
