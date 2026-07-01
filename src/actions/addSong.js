"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";

export async function addSong(formData) {
  try {
    const title = formData.get("title");
    const videoURL = formData.get("videoURL");
    const description = formData.get("description");
    const image = formData.get("cover");

    if (!title || !videoURL || !description || !image) {
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
            folder: "songs",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    const db = await getDb();

    await db.collection("songs").insertOne({
      title,
      coverImage: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      videoURL,
      description,
      createdAt: new Date(),
    });

    return {
      success: true,
      message: "Song added successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}