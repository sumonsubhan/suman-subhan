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
          message: "Invalid poem ID",
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

    const songId = new ObjectId(id);

    // Check if song exists
    const song = await db.collection("songs").findOne(
      {
        _id: songId,
      },
      {
        projection: {
          _id: 1,
        },
      }
    );

    if (!song) {
      return NextResponse.json(
        {
          success: false,
          message: "Song not found",
        },
        {
          status: 404,
        }
      );
    }

    // Check whether this visitor viewed this poem
    // within the last 24 hours
    const cooldownTime = new Date(Date.now() - VIEW_COOLDOWN);

    const recentView = await db.collection("songViews").findOne({
      songId,
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
    await db.collection("songViews").insertOne({
      songId,
      visitorId,
      viewedAt: new Date(),
    });

    // Increment song view count
    await db.collection("songs").updateOne(
      {
        _id: songId,
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
    console.error("Song view tracking error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to track song view",
      },
      {
        status: 500,
      }
    );
  }
}