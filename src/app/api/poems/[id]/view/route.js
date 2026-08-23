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

    const poemId = new ObjectId(id);

    // Check if book exists
    const poem = await db.collection("poems").findOne(
      {
        _id: poemId,
      },
      {
        projection: {
          _id: 1,
        },
      }
    );

    if (!poem) {
      return NextResponse.json(
        {
          success: false,
          message: "Poem not found",
        },
        {
          status: 404,
        }
      );
    }

    // Check whether this visitor viewed this poem
    // within the last 24 hours
    const cooldownTime = new Date(Date.now() - VIEW_COOLDOWN);

    const recentView = await db.collection("poemViews").findOne({
      poemId,
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
    await db.collection("poemViews").insertOne({
      poemId,
      visitorId,
      viewedAt: new Date(),
    });

    // Increment Poem view count
    await db.collection("poems").updateOne(
      {
        _id: poemId,
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
    console.error("Poem view tracking error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to track poem view",
      },
      {
        status: 500,
      }
    );
  }
}