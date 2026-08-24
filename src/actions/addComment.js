"use server";

import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

const ALLOWED_TYPES = [
  "article",
  "book",
  "poem",
  "song",
  "blog",
  "photo"
];

export async function addComment(formData) {
  try {
    const contentId = formData.get("contentId")?.trim();
    const contentType = formData.get("contentType")?.trim();
    const contentTitle = formData.get("contentTitle")?.trim();
    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim().toLowerCase();
    const comment = formData.get("comment")?.trim();
    const path = formData.get("path")?.trim();

    // Honeypot field (must stay empty)
    const website = formData.get("website")?.trim();

    if (website) {
      return {
        success: false,
        message: "Spam detected.",
      };
    }

    // Validate ObjectId
    if (!ObjectId.isValid(contentId)) {
      return {
        success: false,
        message: "Invalid content.",
      };
    }

    // Validate content type
    if (!ALLOWED_TYPES.includes(contentType)) {
      return {
        success: false,
        message: "Invalid content type.",
      };
    }

    // Name validation
    if (!name || name.length < 2 || name.length > 50) {
      return {
        success: false,
        message: "Name must be between 2 and 50 characters.",
      };
    }

    // Email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Invalid email address.",
      };
    }

    // Comment validation
    if (!comment || comment.length < 3 || comment.length > 500) {
      return {
        success: false,
        message: "Comment must be between 3 and 250 characters.",
      };
    }

    const headersList = await headers();

    const forwarded = headersList.get("x-forwarded-for");

    const ip =
      forwarded?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip") ||
      "unknown";

    const userAgent =
      headersList.get("user-agent") || "";

    const db = await getDb();

    // Rate limit
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);

    const recentComment = await db.collection("comments").findOne({
      ip,
      createdAt: {
        $gte: oneMinuteAgo,
      },
    });

    if (recentComment) {
      return {
        success: false,
        message:
          "Please wait one minute before posting another comment.",
      };
    }

    await db.collection("comments").insertOne({
      contentId: new ObjectId(contentId),
      contentType,
      contentTitle,
      name,
      email,
      comment,

      approved: false,

      ip,
      userAgent,

      createdAt: new Date(),
    });

    if (path) {
      revalidatePath(path);
    }

    return {
      success: true,
      message:
        "Your comment has been submitted for review.",
    };
  } catch (error) {
    console.error("Add Comment:", error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}