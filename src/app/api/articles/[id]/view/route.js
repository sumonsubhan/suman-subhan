import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import crypto from "crypto";
import { getDb } from "@/lib/db";

const VIEW_COOLDOWN = 24 * 60 * 60 * 1000;

export async function POST(request, { params }) {
  try {
    const { id } = await params;

    // Validate Article ID
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid article ID",
        },
        {
          status: 400,
        }
      );
    }

    const cookieStore = await cookies();

    let visitorId = cookieStore.get("visitor_id")?.value;

    // Create visitor ID if visitor is new
    if (!visitorId) {
      visitorId = crypto.randomUUID();
    }

    const db = await getDb();

    const articleId = new ObjectId(id);

    // Check if article exists
    const article = await db.collection("articles").findOne(
      {
        _id: articleId,
      },
      {
        projection: {
          _id: 1,
        },
      }
    );

    if (!article) {
      return NextResponse.json(
        {
          success: false,
          message: "Article not found",
        },
        {
          status: 404,
        }
      );
    }

    // 24 hours ago
    const cooldownTime = new Date(
      Date.now() - VIEW_COOLDOWN
    );

    // Check recent view
    const recentView = await db
      .collection("articleViews")
      .findOne({
        articleId,
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
        message: "View already counted within 24 hours",
      });

      // Refresh visitor cookie
      response.cookies.set("visitor_id", visitorId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });

      return response;
    }

    // Insert new view record
    await db.collection("articleViews").insertOne({
      articleId,
      visitorId,
      viewedAt: new Date(),
    });

    // Increment total article views
    await db.collection("articles").updateOne(
      {
        _id: articleId,
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
      message: "Article view counted successfully",
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
    console.error(
      "Article view tracking error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to track article view",
      },
      {
        status: 500,
      }
    );
  }
}