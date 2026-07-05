"use server";

import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/requireAdmin";

export async function deletePoem(id) {

  await requireAdmin();

  try {
    const db = await getDb();

    // Find the poem
    const poem = await db.collection("poems").findOne({
      _id: new ObjectId(id)
    })

    if(!poem){
      return {
        success: false,
        message: "Poem not found"
      }
    }

    // Delete from Cloudinary
    if(poem.publicId){
      await cloudinary.uploader.destroy(poem.publicId);
    }

    // Delete from mongodb
    const result = await db.collection("poems").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return {
        success: false,
        message: "Something Went wrong",
      };
    }

    return {
      success: true,
      message: "Poem deleted successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to delete poem.",
    };
  }
}