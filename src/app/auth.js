import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getDb } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 day
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const db = await getDb();

        const admin = await db.collection("admins").findOne({
          email: credentials.email,
        });

        if (!admin) {
          return null;
        }

        const valid = await bcrypt.compare(
          credentials.password,
          admin.password
        );

        if (!valid) {
          return null;
        }

        return {
          id: admin._id.toString(),
          name: admin.name,
          email: admin.email,
          image: admin.profileImage,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.image = user.image;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.image = token.image;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});