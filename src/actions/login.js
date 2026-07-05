"use server";

import { signIn } from "@/app/auth";
import { AuthError } from "next-auth";

export async function login(formData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    throw error;
  }
}