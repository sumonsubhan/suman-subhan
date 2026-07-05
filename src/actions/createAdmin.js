"use server";

import bcrypt from "bcrypt";
import { getDb } from "@/lib/db";

export async function createAdmin() {
  const db = await getDb();

  const exists = await db.collection("admins").findOne({
    email: "shadesoflonelyness@gmail.com",
  });

  if (exists) {
    return { success: false, message: "Admin already exists." };
  }

  const hash = await bcrypt.hash("12345678", 12);

  await db.collection("admins").insertOne({
    name: "Suman Subhan",
    email: "shadesoflonelyness@gmail.com",
    password: hash,
    profileImage:
      "https://res.cloudinary.com/dgwfp9tiu/image/upload/v1783060366/photo_2026-07-03_12-31-54_hpp0yt.jpg",
    createdAt: new Date(),
  });

  return {
    success: true,
    message: "Admin created.",
  };
}