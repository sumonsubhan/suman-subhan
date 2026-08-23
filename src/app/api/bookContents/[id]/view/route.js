import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import crypto from "crypto";
import { getDb } from "@/lib/db";

const VIEW_COOLDOWN = 24 * 60 * 60 * 1000; // 24 hours

export async function POST(request, { params }) {
  try {
    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid content ID",
        },
        {
          status: 400,
        }
      );
    }

    const cookieStore = await cookies();

    let visitorId = cookieStore.get("visitor_id")?.value;

    // Create a new anonymous visitor ID
    if (!visitorId) {
      visitorId = crypto.randomUUID();
    }

    const db = await getDb();

    const contentId = new ObjectId(id);

    // Check if content exists
    const content = await db.collection("bookContents").findOne(
      {
        _id: contentId,
      },
      {
        projection: {
          _id: 1,
        },
      }
    );

    if (!content) {
      return NextResponse.json(
        {
          success: false,
          message: "Content not found",
        },
        {
          status: 404,
        }
      );
    }

    // Check whether this visitor viewed this content
    // within the last 24 hours
    const cooldownTime = new Date(Date.now() - VIEW_COOLDOWN);

    const recentView = await db.collection("bookContentViews").findOne({
      contentId,
      visitorId,
      viewedAt: {
        $gte: cooldownTime,
      },
    });

    // Already viewed within 24 hours
    if (recentView) {
      const response = NextResponse.json({
        success: true,
        counted: false,
        message: "View already counted",
      });

      // Refresh cookie expiration
      response.cookies.set("visitor_id", visitorId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });

      return response;
    }

    // Save new view record
    await db.collection("bookContentViews").insertOne({
      contentId,
      visitorId,
      viewedAt: new Date(),
    });

    // Increment content view count
    await db.collection("bookContents").updateOne(
      {
        _id: contentId,
      },
      {
        $inc: {
          views: 1,
        },
      }
    );

    const response = NextResponse.json({
      success: true,
      counted: true,
      message: "View counted successfully",
    });

    // Save visitor cookie
    response.cookies.set("visitor_id", visitorId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Content view tracking error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to track content view",
      },
      {
        status: 500,
      }
    );
  }
}