"use server";

import cloudinary from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import validateImage from "@/lib/validateImage";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function updateBook(formData) {
  await requireAdmin();

  try {
    const id = formData.get("id");
    const title = formData.get("title")?.trim();
    const category = formData.get("category");
    const categorySlug = formData.get("categorySlug");
    const purchaseURL = formData.get("purchaseURL")?.trim() || "";
    const coverImage = formData.get("coverImage");
    
    const db = await getDb();

    const oldBook = await db.collection("books").findOne({
      _id: new ObjectId(id),
    });

    if (!oldBook) {
      return {
        success: false,
        message: "Book not found.",
      };
    }

    let coverURL = oldBook.coverImage;

    let publicId = oldBook.coverImagePublicId;

    if (coverImage && coverImage.size > 0) {
      const validation = validateImage(coverImage, 5 * 1024 * 1024);

      if (!validation.success) {
        return validation;
      }

      await cloudinary.uploader.destroy(oldBook.coverImagePublicId);

      const bytes = await coverImage.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const uploaded = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "books",
            },
            (err, result) => {
              if (err) return reject(err);

              resolve(result);
            },
          )
          .end(buffer);
      });

      coverURL = uploaded.secure_url;

      publicId = uploaded.public_id;
    }

    const result = await db.collection("books").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          title,
          category,
          categorySlug,
          purchaseURL,
          coverImage: coverURL,
          coverImagePublicId: publicId,
          updatedAt: new Date(),
        },
      },
    );

    if (!result.modifiedCount) {
      return {
        success: true,
        message: "Nothing changed.",
      };
    }

    revalidatePath("/admin/books");

    return {
      success: true,
      message: "Book updated successfully.",
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}