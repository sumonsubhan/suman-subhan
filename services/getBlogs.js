import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export async function getBlogs({
  id,
  page = 1,
  limit = 10,
} = {}) {
  const db = await getDb();

  // Fetch single blog
  if (id) {
    const blog = await db.collection("blogs").findOne({
      _id: new ObjectId(id),
    });

    if (!blog) return null;

    return {
      ...blog,
      _id: blog._id.toString(),
    };
  }

  const skip = (Number(page) - 1) * Number(limit);

  // Total blogs
  const total = await db.collection("blogs").countDocuments();

  // Fetch blogs
  const blogs = await db
    .collection("blogs")
    .find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .toArray();

  return {
    blogs: blogs.map((blog) => ({
      ...blog,
      _id: blog._id.toString(),
    })),
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  };
}